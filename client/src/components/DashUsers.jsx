import { Button, Modal, ModalBody, ModalHeader, Table, TableBody, TableCell } from 'flowbite-react';
import React from 'react'
import { useState } from 'react';
import { useEffect } from 'react'
import { FaCheck, FaTimes } from 'react-icons/fa';
import { HiOutlineExclamationCircle } from 'react-icons/hi';
import {useSelector} from 'react-redux';
import { Link } from 'react-router-dom';

export default function DashUsers() {
  const {currentUser}= useSelector((state)=>state.user)
  const [users,setUsers]=useState([]);
  const[showMore,setShowMore]=useState(true);
  const [showModal,setShowModal]=useState(false);
  const [userIdToDelete, setUserIdToDelete] = useState('');
 

  useEffect(()=>{
 const fetchUsers  =  async ()=>{
  try {
    const res = await fetch(`/api/user/getusers`)
    const data = await res.json();
    if(res.ok){
      setUsers(data.users)
      if(data.users.length<9){
        setShowMore(false);
      }
    }
    
  } catch (error) {
    console.log(error.message)
    
  }

 }
 if(currentUser.isAdmin){
  fetchUsers();
}
  },[currentUser._id])

  const handelShowMore = async()=>{
    const startIndex =  users.length;
    try {
      const res = await fetch(`/api/user/getusers?startIndex=${startIndex}`);
      const data = await res.json();
      if(res.ok){
        setUsers((prev)=>[...prev,...data.users])
       if(data.users.length<9){
        setShowMore(false);
       }
      }
    } catch (error) {
      console.log(error.message)
      
    }
  }
  const handleDeleteUser = async()=>{

  
    try {
      const res  =  await fetch(`api/user/delete/${userIdToDelete}`,{
        method:'DELETE',
      })
      const data = await res.json();
      if(res.ok){
        setUsers((prev)=>prev.filter((user)=>user._id !== userIdToDelete))
        setShowModal(false);
      }else{
       comsole.log(data.message); 
      }
    } catch (error) {
      console.log(error.message)
      
    }
  }
  return (
    <div className='table-auto md:mx-auto p-3 scrollbar overflow-x-scroll scrollbar-track-slate-100 scrollbar-thumb-slate-300 dark:scrollbar-track-slate-700  dark:scrollbar-thumb-slate-500'>
      {currentUser.isAdmin && users.length > 0 ?(
        <>
        <Table hoverable className='shadow-md'>
          <Table.Head>
            <Table.HeadCell>Date Created</Table.HeadCell>
            <Table.HeadCell>User Image</Table.HeadCell>
            <Table.HeadCell>Username</Table.HeadCell>
            <Table.HeadCell>Email</Table.HeadCell>
            <Table.HeadCell>Admin</Table.HeadCell>
            <Table.HeadCell>Delete</Table.HeadCell>
            
          </Table.Head>
          {users.map((user)=>(
            <Table.Body className='divide-y' key ={user._id}>
              <Table.Row className='bg-white dark:border-gray-700  dark:bg-gray-800'>
                <Table.Cell>
                 
                  {new Date (user.createdAt).toLocaleDateString()}
                </Table.Cell>
                <TableCell>
               
                  <img src = {user.profilePicture} alt = {user.username} className='w-20 h-10 object-cover rounded-full bg-gray-500'></img> 
                  

                </TableCell>
                <TableCell>
                  {user.username}
                </TableCell>
                <TableCell>
                  {user.email}
                </TableCell>
                <TableCell>
                  {user.isAdmin ? (<FaCheck className='text-green-500'/>):(<FaTimes className='text-red-500'/>)}
                </TableCell>
                <TableCell>
                  <span className='font-medium text-red-500 hover:underline cursor-pointer' onClick={()=>{setShowModal(true); setUserIdToDelete(user._id)}}>
                    Delete
                  </span>
                </TableCell>
              

              </Table.Row>
            </Table.Body>
          )

          )}
          </Table> 
          {
            showMore && (
              <button onClick = {handelShowMore} className='w-full text-teal-500 self-center text-sm py-7'>
                 Show more
              </button>
            )
          }
        </>
      ):(<p> you have no posts </p>)}
      <Modal show = {showModal} onClose={()=>setShowModal(false)} popup size='md'>
<ModalHeader/>
<ModalBody>
  <div className='text-center'>
    <HiOutlineExclamationCircle className='h-14 w-14 text-gray-400 dark:text-gray-200 mb-4 mx-auto'/>
  <h3 className='mb-5 text-lg text-gray-500 dark:text-gray-400'>Are you sure want to delete this post ?</h3>
  </div>
  <div className='flex justify-center gap-4'>
    <Button color='failure' onClick={handleDeleteUser}>Yes Im sure</Button>
    <Button onClick={()=>setShowModal(false)} color='gray'>
      No,Cancel
    </Button>
  </div>

</ModalBody>

      </Modal>
    </div>
  )
}
