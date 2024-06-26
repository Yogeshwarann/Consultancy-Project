import React, { useEffect, useState } from 'react'
import { BiHide, BiShowAlt } from 'react-icons/bi'
import { useDispatch, useSelector } from "react-redux"
import { Link, useNavigate } from 'react-router-dom'
import SignupImage from '../image/Login.png'
import { loginRedux } from '../redux/userSlice'

const Login = () => {
  const [showPassword, setShowPassword] = useState(false)
    const [data, setData] = useState({
        email : "",
        password : ""
    })
    const navigate = useNavigate()
    // console.log(data);

    const userData = useSelector(state => state)
    

    const dispatch = useDispatch()
   
  
    const loadUserDataFromLocalStorage = () => {
      console.log(typeof dispatch !== 'undefined' ? 'dispatch is defined' : 'dispatch is undefined');
      const usersession = localStorage.getItem("usersession");
      console.log(usersession);
      if (usersession !== null) {
        const userData = JSON.parse(usersession);
        if (userData.id !== undefined && userData.id !== null) {
          dispatch(loginRedux(userData));
          navigate('/');
        }
      }
    };
    

  useEffect(() => {
    loadUserDataFromLocalStorage();
  }, []);
    const handleShowPassword = ()=>{
        setShowPassword(preve => !preve)
    }

    const handleOnChange = (e) =>{
      const {name, value} = e.target
      setData((preve)=>{
        return{
          ...preve,
          [name] : value
        }
      })
    }

    const handleSubmit = async(e)=>{
      e.preventDefault()
    
      const {email, password} = data
      if(email && password){
        const fetchData = await fetch(`${process.env.REACT_APP_SERVER_DOMAIN}/login` , {
          method: "POST",
          headers :{
            "content-type" : "application/json"
          },
          body : JSON.stringify(data)
        })
    
        const resData = await fetchData.json()
        console.log(resData)
        
        if(resData.alert){ // Check for _id property
          localStorage.setItem("usersession", JSON.stringify(resData));
    
          dispatch(loginRedux(resData))
          navigate('/')
        }
        else{
          navigate('/signup')
        }
        console.log(userData)
      }
      else{
        alert("Please Enter required fields")
      }
    }
    
  return (
    <div className='p-3 md:p-4'>
      <div className='flex items-center justify-center bg-white m-auto max-w-sm p-5 flex-col'>
        {/* <h1 className='text-center text-2xl  font-bold'>SignUp</h1> */}

        <div className='w-70 h-45 overflow-hidden'>
            <img src={SignupImage} alt='Login' className='w-40 h-full object-cover' />
        </div>
        <form className='w-full py-3' onSubmit={handleSubmit}>
            <label htmlFor='email'>Email</label>
            <input type={'email'} id='email' name='email' className='mt-1 mb-2 w-full bg-slate-200 p-1 px-2 py-1 rounded focus-within:outline-blue-500' value={data.email} onChange={handleOnChange}/>

            <label htmlFor='password'>Password</label>
            <div className='flex px-2 py-1 bg-slate-200 rounded mt-1 mb-2 focus-within:outline focus-within:outline-blue-500'>
                <input type={showPassword ? 'text' : 'password'} id='password' name='password' className=' w-full bg-slate-200 p-1 rounded border-none outline-none' value={data.password} onChange={handleOnChange} />
                <span className='flex text-xl items-center cursor-pointer' onClick={handleShowPassword}>{showPassword ? <BiShowAlt/> : <BiHide/>}</span>
            </div>

            <button className='max-w-[120] w-full bg-blue-500 hover:bg-blue-600 cursor-pointer m-auto text-white text-xl font-medium text-center py-1 rounded-full mt-5'>Login</button>
        </form>
        <p className='mt-1 text-base'>Not Signed In Yet? <Link to={'/signup'} className='text-blue-600 underline'>SignUp</Link></p>
      </div>
    </div>
  )
}

export default Login