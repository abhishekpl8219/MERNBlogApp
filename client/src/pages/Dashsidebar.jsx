import { Sidebar } from 'flowbite-react'
import {HiUser,HiArrowSmRight} from'react-icons/hi'
import React, { useState ,useEffect} from 'react'
import { Link, useLocation } from 'react-router-dom';

export default function Dashsidebar() {
    const location = useLocation()
    const [tab,setTab]= useState('');
    useEffect(()=>{
      const urlParams= new URLSearchParams(location.search);
      const tabFromUrl= urlParams.get('tab')
      if(tabFromUrl){
        setTab(tabFromUrl);
      }
  
    },[location.search])
  return (
    <Sidebar className='w-full md:w-56'>
        <Sidebar.Items>
        <Sidebar.ItemGroup>
            <Link to= '/dashboard?tab=profile' id ="prfileLink">
            <Sidebar.Item active = {tab === 'profile'} icon={HiUser} label={'User'} labelColor='dark'  as = 'button'>
            Profile
            </Sidebar.Item>
            </Link>
            <Sidebar.Item active icon={HiArrowSmRight} className="cursor-pointer" >
            Sign Out
            </Sidebar.Item>
        </Sidebar.ItemGroup>
        </Sidebar.Items>
    
    </Sidebar>
  )
}
