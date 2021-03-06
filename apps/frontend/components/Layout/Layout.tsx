import { useState } from 'react';
import {
	ActionIcon,
	AppShell,
	Avatar,
	Burger,
	createStyles,
	Group,
	Header,
	MediaQuery,
	Menu,
	Navbar,
	Text,
	UnstyledButton,
	useMantineColorScheme,
	useMantineTheme,
} from '@mantine/core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMoon, faSun } from '@fortawesome/free-solid-svg-icons';
import Logo from '../Logo';
import { useUser } from '../../lib/hooks';

const useStyles = createStyles((theme) => ({
	user: {
		color:
			theme.colorScheme === 'dark' ? theme.colors.dark[0] : theme.black,
		padding: `${theme.spacing.xs}px ${theme.spacing.sm}px`,
		borderRadius: theme.radius.sm,
		transition: 'background-color 100ms ease',

		'&:hover': {
			backgroundColor:
				theme.colorScheme === 'dark'
					? theme.colors.dark[8]
					: theme.white,
		},
	},
	userActive: {
		backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[8] : theme.white,
	},
	userMenu: {
		[theme.fn.smallerThan('xs')]: { display: 'none' },
	},
}));

function Layout({ children }) {
	const { classes, cx } = useStyles();
	const [hamburgerOpened, setHamburgerOpened] = useState(false);
	const [userMenuOpened, setUserMenuOpened] = useState(false);
	const { colorScheme, toggleColorScheme } = useMantineColorScheme();
	const dark = colorScheme === 'dark';
	const theme = useMantineTheme();

	const { user } = useUser();

	return (
		<AppShell
			styles={(theme) => ({
				main: {
					backgroundColor:
						theme.colorScheme === 'dark'
							? theme.colors.dark[8]
							: theme.colors.gray[0],
				},
			})}
			// navbarOffsetBreakpoint controls when navbar should no longer be offset with padding-left
			navbarOffsetBreakpoint="sm"
			// fixed prop on AppShell will be automatically added to Header and Navbar
			fixed
			navbar={
				<Navbar
					p="md"
					// Breakpoint at which navbar will be hidden if hidden prop is true
					hiddenBreakpoint="sm"
					// Hides navbar when viewport size is less than value specified in hiddenBreakpoint
					hidden={!hamburgerOpened}
					// when viewport size is less than theme.breakpoints.sm navbar width is 100%
					// viewport size > theme.breakpoints.sm ??? width is 300px
					// viewport size > theme.breakpoints.lg ??? width is 400px
					width={{ sm: 200, lg: 300 }}
				>
					<Text>Application navbar</Text>
				</Navbar>
			}
			header={
				<Header height={70} p="md">
					{/* Handle other responsive styles with MediaQuery component or createStyles function */}
					<div
						style={{
							display: 'flex',
							justifyContent: 'space-between',
							alignItems: 'center',
							height: '100%',
						}}
					>
						<MediaQuery
							largerThan="sm"
							styles={{ display: 'none' }}
						>
							<Burger
								aria-label="open menu"
								opened={hamburgerOpened}
								onClick={() => setHamburgerOpened((o) => !o)}
								size="sm"
								color={theme.colors.gray[6]}
								mr="xl"
							/>
						</MediaQuery>

						<Logo />

						<Group>
							<Menu
								size={260}
								transition="pop-top-right"
								className={classes.userMenu}
								onClose={() => setUserMenuOpened(false)}
								onOpen={() => setUserMenuOpened(true)}
								control={
									<UnstyledButton className={cx(classes.user, { [classes.userActive]: userMenuOpened })} >
										<Group spacing={7}>
											<Avatar src={null} alt={user.name}>{user.image ? null : user.name.slice(0, 1)}</Avatar>
											<Text weight={500} size="sm" sx={{ lineHeight: 1 }} mr={3} >{user.name}</Text>
											<ChevronDown
										</Group>
									</UnstyledButton>
								}
							></Menu>
							<ActionIcon
								variant="outline"
								color={dark ? 'yellow' : 'blue'}
								onClick={() => toggleColorScheme()}
								title="Toggle color scheme"
							>
								{dark ? (
									<FontAwesomeIcon icon={faSun} />
								) : (
									<FontAwesomeIcon icon={faMoon} />
								)}
							</ActionIcon>
						</Group>
					</div>
				</Header>
			}
		>
			{children}
		</AppShell>
	);
}

export default Layout;
