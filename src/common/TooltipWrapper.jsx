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

const TooltipWrapper = ({
	children,
	tooltipContent,
	placement,
	isTextOnly = true,
	enterDelay = 500,
	leaveDelay = 200,
	isHidden = false,
}) => {
	return (
		<HtmlTooltip
			title={<>{isTextOnly ? <Typography color="inherit">{tooltipContent}</Typography> : tooltipContent}</>}
			enterDelay={enterDelay}
			leaveDelay={leaveDelay}
			placement={placement}
			className={isHidden ? 'hidden' : null}
		>
			<span>{children}</span>
		</HtmlTooltip>
	);
};

export default TooltipWrapper;
