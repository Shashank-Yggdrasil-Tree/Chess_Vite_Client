import React from 'react';

const ChallengeButton = () => {
	return (
		<Button
			className="m-w-2 p-2 w-4 min-w-10 bg-red-500 bg-opacity-10 hover:bg-opacity-40"
			variant="contained"
			style={{
				backdropFilter: 'blur(10px)',
			}}
			onClick={socket.emit('createRoom', { challenger, challengee }, (r) => {
				//console.log(r);

				dispatch(setRoom(r));
				dispatch(setOrientation('white'));
			})}
		>
			<img src="/svg_icons/battle.svg" alt="challenge" className="w-6" />
		</Button>
	);
};

export default ChallengeButton;
