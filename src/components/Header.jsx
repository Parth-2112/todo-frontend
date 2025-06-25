import { useContext } from 'react'
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
    <nav className="w-full flex flex-col gap-2 items-center bg-[#11151c] py-6 px-4 md:px-6 md:flex-row md:justify-between">
        <div className='font-bold text-2xl md:text-4xl text-white'>To-Do App</div>
        <article className='text-[#e28394] text-xl flex flex-col md:gap-8 md:flex-row '>
          <Link to={"/"} className='hover:text-amber-100'>Home</Link>
          <Link to={"/profile"} className='hover:text-amber-100'>Profile</Link>
          { 
            isAuthenticated ? 
              <button disabled={loading} onClick={logoutHandler} className='hover:text-amber-100 cursor-pointer'>Logout</button> :  
              <Link to={"/login"} className='hover:text-amber-100'>Login</Link>
          }
        </article> 
    </nav>
  )
}

export default Header