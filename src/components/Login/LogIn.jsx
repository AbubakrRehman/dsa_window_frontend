import React, { useState } from 'react';
import axios from "axios";
import { Link, Navigate, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { BASE_URL } from '../../constants/constants';
import { toast } from 'react-toastify';
import "./LogIn.css"

function LogIn() {

  const [formValue, setFormValue] = useState({
    email: "",
    password: ""
  })

  const { dispatch, user } = useAuth();
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    setFormValue((prevFormValue) => ({ ...prevFormValue, [e.target.name]: e.target.value }))
  }

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    try {
      const result = await axios.post(`${BASE_URL}/api/auth/login`, formValue);
      localStorage.setItem("user", JSON.stringify(result.data));
      dispatch({ type: "LOGIN", payload: result.data });
      navigate("/");
    } catch (error) {
      toast.error(error.response.data.message)
    }
  }

  if (user) {
    return <Navigate to="/" />
  }

  return (
    <>
      <div className="login-page">
        <div className='login-form-container'>
          <form onSubmit={(e) => handleFormSubmit(e)}>
            <div className="mb-3">
              <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
              <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" name="email" value={formValue.email} onChange={handleInputChange} />
            </div>
            <div className="mb-3">
              <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
              <input type="password" className="form-control" id="exampleInputPassword1" name="password" value={formValue.password} onChange={handleInputChange} />
            </div>
            <div className='d-flex' >
              <Link className="ms-auto" to="/forget-password">Forgot Password?</Link>
            </div>


            <button className="btn btn-primary login-btn mt-2" type="submit">Log in</button>
          </form>

          <div className='mt-3'>
            Don't have an account?
            <span className="signup-link">
              <Link className="signup-link" to="/signup">&nbsp;Signup</Link>
            </span>
          </div>
        </div>
      </div>

    </>
  )
}

export default LogIn