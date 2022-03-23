import { ArrowBackIcon, CheckIcon } from '@chakra-ui/icons'
import { Box, Button, Divider,Image, Input, Text } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useParams } from 'react-router-dom'
import { clearErrors, getPostDetailsAction, updatePostAction } from '../../actions/postAction'
import TimeAgo from 'timeago-react';
import { UPDATE_LOGGED_USER_POST_RESET } from '../../constants/postConstants'
const EditPost = () => {
      const { id } = useParams()
      const {updated,error}=useSelector(state=>state.newPost)
      const {post}=useSelector(state=>state.postDetails)
      const dispatch = useDispatch()
      const [caption, setCaption] = useState("")
      const updatePostHandle = (e) => {
            e.preventDefault()
            const updateForm = new FormData()
            updateForm.set("desc", caption)
            dispatch(updatePostAction(id,updateForm))
      }
      useEffect(() => {
            if (error) {
                  dispatch(clearErrors())
            }
            if (updated) {
                  dispatch(getPostDetailsAction(id)) 
                  dispatch({type:UPDATE_LOGGED_USER_POST_RESET})
            }
            dispatch(getPostDetailsAction(id))  
      }, [dispatch,id,error,updated])
      return (
            <Box mt={16} px={4}>
                  <Box>
                        <Box display={"flex"} justifyContent={"space-between"}>
                              <Box display={"flex"} alignItems="center">
                                    <Link to={"/timeline"}>
                                          <ArrowBackIcon fontSize={"30px"}></ArrowBackIcon>
                                    </Link>
                                    <Text fontSize={"24px"} ml={2}>Edit Post</Text>
                              </Box>
                              <Box>
                                    <Button disabled={caption===""?true:false}>
                                          <CheckIcon color={"blue.500"} fontSize={"30px"} onClick={caption !== "" ?updatePostHandle:""} cursor="pointer"></CheckIcon>
                                    </Button>
                                   
                              </Box>

                        </Box>
                        <Box mt={4}>
                              <Box display="flex" alignItems={"center"}>
                                    <Image src={post?.userId?.profilePicture?.url} width="40px" height="40px"></Image>
                                    <Box display={"flex"} flexDirection="column" justifyContent={"center"} ml={2}>
                                          <Text fontSize={"16px"}>{post?.userId?.username}</Text>
                                          <Text fontSize={"10px"} fontWeight={600} color={"gray.500"}>Posted {<TimeAgo datetime={post?.createdAt}></TimeAgo>}</Text>
                                    </Box>
                                    
                              </Box>
                              <Divider mt={4}></Divider>
                              <Box display={"flex"} justifyContent="center" mt={2} alignItems={"center"} flexDirection="column">
                                    <Image src={post?.img?.url} width="60%" height="40%"></Image>
                                    <Input mt={2} type="text" name='desc' value={caption} placeholder={post?.desc} variant='flushed' borderBottomColor={"blue.500"} onChange={e=>setCaption(e.target.value)} _placeholder={{color:"gray.800",fontWeight:"600"}}></Input>
                              </Box>
                              
                        </Box>
                  </Box>

            </Box>
      )
}

export default EditPost