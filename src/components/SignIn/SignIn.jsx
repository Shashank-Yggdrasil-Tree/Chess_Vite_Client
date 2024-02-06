import { Box, Stack } from '@mui/material';
import React, { useCallback, useState } from 'react';
import CustomButton from '../CustomButton.jsx';
import CommonBox from '../../common/CommonBox.jsx';
import { useEffect } from 'react';
import socket from '../../socket.jsx';
import { useSelector, useDispatch } from 'react-redux';
import { setPlayers } from '../../features/gameSlice.jsx';
import StyledLinkText from '../../common/StyledLinkText.jsx';
import RegiForm from './Register/RegiForm.jsx';
import LoginForm from './Login/LoginForm.jsx';

const LoginButtons = React.memo(({ onLoginClick, onRegisterClick }) => (
	<Stack className="inset-center">
		<CustomButton handleClick={onLoginClick}>Login</CustomButton>
		<StyledLinkText onClick={onRegisterClick}>REGISTER</StyledLinkText>
	</Stack>
));

const SignIn = () => {
	const [showLogin, setShowLogin] = useState(false);
	const [showRegister, setShowRegister] = useState(false);

	const handleLoginClick = useCallback(() => {
		setShowLogin(true);
		setShowRegister(false);
	}, []);

	const handleRegisterClick = useCallback(() => {
		setShowLogin(false);
		setShowRegister(true);
	}, []);

	const handleBackClick = useCallback(() => {
		setShowLogin(false);
		setShowRegister(false);
	}, []);

	const dispatch = useDispatch();

	useEffect(() => {
		socket.on('opponentJoined', (roomData) => {
			console.log('roomData', roomData);
			dispatch(setPlayers(roomData.players));
		});
	}, []);

	return (
		<Box className={'h-48 relative'}>
			{!showLogin && !showRegister && (
				<LoginButtons onLoginClick={handleLoginClick} onRegisterClick={handleRegisterClick} />
			)}

			{
				<CommonBox visible={showLogin} handleHideBox={handleBackClick}>
					<LoginForm />
				</CommonBox>
			}

			{
				<CommonBox visible={showRegister} handleHideBox={handleBackClick}>
					<RegiForm />
				</CommonBox>
			}

			{/* {enterUsername ? (
        <CommonBox
          visible={enterUsername}
          handleHideBox={() => setEnterUsername(false)}
          // handleContinue={() => {
          //   if (!username) return;
          //   socket.emit('username', username);
          // }}
        >
          <Form />
        </CommonBox>
      ) : (
        <Box className="inset-center">
          <CustomButton handleClick={() => setEnterUsername(true)}>Login</CustomButton>
        </Box>
      )} */}
		</Box>
	);
};

export default SignIn;
