import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Navbar } from './components/navbar';
import { Toaster } from 'react-hot-toast';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
        <BrowserRouter>
            <Toaster />
            <Navbar />
            <Routes>
                <Route path='/*' element={<App />} />
            </Routes>
        </BrowserRouter>
    </React.StrictMode>
);
