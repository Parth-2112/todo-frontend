import React, { useContext, useState } from 'react'
import { Context, serverUrl } from '../main'
import axios from 'axios';
import Loader from '../components/Loader';

const Profile = () => {

    const {isAuthenticated, loading, user} = useContext(Context);
    // console.log(user);
    
    if(!isAuthenticated){
        return(
            <div>
                Login In to view Profile
            </div>
        )
    }

    return (
        loading?<Loader/>:(
            <div>
                <h3>{user?.name}</h3>
                <h3>{user?.email}</h3>
            </div>
        )
    );
}

export default Profile