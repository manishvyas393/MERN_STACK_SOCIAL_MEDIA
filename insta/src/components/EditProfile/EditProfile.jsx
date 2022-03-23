import {
      Box, Button, Flex, Text, Image, FormControl,
      FormLabel,
      Input} from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import CloseIcon from '@mui/icons-material/Close';
import CheckIcon from '@mui/icons-material/Check';
import { useDispatch, useSelector } from 'react-redux';
import { clearErrors, editProfileAction } from '../../actions/userActions';
import { USER_EDIT_PROFILE_RESET } from '../../constants/userConstants';
const EditProfile = () => {
      const {user}=useSelector(state=>state.user)
      let [full_name, setFull_name] = useState("")
      let [username, setUsername] = useState("")
      let [website, setWebsite] = useState("")
      let [bio, setBio] = useState("")
      const navigate=useNavigate()
      const dispatch = useDispatch()
      const {error,isUpdated}=useSelector(state=>state.editProfile)
      const editProfileHandle = (e) => {
            const myform = new FormData()
            myform.set("full_name", full_name)
            myform.set("username", username)
            myform.set("website", website)
            myform.set("bio", bio)
            if (full_name === "") {
                  myform.set("full_name", full_name=user.full_name)
            }
            if (username === "") {
                  myform.set("username", username = user.username)
            }
            if (website === "") {
                  myform.set("website", website = user.website)
            }
            if (username === "") {
                  myform.set("bio", bio = user.bio)
            }
            dispatch(editProfileAction(myform,user._id))
      }
     
      useEffect(() => {
            if (isUpdated) {
                  navigate("/profile")
                  dispatch({type:USER_EDIT_PROFILE_RESET})
            }
            if (user?._id) {
                  setFull_name(user.full_name)
                  setUsername(user.username)
                  setWebsite(user.website)
                  setBio(user.bio)
            }
            if (error) {
                  console.log(error)
                  dispatch(clearErrors())
            }
      }, [isUpdated, navigate, error, dispatch, user?._id,user.bio,user.website,user.username,user.full_name])
      return (
            <Box mt={16} >
                  <Flex justifyContent="space-between" w="100%" alignItems="center" px={2}>
                        <Box display="flex" justifyContent="space-evenly" width="30%">
                              <Link to="/profile">
                                    <CloseIcon style={{ fontSize: "36px", cursor: "pointer" }} />
                              </Link>
                            
                              <Text ml={2} fontSize={22} cursor="pointer">
                                    Edit Profile
                              </Text>
                        </Box>
                        <Box>
                              <Button backgroundColor="transparent" p={0} _focus="none" _hover={{ background: "transparent" }} onClick={editProfileHandle}>
                                    <CheckIcon style={{ color: "blue", fontSize: "36px" }}>
                                    </CheckIcon>
                              </Button>
                        </Box>
                  </Flex>
                  <Flex flexDirection="column" justifyContent="center" alignItems="center" mt={4}>
                        <Image src={user?.profilePicture?.url} width="110px" height="110px" borderRadius="50%" border={"1px"} borderColor={"gray.600"}></Image>
                        <Link to="/updateprofilepic">
                              <Text mt={4} color="blue.500" fontSize="18px" fontWeight={550}>
                                    Change profile photo
                              </Text>
                        </Link>
                        
                  </Flex>
                  <Flex mx={4}>
                        <FormControl>
                              <Box mt={3}>
                                    <FormLabel>Name</FormLabel>
                                    <Input type='text' name='full_name' value={full_name} onChange={(e)=>setFull_name(e.target.value)} border="0px" borderBottom="1px" borderBottomColor="gray.200" _hover={{borderColor:"gray.200"}} _focus="none"/>
                              </Box>
                              <Box mt={3}>
                                    <FormLabel>Username</FormLabel>
                                    <Input type='text' name='username' value={username} onChange={(e) => setUsername(e.target.value)} border="0px" borderBottom="1px" borderBottomColor="gray.200" _hover={{ borderColor: "gray.200" }} _focus="none"/>
                              </Box>
                              <Box mt={3}>
                                    <FormLabel>Website</FormLabel>
                                    <Input type='text' name='website' value={website} onChange={(e) => setWebsite(e.target.value)} border="0px" borderBottom="1px" borderBottomColor="gray.200" _hover={{ borderColor: "gray.200" }} _focus="none"/>
                              </Box>
                              <Box mt={3}>
                                    <FormLabel>Bio</FormLabel>
                                    <Input type='text' name='bio' value={bio} onChange={(e) => setBio(e.target.value)} border="0px" borderBottom="1px" borderBottomColor="gray.200" _hover={{ borderColor: "gray.200" }} _focus="none"/>
                              </Box>
                              
                        </FormControl>
                  </Flex>
                  <Box px={6} py={6} display={"flex"} justifyContent={"space-between"} alignItems={"center"}>
                        <Link to="/personel-settings">
                              <Text color="blue.400" fontWeight={600} fontSize="16px">
                                    Personal information settings
                              </Text>
                        </Link>
                        <Link to="/account-privacy" >
                              <Text color="blue.400" fontWeight={600} fontSize="16px">
                                    Change Acount Visibility
                              </Text>
                        </Link>
                  </Box>
            </Box>
      )
}

export default EditProfile