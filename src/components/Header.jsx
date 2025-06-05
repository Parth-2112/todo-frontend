import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import { Context } from '../main'
import { serverUrl } from '../main'
import axios from 'axios'
import toast from 'react-hot-toast'

const Header = () => {

  const {isAuthenticated, setIsAuthenticated, loading, setLoading} = useContext(Context);

  const  logoutHandler = async(e) => {
    setLoading(true);
    try{
      const {data} = await axios.get(`${serverUrl}/users/logout`, 
        {
          withCredentials: true, 
        });
      toast.success(data.message);
      setIsAuthenticated(false);
      setLoading(false);
    }catch (error) {
      toast.error(error.response?.data?.message || 'Registration failed');      
      setIsAuthenticated(true);
      setLoading(false);
    }
  }

  return (
    <nav className="header">
        <div>To-Do App</div>
        <article>
          <Link to={"/"}>Home</Link>
          <Link to={"/profile"}>Profile</Link>
          {
            isAuthenticated ? 
              <button disabled={loading} className='btn' onClick={logoutHandler}>Logout</button> :  
              <Link to={"/login"}>Login</Link>
          }
        </article> 
    </nav>
  )
}

export default Header