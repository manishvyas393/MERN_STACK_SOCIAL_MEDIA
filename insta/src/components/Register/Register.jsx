import { Box, Text, Input, FormControl, Button, Heading } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { clearErrors, registrationAction } from '../../actions/userActions'
import { REGISTRATION_RESET } from '../../constants/userConstants'

const Regsiter = () => {
      const { error, created,msg } = useSelector(state => state.registration)
      const navigate = useNavigate()
      const [username, setUsername] = useState("")
      const [email, setEmail] = useState("")
      const [phoneno, setPhoneNo] = useState("")
      const [dob, setDob] = useState("")
      const [password, setPassword] = useState("")
      const dispatch = useDispatch()
      const registrationHandle = (e) => {
            e.preventDefault()
            const myForm = new FormData()
            myForm.set("username", username)
            myForm.set("email", email)
            myForm.set("phoneNo", phoneno)
            myForm.set("dob", dob)
            myForm.set("password", password)
            dispatch(registrationAction(myForm))
      }
      useEffect(() => {
            if (created) {
                  navigate("/")
            }
            if (error) {
                  console.log(error)
                  dispatch(clearErrors())
            }
            if (msg) {
                  setTimeout(() => {
                        dispatch({ type: REGISTRATION_RESET })
                  }, 8000)
            }
      }, [created, error, navigate, msg, dispatch])
      return (

            <Box mt={28} px={12}>
                  <Box py={28} display="flex" justifyContent="center" alignItems="center" flexDirection="column">
                        <Heading as="h5" fontSize="32px" mb={4}>Create Account</Heading>
                        {
                              msg ? <Box backgroundColor={"red.400"} p={2} shadow="dark-lg" borderRadius="10px" color="white" mb={2} fontWeight={600}>{msg}</Box> : ""
                        }
                        <Box>
                              <FormControl mb={5}>
                                    <Input type="text" placeholder='username' name='username' mb={5} backgroundColor="gray.100" _focus="none" onChange={(e) => setUsername(e.target.value)} />
                                    <Input type="email" placeholder='Email' _focus="none" name='email' mb={5} backgroundColor="gray.100" onChange={(e) => setEmail(e.target.value)} />
                                    <Input type="tel" placeholder='Phone No' _focus="none" name='phoneNo' mb={5} backgroundColor="gray.100" onChange={(e) => setPhoneNo(e.target.value)} />
                                    <Input type="date" placeholder='Date of Birth' name="dob" _focus="none" mb={5} backgroundColor="gray.100" onChange={(e) => setDob(e.target.value)} />
                                    <Input type="password" placeholder='Password' name='password' mb={5} backgroundColor="gray.100" onChange={(e) => setPassword(e.target.value)} />
                                    <Button width="100%" backgroundColor="blue.400" color="white" onClick={registrationHandle}>Sign Up</Button>
                              </FormControl>
                              <Box display="flex" justifyContent="space-between" px={4}>
                                    <Text>    </Text>
                                    <Link to="/">
                                          <Text color="blue.400">
                                                Already have an account?
                                          </Text>
                                    </Link>
                              </Box>
                        </Box>
                  </Box>
            </Box>

      )
}

export default Regsiter