import React, { useState } from 'react';
import "./ForgotPassword.css";
import { Link } from 'react-router-dom';
import axios from 'axios';
import { BASE_URL } from '../../constants/constants';
import { toast } from 'react-toastify';

function ForgotPassword() {

  const [email, setEmail] = useState('');

  const sendMail = (email) => {
    return axios.post(`${BASE_URL}/api/auth/email-password-reset-link`, { email: email })
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // await sendMail(email);
      // toast.success("Email sent successfully, Please check your mailbox");

      toast.promise(
        () => sendMail(email),
        {
          pending: {
            render() {
              return "Email is being sent"
            },
            icon: true,
          },
          success: {
            render({ data }) {

              setEmail("");
              return `Email sent successfully`
            },
            // other options
            icon: "🟢",
          },
          error: {
            render({ data }) {
              // When the promise reject, data will contains the error
              // return <MyErrorComponent message={data.message} />
              return "Email Delivery Failed"
            }
          }
        }
      )
    } catch (err) {
      toast.error("Email Transfer Failed!!");
    }

  }

  return (

    <div className='forgot-password-page'>

      <div className='forgot-password-form-container'>
        <div>
          <h2>Reset your password</h2>
          <p>Lost your password? Please enter your email address.</p>
          <p>You will receive a link to create a new password via email.</p>
        </div>

        <form onSubmit={handleSubmit} className='forgot-password-form mb-3'>
          <div className="mb-3">
            {/* <label htmlFor="email" className="form-label">Email address</label> */}
            <input placeholder="Enter email here..." type="email" className="form-control" id="email" name="email" value={email} onChange={(e) => setEmail(e.target.value)} />
          </div>
          <button type="submit" className="btn btn-primary">Send Email</button>
        </form>

        <Link to="/login">Redirect to LogIn</Link>
      </div>









    </div>


  )
}

export default ForgotPassword