import { Box } from '@mui/material';
import MenuTabs from './MenuTabs';
import SearchPlayers from './SearchPlayers';
import TimeVariantGrid from './TimeVariantGrid';

const Menu = () => {
	const tabOne = (
		<Box className="flex justify-between flex-col h-full">
			<SearchPlayers />
			<TimeVariantGrid />
		</Box>
	);

	return (
		<>
			<MenuTabs tabOneComponent={tabOne} />
		</>
	);
};

export default Menu;
