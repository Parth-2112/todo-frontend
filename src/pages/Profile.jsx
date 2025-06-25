import { useContext, useEffect, useState } from 'react'
import { Context, serverUrl } from '../main'
import axios from 'axios';
import Loader from '../components/Loader';

const Profile = () => {

    const {isAuthenticated, loading, user} = useContext(Context);
    useEffect(()=>{

    },[user]);

    if(!isAuthenticated){
        return(
            <div className='text-xl text-slate-800 px-5 py-5 '>
                Login In to view Profile
            </div>
        )
    }
      
    return (
        loading?
            <Loader/>:
        (
            <div>
                <div className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[70%] flex flex-col gap-6 py-12 px-12 rounded-2xl bg-[#212d40] text-white'> 
                    <h3 className='text-xl font-bold uppercase'>{` Welcome back `}<span className='text-[#e28394]'>{user?.name}.</span></h3>
                    <h3 className='text-xl '><span className='text-[#e28394] font-bold'>EMAIL : </span> {`${user?.email}`}</h3>
                </div>
            </div>
        )
    );
}

export default Profile