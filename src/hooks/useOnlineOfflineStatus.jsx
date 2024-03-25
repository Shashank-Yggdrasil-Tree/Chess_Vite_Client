import { useEffect, useState } from 'react';

const useOnlineOfflineStatus = () => {
	const [isOnline, setIsOnline] = useState(navigator.onLine);
	const [isVisible, setIsVisible] = useState(true);

	useEffect(() => {
		const handleOnline = () => setIsOnline(true);
		const handleOffline = () => setIsOnline(false);
		const handleVisibilityChange = () => setIsVisible(document.visibilityState === 'visible');

		window.addEventListener('online', handleOnline);
		window.addEventListener('offline', handleOffline);
		document.addEventListener('visibilitychange', handleVisibilityChange);

		return () => {
			window.removeEventListener('online', handleOnline);
			window.removeEventListener('offline', handleOffline);
			document.removeEventListener('visibilitychange', handleVisibilityChange);
		};
	}, []);

	const isEffectivelyOnline = isOnline && isVisible;

	return isEffectivelyOnline;
};

export default useOnlineOfflineStatus;
