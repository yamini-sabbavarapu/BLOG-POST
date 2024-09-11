// import React, { useState, useEffect, useContext } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { API } from '../../service/api';
// import { DataContext } from '../../context/DataProvider';
// import './login.css';

// const Login = ({ isUserAuthenticated }) => {
//     const [login, setLogin] = useState({ username: '', password: '' });
//     const [signup, setSignup] = useState({ name: '', username: '', password: '' });
//     const [error, showError] = useState('');
//     const [account, toggleAccount] = useState('login');

//     const navigate = useNavigate();
//     const { setAccount } = useContext(DataContext);

//     useEffect(() => {
//         showError(false);
//     }, [login, signup]);

//     const onLoginChange = (e) => {
//         setLogin({ ...login, [e.target.name]: e.target.value });
//     };

//     const onSignupChange = (e) => {
//         setSignup({ ...signup, [e.target.name]: e.target.value });
//     };

//     const loginUser = async (e) => {
//         e.preventDefault();
//         console.log("Login request payload:", login);
//         try {
//             let response = await API.userLogin(login);
//             console.log("Login response:", response);
//             if (response.isSuccess) {
//                 showError('');
//                 sessionStorage.setItem('accessToken', `Bearer ${response.data.accessToken}`);
//                 sessionStorage.setItem('refreshToken', `Bearer ${response.data.refreshToken}`);
//                 setAccount({ name: response.data.name, username: response.data.username });
//                 isUserAuthenticated(true);
//                 setLogin({ username: '', password: '' });
//                 navigate('/');
//             } else {
//                 showError('Something went wrong! Please try again later.');
//             }
//         } catch (error) {
//             console.error("Login Error:", error);
//             showError('Failed to log in. Please check your credentials and try again.');
//         }
//     };

//     const signupUser = async (e) => {
//         e.preventDefault();
//         console.log("Signup request payload:", signup);
//         try {
//             let response = await API.userSignup(signup);
//             console.log("Signup response:", response);
//             if (response.isSuccess) {
//                 showError('');
//                 setSignup({ name: '', username: '', password: '' });
//                 toggleAccount('login');
//             } else {
//                 showError('Something went wrong! Please try again later.');
//             }
//         } catch (error) {
//             console.error("Signup Error:", error);
//             showError('Failed to sign up. Please try again later.');
//         }
//     };

//     const toggleSignup = () => {
//         account === 'signup' ? toggleAccount('login') : toggleAccount('signup');
//     };

//     return (
//         <div className='boxy'>
//             <div className="main">
//                 <input type="checkbox" id="chk" aria-hidden="true" checked={account === 'signup'} onChange={toggleSignup} />
//                 <div className="signup">
//                     <form onSubmit={signupUser}>
//                         <label htmlFor="chk" aria-hidden="true">Sign up</label>
//                         <input type="text" name="name" placeholder="Name" required value={signup.name} onChange={onSignupChange} />
//                         <input type="text" name="username" placeholder="Username" required value={signup.username} onChange={onSignupChange} />
//                         <input type="password" name="password" placeholder="Password" required value={signup.password} onChange={onSignupChange} />
//                         <button type="submit">Sign up</button>
//                     </form>
//                 </div>
//                 <div className="login">
//                     <form onSubmit={loginUser}>
//                         <label htmlFor="chk" aria-hidden="true">Login</label>
//                         <input type="text" name="username" placeholder="Username" required value={login.username} onChange={onLoginChange} />
//                         <input type="password" name="password" placeholder="Password" required value={login.password} onChange={onLoginChange} />
//                         <button type="submit">Login</button>
//                     </form>
//                 </div>
//                 {error && <p className="error">{error}</p>}
//             </div>
//         </div>
//     );
// };

// export default Login;
import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { API } from '../../service/api';
import { DataContext } from '../../context/DataProvider';
import './login.css';

const Login = ({ isUserAuthenticated }) => {
    const [login, setLogin] = useState({ username: '', password: '' });
    const [signup, setSignup] = useState({ name: '', username: '', password: '' });
    const [error, showError] = useState('');
    const [account, toggleAccount] = useState('login');

    const navigate = useNavigate();
    const { setAccount } = useContext(DataContext);

    useEffect(() => {
        showError(''); // Clear error when inputs change
    }, [login, signup]);

    const onLoginChange = (e) => {
        setLogin({ ...login, [e.target.name]: e.target.value });
    };

    const onSignupChange = (e) => {
        setSignup({ ...signup, [e.target.name]: e.target.value });
    };

    const loginUser = async (e) => {
        e.preventDefault();
        try {
            let response = await API.userLogin(login);
            if (response.isSuccess) {
                showError('');
                sessionStorage.setItem('accessToken', `Bearer ${response.data.accessToken}`);
                sessionStorage.setItem('refreshToken', `Bearer ${response.data.refreshToken}`);
                setAccount({ name: response.data.name, username: response.data.username });
                isUserAuthenticated(true);
                setLogin({ username: '', password: '' });
                navigate('/');
            } else {
                showError('Something went wrong! Please try again later.');
            }
        } catch (error) {
            showError('Failed to log in. Please check your credentials and try again.');
        }
    };

    const signupUser = async (e) => {
        e.preventDefault();
        try {
            let response = await API.userSignup(signup);
            if (response.isSuccess) {
                showError('Signup successful! You can now log in.');
                setSignup({ name: '', username: '', password: '' });
                toggleAccount('login');
            } else {
                showError('Something went wrong! Please try again later.');
            }
        } catch (error) {
            showError('Failed to sign up. Please try again later.');
        }
    };

    const toggleSignup = () => {
        account === 'signup' ? toggleAccount('login') : toggleAccount('signup');
    };

    return (
        <div className='boxy'>
            <div className="main">
                <input type="checkbox" id="chk" aria-hidden="true" checked={account === 'signup'} onChange={toggleSignup} />
                <div className="signup">
                    <form onSubmit={signupUser}>
                        <label htmlFor="chk" aria-hidden="true">Sign up</label>
                        <input type="text" name="name" placeholder="Name" required value={signup.name} onChange={onSignupChange} />
                        <input type="text" name="username" placeholder="Username" required value={signup.username} onChange={onSignupChange} />
                        <input type="password" name="password" placeholder="Password" required value={signup.password} onChange={onSignupChange} />
                        <button type="submit">Sign up</button>
                    </form>
                </div>
                <div className="login">
                    <form onSubmit={loginUser}>
                        <label htmlFor="chk" aria-hidden="true">Login</label>
                        <input type="text" name="username" placeholder="Username" required value={login.username} onChange={onLoginChange} />
                        <input type="password" name="password" placeholder="Password" required value={login.password} onChange={onLoginChange} />
                        <button type="submit">Login</button>
                    </form>
                </div>
                {error && <p className="error">{error}</p>} {/* Error message displayed here */}
            </div>
        </div>
    );
};

export default Login;
