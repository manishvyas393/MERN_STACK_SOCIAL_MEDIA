import { Box, InputGroup, InputLeftAddon, Input, Image, Text, Button, Heading } from '@chakra-ui/react'
import React, { useEffect } from 'react'
import SearchIcon from '@mui/icons-material/Search';
import { useDispatch, useSelector } from 'react-redux';
import { userProfileAction } from '../../actions/userActions'
import { Link, useParams } from 'react-router-dom';
import { otherUserProfileAction } from '../../actions/otherUserProfileAction';
import { clearErrors, removeFollowerRequestAction } from "../../actions/followUnfollowAction"
import { REMOVE_FOLLOWER_FROM_FOLLOWERS_RESET } from '../../constants/followUnfollowConstants';
const Followers = () => {
      const { username } = useParams()
      const { user: User } = useSelector(state => state.user)
      const { profile } = useSelector(state => state.otherUser)
      const { success } = useSelector(state => state.followUnfollow)
      const { removed,error } = useSelector(state => state.acceptOrCancelRequest)
      const dispatch = useDispatch()
      useEffect(() => {
            if (window.location.pathname === `/profile/${username}/followers` || window.location.pathname === `/profile/${username}/followings`) {
                  dispatch(otherUserProfileAction(username))
            }
            if (success || removed) {
                  dispatch(userProfileAction())
                  dispatch({type:REMOVE_FOLLOWER_FROM_FOLLOWERS_RESET})
            }
            if (error) {
                  console.log(error)
                  dispatch(clearErrors())
            }
      }, [dispatch, success, username, removed,error])
      return (
            <> {window.location.pathname === `/profile/${username}/followers` ?
                  <Box mt={5} mx={4}>
                        <Heading as="h6" fontSize={20} textAlign="center" mb={2} color="blue.500">Followers</Heading>
                        <InputGroup>
                              <InputLeftAddon children={<SearchIcon />} />
                              <Input type='text' placeholder='search' _focus="none" />
                        </InputGroup>

                        <Box mt={4}>
                              {
                                    profile?.user?.followers?.length !== 0 ?
                                          profile?.user?.followers?.map((follower) => (
                                                follower.user.username === User?.username ?
                                                      <Box display="flex" alignItems="center" mb={4} justifyContent="space-between" key={follower.user._id}>
                                                            <Box display="flex" alignItems="center">
                                                                  <Image src={follower?.user?.profilePicture?.url} w="35px" height="35px" borderRadius="50%" border={"1px"} borderColor={"gray.600"}></Image>
                                                                  <Text ml={2} fontWeight={700}>{follower?.user?.username}</Text>
                                                            </Box>
                                                            <Link to={"/profile"}>
                                                                  <Button backgroundColor={"green.400"} color="white">
                                                                        Your Profile
                                                                  </Button>
                                                            </Link>

                                                      </Box> :
                                                      <Box display="flex" alignItems="center" mb={4} justifyContent="space-between" key={follower.user._id}>
                                                            <Box display="flex" alignItems="center">
                                                                  <Image src={follower?.user?.profilePicture?.url} w="35px" height="35px" borderRadius="50%" border={"1px"} borderColor={"gray.600"}></Image>
                                                                  <Text ml={2} fontWeight={700}>{follower?.user?.username}</Text>
                                                            </Box>
                                                            <Link to={`/profile/${follower?.user?.username}`}>
                                                                  <Button backgroundColor={"blue.400"} color="white">
                                                                        View Profile
                                                                  </Button>
                                                            </Link>

                                                      </Box>

                                          ))
                                          : <Box display={"flex"} justifyContent={"center"} alignItems={"center"} fontSize={"20px"} fontWeight={"800"}>
                                                <Text>No Followers</Text>
                                          </Box>
                              }

                        </Box>
                  </Box > :
                  <Box mt={5} mx={4}>
                        <Heading as="h6" fontSize={20} textAlign="center" mb={2} color="blue.500">Followers</Heading>
                        <InputGroup>
                              <InputLeftAddon children={<SearchIcon />} />
                              <Input type='text' placeholder='search' _focus="none" />
                        </InputGroup>

                        <Box mt={4}>
                              {
                                    User?.followers?.length !== 0 ? User?.followers?.map((follower) => (
                                          <Box display="flex" alignItems="center" mb={4} justifyContent="space-between" key={follower.user._id}>
                                                <Box display="flex" alignItems="center">
                                                      <Image src={follower?.user?.profilePicture?.url} w="35px" height="35px" borderRadius="50%" border={"1px"} borderColor={"gray.600"}></Image>
                                                      <Text ml={2} fontWeight={700}>{follower?.user?.username}</Text>
                                                </Box>

                                                <Box w={"30%"}>
                                                      <Link to={`/profile/${follower?.user?.username}`}>
                                                            <Button p={4} width="45%" backgroundColor={"blue.500"} color="white" fontSize={"10px"}>View Profile</Button>
                                                      </Link>
                                                      <Button p={1} ml={"5px"} fontSize={"10px"} width="45%" onClick={(e) => {
                                                            e.preventDefault()
                                                            dispatch(removeFollowerRequestAction(follower?.user?._id))
                                                      }}>
                                                            Remove
                                                      </Button>
                                                </Box>
                                          </Box>
                                    )) : <Box display={"flex"} justifyContent={"center"} alignItems={"center"} fontSize={"20px"} fontWeight={"800"}>
                                          <Text>No Followers</Text>
                                    </Box>
                              }

                        </Box>
                  </Box >
            }
            </>
      )
}

export default Followers