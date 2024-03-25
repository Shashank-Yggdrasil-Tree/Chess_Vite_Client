import React from 'react';
import useOnlineOfflineStatus from '../../../../hooks/useOnlineOfflineStatus';

const OnlineOfflineStatusIndicator = () => {
	const isEffectivelyOnline = useOnlineOfflineStatus();

	return (
		<div>
			<span>You are currently: </span>
			<span
				style={{
					color: isEffectivelyOnline ? 'green' : 'red',
					fontWeight: 'bold',
				}}
			>
				{isEffectivelyOnline ? 'Online' : 'Offline'}
			</span>
		</div>
	);
};

export default OnlineOfflineStatusIndicator;
