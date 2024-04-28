import { Table, TableBody, TableCell } from 'flowbite-react';
import React from 'react'
import { useState } from 'react';
import { useEffect } from 'react'
import {useSelector} from 'react-redux';
import { Link } from 'react-router-dom';

export default function DashPosts() {
  const {currentUser}= useSelector((state)=>state.user)
  const [userPosts,setUserPosts]=useState([]);
  const[showMore,setShowMore]=useState(true);
  console.log(userPosts)

  useEffect(()=>{
 const fetchPosts  =  async ()=>{
  try {
    const res = await fetch(`/api/post/getposts?userId=${currentUser._id}`)
    const data = await res.json();
    if(res.ok){
      setUserPosts(data.posts)
      if(data.posts.length<9){
        setShowMore(false);
      }
    }
    
  } catch (error) {
    console.log(error.message)
    
  }

 }
 if(currentUser.isAdmin){
  fetchPosts();
}
  },[currentUser._id])

  const handelShowMore = async()=>{
    const startIndex =  userPosts.length;
    try {
      const res = await fetch(`/api/post/getposts?userId=${currentUser._id}&startIndex=${startIndex}`);
      const data = await res.json();
      if(res.ok){
        setUserPosts((prev)=>[...prev,...data.posts])
       if(data.posts.length<9){
        setShowMore(false);
       }
      }
    } catch (error) {
      console.log(error.message)
      
    }
  }
  return (
    <div className='table-auto md:mx-auto p-3 scrollbar overflow-x-scroll scrollbar-track-slate-100 scrollbar-thumb-slate-300 dark:scrollbar-track-slate-700  dark:scrollbar-thumb-slate-500'>
      {currentUser.isAdmin && userPosts.length > 0 ?(
        <>
        <Table hoverable className='shadow-md'>
          <Table.Head>
            <Table.HeadCell>Date Updated</Table.HeadCell>
            <Table.HeadCell>Post Image</Table.HeadCell>
            <Table.HeadCell>Post Title</Table.HeadCell>
            <Table.HeadCell>Category</Table.HeadCell>
            <Table.HeadCell>Delete</Table.HeadCell>
            <Table.HeadCell>
              <span>Edit</span>
            </Table.HeadCell>
          </Table.Head>
          {userPosts.map((post)=>(
            <Table.Body className='divide-y'>
              <Table.Row className='bg-white dark:border-gray-700  dark:bg-gray-800'>
                <Table.Cell>
                 
                  {new Date (post.updatedAt).toLocaleDateString()}
                </Table.Cell>
                <TableCell>
                <Link to = {`/post/${post.slug}`}>
                  <img src = {post.image} alt = {post.title} className='w-20 h-10 object-cover bg-gray-500'></img> 
                </Link>  

                </TableCell>
                <TableCell>
                  <Link to = {`post/${post.slug}`} className='font-medium text-gray-900  dark:text-white '>{post.title}</Link>
                </TableCell>
                <TableCell>
                  {post.category}
                </TableCell>
                <TableCell>
                  <span className='font-medium text-red-500 hover:underline cursor-pointer'>
                    Delete
                  </span>
                </TableCell>
                <TableCell>
                  <Link  className= 'text-teal-500 hover:underline'to = {`/update-post/${post._id}`}>Edit</Link>
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
    </div>
  )
}
