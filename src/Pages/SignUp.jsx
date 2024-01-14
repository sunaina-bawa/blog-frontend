import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useToast ,CircularProgress} from '@chakra-ui/react'
import { useNavigate } from 'react-router-dom';
const Signup = () => {
  const [isLoading, setIsLoading] = useState(false);
  const navigate=useNavigate()
  const toast = useToast()
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const handleSignup = (e) => {
    e.preventDefault();
    setIsLoading(true)
    const data={name,email,password}
    fetch("https://blog-backend-3osk.onrender.com/users/signUp",{
      method:"POST",
      headers:{
        "Content-type":"application/json"
      },
      body:JSON.stringify(data)
    }).then(res=>res.json())
     .then((res)=>{
      setIsLoading(false)
      if(res.msg==="Email is Already Registered"){
        toast({
          position: 'top',
          title: 'Email is Already Registered',
          description: "Please login",
          status: 'error',
          duration: 3000,
          isClosable: true,
        })
      }
      else{
        setIsLoading(false)
        toast({
          position: 'top',
          title: 'Account created.',
          description: "We've created your account enjoy!.",
          status: 'success',
          duration: 2000,
          isClosable: true,
        })
    
        setEmail("")
        setName("")
        setPassword("")
          navigate("/login")  
      }     
     })
     .catch((err)=>{
        console.log("error-",err)
     })
  };

  return (
    <div className="login-container">
      <form className="login-form" onSubmit={handleSignup}>
        <h2>Sign Up</h2>
        <div className="input-group">
          <label htmlFor="name">Name</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}  required
          />
        </div>
        <div className="input-group">
          <label htmlFor="email">Email</label>
          <input
            type="text"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)} required
          />
        </div>
        <div className="input-group">
          <label htmlFor="password">Password</label>
          <div className="password-input">
            <input
              type={showPassword ? 'text' : 'password'}
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)} required
            />
            <button
              type="button"
              className="toggle-password"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? 'Hide' : 'Show'}
            </button>
          </div>
        </div>
       {!isLoading && <button type="submit" className="login-button">
          Sign Up
        </button>}
        {isLoading && <CircularProgress isIndeterminate color="blue.300" />}
        <Link to='/login' className='signup-link'>Already have an Account?</Link>
      </form>
    </div>
  );
};
export default Signup;