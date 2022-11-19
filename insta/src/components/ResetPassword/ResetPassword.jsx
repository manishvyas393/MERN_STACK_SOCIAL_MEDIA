import { Box, Button, Input, Text, Divider } from '@chakra-ui/react'
import { ArrowBackIcon } from "@chakra-ui/icons"
import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import Msg from "../Msg/Msg"
import { clearErrors, updatePasswordAction } from '../../actions/userActions'
import { RESET_PASSWORD_RESET } from '../../constants/userConstants'
const ResetPassword = () => {
      const {token}=useParams()
      const [err,setErr]=useState(undefined)
      const [password, setPassword] = useState("")
      const [password2, setPassword2] = useState("")
      const dispatch = useDispatch()
      const { reset, msg,error } = useSelector(state => state.resetPassword)
      const updatePassword = ((e) => {
            e.preventDefault()
            if (password === "" || password2 === "") {
                setErr("password field empty")  
            }
            else if (password !== password2) {
                  setErr("password not matched")
            }
            else {
                  dispatch(updatePasswordAction(token,password))
            }
      })
      useEffect(() => {
            if (reset) {
                  setTimeout(() => {
                    dispatch({type:RESET_PASSWORD_RESET})    
                  },3000)
            }
            if (error) {
                  dispatch(clearErrors())
            }
      },[dispatch,reset,error])
      return (
            <Box px={6} mt={6}>
                  <Box>
                        <Link to="/">
                              <ArrowBackIcon fontSize={"30px"} />
                        </Link>

                  </Box>
                  <Text align={"center"} fontSize="24px" fontWeight={600} mb={4}>Update Password</Text>
                 {err || msg || error? <Msg text={err||msg||error}/>:""}
                  <Box display={"flex"} justifyContent="center" alignItems={"center"} flexDirection="column">
                        <Input type={"password"} width="70%" backgroundColor={"gray.100"} mb={4} placeholder="Enter Password" value={password} onChange={(e) => setPassword(e.target.value)}></Input>
                        <Input type={"password"} width="70%" backgroundColor={"gray.100"} placeholder="Confirm Password" value={password2} onChange={(e) => setPassword2(e.target.value)}></Input>
                        <Button backgroundColor={"blue.500"} color="white" mt={4} onClick={updatePassword}>Change Password</Button>
                  </Box>
                  <Box display={"flex"} alignItems={"center"} mt={4} justifyContent="space-around">
                        <Divider border={"1px"} ></Divider>
                        <Text px={4}>or</Text>
                        <Divider border={"1px"} ></Divider>
                  </Box>
                  <Box display={"flex"} alignItems={"center"} justifyContent="center" mt={4} fontWeight={600}>
                        <Link to={"/register"}>
                              <Text>Create New Account ?</Text>
                        </Link>
                  </Box>
            </Box>
      )
}

export default ResetPassword