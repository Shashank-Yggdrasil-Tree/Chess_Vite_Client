import { useCallback, useEffect, useState } from 'react';
import SkeletonLoading from '../../../../common/SkeletonLoading';
import FriendRequestButtons from './FriendRequestButtons';
import { Avatar, Box, MenuItem } from '@mui/material';

const FriendRequestListItem = ({ status = '', altMsg = '', friendsStatusData, isLoading }) => {
	const [showLoading, setShowLoading] = useState(true);

	useEffect(() => {
		const loadingTimeout = setTimeout(() => {
			setShowLoading(false);
		}, 1000); // Adjust the timeout value as needed (in milliseconds)

		return () => clearTimeout(loadingTimeout);
	}, [isLoading]);

	const statusArray = friendsStatusData?.length > 0 ? friendsStatusData : [];

	const randomFaces = useCallback(() => {
		const faceCount = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11];

		const randomIndex = faceCount[Math.floor(Math.random() * faceCount.length)];

		const path = `/svg_faces/face_${randomIndex}.svg`;

		return path;
	}, []);

	console.log(friendsStatusData);

	const content = (
		<>
			{statusArray ? (
				<ul>
					{statusArray.find((item) => item?.status === status) ? (
						statusArray.map((item) =>
							item?.status === status ? (
								<li key={item._id} className="text-[#c3c2c1]">
									<MenuItem className="gap-12">
										<Box className="gap-2 flex items-center">
											<Avatar alt="Remy Sharp" src={randomFaces()} />
											<p className="user-username-component capitalize">{item?.friendId?.username}</p>
										</Box>
										<Box className="gap-2 flex">
											<FriendRequestButtons status={status} friendsUsername={item?.friendId?.username} />
										</Box>
									</MenuItem>
								</li>
							) : null
						)
					) : (
						<p className="text-white px-4">{altMsg}</p>
					)}
				</ul>
			) : (
				<p className="text-white px-4">{altMsg}</p>
			)}
		</>
	);

	return <>{!showLoading ? content : <SkeletonLoading rw={280} />}</>;
};

export default FriendRequestListItem;
