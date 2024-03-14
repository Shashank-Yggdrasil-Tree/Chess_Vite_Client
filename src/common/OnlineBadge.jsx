import { styled } from '@mui/material/styles';
import Badge from '@mui/material/Badge';

export const OnlineBadge = styled(Badge)(({ theme }) => ({
	'& .MuiBadge-badge': {
		backgroundColor: '#44b700',
		borderRadius: '50%',
		height: '8px',
		width: '8px',
		minWidth: '8px',
	},
}));
