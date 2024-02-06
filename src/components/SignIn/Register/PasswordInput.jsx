import { TextField } from '@mui/material';
import React from 'react';

const PasswordInput = ({ register, errors, isValid }) => {
	return (
		<div className="w-full p-2">
			<TextField
				id="password"
				type="password"
				label="password"
				autoComplete="off"
				className="w-full caret-white"
				color="secondary"
				variant="outlined"
				margin="dense"
				autoFocus
				fullWidth
				sx={{
					'& .MuiOutlinedInput-root': {
						'& fieldset': {
							borderColor: 'gray', // Default outline color
						},
						'&:hover fieldset': {
							borderColor: 'white', // Outline color on hover
						},
					},
					input: { color: 'white' },
				}}
				{...register('password', {
					required: { value: true, message: 'password is required' },
					maxLength: { value: 29, message: 'password is too big' },
					pattern: {
						value: /^[A-Za-z][A-Za-z0-9_]{7,29}$/,
						message: 'password is not valid or too small',
					},
				})}
			></TextField>
			<p className="text-red font-[12px]">{!isValid ? errors.password?.message : 'Valid password'}</p>
		</div>
	);
};

export default PasswordInput;
