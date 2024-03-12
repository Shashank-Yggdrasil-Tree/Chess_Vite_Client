import { Box, Button } from '@mui/material';
import CancelButton from './CancelButton';
import TooltipWrapper from '../../../../common/TooltipWrapper';
import ChallengeButton from '../../Game/ChallengeButton';

const FriendsFeatures = ({ friendsUsername }) => {
	return (
		<>
			<Box className="gap-x-2 flex p-2 bg-[#21201d]">
				<CancelButton helperText="Unfriend" bgColor="bg-red-500" friendsUsername={friendsUsername} />
				<ChallengeButton
					challengee={friendsUsername}
					bgColourAndOpacity="bg-green-400 bg-opacity-40 hover:bg-opacity-100"
				/>
			</Box>
		</>
	);
};

export default FriendsFeatures;
