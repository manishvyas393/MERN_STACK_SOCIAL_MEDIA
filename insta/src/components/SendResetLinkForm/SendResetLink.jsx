import React, { useEffect, useState } from 'react'
import { Box, Text, Input, Button, Divider } from '@chakra-ui/react'
import { useDispatch, useSelector } from 'react-redux'
import { UnlockIcon } from "@chakra-ui/icons"
import { requestResetPasswordLinkAction } from '../../actions/userActions'
import Msg from '../Msg/Msg'
import { Link, useNavigate } from 'react-router-dom'
import { GET_RESET_PASSWORD_LINK_RESET } from '../../constants/userConstants'
const SendResetLink = () => {
      const [email, setEmail] = useState("")
      const { msg } = useSelector(state => state.resetPassword)
      const dispatch = useDispatch()
      const navigate = useNavigate()
      const getLink = (e) => {
            e.preventDefault()
            dispatch(requestResetPasswordLinkAction(email))
      }
      useEffect(() => {
            if (msg) {
                  setTimeout(() => {
                        dispatch({ type: GET_RESET_PASSWORD_LINK_RESET })
                  }, 8000)
            }

      }, [msg, dispatch, navigate])
      return (
            <Box mt={24} px={8} display="flex" flexDirection={"column"} justifyContent="center">
                  <Box display={"flex"} justifyContent="center" alignItems={"center"} mb={4} flexDirection="column">
                        <UnlockIcon height={"30%"} width="30%" color={"gray.700"}></UnlockIcon>
                        <Text align={"center"} fontSize="24px" mt={4} fontWeight={600}>Reset Password?</Text>
                        <Text width={"50%"} color="gray.500" mt={2}>Enter your email and we'll send you a link to get back into your account.</Text>
                  </Box>
                  <Box>
                        {
                              msg ? <Msg text={msg} /> : ""
                        }
                        <Box display={"flex"} justifyContent="center" alignItems={"center"} flexDirection="column">
                              <Input type="email" value={email} placeholder='Enter Email For Reset Password' backgroundColor="gray.100" onChange={(e) => setEmail(e.target.value)}></Input>
                              <Button mt={4} backgroundColor="blue.500" color={"white"} onClick={getLink}>Send Reset Link</Button>
                        </Box>
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
export default SendResetLink