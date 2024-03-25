import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';
import { store } from './app/store';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import BreakpointProvider from './BreakpointProvider';
import theme from './theme.jsx';
import { ThemeProvider } from '@mui/material';

ReactDOM.createRoot(document.getElementById('root')).render(
	// <React.StrictMode>
	<Provider store={store}>
		<ThemeProvider theme={theme}>
			<BreakpointProvider>
				<BrowserRouter>
					<App />
					<ToastContainer></ToastContainer>
				</BrowserRouter>
			</BreakpointProvider>
		</ThemeProvider>
	</Provider>
	// </React.StrictMode>
);
