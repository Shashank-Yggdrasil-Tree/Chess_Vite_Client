import { LoadingButton } from '@mui/lab';
import RefreshIcon from '@mui/icons-material/Refresh';
import TooltipWrapper from '../../../../common/TooltipWrapper';

const RefetchButton = (props, { tooltipContent = 'Refresh', placement = 'left' }) => {
	const { classNames, variants, styles, loading, handleOnClick } = props;
	return (
		<>
			<TooltipWrapper tooltipContent={tooltipContent} placement={placement}>
				<LoadingButton
					className={classNames}
					variant={variants}
					style={styles}
					loading={loading}
					onClick={handleOnClick}
				>
					<RefreshIcon />
				</LoadingButton>
			</TooltipWrapper>
		</>
	);
};

export default RefetchButton;
