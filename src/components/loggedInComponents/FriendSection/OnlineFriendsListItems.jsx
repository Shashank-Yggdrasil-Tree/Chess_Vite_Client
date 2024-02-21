import TooltipWrapper from '../../../common/TooltipWrapper';
import FriendsFeatures from './FriendFeatures/FriendsFeatures';
import { Avatar, Box } from '@mui/material';
import { StyledBadge } from '../../../common/StyledBadge';
import { useCallback } from 'react';
import CancelButton from './FriendFeatures/CancelButton';

const OnlineFriendsListItems = ({ statusArray, animationactive }) => {
	const randomFaces = useCallback(() => {
		const faceCount = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11];

		const randomIndex = faceCount[Math.floor(Math.random() * faceCount.length)];

		const path = `/svg_faces/face_${randomIndex}.svg`;

		return path;
	}, []);

	return (
		<ul className="gap-y-2 flex flex-col w-full ">
			{statusArray.map((item) => (
				<li key={item._id}>
					<TooltipWrapper
						isTextOnly={true}
						tooltipContent={<FriendsFeatures friendsUsername={item.friendId.username} />}
						placement="right"
					>
						<Box
							className="p-2 flex items-center h-full gap-x-2 cursor-pointer w-full rounded bg-white bg-opacity-10 hover:bg-opacity-20"
							style={{
								backdropFilter: 'blur(10px)',
							}}
						>
							<StyledBadge
								overlap="circular"
								anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
								variant="dot"
								className="select-none pointer-events-none "
								animationactive={animationactive}
							>
								<Avatar
									alt={item.friendId.username}
									src={randomFaces()}
									className="select-none pointer-events-none w-8 h-8"
								/>
							</StyledBadge>
							<p className="capitalize select-none pointer-events-none text-slate-100 text-md">
								{item.friendId.username}
							</p>
						</Box>
					</TooltipWrapper>
				</li>
			))}
		</ul>
	);
};
export default OnlineFriendsListItems;
