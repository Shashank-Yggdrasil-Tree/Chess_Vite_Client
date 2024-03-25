import React, { useEffect, useState } from 'react';
import OnlineFriendsList from './OnlineFriendsList';
import socket from '../../../socket';
import { useSelector } from 'react-redux';
import { selectCurrentFriends } from '../../../features/friendStatusSlice';
import { useGetAllFriendsStatusQuery } from '../../../features/players/playersApiSlice';
import { selectCurrentUser } from '../../../features/auth/authSlice';
import useOnlineOfflineStatus from '../../../hooks/useOnlineOfflineStatus';

const FriendSection = () => {
	const isOnline = useOnlineOfflineStatus();
	const totalFriends = useSelector(selectCurrentFriends);
	const currentFriends = totalFriends.reduce((acc, curr) => {
		if (curr.friendId.username) {
			acc.push({ username: curr.friendId.username });
		}
		return acc;
	}, []);
	const localSaveData = JSON.parse(localStorage.getItem('onlineFriends')) || [];
	const [onlineFriends, setOnlineFriends] = useState(localSaveData || []);
	const [offlineFriends, setOfflineFriends] = useState([]);
	const username = useSelector(selectCurrentUser);
	const { data } = useGetAllFriendsStatusQuery({ username }); // important to get the data.

	useEffect(() => {
		if (!isOnline) {
			socket.emit('online', username);
		} else {
			socket.emit('offline', username);
		}
	}, [isOnline, username]);

	useEffect(() => {
		const handleFriendOnlineStatus = ({ username, status }) => {
			setOnlineFriends((prevOnlineFriends) => {
				const duplicateUser = prevOnlineFriends.find((user) => user.username === username);
				const findLocalUser = localSaveData.find((user) => user.username === username);

				if (status === 'offline' && findLocalUser) {
					const updatedFriendsData = localSaveData.filter((obj) => obj.username !== username);
					localStorage.setItem('onlineFriends', JSON.stringify(updatedFriendsData));
					return updatedFriendsData;
				}

				if (findLocalUser) {
					return localSaveData;
				}

				if (!duplicateUser) {
					localStorage.setItem('onlineFriends', JSON.stringify([...prevOnlineFriends, { username, status }]));
					return [...prevOnlineFriends, { username, status }];
				}

				return localSaveData;
			});
		};

		socket.on('friendOnlineStatus', handleFriendOnlineStatus);
	}, []);

	useEffect(() => {
		setOfflineFriends(
			currentFriends.filter(
				(friend) => !onlineFriends.find((onlineFriend) => onlineFriend.username === friend.username)
			)
		);
	}, [onlineFriends, totalFriends]);

	return <OnlineFriendsList onlineFriends={onlineFriends} offlineFriends={offlineFriends} />;
};

export default FriendSection;
