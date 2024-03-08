import React from 'react';
import { ThemeProvider } from '@mui/material/styles';
import Button from '@mui/material/Button';
import { toast } from 'react-toastify';
import { TOAST_CONFIG } from '../../../constants/toast-config';

const TimeVariantGrid = () => {
	let timeVariants = [
		{ id: 1, time: '1+0', title: 'Bullet' },
		{ id: 2, time: '2+1', title: 'Bullet' },
		{ id: 3, time: '3+1', title: 'Blitz' },
		{ id: 4, time: '3+2', title: 'Blitz' },
		{ id: 5, time: '5+0', title: 'Blitz' },
		{ id: 6, time: '5+3', title: 'Blitz' },
		{ id: 7, time: '10+0', title: 'Rapid' },
		{ id: 8, time: '10+5', title: 'Rapid' },
		{ id: 9, time: '15+10', title: 'Rapid' },
		{ id: 10, time: '30+0', title: 'Classical' },
		{ id: 11, time: '30+20', title: 'Classical' },
		{ id: 12, title: 'Custom' },
	];

	const startGame = () => {
		toast.info('Coming soon!', TOAST_CONFIG);
	};

	return (
		<div className="grid grid-cols-3 lg:grid-cols-2 xl:grid-cols-3 gap-4 text-white overflow-auto max-h-96">
			{timeVariants.map(({ id, time, title }) => (
				<Button
					key={id}
					onClick={() => startGame()}
					className="backdrop-blur-md h-20 flex flex-col bg-white bg-opacity-10 hover:bg-opacity-20 hover:border-neutral-400 border border-neutral-600"
					variant="outlined"
				>
					<span className="text-white flex flex-col gap-0.5">
						<span className="text-2xl">{time}</span>
						<span className="text-xs">{title}</span>
					</span>
				</Button>
			))}
		</div>
	);
};

export default TimeVariantGrid;
