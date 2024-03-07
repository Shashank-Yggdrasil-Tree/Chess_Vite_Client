import { TextField } from '@mui/material';
import React from 'react';
import { BASE_URL } from '../../../constants/constants';

const UsernameInput = ({ register, errors, isValid }) => {
	return (
		<div className="w-full p-2">
			<TextField
				id="username"
				type="text"
				autoComplete="off"
				className="w-full caret-white"
				color="secondary"
				label="Username"
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
				{...register('username', {
					required: { value: true, message: 'Username is required' },
					maxLength: { value: 34, message: 'Username is too big' },
					pattern: {
						value: /^[a-z][a-z0-9_\-]{7,34}$/,
						message: 'Not a valid Username',
					},

					// Username must start with a lowercase letter, and can only contain lowercase letters, numbers, underscores, and hyphens. It should be between 8 and 35 characters long.
					// validate: {
					//   isUsernameAvailable: async (fieldValue) => {
					//     const response = await fetch(`${BASE_URL}validate-username?username=${fieldValue}`);

					//     const data = await response.json();

					//     return data.message === 1 || 'There is no user with that username. Please sign up.';
					//   },
					// },
				})}
			></TextField>
			<p className="text-fuchsia-600 font-xs">{!isValid ? errors.username?.message : 'Valid Username'}</p>
		</div>
	);
};

export default UsernameInput;
