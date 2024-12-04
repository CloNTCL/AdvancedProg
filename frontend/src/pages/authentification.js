import React, { useState } from "react";
import { Link, Navigate } from "react-router-dom";
import "../styles/authentification.css";
import logo from '../assets/images/Logo_Efrei_2022.svg.png';

const Authentification = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [redirectPath, setRedirectPath] = useState(''); // Détermine la redirection

  const handlePress = async (e) => {
    e.preventDefault(); // Empêche le rechargement de la page
    setErrorMessage('');

    if (!email || !password) {
      setErrorMessage('Please, fill all fields!');
      return;
    }

    try {
      // Identifier le rôle à partir de l'email
      let apiEndpoint = '';
      if (email.includes('student')) {
        apiEndpoint = 'http://localhost:3000/api/v1/studentUsers/studentLogin';
      } else if (email.includes('admin')) {
        apiEndpoint = 'http://localhost:3000/api/v1/adminUsers/adminLogin';
      } else if (email.includes('teacher')) {
        apiEndpoint = 'http://localhost:3000/api/v1/teacherUsers/teacherLogin';
      } else {
        setErrorMessage('Invalid email format!');
        return;
      }

      // Appel à l'API
      const response = await fetch(apiEndpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      if (response.ok) {
        const responseData = await response.json();
        const token = responseData.token;
        const userId = responseData.user.id;
        const role = responseData.user.role;
        const fullName = responseData.user.fullName;
        const email = responseData.user.email;

        // Sauvegarder le token et l'id dans le localStorage
        localStorage.setItem('token', token);
        localStorage.setItem('userId', userId);
        localStorage.setItem('role', role);
        localStorage.setItem('fullName', fullName);
        localStorage.setItem('email', email);

        // Définir la redirection en fonction du rôle
        if (role === 'student') {
          setRedirectPath('/student');
        } else if (role === 'admin') {
          setRedirectPath('/admin');
        } else if (role === 'teacher') {
          setRedirectPath('/teacher');
        }
      } else if(response.status == 404){
        setErrorMessage('Mail or password incorrect!');
      }else {
        const errorData = await response.json();
        setErrorMessage(errorData.message || 'Login failed');
      }
    } catch (error) {
      console.error('Error:', error);
      setErrorMessage('An error occurred. Please try again.');
    }
  };

  // Redirection si l'utilisateur est connecté
  if (redirectPath) {
    return <Navigate to={redirectPath} />;
  }

  return (
    <div className="auth-container">
      <div className="auth-box">
       <div className="school-logoC">
        <img src={logo} alt="School Logo" className="school-logo" />
       </div>
        <h2 className="auth-title">Login</h2>
        <form onSubmit={handlePress}>
          <div className="auth-field">
            <label>Email</label>
            <input
              type="text"
              placeholder="Enter your email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="auth-field">
            <label>Password</label>
            <input
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          {errorMessage && <p className="error-message">{errorMessage}</p>}
          <button className="auth-button" type="submit">
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default Authentification;
