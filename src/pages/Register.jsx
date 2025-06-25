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
    
    <div className='h-dvh mx-auto relative'>
        <div className='w-[60%] absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 bg-[#212d40] py-12 px-12 text-white rounded-2xl'>
            
            <section className='w-[100%]'>
            
                <form onSubmit={submitHandler} className='flex flex-col gap-6'>
                    <input 
                        value={name} 
                        type="text" 
                        placeholder='Name' 
                        onChange={(e) => setName(e.target.value)}
                        required
                        className='text-xl px-2 py-2 outline-none'
                    />
                    <input 
                        value={email} 
                        type="email" 
                        placeholder='Email'
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        className='text-xl px-2 py-2 outline-none'
                    />
                    <input 
                        value={password}
                        type="password" 
                        placeholder='Password' 
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        className='text-xl px-2 py-2 outline-none'
                    />

                    <button disabled={loading} type='submit' className='text-[#e28394] text-end text-xl hover:text-amber-100 cursor-pointer'>Sign Up</button>
                    <h4 className='text-xl font-bold'>Or</h4>
                    <Link to={'/login'} className='text-xl text-end text-[#e28394] hover:text-amber-100'>Log In</Link>
                </form>
            </section>
        </div>
    </div>    
  );
}

export default Register