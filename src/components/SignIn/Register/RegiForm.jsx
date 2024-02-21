import { useForm } from 'react-hook-form';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';

import CustomButton from '../../CustomButton';
import { useMultistepForm } from '../../../hooks/useMultiStepForm';

import UsernamInput from './UsernameInput';
import PasswordInput from './PasswordInput';
import ConfirmPasswordInput from './ConfirmPasswordInput';

import socket from '../../../socket';
import { useRegisterUserMutation } from '../../../features/auth/authApiSlice';
import { setCredentials } from '../../../features/auth/authSlice';
import { toast } from 'react-toastify';
import { TOAST_CONFIG } from '../../../constants/toast-config';

let renderCount = 0;

const RegiForm = () => {
	const [registerUser] = useRegisterUserMutation();
	const dispatch = useDispatch();

	const form = useForm({
		mode: 'onChange',
	});
	const { register, handleSubmit, formState, reset, trigger, watch } = form;
	const { errors, isValid } = formState;
	const { currentStepIndex, step, total, isFirstStep, isLastStep, goTo, next, back } = useMultistepForm([
		<UsernamInput register={register} errors={errors} isValid={isValid} />,
		<PasswordInput register={register} errors={errors} isValid={isValid} />,
		<ConfirmPasswordInput register={register} errors={errors} isValid={isValid} watch={watch} />,
	]);

	const onSubmit = async (data) => {
		if (!data) return;

		//console.log(data);
		try {
			const userData = await registerUser({
				user: data.username,
				pwd: data.password,
				cpwd: data.confirmPassword,
			}).unwrap();
			//console.log('fulfilled', userData);
			dispatch(setCredentials({ ...userData, user: data.username }));
			if (userData.userCreated) {
				socket.emit('username', data.username);
				reset();
				toast.success('🦄 Wow so easy!', TOAST_CONFIG);
				toast.success('User has been successfully created. Please Login', TOAST_CONFIG);
			}
		} catch (err) {
			if (!err?.originalStatus) {
				if (err?.status === 409) {
					toast.error('Username already exists, Please try again', TOAST_CONFIG);
				} else {
					console.error('rejected', err);
					toast.error('No Server Response', TOAST_CONFIG);
				}
			} else if (err.originalStatus?.status === 400) {
				toast.error('Missing Username or Password', TOAST_CONFIG);
			} else if (err.originalStatus?.status === 401) {
				toast.error('Unauthorized', TOAST_CONFIG);
			} else {
				toast.error('Login Failed', TOAST_CONFIG);
			}
		}
	};

	const inputParam = currentStepIndex === 0 ? 'username' : 'password';

	const handleNext = async (inputName) => {
		const isinputValid = await trigger(inputName);

		if (!isinputValid) {
			return;
		}

		return next();
	};

	const inputParamObj = {
		0: 'username',
		1: 'password',
		2: 'confirmPassword',
	};

	useEffect(() => {
		const handleKeyPress = (event) => {
			if (!isLastStep && event.key === 'Enter') {
				event.preventDefault();
				handleNext(inputParamObj[currentStepIndex]);
			}
		};

		window.addEventListener('keydown', handleKeyPress);

		return () => {
			window.removeEventListener('keydown', handleKeyPress);
		};
	}, [currentStepIndex]);

	renderCount++;

	return (
		<>
			<h1>Form ({renderCount / 2})</h1>
			<form onSubmit={handleSubmit(onSubmit)} noValidate>
				<div style={{ position: 'absolute', top: '.5rem', right: '.5rem' }}>
					{currentStepIndex + 1} / {total}
				</div>

				{step}

				{!isFirstStep && <CustomButton handleClick={back}>Back</CustomButton>}

				<CustomButton
					type={isLastStep ? 'submit' : 'button'}
					handleClick={() => handleNext(inputParam)}
					disabled={!isValid}
				>
					{isLastStep ? 'Finish' : 'Next'}
				</CustomButton>
			</form>
		</>
	);
};

export default RegiForm;
