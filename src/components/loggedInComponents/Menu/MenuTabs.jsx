import { useState } from 'react';
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';

import AddBoxIcon from '@mui/icons-material/AddBox';
import PeopleIcon from '@mui/icons-material/People';

const defaultTab = 'Coming soon...';

const BoardSvg = () => {
	return (
		<>
			<img src="/svg_icons/chess_board.svg" alt="board" className="w-[20%] pb-2" />
		</>
	);
};

const MenuTabs = ({ tabOneComponent = defaultTab, tabTwoComponent = defaultTab, tabThreeComponent = defaultTab }) => {
	const [value, setValue] = useState('1');

	// do not remove event from below prop
	const handleChange = (event, newValue) => {
		setValue(newValue);
	};

	return (
		<div className="bg-[#21201d] h-full rounded-md ">
			<Box sx={{ width: '100%', typography: 'body1' }} className=" bg-[#262522] h-full rounded-md">
				<TabContext value={value}>
					<Box sx={{ borderBottom: 1, borderColor: 'divider' }} className="bg-[#21201d] rounded-md">
						<TabList onChange={handleChange} aria-label="lab API tabs example flex">
							<Tab icon={<AddBoxIcon />} label="New Game" value="1" className="flex-1 text-white text-xs normal-case" />
							<Tab icon={<BoardSvg />} label="Games" value="2" className="flex-1 text-white text-xs normal-case" />
							<Tab icon={<PeopleIcon />} label="Players" value="3" className="flex-1 text-white text-xs normal-case" />
						</TabList>
					</Box>
					<TabPanel value="1" className="h-full max-h-[40em] overflow-y-scroll no-scrollbar">
						{tabOneComponent}
					</TabPanel>
					<TabPanel value="2">{tabTwoComponent}</TabPanel>
					<TabPanel value="3">{tabThreeComponent}</TabPanel>
				</TabContext>
			</Box>
		</div>
	);
};

export default MenuTabs;
