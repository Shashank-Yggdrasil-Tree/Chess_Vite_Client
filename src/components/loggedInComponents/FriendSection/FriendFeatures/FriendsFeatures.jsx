import { Box, Button } from '@mui/material';
import CancelButton from './CancelButton';
import TooltipWrapper from '../../../../common/TooltipWrapper';

const FriendsFeatures = ({ friendsUsername }) => {
	return (
		<>
			<Box className="gap-x-2 flex">
				<CancelButton helperText="Unfriend" bgColor="bg-red-500" friendsUsername={friendsUsername} />
				<TooltipWrapper tooltipContent="Challenge" placement="top">
					<Button
						className="m-w-2 p-2 w-4 min-w-10 bg-red-500 bg-opacity-10 hover:bg-opacity-40"
						variant="contained"
						style={{
							backdropFilter: 'blur(10px)',
						}}
					>
						<img src="/svg_icons/battle.svg" alt="challenge" className="w-6" />
					</Button>
				</TooltipWrapper>
			</Box>
		</>
	);
};

export default FriendsFeatures;
