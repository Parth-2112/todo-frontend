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
      const {data} = await axios.put(`${serverUrl}/task/${id}`,{
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
      <div>
        Login In to start adding task
      </div>
    );  
  }
  
  return (
    <div className="container">

      <div className='login'>
        <section>
          <form onSubmit={submitHandler}>
          
            <input 
                value={title}
                type="text" 
                placeholder='Title'
                onChange={(e) => setTitle(e.target.value)}
                required
            />
            
            <input 
                value={desc}
                type="text" 
                placeholder='Description'
                onChange={(e) => setDesc(e.target.value)}
                required
            />

            <button disabled={loading} type='submit'>
              Add Task
            </button>                    
          </form>
        </section>
      </div>

      <section className="todosContainer">
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
  )
}

export default Home;