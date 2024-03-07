import { TextField } from '@mui/material';
import React from 'react';

const PasswordInput = ({ register, errors }) => {
	//console.log(errors);

	return (
		<div className="w-full p-2">
			<TextField
				id="password"
				type="text"
				autoComplete="off"
				className="w-full caret-white"
				color="secondary"
				label="password"
				variant="outlined"
				margin="dense"
				autoFocus
				fullWidth
				inputProps={{ maxLength: 34 }}
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
				InputLabelProps={{
					style: { color: 'gray' }, // Set the placeholder color here
				}}
				{...register('password', {
					required: { value: true, message: 'password is required' },
					maxLength: { value: 29, message: 'password is too big' },
					pattern: { value: /^[A-Za-z][A-Za-z0-9_]{7,29}$/, message: 'password is not valid or too small' },
				})}
			></TextField>
			<p className="text-fuchsia-600 font-xs">
				{errors.password?.message ? errors.password?.message : 'Valid password'}
			</p>
		</div>
	);
};

export default PasswordInput;
