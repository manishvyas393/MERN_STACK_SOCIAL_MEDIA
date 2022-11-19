import { ArrowBackIcon } from '@chakra-ui/icons'
import { Box, Button, Divider, Flex, Image, Input, Text } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { getChatsAction, getSingleChatAction } from '../../actions/chatActions'
import { getMessagesAction, sendMessageAction, setNotificationAction } from '../../actions/messagesAction'
import { SEND_MESSAGE_RESET, UPDATE_MESSAGES } from '../../constants/messagesConstants'
import io from "socket.io-client"
const endPoint = "http://localhost:3001" | "https://mern-instagram-cloned.herokuapp.com/";
let socket
const SingleChat = () => {
      const dispatch = useDispatch()
      const { id } = useParams()
      const { currentChat } = useSelector(state => state.selectedChat)
      const { messages } = useSelector(state => state.userMessages)
      const { user } = useSelector(state => state.user)
      const {sent } = useSelector(state => state.sendMessage)
      const [message, setMessage] = useState("")
      const sendMessage = async () => {
            const data = await dispatch(sendMessageAction(id, message))
            await socket.emit("newmessage", data.message)
            dispatch({ type: UPDATE_MESSAGES, payload: data.message })
      }
      useEffect(() => {
            socket = io(endPoint)
            socket.emit("getuser", user?._id)
            socket.emit("chatroom", id)
            socket.on("newMsg", (newmsg) => {
                  localStorage.setItem("m",JSON.stringify(newmsg))
                  if (!currentChat?._id || currentChat?._id !== newmsg?.chat?._id) {
                     dispatch(setNotificationAction(newmsg))   
                  }
                  else {
                        dispatch({ type: UPDATE_MESSAGES, payload: newmsg })
                  }
                  

            })
      }, [id,user?._id,currentChat?._id, dispatch])
      useEffect(() => {
            dispatch(getMessagesAction(id))
            dispatch(getSingleChatAction(id))
            dispatch(getChatsAction())
            if (sent) {
                  dispatch(getMessagesAction(id))
                  dispatch({ type: SEND_MESSAGE_RESET })
            }
      }, [id, dispatch, sent])
      return (
            <Box mt={16} px={8}>
                  <Flex direction={"column"}>
                        {
                              !currentChat?.isGroupChat ?
                                    currentChat?.users?.map(u => (
                                          u._id !== user?._id &&
                                          <>
                                                <Flex alignItems={"center"}>
                                                      <ArrowBackIcon fontSize={"24px"} />
                                                      <Image src={u?.profilePicture?.url} w="35px" height="35px" borderRadius="50%" shadow={"base"} mx={2}></Image>
                                                      <Text>{u?.username}</Text>
                                                </Flex>
                                          </>
                                    )) :
                                    <Text>{currentChat?.chatName} </Text>
                        }
                        <Divider border={"1px"} mt={2} />
                        <Box overflowY="auto"
                              sx={{
                                    '&::-webkit-scrollbar': {
                                          width: '5px',
                                          borderRadius: '5px',
                                          backgroundColor: `rgba(0, 0, 0, 0.05)`,
                                    },
                                    '&::-webkit-scrollbar-thumb': {
                                          backgroundColor: `rgba(0, 0, 0, 0.05)`,
                                    },
                              }}

                              my={4}
                              height="65vh">
                              {
                                    messages?.map(m => (
                                          <Flex justifyContent={m?.sender?._id === user?._id ? "flex-end" : "flex-start"}>
                                                <Text ml={m?.sender?._id === user?._id ? "250px" : 0}
                                                      my={2}
                                                      mr={m?.sender?._id !== user?._id ? "250px" : 0}
                                                      px={2}
                                                      py={2}
                                                      fontWeight={600}
                                                      borderRadius="2xl"
                                                      align={m?.sender?._id !== user?._id ? "left" : "right"}
                                                      backgroundColor={m?.sender?._id !== user?._id ? "gray.400" : "gray.200"}
                                                >{m?.content}</Text>
                                          </Flex>

                                    ))
                              }

                        </Box>
                        <Box display={"flex"}>
                              <Input type={"text"} value={message} onChange={(e) => setMessage(e.target.value)} backgroundColor="gray.200" mr={4} placeholder='Type a message'></Input>
                              <Button backgroundColor={"blue.500"} color="white" onClick={sendMessage}>Send</Button>
                        </Box>
                  </Flex>
            </Box>
      )
}
export default SingleChat