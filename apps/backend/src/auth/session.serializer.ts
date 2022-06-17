import { Injectable } from '@nestjs/common';
import { PassportSerializer } from '@nestjs/passport';
import { User } from '../user/entities/user.entity';

@Injectable()
export class SessionSerializer extends PassportSerializer {
	serializeUser(user: User, done: (err: Error | null, user: User) => void) {
		done(null, user);
	}

	deserializeUser(
		payload: string,
		done: (err: Error | null, payload: string) => void,
	) {
		done(null, payload);
	}
}
