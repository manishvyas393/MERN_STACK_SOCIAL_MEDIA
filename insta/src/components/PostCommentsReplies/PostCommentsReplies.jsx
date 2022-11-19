import { Box, Image, Text, Collapse, Button, useDisclosure } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { DeleteIcon } from '@chakra-ui/icons'
import { format } from "timeago.js";
import { useDispatch, useSelector } from 'react-redux'
import { clearErrors, getPostCommentsUsersAction, postReplyOfCommentDeleteAction, postReplyOnCommentAction } from '../../actions/postAction'
import { DELETE_REPLY_OF_COMMENT_RESET, POSTING_REPLIES_ON_COMMENT_RESET } from '../../constants/postConstants'
import CommentBox from "../CommentBox/CommentBox"
const PostCommentsReplies = ({ replies, commentId, postId, commentsLength, commentedDate }) => {
      const { replyDeleted, error,replied } = useSelector(state => state.postingComment)
      const [reply,setReply]=useState("")
      const { isOpen, onToggle } = useDisclosure()
      let { isOpen: isOpen2, onToggle: onToggle2 } = useDisclosure()
      const dispatch = useDispatch()
      const replyOComment = (e,pId,cmtId,rply) => {
            e.preventDefault()
            dispatch(postReplyOnCommentAction(pId,cmtId,rply))
      }
      const deleteReply = (e, pId, cmtId, rplId) => {
            e.preventDefault()
            dispatch(postReplyOfCommentDeleteAction(pId, cmtId, rplId))
      }
      useEffect(() => {
            if (replyDeleted || replied) {
                  dispatch(getPostCommentsUsersAction(postId))
                  dispatch({type:POSTING_REPLIES_ON_COMMENT_RESET})
                  dispatch({ type: DELETE_REPLY_OF_COMMENT_RESET })
            }
            if (error) {
                  console.log(error)
                  dispatch(clearErrors())
            }
      }, [replyDeleted, postId, dispatch, error,replied,isOpen2])
      return (
            <Box>
                  <Box display={"flex"}>
                        <Text ml={2} fontSize={"12px"} fontWeight={"bold"} color={"gray.500"}>{format(commentedDate)}</Text>
                        <Text ml={4} fontSize={"12px"} fontWeight={"bold"} color={"gray.500"} onClick={onToggle2} cursor="pointer">reply</Text>
                        {
                              commentsLength !== 0 ?
                                    <Text ml={4} fontSize={"12px"} fontWeight={"bold"} color={"gray.500"} cursor="pointer" onClick={onToggle}>view all {commentsLength} reply </Text> : ""
                        }
                  </Box>
                  <Collapse in={isOpen} >
                        {
                              replies?.map(reply => (
                                    <>
                                          <Box display={"flex"} justifyContent={"space-between"} alignItems="center" key={reply?.replyId}>
                                                <Box display={"flex"} alignItems="center" key={reply?.replyId} mt={2}>
                                                      <Image src={reply?.replier?.profilePicture?.url} width="30px" height="30px" borderRadius="50%" border={"1px"} borderColor={"gray.600"}></Image>
                                                      <Link to={`/profile/${reply?.replier?.username}`}>
                                                            <Text ml={2} fontWeight={600} >{reply?.replier?.username}</Text>
                                                      </Link>
                                                      <Text ml={4}>{reply?.reply}</Text>
                                                </Box>
                                                <Box>
                                                      <Button ml={12} width="5" height="5" color={"gray.500"} onClick={(e) => deleteReply(e, postId, commentId, reply?.replyId)}>
                                                            <DeleteIcon></DeleteIcon>
                                                      </Button>
                                                </Box>
                                          </Box>
                                    </>

                              ))
                        }
                  </Collapse>
                  <Collapse in={isOpen2}>
                        <CommentBox display="flex" value={reply} onChange={(e)=>setReply(e.target.value)} btnName="reply" postCommentHandle={(e)=>replyOComment(e,postId,commentId,reply)} />
                  </Collapse>

            </Box>
      )


}

export default PostCommentsReplies