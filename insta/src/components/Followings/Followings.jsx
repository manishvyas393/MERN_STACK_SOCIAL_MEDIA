import { Box, InputGroup, InputLeftAddon, Input, Image, Text, Button, Heading } from '@chakra-ui/react'
import React, { useEffect } from 'react'
import SearchIcon from '@mui/icons-material/Search';
import { useDispatch, useSelector } from 'react-redux';
import Loader from '../Loader/Loader';
import {Link, useParams } from 'react-router-dom';
import { otherUserProfileAction } from '../../actions/otherUserProfileAction';
import { followUnfollowAction } from '../../actions/followUnfollowAction';

const Followings = () => {
      const { username } = useParams()
      const dispatch = useDispatch()
      const { profile } = useSelector(state => state.otherUser)
      const {user: User, loading } = useSelector(state => state.user)
      useEffect(() => {
            if (window.location.pathname === `/profile/${username}/followers` || window.location.pathname === `/profile/${username}/followings`) {
                  dispatch(otherUserProfileAction(username))
            }
      }, [dispatch, username])
      return (
            <>
                  {loading ? <Loader /> :
                        window.location.pathname === `/profile/${username}/followers` | window.location.pathname === `/profile/${username}/followings` ?
                              <Box mt={5} mx={4}>
                                    <Heading as="h6" fontSize={20} textAlign="center" mb={2} color="blue.500">Followings</Heading>
                                    <InputGroup>
                                          <InputLeftAddon children={<SearchIcon />} />
                                          <Input type='text' placeholder='search' _focus="none" />
                                    </InputGroup>

                                    <Box mt={4}>

                                          {
                                                profile?.user?.followings?.length !== 0 ?
                                                      profile?.user?.followings?.map((f) => (
                                                     f.user.username === User?.username ?
                                                           <Box display="flex" alignItems="center" mb={4} justifyContent="space-between" key={User?._id}>
                                                                  <Box display="flex" alignItems="center">
                                                                        <Image src={User?.profilePicture?.url} w="35px" height="35px" borderRadius="50%" border={"1px"} borderColor={"gray.600"}></Image>
                                                                        <Text ml={2} fontWeight={700}>{User.username}</Text>
                                                                        </Box>
                                                                        <Link to={"/profile"}>
                                                                              <Button backgroundColor={"green.400"} color="white">
                                                                                    Your Profile
                                                                              </Button>
                                                                        </Link>
                                                            </Box>
                                                                  :
                                                                  <Box display="flex" alignItems="center" mb={4} justifyContent="space-between" key={User?._id}>
                                                                        <Box display="flex" alignItems="center">
                                                                              <Image src={f?.user?.profilePicture?.url} w="35px" height="35px" borderRadius="50%" border={"1px"} borderColor={"gray.600"}></Image>
                                                                              <Text ml={2} fontWeight={700}>{f?.user?.username}</Text>

                                                                        </Box> 
                                                                        <Link to={`/profile/${f?.user?.username}`}>
                                                                              <Button backgroundColor={"blue.400"} color="white">
                                                                                    View Profile
                                                                              </Button>
                                                                        </Link>
                                                                  </Box>
                                                          
                                              )) : <Box mt={12}>
                                                            No Followings
                                              </Box>
                                                      
                                          }
                                    </Box>
                              </Box>
                              :
                              <Box mt={5} mx={4}>
                                    <Heading as="h6" fontSize={20} textAlign="center" mb={2} color="blue.500">Followings</Heading>
                                    <InputGroup>
                                          <InputLeftAddon children={<SearchIcon />} />
                                          <Input type='text' placeholder='search' _focus="none" />
                                    </InputGroup>
                                    <Box mt={4}>
                                          {
                                                User?.followings?.map(f => (
                                                      <Box display="flex" alignItems="center" mb={4} justifyContent="space-between" key={f?.user?._id}>
                                                            <Box display="flex" alignItems="center">
                                                                  <Image src={f?.user?.profilePicture?.url} w="35px" height="35px" borderRadius="50%" border={"1px"} borderColor={"gray.600"}></Image>
                                                                  <Link to={`/profile/${f.user.username}`}>
                                                                        <Text ml={2} fontWeight={700}>{f.user.username}</Text>
                                                                  </Link>
                                                                  
                                                            </Box>
                                                            <Box>
                                                                  <Button onClick={(e) => {
                                                                        e.preventDefault()
                                                                        dispatch(followUnfollowAction(f?.user?._id))
                                                                  }}>Following</Button>
                                                            </Box>
                                                      </Box>
                                                ))
                                          }
                                    </Box>
                              </Box>
                  }
            </>

      )
}

export default Followings

                  // <Box display="flex" alignItems="center" mb={4} justifyContent="space-between" key={user?._id}>
                  //       <Box display="flex" alignItems="center">
                  //             <Image src={f?.user?.profilePicture?.url} w="35px" height="35px" borderRadius="50%" border={"1px"} borderColor={"gray.600"}></Image>
                  //             <Text ml={2} fontWeight={700}>{f.user.username}</Text>
                  //       </Box>

                  //       <Box>
                  //             <Button>Following</Button>
                  //       </Box>
                  // </Box>