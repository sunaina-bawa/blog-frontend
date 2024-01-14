import React from 'react'
import { useToast} from '@chakra-ui/react'
import { useLocation ,Navigate} from "react-router-dom";

const PrivateRoute = ({children}) => {
  const token=localStorage.getItem("token")
  const toast = useToast()
  const location=useLocation();
  if(!token){
    toast({
        position: 'top',
        title: "Please Login ",       
        status: 'error',
        duration: 3000,
        isClosable: true,
      })
      return <Navigate state={location.pathname} to={"/login"} replace/>
  }
  return children
}
export default PrivateRoute