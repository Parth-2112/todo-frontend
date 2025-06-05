import React, {useContext, useState} from 'react'
import { Link, Navigate } from 'react-router-dom'
import axios from 'axios';
import { serverUrl } from '../main';
import { toast } from 'react-hot-toast';
import { Context } from '../main';

const Register = () => {
  
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const {isAuthenticated, setIsAuthenticated, loading, setLoading} = useContext(Context);

    const submitHandler = async(e) => {
        e.preventDefault();
        setLoading(true);
        console.log('User Registered:', { name, email, password });
        try{
            const {data} = await axios.post(`${serverUrl}/users/create`, {
                name,
                email,
                password
            },{
                headers: {
                    'Content-Type': 'application/json'
                },
                withCredentials: true, 
            });
    
            toast.success(data.message);
            setIsAuthenticated(true);
            setLoading(false);
        }catch(error){
            toast.error(error.response?.data?.message || 'Registration failed');
            // console.log(error);
            setIsAuthenticated(false);
            setLoading(false);
        }    
    };

    if(isAuthenticated){
        return (
            <Navigate to={'/'}/>
        );
    };    
    
    return (
    <div className='register'>
        <section>
            <form onSubmit={submitHandler}>

                <input 
                    value={name} 
                    type="text" 
                    placeholder='Name' 
                    onChange={(e) => setName(e.target.value)}
                    required
                />
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

                <button disabled={loading} type='submit'>Sign Up</button>
                <h4>Or</h4>
                <Link to={'/login'}>Log In</Link>
            </form>
        </section>
    </div>
  );
}

export default Register