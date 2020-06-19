import React from 'react';
import SignUp from './components/signUp';
import './App.css';

function App() {
  return (
    <div className="App">
        <div className="header">
            <img src={'./images/logo.png'} alt="Logo" className="logoImg" />
            <h1 className="headerText">GNW</h1>
        </div>
        <div className="mainWrapper">
            <div>
                <img src={'./images/login_illustration.png'} alt="Logo Illustration" className="logoIllustration" />
            </div>
            <div className="signUpContainer">
                <SignUp className="sign_up" />
            </div>
        </div>
        <div className="footer">
            <a target="_blank">
                © 2020 COMMUNISTE EN CALIFORNIA. ALL RIGHTS RESERVED.
            </a>
        </div>



    </div>
  );
}

export default App;
