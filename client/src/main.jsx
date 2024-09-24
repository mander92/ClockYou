import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext.jsx';
import App from './App.jsx';
import { Toaster } from 'react-hot-toast';

createRoot(document.getElementById('root')).render(
    <StrictMode>
        <BrowserRouter>
            <AuthProvider>
                <App />
                <Toaster
                    position='top-center'
                    toastOptions={{
                        duration: 7000,
                        style: {
                            backgroundColor: 'var(--cerulean)',
                            color: 'var(--white-color)',
                            borderRadius: '100px',
                            textAlign: 'center',
                        },
                    }}
                />
            </AuthProvider>
        </BrowserRouter>
    </StrictMode>
);
