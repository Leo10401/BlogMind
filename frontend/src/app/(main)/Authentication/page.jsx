'use client'
import axios from 'axios';
import { useFormik } from 'formik';
import React, { useState, useEffect } from 'react';
import toast from 'react-hot-toast';
import * as Yup from 'yup';
import "./style.css";
import { useRouter } from 'next/navigation';

const SignupSchema = Yup.object().shape({
  name: Yup.string().required('Name is required')
    .min(3, 'Name must be atleast 3 characters'),
  email: Yup.string()
    .required('Email is required')
    .email('Email is invalid'),
  password: Yup.string().required('Password is required')
    .matches(/[A-Z]/, 'Password must contain atleast one uppercase letter')
    .matches(/[a-z]/, 'Password must contain atleast one lowercase letter')
    .matches(/[0-9]/, 'Password must contain atleast one number')
    .matches(/\W/, 'Password must contain atleast one special character')
});

const App = () => {
  const [isActive, setIsActive] = useState(false);
  const [passwordHidden, setPasswordHidden] = useState(true);

  const router = useRouter();

  const signupForm = useFormik({
    initialValues: {
      name: '',
      email: '',
      password: ''
    },
    onSubmit: (values, { resetForm }) => {
      console.log(values);

      axios.post('http://localhost:5000/user/add', values)
        .then((result) => {
          toast.success('User  created successfully');
        }).catch((err) => {
          console.log(err);
          toast.error(err?.response?.data?.message || 'Something went wrong');
        });
      resetForm();
    },
    validationSchema: SignupSchema
  });

  useEffect(() => {
    const signUpButton = document.getElementById('signUp');
    const signInButton = document.getElementById('signIn');
    const container = document.getElementById('container')

    signUpButton.addEventListener('click', () => {
      setIsActive(true);
    });

    signInButton.addEventListener('click', () => {
      setIsActive(false);
    });

    return () => {
      signUpButton.removeEventListener('click', () => {
        setIsActive(true);
      });

      signInButton.removeEventListener('click', () => {
        setIsActive(false);
      });
    }
  }, []);

  //login
  const LoginSchema = Yup.object().shape({
    email: Yup.string()
      .email('Invalid email')
      .required('Email is required'),
    password: Yup.string()
      .min(8, 'too short - should be 8 chars minimum')
      .matches(/[a-z]/, 'password must contain at least one lowercase letter')
      .matches(/[A-Z]/, 'password must contain at least one uppercase letter')
      .matches(/\d/, 'password must contain at least one number')
      .required('Password is required')
  });

  const loginForm = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    onSubmit: (values, { resetForm }) => {
      console.log(values);

      axios.post('http://localhost:5000/user/authenticate', values)
        .then((result) => {
          toast.success('Login Success');
          console.log(result.data);
          localStorage.setItem('token', result.data.token);
          router.push('/');
        }).catch((err) => {
          toast.error('Login Failed');
          console.log(err);
        });
      resetForm();
    },
    validationSchema: LoginSchema
  });

  return (
    <div className='mybody'>
      <div className={`container ${isActive ? "right-panel-active" : ""}`} id="container">
        <div className="form-container sign-up-container">
          <form onSubmit={signupForm.handleSubmit}>
            <h1>Create Account</h1>
            <div className="social-container">
              <a href="#" className="social">
                <i className="fab fa-facebook-f" />
              </a>
              <a href="#" className="social">
                <i className="fab fa-google-plus-g" />
              </a>
              <a href="#" className="social">
                <i className="fab fa-linkedin-in" />
              </a>
            </div>
            <span>or use your email for registration</span>
            <div>
              <input type="text" placeholder="Name" id="name"
                onChange={signupForm.handleChange}
                value={signupForm.values.name}
              />
              {signupForm.touched.name && (
                <p className='text-sm text-red-500'>{signupForm.errors.name}</p>
              )}
            </div>
            <div>
              <input type="email" placeholder="Email" id="email"
                onChange={signupForm.handleChange}
                value={signupForm.values.email}
              />
              {signupForm.touched.email && (
                <p className='text-sm text-red-500'>{signupForm.errors.email}</p>
              )}
            </div>
            <div>
              <input
                type={passwordHidden ? 'password' : 'text'}
                placeholder="Password"
                id="password"
                onChange={signupForm.handleChange}
                value={signupForm.values.password}
              />
              <button type='button' onClick={() => setPasswordHidden(!passwordHidden)}>
                {passwordHidden ? 'Show' : 'Hide'}
              </button>
              {signupForm.touched.password && (
                <p className='text-sm text-red-500'>{signupForm.errors.password}</p>
              )}

            </div>

            <button type="submit">Sign Up</button>
          </form>
        </div>

        <div className="form-container sign-in-container">
          <form onSubmit={loginForm.handleSubmit} >

            <h1>Sign in</h1>
            <div className="social-container">
              <a href="#" className="social">
                <i className="fab fa-facebook-f" />
              </a>
              <a href="#" className="social">
                <i className="fab fa-google-plus-g" />
              </a>
              <a href="#" className="social">
                <i className="fab fa-linkedin-in" />
              </a>
            </div>
            <span>or use your account</span>
            <div>
              <input type="email" placeholder="Email"
                name='email'
                onChange={loginForm.handleChange}
                value={loginForm.values.email} />
              {loginForm.errors.email && loginForm.touched.email ? (
                <div className='text-red-500 text-sm'>{loginForm.errors.email}</div>
              ) : null}
            </div>
            <div>
              <input type="password" placeholder="Password" name='password'
                onChange={loginForm.handleChange}
                value={loginForm.values.password} />
              {loginForm.errors.password && loginForm.touched.password ? (
                <div className='text-red-500 text-sm'>{loginForm.errors.password}</div>
              ) : null}

            </div>
            <a href="#">Forgot your password?</a>

            <button type='submit'>Sign In</button>
          </form>
        </div>
        <div className="overlay-container">
          <div className="overlay">
            <div className="overlay-panel overlay-left">
              <h1>Welcome Back!</h1>
              <p>To keep connected with us please login with your personal info</p>
              <button className="ghost" id="signIn" onClick={() => setIsActive(false)}>
                Sign In
              </button>
            </div>
            <div className="overlay-panel overlay-right">
              <h1>Hello, Friend!</h1>
              <p>Enter your personal details and start journey with us</p>
              <button className="ghost" id="signUp" onClick={() => setIsActive(true)}>
                Sign Up
              </button>
            </div>
          </div>
        </div>
      </div>


    </div>
  );
}

export default App;