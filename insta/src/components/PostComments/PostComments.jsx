import React, { useEffect, useState } from 'react'
import { Box, Flex, Image, Text, Divider,Button } from '@chakra-ui/react'
import { useDispatch, useSelector } from 'react-redux'
import { ArrowBackIcon, DeleteIcon } from '@chakra-ui/icons'
import { Link, useParams } from 'react-router-dom'
import { clearErrors, getPostCommentsUsersAction, postCommentDeleteAction } from '../../actions/postAction'
import CommentBox from '../CommentBox/CommentBox'
import { postCommentAction } from '../../actions/postAction';
import { POSTING_COMMENT_RESET, POST_COMMENT_DELETE_RESET } from '../../constants/postConstants'
import PostCommentsReplies from '../PostCommentsReplies/PostCommentsReplies'
const PostComments = () => {
      const { id } = useParams()
      const { user } = useSelector(state => state.user)
      const { post, error } = useSelector(state => state.postComments)
      const [comment, setComment] = useState("")
      const {commented, error: commentError, deleted } = useSelector(state => state.postingComment)
      const dispatch = useDispatch()
      const postComment = async (e, id, com) => {
            e.preventDefault()
            dispatch(postCommentAction(id, com))
      }
      const deleteComment = async (e, postId, commentId) => {
            e.preventDefault()
            dispatch(postCommentDeleteAction(postId, commentId))
      }
      useEffect(() => {
            dispatch(getPostCommentsUsersAction(id))
            if (commented || deleted) {
                  dispatch(getPostCommentsUsersAction(id))
                  dispatch({ type: POSTING_COMMENT_RESET })
                  dispatch({ type: POST_COMMENT_DELETE_RESET })
            }
            if (error || commentError) {
                  dispatch(clearErrors())
            }
      }, [dispatch, id, commented, error, commentError, deleted])
      return (
            <>
                  <Box mt={16} px={4}
                        height="75vh"
                        overflow={"scroll"}
                        css={{
                              '&::-webkit-scrollbar': {
                                    width: '0px',
                              },
                              '&::-webkit-scrollbar-track': {
                                    width: '0px',
                              },
                        }}
                  >
                        <Box display={"flex"} alignItems={"center"}>
                              <Link to={"/timeline"}>
                                    <ArrowBackIcon fontSize={"4xl"}></ArrowBackIcon>
                              </Link>
                              <Text fontSize={"2xl"} fontWeight={800} ml={4}>Comments</Text>
                        </Box>
                        <Box mt={2} display="flex" alignItems={"center"}>
                              <Image src={post?.userId?.profilePicture?.url} width="40px" height="40px" borderRadius="50%" border={"1px"}></Image>
                              <Link to={`/profile/${post?.userId?.username}`}>
                                    <Text fontWeight={600} ml={2}>{post?.userId?.username}</Text>
                              </Link>
                              <Text ml={4}>{post?.desc}</Text>

                        </Box>
                        <Divider mt={2} width='full' ></Divider>
                        <Box>
                              {post?.comments.map((c) => (
                                    <Box width={"100%"} >
                                          <Box mt={2} display="flex" alignItems={"center"} key={c?.id} justifyContent={"space-between"}>
                                                <Flex>
                                                      <Image src={c?.user?.profilePicture?.url} width="40px" height="40px" borderRadius="50%" border={"1px"} borderColor={"gray.600"}></Image>
                                                      <Flex flexDirection={"column"}>
                                                            <Box display={"flex"}>
                                                                  <Link to={`/profile/${c?.user?.username}`}>
                                                                        <Text fontWeight={600} ml={2}>{c?.user?.username}</Text>
                                                                  </Link>
                                                                  <Text ml={4}>{c?.comment}</Text>
                                                            </Box>
                                                            <Box display="flex" >
                                                                  <Box display={"flex"} alignItems="center" flexDirection={"column"}>

                                                                        <PostCommentsReplies
                                                                              replies={c?.replies}
                                                                              commentedDate={c.commentedOn}
                                                                              commentId={c.commentId}
                                                                              commentsLength={c?.replies?.length}
                                                                              postId={post._id}></PostCommentsReplies>

                                                                  </Box>
                                                            </Box>
                                                      </Flex>
                                                </Flex>
                                                {
                                                      c?.user?.username === user?.username || post?.userId?.username === user?.username ?
                                                            <Button onClick={(e) => deleteComment(e, post._id, c.commentId)} backgroundColor="transparent" _hover={{ backgroundColor: "tranparent" }}>
                                                                  <DeleteIcon color={"gray.500"} _hover={{ color: "blue.500" }}></DeleteIcon>
                                                            </Button>
                                                            : ""
                                                }

                                          </Box>
                                    </Box>
                              ))
                              }
                        </Box>
                  </Box>
                  <Box width="100%" px={4} backgroundColor="white" shadow="dark-lg" borderRadius={"10px"} mt={5}>

                        <CommentBox display={"flex"} value={comment} btnName="comment" onChange={(e) => setComment(e.target.value)} postCommentHandle={(e) => postComment(e, post._id, comment)} />
                  </Box>
            </>

      )
}

export default PostComments