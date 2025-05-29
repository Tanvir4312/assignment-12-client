import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { ToastContainer } from 'react-toastify';
import {

  RouterProvider,
} from "react-router-dom";
import router from './Routes/router.jsx';
import AuthProvider from './Provider/AuthProvider.jsx';

import {
  QueryClient,
  QueryClientProvider,

} from "@tanstack/react-query";

// Create a client
const queryClient = new QueryClient();




createRoot(document.getElementById('root')).render(
  <StrictMode>
    <div className='max-w-6xl mx-auto'>
      <AuthProvider>
        <QueryClientProvider client={queryClient}>
          <RouterProvider router={router} />
        </QueryClientProvider>
        <ToastContainer />
      </AuthProvider>
    </div>
  </StrictMode>,
)
