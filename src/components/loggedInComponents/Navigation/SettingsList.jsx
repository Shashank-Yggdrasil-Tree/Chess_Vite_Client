import { Box, Stack } from '@mui/material';
import TooltipWrapper from '../../../common/TooltipWrapper';
import { useState } from 'react';
// #1B1A18
const SettingsList = ({ collapse, setCollapse }) => {
	const settingNames = ['settings', 'help'];

	const responsiveClass = {
		container:
			'gap-1 py-2 pl-4 flex items-center select-none cursor-pointer hover:bg-[#21201f] text-[#939291] hover:text-[#f0f8ff]',
		iconsOnly:
			'gap-1 py-2 flex justify-center items-center select-none cursor-pointer hover:bg-[#21201f] text-[#939291] hover:text-[#f0f8ff]',
		icon: 'w-5',
		title: 'capitalize text-xs font-bold px-1',
	};

	return (
		<>
			<Stack className="mb-6">
				<TooltipWrapper tooltipContent="Expand" placement="right" isHidden={!collapse}>
					<Box
						key="collapse"
						className={!collapse ? responsiveClass.container : responsiveClass.iconsOnly}
						onClick={() => setCollapse(!collapse)}
					>
						<img
							alt="collapse"
							src={collapse ? '/svg_icons/collapse_right.svg' : '/svg_icons/collapse.svg'}
							className={responsiveClass.icon}
						/>
						{!collapse ? <p className={responsiveClass.title}>collapse</p> : null}
					</Box>
				</TooltipWrapper>

				{settingNames.map((name) => (
					<TooltipWrapper key={name} placement="right" tooltipContent={name} enterDelay={0}>
						<Box key={name} className={!collapse ? responsiveClass.container : responsiveClass.iconsOnly}>
							<img alt={name} src={`/svg_icons/${name}.svg`} className={responsiveClass.icon} />
							{!collapse ? <p className={responsiveClass.title}>{name}</p> : null}
						</Box>
					</TooltipWrapper>
				))}
			</Stack>
		</>
	);
};

export default SettingsList;
