import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react'
import { serverUrl, Context } from '../main';
import toast from 'react-hot-toast';
import TaskItem from '../components/TaskItem';


const Home = () => {

  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [loading, setLoading] = useState(false);
  const {isAuthenticated, user} = useContext(Context);
  const [tasks, setTasks] = useState([]);
  const [refresh, setRefresh] = useState(false);

  const submitHandler = async(e)=>{
    
    e.preventDefault();
    try{
      setLoading(true);
      const {data} = await axios.post(`${serverUrl}/task/new`,{
        title,
        description : desc,
      },{
        withCredentials:true,
        headers:{
          "Content-Type" : "application/json",
        }
      });    
      
      setTitle("");
      setDesc("");
      toast.success(data.message);
      setLoading(false);
      setRefresh(prev=>!prev);
    } catch (error) {
      toast.error(error.response.data.message);
      setLoading(false);
    }

  };

  const updateHandler= async(id)=>{
    
    try{
      const {data} = await axios.put(`${serverUrl}/task/${id}`,{},{
        withCredentials : true
      });

      toast.success(data.message);
      setRefresh(prev=>!prev);
    }catch(error){
      toast.error(error.response.data.message);    
    }
    
    toast.success(id);
  }

  const deleteHandler= async(id)=>{
    try{
      const {data} = await axios.delete(`${serverUrl}/task/${id}`,{
        withCredentials : true  
      })

      toast.success(data.message);
      setRefresh(prev=>!prev);
    }catch(error){
      toast.error(error.response.data.message);
    }  
  }

  useEffect(()=>{

    axios
      .get(`${serverUrl}/task/my`,{
        withCredentials : true
      })
      .then((res)=>{
        setTasks(res.data.tasks);
      })
      .catch((e)=>{
        toast.error(e.response.data.message);
      });
  },[refresh]);


  if(!isAuthenticated){
    return(
      <div className='text-xl text-slate-800 px-5 py-5'> 
        Login In to start adding task
      </div>
    );  
  }
  
  return (

    <div className='h-dvh mx-auto relative'>

    <div className='w-[60%] absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 bg-[#212d40] py-12 px-12 text-white rounded-2xl'>

      <div className='w-[100%]'>
        <section>
          <form onSubmit={submitHandler} className='flex flex-col gap-6'>
          
            <input 
                value={title}
                type="text" 
                placeholder='Title'
                onChange={(e) => setTitle(e.target.value)}
                required
                className='text-xl px-2 py-2 outline-none'
            />
            
            <input 
                value={desc}
                type="text" 
                placeholder='Description'
                onChange={(e) => setDesc(e.target.value)}
                required
                className='text-xl px-2 py-2 outline-none'
            />

            <button disabled={loading} type='submit' className='text-[#e28394] text-end text-xl hover:text-amber-100 cursor-pointer'>
              Add Task
            </button>                    
          </form>
        </section>
      </div>

      <section className="mt-20">
        {tasks.map((i)=>(
          <TaskItem 
            key={i._id}
            id={i._id}
            title={i.title} 
            desc={i.description} 
            isCompleted={i.isCompleted}
            updateHandler={updateHandler}
            deleteHandler={deleteHandler}
          />
        ))}
      </section>
    
    </div>
    </div>
  )
}

export default Home;