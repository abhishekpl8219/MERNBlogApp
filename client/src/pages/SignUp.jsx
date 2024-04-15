import { Alert, Button, Label, Spinner, TextInput } from "flowbite-react";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function SignUp() {
  const [formData,setFormData]=useState({});
  const[errorMessage,setErrorMessage]=useState(null);
  const[loading,setLoading]=useState(false);
  const navigate=useNavigate()
  const handleChange =(e)=>{
    setFormData({...formData,[e.target.id]:e.target.value.trim()});
  }
  const handleSubmit = async(e)=>{
  e.preventDefault();
  if(!formData.username || !formData.email || !formData.password){
    return setErrorMessage('please fill out all fields')
  }
  try {
    setLoading(true);
    setErrorMessage(null);
    const res = await fetch('/api/auth/signup',{
      method: 'POST',
      headers:{'Content-Type':'application/json'},
      body:JSON.stringify(formData),
      } )
      const data = await res.json();
      setLoading(false);
      if(res.ok){
        navigate("/sign-in")
      }
      if(data.success===false){
        return setErrorMessage(data.message);
        setLoading(false);
      }

  } catch (error) {
    setErrorMessage
  }
  }
  return (
    <div className="min-h-screen mt-20">
      <div className="flex p-3 max-w-3xl flex-col mx-auto md:flex-row md:items-center gap-5" >
       <div className=" flex-1" >
      <Link to ="/" className=' text-4xl font-bold dark:text-white'>
        <span className='px-2 py-1  bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-lg text-white md:flex-row '>
          Rappy's
        </span>
        <span>
          Blog
        </span>
        </Link> 
        <p className="text-sm mt-5">
          This is a demo project . You can signup with your email and password or with google.
          </p> 
        </div>
      
        {/*right*/}
        <div className="flex-1">
        <form className="flex  flex-col gap-4" onSubmit={handleSubmit}>
          <div>
            <Label value="Your Username"></Label>
            <TextInput type='text' placeholder="Username" id='username'   onChange={handleChange}/>
          </div>
          <div>
            <Label value="Your email"></Label>
            <TextInput type='email' placeholder="name@company.com" id='email' onChange={handleChange} />
          </div>
          <div>
            <Label value="Your password"></Label>
            <TextInput type='password' placeholder="Password" id='password' onChange={handleChange} />
          </div>
          <Button gradientDuoTone='purpleToPink' type="submit" disabled={loading}>
            {
              loading? ( <><Spinner > Loading ..... </Spinner></>):" Sign Up "
            }
          </Button>
        </form>
        <div className="flex gap-2 text-sm  mt-5">
          <span>Have an account ?</span>
          <Link to ="/sign-in" className="text-blue-500">
            Sign In
          </Link>
        </div>
        {
          errorMessage &&(
            <Alert className="mt-5" color="failure">
              {errorMessage}
            </Alert>
          )
        }
        </div>

      </div>
    </div>
  );
}
