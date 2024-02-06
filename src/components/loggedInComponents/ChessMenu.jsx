import { useState } from 'react';
import { Button, SvgIcon } from '@mui/material';
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';

import AddBoxIcon from '@mui/icons-material/AddBox';
import PeopleIcon from '@mui/icons-material/People';

const BoardSvg = () => {
	return (
		<>
			<img src="/svg_icons/chess_board.svg" alt="board" className="w-[20%] pb-2" />
		</>
	);
};

const LabTabs = () => {
	const [value, setValue] = useState('1');

	const handleChange = (event, newValue) => {
		setValue(newValue);
	};

	return (
		<Box sx={{ width: '100%', typography: 'body1' }}>
			<TabContext value={value}>
				<Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
					<TabList onChange={handleChange} aria-label="lab API tabs example flex">
						<Tab icon={<AddBoxIcon />} label="New Game" value="1" className="flex-1 text-white text-xs normal-case" />
						<Tab icon={<BoardSvg />} label="Games" value="2" className="flex-1 text-white text-xs normal-case" />
						<Tab icon={<PeopleIcon />} label="Players" value="3" className="flex-1 text-white text-xs normal-case" />
					</TabList>
				</Box>
				<TabPanel value="1">Item One</TabPanel>
				<TabPanel value="2">Item Two</TabPanel>
				<TabPanel value="3">Item Three</TabPanel>
			</TabContext>
		</Box>
	);
};

const ChessMenu = () => {
	const totalGridCount = 9;
	let gridElements = [];

	const setTimeAndStart = (id) => {
		alert(id);
	};

	for (let i = 1; i <= totalGridCount; i++) {
		gridElements.push(
			<Button key={i} className="w-20 border-2 flex justify-center" onClick={() => setTimeAndStart(i)}>
				{i < 10 ? `0${i}` : i}
			</Button>
		);
	}

	const content = (
		<>
			<LabTabs />
			<div className="grid grid-cols-3 gap-4 text-white">{gridElements}</div>
		</>
	);

	return <>{content}</>;
};

export default ChessMenu;
