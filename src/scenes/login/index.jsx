import React, { useState } from 'react';
import Axios from 'axios';
import { useNavigate } from 'react-router-dom';


const LOGIN_API_URL = ' http://127.0.0.1:8000/login/';
export default function LoginPage({ handleLogin }) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [loginError, setLoginError] = useState('');

    const navigate = useNavigate();

    // const handleLogin = async (event) => {
    //     event.preventDefault();
    //     const credentials = { username, password };

    //     try {
    //         const response = await Axios.post(LOGIN_API_URL, credentials, {
    //             headers: {
    //                 'Content-Type': 'application/json',
    //             },
    //         });

    //         const { token, user_info: { is_superuser } } = response.data;

    //         if (is_superuser) {
    //             localStorage.setItem('authToken', token);
    //             console.log('Login successful', response.data);
    //             navigate('/');
    //             Axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    //         } else {
    //             console.error('Access Denied: User is not a superuser.');
    //             setLoginError('Access denied. You must be a superuser to access this page.');
    //         }

    //     } catch (error) {
    //         console.error('Login error:', error);
    //         setLoginError(`Failed to login. ${error.response.data.non_field_errors}`);
    //     }
    // };
    const handleLoginSubmit = async (event) => {
        event.preventDefault();
        const credentials = { username, password };

        try {
            const response = await Axios.post(LOGIN_API_URL, credentials, {
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            // const { token } = response.data
            // handleLogin(token);
            // console.log('Login successful', response.data);
            // navigate('/');

            const { token, user_info: { is_superuser, is_staff } } = response.data;

            if (is_superuser) {
                handleLogin(token);
                console.log('Login successful', response.data);
                navigate('/');
            } else if (is_staff) {
                handleLogin(token);
                console.log('Login successful', response.data);
                navigate('/');
            } else {
                console.error('Access Denied: User is not a superuser/staff.');
                setLoginError("Access denied. You don't have enough permission to access this page.");
            }

        } catch (error) {
            console.error('Login error:', error);
            setLoginError(`Failed to login. ${error.response?.data?.non_field_errors || ''}`);
        }
    };

    const handleForgotPassword = () => {
        // Logic to handle forgot password
        console.log('Forgot password clicked');
    };

    return (
        <>
            <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
                <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                    <h1 className="text-center text-2xl font-bold leading-9 tracking-tight text-blue-500">
                        Stallion Notes ADMIN
                    </h1>
                </div>
                {loginError && <p className="text-red-500 text-center mt-2">{loginError}</p>}

                <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                    <form className="space-y-2" onSubmit={handleLoginSubmit}>
                        <div>
                            <label className="block text-sm font-medium leading-6 text-gray-400">
                                Username
                            </label>
                            <div className="mt-2">
                                <input
                                    id="username"
                                    name="username"
                                    type="username"
                                    autoComplete="username"
                                    required
                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 pl-4"
                                    onChange={(e) => setUsername(e.target.value)}
                                />
                            </div>
                        </div>

                        <div>
                            <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-400">
                                Password
                            </label>
                            <div className="mt-2">
                                <input
                                    id="password"
                                    name="password"
                                    type="password"
                                    autoComplete="current-password"
                                    required
                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 pl-4"
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                            </div>
                        </div>

                        <div className=''>
                            <button
                                type="submit"
                                className="mt-10 flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                            >
                                Sign in
                            </button>
                        </div>
                    </form>

                </div>
            </div>
        </>
    );
}
