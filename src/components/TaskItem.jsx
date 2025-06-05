import React from 'react'

const TaskItem = ({id, title, desc, isCompleted, updateHandler, deleteHandler}) => {
  return(
    <div className='todo'>
        
        <div>
            <h4>{title}</h4>
            <p>{desc}</p>
        </div>
            
        <div>
            <input type='checkbox' checked={isCompleted} onChange={()=>updateHandler(id)}/>
            <button className='btn' onClick={()=>deleteHandler(id)}>Delete</button>
        </div>
    </div>
  )
}

export default TaskItem;