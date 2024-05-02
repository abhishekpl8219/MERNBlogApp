import { Sidebar } from 'flowbite-react'
import {HiUser,HiArrowSmRight, HiDocumentText, HiOutlineUserGroup} from'react-icons/hi'
import React, { useState ,useEffect} from 'react'
import { Link, useLocation } from 'react-router-dom';
import { signoutSuccess } from '../redux/user/userSlice';
import { useDispatch, useSelector } from 'react-redux';

export default function Dashsidebar() {
    const location = useLocation();
    const dispatch=useDispatch();
    const [tab,setTab]= useState('');
    const {currentUser} =  useSelector((state)=>state.user);
    useEffect(()=>{
      const urlParams= new URLSearchParams(location.search);
      const tabFromUrl= urlParams.get('tab')
      if(tabFromUrl){
        setTab(tabFromUrl);
      }
  
    },[location.search])
    const  handleSignOut = async()=>{

      try {
        const res = await fetch('/api/user/signout',{
          method:'POST',
        })
        const data = await res.json();
        if(!res.ok){
          console.log(data.message);
        }else{
          dispatch(signoutSuccess());
        }
    
      } catch (error) {
        
      }
    
     }    
  return (
    <Sidebar className='w-full md:w-56'>
        <Sidebar.Items>
        <Sidebar.ItemGroup className='flex flex-col gap-1'>
            <Link to= '/dashboard?tab=profile' id ="prfileLink">
            <Sidebar.Item active = {tab === 'profile'} icon={HiUser} label={currentUser.isAdmin?'Admin':'User'} labelColor='dark'  as = 'button'>
            Profile
            </Sidebar.Item>
            </Link>
            {currentUser.isAdmin && (
              <Link to = '/dashboard?tab=posts'>
                <Sidebar.Item as ='div' icon = {HiDocumentText} active = {tab==='posts'}>
                  Posts
                </Sidebar.Item>
              </Link>
            )}
              {currentUser.isAdmin && (
              <Link to = '/dashboard?tab=users'>
                <Sidebar.Item as ='div' icon = {HiOutlineUserGroup} active = {tab==='users'}>
                  Users
                </Sidebar.Item>
              </Link>
            )}
            <Sidebar.Item active icon={HiArrowSmRight} className="cursor-pointer" onClick = {handleSignOut}>
            Sign Out
            </Sidebar.Item>
        </Sidebar.ItemGroup>
        </Sidebar.Items>
    
    </Sidebar>
  )
}
