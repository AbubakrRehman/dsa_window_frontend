import React, { useRef, useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import axios from 'axios';
import { Link, Navigate } from 'react-router-dom';
import { BASE_URL } from '../../constants/constants';

import "./Signup.css";
import { toast } from 'react-toastify';

function Signup() {

  const toastId = useRef(null);

  const [formValue, setFormValue] = useState({
    email: "",
    password: ""
  })

  const { dispatch, user } = useAuth();

  const handleInputChange = (e) => {
    setFormValue((prevFormValue) => ({ ...prevFormValue, [e.target.name]: e.target.value }))
  }

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    try {

      toastId.current = toast("", { autoClose: false });
      toast.update(toastId.current, {
        render: "Signup in process",
        type: "success",
        isLoading: true,
        autoClose: false,
      })

      const result = await axios.post(`${BASE_URL}/api/auth/signup`, formValue);

      toast.update(toastId.current, {
        render: "A link is send to your email. Pls verify",
        type: "success",
        isLoading: false,
        autoClose: false
      })

      // localStorage.setItem("user", JSON.stringify(result.data));
      // dispatch({ type: "SIGNUP", payload: result.data });
      // navigate("/");
    } catch (error) {
      toast.update(toastId.current, {
        render: error.response.data.message,
        type: "error",
        isLoading: false,
        autoClose: 1000 
      })
    }

  }

  if (user) {
    return <Navigate to="/" />
  }

  return (
    <div className='signup-page'>
      <div className='signup-form-container'>
        <form onSubmit={handleFormSubmit} className='container'>
          <div className="mb-3">
            <label htmlFor="email" className="form-label">Email address</label>
            <input type="email" className="form-control" id="email" aria-describedby="emailHelp" name="email" value={formValue.email} onChange={handleInputChange} />
          </div>
          <div className="mb-3">
            <label htmlFor="password" className="form-label">Password</label>
            <input type="password" className="form-control" id="password" name="password" value={formValue.password} onChange={handleInputChange} />
          </div>

          <button type="submit" className="btn btn-primary signup-btn mt-2">Sign up</button>

          
        </form>

        <div className='mt-3'>
          Already have an account?
          <Link className="signup-link" to="/login">&nbsp;Login</Link>
        </div>
      </div>
    </div>

  )
}

export default Signup