import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import axios from 'axios';
import { Navigate, useNavigate } from 'react-router-dom';

function Signup() {

  const [formValue, setFormValue] = useState({
    email: "",
    password: ""
  })

  const {dispatch, user} = useAuth();
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    setFormValue((prevFormValue) => ({ ...prevFormValue, [e.target.name]: e.target.value }))
  }

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    try {
      const result = await axios.post("/api/auth/signup", formValue);
      localStorage.setItem("user", JSON.stringify(result.data));
      dispatch({ type: "LOGIN", payload: result.data });
      navigate("/");
    } catch (error) {
      console.log("error", error);
    }

  }

  if (user) {
    return <Navigate to="/" />
  }

  return (
    <form onSubmit={handleFormSubmit} className='container'>
      <div className="mb-3">
        <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
        <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" name="email" value={formValue.email} onChange={handleInputChange} />
      </div>
      <div className="mb-3">
        <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
        <input type="password" className="form-control" id="exampleInputPassword1" name="password" value={formValue.password} onChange={handleInputChange} />
      </div>

      <button type="submit" className="btn btn-primary">Sign up</button>
    </form>
  )
}

export default Signup