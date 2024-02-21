import * as React from 'react';
import { styled } from '@mui/material/styles';
import Tooltip, { tooltipClasses } from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';

const HtmlTooltip = styled(({ className, ...props }) => <Tooltip {...props} classes={{ popper: className }} />)(
	({ theme }) => ({
		[`& .${tooltipClasses.tooltip}`]: {
			backgroundColor: '#f5f5f9',
			color: 'rgba(0, 0, 0, 0.87)',
			maxWidth: 220,
			fontSize: theme.typography.pxToRem(12),
			border: '1px solid #dadde9',
		},
	})
);

const TooltipWrapper = ({ children, tooltipContent, placement, isTextOnly = true }) => {
	return (
		<HtmlTooltip
			title={<>{isTextOnly ? <Typography color="inherit">{tooltipContent}</Typography> : { tooltipContent }}</>}
			enterDelay={500}
			leaveDelay={200}
			placement={placement}
		>
			<span>{children}</span>
		</HtmlTooltip>
	);
};

export default TooltipWrapper;
