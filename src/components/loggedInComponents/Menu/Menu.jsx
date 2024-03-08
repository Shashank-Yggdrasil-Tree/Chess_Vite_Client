import { Box } from '@mui/material';
import MenuTabs from './MenuTabs';
import SearchPlayers from './SearchPlayers';
import TimeVariantGrid from './TimeVariantGrid';
import ChatWindow from '../../ChatWindow/ChatWindow';
import { useSelector } from 'react-redux';

const Menu = () => {
	const room = useSelector((state) => state.game.room);

	const tabOne = (
		<Box className="flex justify-between flex-col h-[90%] overflow-auto">
			<SearchPlayers />
			{!room ? <TimeVariantGrid /> : <ChatWindow />}
			{/* <TimeVariantGrid /> */}
		</Box>
	);

	return (
		<>
			<MenuTabs tabOneComponent={tabOne} />
		</>
	);
};

export default Menu;
