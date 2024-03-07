import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import MenuIcon from '@mui/icons-material/Menu';
import { Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import { Link, Navigate } from 'react-router-dom';
import CommonBoxWrapper from '../common/CommonBoxWrapper';
import { PATH_NAME } from '../constants/path-name';
import { toast } from 'react-toastify';
import { TOAST_CONFIG } from '../constants/toast-config';

const drawerWidth = 240;

function ResponsiveDrawer(props) {
	const { window } = props;
	const [mobileOpen, setMobileOpen] = useState(false);

	const { play_vs_friend, engine_vs_engine, play_vs_comp, styled, chessboard_3d, analysis, home } = PATH_NAME;

	const stockfishNavList = [
		{ name: 'Play Vs Friend', link: play_vs_friend },
		{ name: 'Engine Vs Engine', link: engine_vs_engine },
		{ name: 'Play Vs Comp', link: play_vs_comp },
		{ name: 'Styled', link: styled },
		{ name: '3D ChessBoard', link: chessboard_3d },
		{ name: 'Analysis Board', link: analysis },
		{ name: 'Home', link: home },
	];

	const handleDrawerToggle = () => {
		setMobileOpen(!mobileOpen);
	};

	const showToast = () => {
		toast.info('Please login to play with a friend', TOAST_CONFIG);
	};

	const drawer = (
		<div>
			<List className="lg:h-[32rem] md:h-[20rem] overflow-y-scroll overflow-x-hidden scrollbar-effect divide-y divide-zinc-800">
				{stockfishNavList.map(({ name, link }, index) => (
					<ListItem
						key={index}
						className="hover:bg-[#26262680] transition ease-in-out hover:-translate-y-1 hover:scale-110 duration-300 group cursor-pointer"
						disablePadding
					>
						<Link to={link} className="w-full">
							<ListItemButton onClick={name === 'Play Vs Friend' ? showToast : undefined}>
								<ListItemText
									disableTypography
									className="flex justify-center transition-opacity duration-100 lg:my-3 md:my-2 opacity-70 group-hover:opacity-100"
									primary={
										<>
											<Typography
												variant="h2"
												className="inline-block relative lg:text-3xl sm:text-sm md:text-md duration-300 font-medium font-barlow leading-[4rem] tracking-wider select-none whitespace-nowrap uppercase cursor-pointer"
											>
												{name}
												<span className="absolute left-0 bottom-0 w-full h-0.5 bg-orange-500 origin-bottom transform scale-x-0 transition-transform duration-500 group-hover:scale-x-100"></span>
											</Typography>
										</>
									}
								/>
							</ListItemButton>
						</Link>
					</ListItem>
				))}
			</List>
		</div>
	);

	const mobile_drawer = (
		<div>
			<List className="h-dhv my-5 overflow-y-scroll">
				{stockfishNavList.map(({ name, link }, index) => (
					<ListItem key={index} disablePadding>
						<Link to={link}>
							<ListItemButton>
								{/* <ListItemIcon>
                {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
              </ListItemIcon> */}
								<ListItemText
									disableTypography
									primary={
										<Typography
											variant="h2"
											className="inline-block relative group cursor-pointer text-sm font-medium font-barlow leading-[1rem] tracking-wider select-none whitespace-nowrap uppercase cursor-pointer "
										>
											{name}
										</Typography>
									}
								/>
							</ListItemButton>
						</Link>
					</ListItem>
				))}
			</List>
		</div>
	);

	const container = window !== undefined ? () => window().document.body : undefined;

	return (
		<CommonBoxWrapper additional_class="w-full h-full">
			<CssBaseline />

			<IconButton
				className="bg-white"
				aria-label="open drawer"
				edge="start"
				onClick={handleDrawerToggle}
				sx={{ mx: 1, my: 1, display: { sm: 'none' } }}
			>
				<MenuIcon />
			</IconButton>

			<Box
				className="w-full h-full bg-black bg-opacity-40 text-white flex justify-center items-center"
				component="nav"
				aria-label="mailbox folders"
			>
				{/* Laptop Drawer */}
				<Box
					className="w-full"
					variant="permanent"
					sx={{
						display: { xs: 'none', sm: 'block' },
						'& .MuiDrawer-paper': {
							boxSizing: 'border-box',
							flex: 1,
						},
					}}
					open
				>
					{drawer}
				</Box>

				{/* The implementation can be swapped with js to avoid SEO duplication of links. */}
				{/* Mobile Drawer */}
				<Drawer
					container={container}
					variant="temporary"
					open={mobileOpen}
					onClose={handleDrawerToggle}
					ModalProps={{
						keepMounted: true, // Better open performance on mobile.
					}}
					sx={{
						display: { xs: 'block', sm: 'none' },
						'& .MuiDrawer-paper': {
							boxSizing: 'border-box',
							width: drawerWidth,
						},
					}}
				>
					{mobile_drawer}
				</Drawer>
			</Box>
		</CommonBoxWrapper>
	);
}

export default ResponsiveDrawer;
