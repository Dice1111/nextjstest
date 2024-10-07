"use client";


import { ITask } from '@/types/task'
import { CiEdit } from "react-icons/ci";
import { IoTrashBinOutline } from "react-icons/io5";
import React, { FormEventHandler, useState } from 'react'
import Modal from './Modal';
import { useRouter } from 'next/navigation';
import { deleteTodo, editTodo } from '@/api';


interface TaskProps{
    task: ITask
}


const Task: React.FC<TaskProps> = ({task}) => {

  const router = useRouter();

  const[openModalEdit, setOpenModalEdit] = useState<boolean>(false);
  const[openModalDeleted, setOpenModalDeleted] = useState<boolean>(false);

  const[taskToEdit, setTaskToEdit] = useState<string>(task.text);

  const handleSubmitEditToDo: FormEventHandler<HTMLFormElement>  = async (e) => {
    e.preventDefault();
    await editTodo({
      id: task.id,
      text: taskToEdit,
    });
    setOpenModalEdit(false);
    router.refresh();
  }


  const handleDeleteTask = async (id: string) =>{
    await deleteTodo(id);
    setOpenModalDeleted(false);
    router.refresh();
  }

  return (
    <tr key={task.id}>
        <td className='w-full'>{task.text}</td>
        <td className="flex gap-5">
          <CiEdit onClick={() => setOpenModalEdit(true)} cursor="pointer" className='text-blue-500' size = {24} />
          <Modal modalOpen = {openModalEdit} setModalOpen = {setOpenModalEdit}>
          <form onSubmit={handleSubmitEditToDo}>
            <h3 className="font-bold text-lg">Edit task</h3>
            <div className="modal-action">
              <input value={taskToEdit} onChange={(e)=> setTaskToEdit(e.target.value)} type="text" placeholder="Type here" className="input input-bordered w-full" />
              <button type="submit" className="btn">Submit</button>
            </div>

          </form>
          </Modal>
          <IoTrashBinOutline onClick={() => setOpenModalDeleted(true)} cursor="pointer" className='text-red-500' size={24}/>
          <Modal modalOpen = {openModalDeleted} setModalOpen = {setOpenModalDeleted}>
                <h3 className='text-lg'>Are you sure?</h3>
                <div className='modal-action'>
                  <button className='btn' onClick={() => handleDeleteTask(task.id)}>Yes</button>
                </div>

          </Modal>
          
          </td>
    </tr>
  )
}

export default Task