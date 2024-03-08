import { useDispatch, useSelector } from 'react-redux';
import socket from '../../socket';
import { addMessage } from '../../features/chatSlice';
import { useCallback } from 'react';
import { useForm } from 'react-hook-form';
import { DevTool } from '@hookform/devtools';
import MessageSendBtn from './MessageSendBtn';
import MessageInput from './MessageInput';
import Messages from './Messages';

let renderCount = 0;

// UncontrolledForm
const Form = ({ selectedTheme }) => {
	const { username: senderUsername, room } = useSelector((state) => state.game);

	const form = useForm();
	const { register, control, handleSubmit, formState, reset } = form;
	const { isDirty, isValid } = formState;

	const dispatch = useDispatch();

	const onSubmit = useCallback(
		(data) => {
			const message = data.message;
			socket.emit(
				'message',
				{
					username: senderUsername,
					messageText: message,
					roomId: room,
				},
				(r) => {
					if (r.error) return; //console.log(r.m);
					dispatch(addMessage(r));
				}
			);
			reset();
		},
		[dispatch, senderUsername, room]
	);

	const onError = (errors) => {
		//console.log(errors);
	};

	renderCount++;

	return (
		<>
			{/* <h1>Form ({renderCount / 2})</h1> */}
			<form
				onSubmit={handleSubmit(onSubmit, onError)}
				noValidate
				className="absolute bottom-0 left-0 p-5 w-full flex align-center"
			>
				<MessageInput register={register} selectedTheme={selectedTheme} />
				<MessageSendBtn isDirty={isDirty} isValid={isValid} />
			</form>
			{/* <DevTool control={control} /> */}
		</>
	);
};

export default Form;
