import AcceptButton from '../FriendFeatures/AcceptButton';
import CancelButton from '../FriendFeatures/CancelButton';

const FriendRequestButtons = ({ status, friendsUsername }) => {
	return (
		<>
			<AcceptButton status={status} friendsUsername={friendsUsername} />
			<CancelButton friendsUsername={friendsUsername} />
		</>
	);
};

export default FriendRequestButtons;
