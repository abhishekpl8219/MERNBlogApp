import { Sidebar } from 'flowbite-react'
import {HiUser,HiArrowSmRight} from'react-icons/hi'
import React, { useState ,useEffect} from 'react'
import { Link, useLocation } from 'react-router-dom';
import { signoutSuccess } from '../redux/user/userSlice';
import { useDispatch } from 'react-redux';

export default function Dashsidebar() {
    const location = useLocation();
    const dispatch=useDispatch();
    const [tab,setTab]= useState('');
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
        <Sidebar.ItemGroup>
            <Link to= '/dashboard?tab=profile' id ="prfileLink">
            <Sidebar.Item active = {tab === 'profile'} icon={HiUser} label={'User'} labelColor='dark'  as = 'button'>
            Profile
            </Sidebar.Item>
            </Link>
            <Sidebar.Item active icon={HiArrowSmRight} className="cursor-pointer" onClick = {handleSignOut}>
            Sign Out
            </Sidebar.Item>
        </Sidebar.ItemGroup>
        </Sidebar.Items>
    
    </Sidebar>
  )
}
