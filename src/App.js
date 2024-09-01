import './App.css';
import { RouterProvider } from 'react-router-dom';
import { router } from "./router.js"
import AuthContextProvider from './context/AuthContext.js';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <>
      <ToastContainer />
      <AuthContextProvider>
        <RouterProvider router={router} />
      </AuthContextProvider></>
  );
}

export default App;
