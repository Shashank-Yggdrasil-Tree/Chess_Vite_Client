import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';
import { store } from './app/store';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import BreakpointProvider from './BreakpointProvider';

ReactDOM.createRoot(document.getElementById('root')).render(
	// <React.StrictMode>
	<Provider store={store}>
		<BreakpointProvider>
			<BrowserRouter>
				<App />
				<ToastContainer></ToastContainer>
			</BrowserRouter>
		</BreakpointProvider>
	</Provider>
	// </React.StrictMode>
);
