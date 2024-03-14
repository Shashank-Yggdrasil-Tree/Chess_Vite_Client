import { createTheme } from '@mui/material/styles';

const theme = createTheme({
	components: {
		MuiBadge: {
			styleOverrides: {
				badge: {
					backgroundColor: 'red',
					color: 'white',
					borderRadius: 4,
					padding: '0 4px',
					height: '16px',
					width: '16px',
					minWidth: '16px',
				},
			},
		},
	},
});

export default theme;
