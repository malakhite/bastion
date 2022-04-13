/* eslint-disable @typescript-eslint/no-inferrable-types */
import * as argon2 from 'argon2';
import { Exclude } from 'class-transformer';
import { IsBoolean, IsDate, IsEmail, IsUUID } from 'class-validator';
import {
	BeforeInsert,
	BeforeUpdate,
	Column,
	CreateDateColumn,
	DeleteDateColumn,
	Entity,
	Index,
	JoinColumn,
	ManyToOne,
	PrimaryGeneratedColumn,
	Unique,
	UpdateDateColumn,
} from 'typeorm';
import { Role } from './role.entity';

@Entity({
	name: 'users',
	orderBy: {
		created_at: 'ASC',
		email: 'ASC',
	},
})
@Unique(['email'])
export class User {
	@IsUUID()
	@PrimaryGeneratedColumn('uuid')
	id!: string;

	@IsEmail()
	@Column({
		type: 'text',
		transformer: {
			to: (value: string) => value.toLowerCase().trim(),
			from: (value) => value,
		},
	})
	@Index({ unique: true })
	email!: string;

	@Column({ type: 'text' })
	name!: string;

	@Exclude()
	@Column({ type: 'text' })
	password!: string;

	@IsBoolean()
	@Column({ type: 'boolean' })
	is_active: boolean = false;

	@ManyToOne(() => Role, { eager: true })
	@JoinColumn({ name: 'role_id' })
	role!: Role;

	@Exclude()
	@Column({ type: 'text', nullable: true })
	refresh_token?: string;

	@IsDate()
	@CreateDateColumn({ type: 'timestamptz' })
	created_at!: Date;

	@IsDate()
	@UpdateDateColumn({ type: 'timestamptz', nullable: true })
	updated_at: Date | null = null;

	@Exclude()
	@IsDate()
	@DeleteDateColumn({ type: 'timestamptz', nullable: true })
	deleted_at: Date | null = null;

	@BeforeInsert()
	async hashPassword(password = this.password) {
		if (password) {
			this.password = await argon2.hash(password);
		}
	}

	@BeforeUpdate()
	async checkPassword(password = this.password) {
		if (password && !password.startsWith('$argon2')) {
			this.password = await argon2.hash(password);
		}
	}

	constructor(partial: Partial<User>) {
		Object.assign(this, partial);
	}
}
