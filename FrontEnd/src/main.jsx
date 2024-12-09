import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { ToastContainer  } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { QueryClient,QueryClientProvider } from 'react-query';

const queryClient = new QueryClient();
createRoot(document.getElementById('root')).render(
  
            
            <>
               <App/>
               <ToastContainer/>
            </>
            
       
   
)