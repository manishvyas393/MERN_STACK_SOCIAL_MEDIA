import { Box, Text, Input, FormControl, Button, Heading } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'
import { Link,useNavigate} from 'react-router-dom'
import { loginAction } from '../../actions/userActions'
import { LOGIN_RESET } from '../../constants/userConstants'
import Msg from '../Msg/Msg'

const Login = () => {
      const [email, setEmail] = useState("")
      const [password, setPassword] = useState("")
      const dispatch = useDispatch()
      const navigate=useNavigate()
      const {isAuthenticated,msg}=useSelector(state=>state.user)
      const loginHandler = (e) => {
            e.preventDefault()
            const myForm = new FormData()
            myForm.set("email", email)
            myForm.set("password", password)
            dispatch(loginAction(myForm))
      }
      useEffect(() => {
            isAuthenticated? navigate("/timeline"): navigate("/")
            if (msg) {
                  setTimeout(() => {
                        dispatch({type:LOGIN_RESET})
                  }, 8000)
            }
      },[isAuthenticated,dispatch,navigate,msg])
      return (
            <Box mt={28} px={12}>
                  <Box py={28}  display="flex" justifyContent="center" alignItems="center" flexDirection="column">
                        <Heading as="h5" fontSize="32px" mb={4}>Instagram</Heading>
                        {
                              msg ? <Msg text={msg}/>: ""
                        }
                        <Box>
                              <FormControl mb={5} onSubmit={loginHandler}>
                                    <Input type="text" placeholder='Phone number,email or username' name='email' mb={5}  backgroundColor="gray.100" onChange={(e)=>setEmail(e.target.value)}/>
                                    <Input type="password" placeholder='Password' name="password" mb={5} backgroundColor="gray.100" onChange={(e) => setPassword(e.target.value)}/>
                                    <Button width="100%" backgroundColor="blue.400" color="white"onClick={loginHandler}>Log In</Button>
                              </FormControl>
                              <Box display="flex" justifyContent="space-between" px={4}>
                                    <Link to={"/forgotpassword"}>
                                          <Text>Forgot your login details?</Text>
                                    </Link>
                                    <Link to="/register">
                                          <Text color="blue.400">
                                                Create Account
                                          </Text>
                                    </Link>
                              </Box>
                        </Box>
                  </Box>
            </Box>
       
      )
}

export default Login