const TaskItem = ({id, title, desc, isCompleted, updateHandler, deleteHandler}) => {
  return(
    <div className="border-2 rounded-xl px-4 py-4 flex flex-col md:flex-row justify-between items-center mt-6">
        <div>
            <h4 className="text-xl font-bold">{title}</h4>
            <p>{desc}</p>
        </div>
            
        <div className="flex items-center gap-4">
        
            <input type='checkbox' checked={isCompleted} onChange={()=>updateHandler(id)} className="h-4 w-4 rounded-full appearance-none border-2 border-gray-300 checked:bg-blue-300 checked:border-blue-300 cursor-pointer focus:outline-none"/>
            <button className=' text-amber-100 text-xl hover:text-[#e28394] cursor-pointer' onClick={()=>deleteHandler(id)}>
              Delete
            </button>
        
        </div>
    </div>
  )
}

export default TaskItem;