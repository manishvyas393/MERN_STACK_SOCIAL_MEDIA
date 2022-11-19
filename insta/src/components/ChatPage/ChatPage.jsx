import { Box, Input, InputGroup, InputLeftElement, Image, Text, Divider } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import { SearchIcon } from "@chakra-ui/icons"
import { useDispatch } from 'react-redux'
import { searchAction } from '../../actions/userActions'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { createChatAction, getChatsAction, getSingleChatAction } from '../../actions/chatActions'
import { getSender } from '../../chatLogic'
import TimeAgo from 'timeago-react'
import { CREATE_CHAT_RESET } from '../../constants/chatConstants'
const ChatPage = () => {
      const { user } = useSelector(state => state.user)
      const { chats } = useSelector(state => state.userChats)
      const { created } = useSelector(state => state.newChat)
      const [keyword, setKeyword] = useState("")
      let { users } = useSelector(state => state.searchedUsers)
      const dispatch = useDispatch()
      const selChat = (id) => {
            dispatch(getSingleChatAction(id))
      }
      const createChat = (u) => {
            dispatch(createChatAction(u))
            if (created) {
                  dispatch(getChatsAction())
                  dispatch({type:CREATE_CHAT_RESET})
            }
      }
      useEffect(() => {
            dispatch(getChatsAction())
            dispatch(searchAction(keyword))
      }, [keyword, dispatch])
      return (
            <Box mt={20} px={6}>
                  <InputGroup>
                        <InputLeftElement
                              pointerEvents='none'
                              children={<SearchIcon color='gray.600' />}
                        />
                        <Input type='Text' name="query" placeholder='Search' value={keyword} onChange={(e) => setKeyword(e.target.value)} />
                  </InputGroup>{
                        users[0] &&
                        <Box zIndex={"-11"} shadow={"dark-lg"} p={4}>
                              {
                                    users?.map((u) => (
                                          <Box cursor={"pointer"} mt={6} display="flex" alignItems="center" key={u?._id} onClick={()=>createChat(u?._id)}>
                                                <Image src={u?.profilePicture?.url} w="35px" height="35px" borderRadius="50%"></Image>
                                                <Text ml={4}>{u?.full_name}</Text>
                                          </Box>
                                    ))
                              }
                        </Box>
                  }
                  <Box>
                        {
                              chats?.map(chat => (
                                    <>
                                          <Link to={`/chat/${chat?._id}`} onClick={() => selChat(chat?._id)}>
                                                <Box display={"flex"} mt={6} justifyContent={"space-between"}>
                                                      <Box display="flex" alignItems="center" key={chat?._id}>
                                                            <Image shadow={"base"} mr={2} src={getSender(user, chat?.users).profilePicture.url} w="45px" height="45px" borderRadius="50%"></Image>
                                                            <Box>
                                                                  <Text fontWeight={"bold"}>
                                                                        {!chat.isGroupChat
                                                                              ? getSender(user, chat?.users).username
                                                                              : chat.chatName}
                                                                  </Text>
                                                                  <Text fontWeight={600} color={"gray.500"} fontSize={"14px"}>{chat?.latestMsg?.sender ? chat?.latestMsg?.sender === user?._id ? `you:${chat?.latestMsg?.content}` : `${getSender(user, chat.users).username}:${chat?.latestMsg?.content}` : "click to start chat"}</Text>
                                                            </Box>
                                                      </Box>
                                                      <Text fontSize={"12px"} fontWeight={600}>
                                                            <TimeAgo datetime={chat?.updatedAt} />
                                                      </Text>
                                                </Box>
                                          </Link>
                                          <Divider mt={4}></Divider>
                                    </>
                              ))
                        }
                  </Box>
            </Box>
      )
}
export default ChatPage