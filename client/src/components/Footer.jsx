import { Footer } from 'flowbite-react'
import React from 'react'
import { Link } from 'react-router-dom'
import {BsFacebook,BsInstagram,BsTwitter,BsGithub,BsDribbble} from 'react-icons/bs'
export default function FooterComponent() {
  return (
    <Footer container className='border border-t-8  border-teal-500' >
      <div className='w-full mx-auto max-w-7xl'> 
        <div className='grid w-full justify-between sm:flex md:grid-cols-1'>
            <div className='mt-5'>
            <Link to ="/" className='self-center whitespace-nowrap text-lg sm:text-xl font-semibold dark:text-white'>
        <span className='px-2 py-1  bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-lg text-white '>
          Rappy's
        </span>
        <span>
          Blog
        </span>
        </Link>    
            </div>
            <div className="grid grid-cols-2 gap-8 sm:mt-4 sm:grid-cols-3 sm:gap-6"  >
                <div>
                <Footer.Title title= 'About' />
                <Footer.LinkGroup col >
                    <Footer.Link href ='https://aesthetic-cupcake-ac6b31.netlify.app/'
                    target='_blank' rel='noopener no referrer' >
                    IMDB CLONE
                    </Footer.Link>

                    <Footer.Link href ='/about'
                    target='_blank' rel='noopener no referrer' >
                    Rappy,s Blog
                    </Footer.Link>
                    
                </Footer.LinkGroup>
               </div>

               <div>
                <Footer.Title title= 'Follow Us' />
                <Footer.LinkGroup col >
                    <Footer.Link href ='https://github.com/abhishekpl8219/'
                    target='_blank' rel='noopener no referrer' >
                    GITHUB
                    </Footer.Link>

                    <Footer.Link href ='https://www.linkedin.com/in/abhishek-patial-1ab0951b2/'
                    target='_blank' rel='noopener no referrer' >
                    LINKED IN
                    </Footer.Link>
                    
                </Footer.LinkGroup>
               </div> 

               <div>
                <Footer.Title title= 'Legal' />
                <Footer.LinkGroup col >
                    <Footer.Link href ="#" >
                    Privacy Policy
                    </Footer.Link>

                    <Footer.Link href ='#' >
                    Terms and Conditions
                    </Footer.Link>
                    
                </Footer.LinkGroup>
               </div> 
            </div>
        </div>
        <Footer.Divider/>
        <div className='w-full sm:flex sm:items-center sm:justify-between'>
         <Footer.Copyright href="#" by="Rappy's Blog" year ={ new Date().getFullYear() } > "</Footer.Copyright>
        </div>
           <div className='flex gap-6 sm:mt-0 mt-4 sm:justify-center'>
            <Footer.Icon href = "# " icon= {BsFacebook}></Footer.Icon>
            <Footer.Icon href = "# " icon= {BsInstagram}></Footer.Icon>
            <Footer.Icon href = "# " icon= {BsTwitter}></Footer.Icon>
            <Footer.Icon href = "# " icon= {BsGithub}></Footer.Icon>
            <Footer.Icon href = "# " icon= {BsDribbble}></Footer.Icon>
           </div>
        </div>
    </Footer>
  )
}
