import { Box, Button } from '@mui/material';
import CancelButton from './CancelButton';
import TooltipWrapper from '../../../../common/TooltipWrapper';
import ChallengeButton from '../../Game/ChallengeButton';
import { useContext } from 'react';
import { BreakpointContext } from '../../../../BreakpointProvider';

const FriendsFeatures = ({ friendsUsername }) => {
	const { lgBreakpoint } = useContext(BreakpointContext);
	return (
		<>
			<Box className={`gap-x-2 flex ${lgBreakpoint ? 'bg-[#21201d] p-2' : null}`}>
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
