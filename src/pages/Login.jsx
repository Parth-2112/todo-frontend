import React, {useContext, useState} from 'react'
import { Link, Navigate } from 'react-router-dom'
import { Context, serverUrl } from '../main';
import toast from 'react-hot-toast';
import axios from 'axios';

const Login = () => {

    const {isAuthenticated, setIsAuthenticated, loading, setLoading} = useContext(Context);
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    
    const submitHandler = async(e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const {data} = await axios.post(`${serverUrl}/users/login`, 
                {
                    email,
                    password
                },
                {
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    withCredentials: true, 
                });
            toast.success(data.message);
            setIsAuthenticated(true);
            setLoading(false);    
        } catch (error) {
            toast.error(error.response?.data?.message || 'Login failed');
            // console.log('Login failed:', error);
            setIsAuthenticated(false);
            setLoading(false);
        }
    }    


    if(isAuthenticated){
        return (
            <Navigate to={'/'}/>
        );
    }
 
    return (
        <div className='login'>
            <section>
                <form onSubmit={submitHandler}>
                    <input 
                        value={email}
                        type="email" 
                        placeholder='Email'
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />

                    <input
                        value={password} 
                        type="password" 
                        placeholder='Password' 
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                    
                    <button disabled={loading} type='submit'>Login</button>
                    <h4>Or</h4>
                    <Link to={'/register'}>Sign Up</Link>
                </form>
            </section>
        </div>
  );
}

export default Login;