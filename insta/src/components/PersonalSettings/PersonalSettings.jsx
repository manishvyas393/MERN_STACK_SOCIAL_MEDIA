import {
      Box, Button, Flex, FormControl,
      FormLabel,
      Text,
      Input,
} from '@chakra-ui/react'
import { Link, useNavigate } from 'react-router-dom';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import CheckIcon from '@mui/icons-material/Check';
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { editProfileAction } from '../../actions/userActions';
import { USER_EDIT_PROFILE_RESET } from '../../constants/userConstants';
const PersonalSettings = () => {
      const { user } = useSelector(state => state.user)
      let [email, setEmail] = useState("")
      let [phone_no, setPhone_no] = useState(0)
      let [gender, setGender] = useState("")
      let [dob, setDob] = useState("")
      const navigate = useNavigate()
      const dispatch = useDispatch()
      const { error, isUpdated } = useSelector(state => state.editProfile)
      const editProfileHandle = (e) => {
            const myform = new FormData()
            myform.set("email", email)
            myform.set("phone_no", phone_no)
            myform.set("gender", gender)
            myform.set("dob", dob)
            if (email === "") {
                  myform.set("email", email = user.email)
            }
            if (phone_no === 0) {
                  myform.set("phone_no", phone_no = 0)
            }
            if (gender === "") {
                  myform.set("gender", gender = user.gender)
            }
            if (dob === "") {
                  myform.set("dob", dob = user.dob)
            }
            dispatch(editProfileAction(myform, user._id))
      }

      useEffect(() => {
            if (isUpdated) {
                  navigate("/profile")
                  dispatch({ type: USER_EDIT_PROFILE_RESET })
            }
            if (user) {
                  setEmail(user.email)
                  setPhone_no(user.phone_no)
                  setGender(user.gender)
                  setDob(user.dob)
            }
            if (error) {
                  console.log(error)
            }
      }, [isUpdated, navigate, error, dispatch, user])
      return (
            <Flex mx={4} mt={16} flexDirection="column">
                  <Flex justifyContent="space-between" w="100%">
                        <Box display="flex" justifyContent="space-evenly" width="50%" alignItems="center">
                              <Link to="/editprofile">
                                    <ArrowBackIcon style={{ fontSize: "36px", cursor: "pointer" }} />
                              </Link>

                              <Text color="blue.400" fontWeight={400} fontSize="16px">
                                    Personal information settings
                              </Text>
                        </Box>
                        <Box>
                              <Button backgroundColor="transparent" p={0} _focus="none" _hover={{ background: "transparent" }} onClick={editProfileHandle}>
                                    <CheckIcon style={{ color: "blue", fontSize: "36px" }}>
                                    </CheckIcon>
                              </Button>
                        </Box>
                  </Flex>
                  <FormControl mt={4} px={4}>
                        <Box mt={3}>
                              <FormLabel>E-mail Address</FormLabel>
                              <Input type='email' name='email' onChange={(e) => setEmail(e.target.value)} value={email} border="0px" borderBottom="1px" borderBottomColor="gray.200" _hover={{ borderColor: "gray.200" }} _focus="none" />
                        </Box>
                        <Box mt={3}>
                              <FormLabel>Phone Number</FormLabel>
                              <Input type="tel" name='phone_no' onChange={(e) => setPhone_no(e.target.value)} value={phone_no} border="0px" borderBottom="1px" borderBottomColor="gray.200" _hover={{ borderColor: "gray.200" }} _focus="none" />
                        </Box>
                        <Box mt={3}>
                              <FormLabel>Gender</FormLabel>
                              <Input type='text' name='gender' onChange={(e) => setGender(e.target.value)} value={gender} border="0px" borderBottom="1px" borderBottomColor="gray.200" _hover={{ borderColor: "gray.200" }} _focus="none" />
                        </Box>
                        <Box mt={3}>
                              <FormLabel>Birthday</FormLabel>
                              <Input type="date" name='dob' onChange={(e) => setDob(e.target.value)} border="0px" borderBottom="1px" borderBottomColor="gray.200" _hover={{ borderColor: "gray.200" }} _focus="none" />
                        </Box>
                  
                  </FormControl>
            </Flex>
      )
}

export default PersonalSettings