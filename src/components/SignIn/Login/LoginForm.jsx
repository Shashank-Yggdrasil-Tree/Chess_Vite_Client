import { useForm } from 'react-hook-form';
import { useEffect } from 'react';

import { useMultistepForm } from '../../../hooks/useMultiStepForm';
import CustomButton from '../../CustomButton';
import UsernameInput from './UsernameInput';
import PasswordInput from '../Register/PasswordInput';

import socket from '../../../socket';
import { useDispatch } from 'react-redux';
import { setCredentials } from '../../../features/auth/authSlice';
import { useLoginMutation } from '../../../features/auth/authApiSlice';

import { Link, useNavigate, useLocation } from 'react-router-dom';

import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { TOAST_CONFIG } from '../../../constants/toast-config';

let renderCount = 0;

const LoginForm = () => {
	// const { setAuth, persist, setPersist } = useAuth();

	const [login, { isLoading }] = useLoginMutation();
	const dispatch = useDispatch();

	const navigate = useNavigate();
	const location = useLocation();
	const from = location.state?.from?.pathname || '/';

	const form = useForm({
		mode: 'onChange',
	});
	const { register, handleSubmit, formState, reset, trigger } = form;
	const { errors, isValid } = formState;

	const { currentStepIndex, step, total, isFirstStep, isLastStep, goTo, next, back } =
		useMultistepForm([
			<UsernameInput register={register} errors={errors} isValid={isValid} />,
			<PasswordInput register={register} errors={errors} isValid={isValid} />,
		]);

	const onSubmit = async (data) => {
		try {
			const payload = await login({ user: data.username, pwd: data.password }).unwrap();
			console.log('fulfilled', payload);
			dispatch(setCredentials({ ...payload, user: data.username }));
			socket.emit('username', data.username);
			reset();
			toast.success('🦄 Wow so easy!', TOAST_CONFIG);
			navigate(from, { replace: true });
		} catch (err) {
			if (!err?.originalStatus) {
				console.log(err);
				toast.error('No Server Response', TOAST_CONFIG);
			} else if (err.originalStatus?.status === 400) {
				toast.error('Missing Username or Password', TOAST_CONFIG);
			} else if (err.originalStatus?.status === 401) {
				toast.error('Unauthorized', TOAST_CONFIG);
			} else {
				toast.error('Login Failed', TOAST_CONFIG);
			}
		}
	};

	const handleNext = async (inputName) => {
		const isinputValid = await trigger(inputName);

		if (!isinputValid) {
			return;
		}

		console.log('isValid: ', isValid);
		return next();
	};

	const inputParamObj = {
		0: 'username',
		1: 'password',
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
					handleClick={() => handleNext(inputParamObj.currentStepIndex)}
					disabled={!isValid}
				>
					{isLastStep ? 'Finish' : 'Next'}
				</CustomButton>
			</form>
		</>
	);
};

export default LoginForm;
