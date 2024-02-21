import { Box } from '@mui/material';
import MenuTabs from './MenuTabs';
import SearchPlayers from './SearchPlayers';
import TimeVariantGrid from './TimeVariantGrid';

const Menu = () => {
	const tabOne = (
		<>
			<TimeVariantGrid />
			<SearchPlayers />
		</>
	);

	return (
		<>
			<MenuTabs tabOneComponent={tabOne} />
		</>
	);
};

export default Menu;
