import { useEffect, useState } from 'react';
import { Box, Stack } from '@mui/material';
import SettingsList from './SettingsList';
import NavMenuWrapper from './NavMenuWrapper';
import MenuContent from './MenuContent';
import useWindowDimensions from '../../../hooks/useWindowDimension';

const Navigation = ({ setCollapse, collapse }) => {
	const [isMenuVisible, setIsMenuVisible] = useState(false);
	const { width, height } = useWindowDimensions();

	if (width <= 1250) {
		setCollapse(true);
	} else {
		setCollapse(false);
	}

	const menuArr = ['play'];

	const responsiveClass = {
		logo: 'select-none pointer-events-none px-4 py-4',
		collapsedLogo: 'select-none pointer-events-none flex justify-center w-6 my-4',
		logoImg: '/imgs/chesscom_imgs/chesscom_logo_white.png',
		collapsedLogoImg: '/svg_icons/chesscom_pawn.svg',
		menuContainer:
			'py-2 pl-4 flex items-center select-none cursor-pointer hover:bg-[#21201f] text-[#dfdede] hover:text-[#f0f8ff]',
		collapsedMenuCont:
			'py-4 flex justify-center items-center select-none cursor-pointer hover:bg-[#21201f] text-[#dfdede] hover:text-[#f0f8ff]',
	};

	return (
		<>
			<Stack className="flex justify-between h-full">
				<Stack>
					<Box className="flex justify-center w-full">
						<img
							src={!collapse ? responsiveClass.logoImg : responsiveClass.collapsedLogoImg}
							alt="chess_logo"
							className={!collapse ? responsiveClass.logo : responsiveClass.collapsedLogo}
						/>
					</Box>
					{menuArr.map((menuName) => (
						<NavMenuWrapper key={menuName} isMenuVisible={isMenuVisible} setIsMenuVisible={setIsMenuVisible}>
							<Box className={!collapse ? responsiveClass.menuContainer : responsiveClass.collapsedMenuCont}>
								<img alt={menuName} src="/svg_icons/chess_pawn.svg" className="w-8" />
								{!collapse ? <p className="capitalize text-md font-bold px-1">{menuName}</p> : null}
							</Box>
						</NavMenuWrapper>
					))}
					<MenuContent
						isMenuVisible={isMenuVisible}
						setIsMenuVisible={setIsMenuVisible}
						collapse={collapse}
						setCollapse={setCollapse}
					/>
				</Stack>
				<Box className="w-full">
					<SettingsList collapse={collapse} setCollapse={setCollapse} />
				</Box>
			</Stack>
		</>
	);
};

export default Navigation;
