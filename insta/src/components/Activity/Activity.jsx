import React, { useEffect } from 'react'
import { Box, Button, Image, Text } from '@chakra-ui/react'
import { useDispatch, useSelector } from 'react-redux'
import { acceptFollowRequestAction, cancelFollowRequestAction } from '../../actions/followUnfollowAction'
import { userProfileAction } from '../../actions/userActions'
import { Link } from 'react-router-dom'
const Activity = () => {
      const { user } = useSelector(state => state.user)
      const dispatch = useDispatch()
      const { msg, success } = useSelector(state => state.acceptOrCancelRequest)
      useEffect(() => {
            if (success) {
                  console.log(success)
                  dispatch(userProfileAction())
            }
      },[success,msg,dispatch])
      return (
            <Box py={16} px={4}>
                  {
                       user?.followRequests?.length!==0? user?.followRequests?.map((f) => (
                              <Box display="flex" alignItems="center" mb={4} justifyContent="space-between">
                                    <Box display="flex" alignItems={"center"}>
                                         <Image src={f?.user?.profilePicture?.url} width="60px" height="60px"></Image>
                                         <Link to={`/prpfile/${f?.user?.username}`}>
                                               <Text ml={2} fontSize="18px" fontWeight={"600"}>{f?.user?.username}</Text>
                                         </Link>
                                         
                                    </Box>
                                    <Box display={"flex"} alignItems="center">
                                          <Button width={16} fontSize="14px" backgroundColor={"blue.400"} color={"white"} mr={2} height="30px"
                                                onClick={(e) => {
                                                      e.preventDefault()
                                                      dispatch(acceptFollowRequestAction(f?.user?._id))
                                                }}
                                          >confirm</Button>

                                          <Button width={16} fontSize="14px" height="30px"
                                                onClick={(e) => {
                                                      e.preventDefault()
                                                      dispatch(cancelFollowRequestAction(f?.user?._id))
                                                }}
                                          >delete</Button>
                                    </Box>
                              </Box>
                       )) :
                              <Box display={"flex"} justifyContent="center" alignItems={"center"} mt={12}>
                                    <Text fontSize={"3xl"} fontWeight={600} color="blue.400">No Requests</Text>
                              </Box>
                  }
            </Box>
      )
}

export default Activity