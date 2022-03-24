import { Flex, Image, Text, Box,Collapse,useDisclosure } from '@chakra-ui/react'
import React, { useEffect, useRef, useState } from 'react'
import TimeAgo from 'timeago-react';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { postlikestAction } from '../../actions/timeLineAction';
import { deletePostAction, getPostDetailsAction, postCommentAction } from '../../actions/postAction';
import { DO_LIKE_RESET } from '../../constants/timeLineConstants';
import CommentBox from '../CommentBox/CommentBox';
import { POSTING_COMMENT_RESET,DELETE_LOGGED_USER_POST_RESET } from '../../constants/postConstants';
import Loader from '../Loader/Loader';
import MoreVertIcon from '@mui/icons-material/MoreVert';
const PostDetails = () => {
      let bool = useRef();
      const [comment, setComment] = useState("")
      const { postDeleted } = useSelector(state => state.deletePost)
      const { commented } = useSelector(state => state.postingComment)
      const { post, loading } = useSelector(state => state.postDetails)
      const { liked } = useSelector(state => state.postLike)
      const dispatch = useDispatch()
      const { id } = useParams()
      const { user } = useSelector(state => state.user)
      const [like, setLike] = useState(null);
      const [isLiked, setIsLiked] = useState(false);
      const { isOpen, onToggle } = useDisclosure()
      const { isOpen: open, onToggle: toggle } = useDisclosure()
      const navigate=useNavigate()
      const likeHandler = () => {
            dispatch(postlikestAction(post._id))
            setLike(isLiked ? like - 1 : like + 1);
            setIsLiked(!isLiked);
      }
      const deletePost = (e) => {
            e.preventDefault()
            dispatch(deletePostAction(id))
      }
      const postComment = async (e, id, com) => {
            e.preventDefault()
            dispatch(postCommentAction(id, com))
      }
      useEffect(() => {
            dispatch(getPostDetailsAction(id))
            post?.likes?.map((l) => {
                  if (l?.userId?._id === user?._id) bool.current = true
                  else bool.current = false
                  if (bool.current) setIsLiked(true)
                  else setIsLiked(false)
                  return bool.current
            })
            if (liked || commented) {
                  dispatch(getPostDetailsAction(id))
                  dispatch({ type: POSTING_COMMENT_RESET })
                  dispatch({ type: DO_LIKE_RESET })
            }
            if (postDeleted) {
                  navigate("/profile")
                  dispatch({type:DELETE_LOGGED_USER_POST_RESET})
            }
      }, [dispatch, id, user?._id, liked, commented,postDeleted,navigate]);
      return (
            <>
                  {
                        loading ? <Loader /> :
                              <>
                                    {
                                          post?._id ?
                                                <Box backgroundColor="white" mt={16} px={2} py={4} shadow="dark-lg" borderRadius={"15px"} >
                                                      <Flex justifyContent={"space-between"} alignItems="center" position={"relative"} borderBottom="1px" pb={2} borderBottomColor="gray.300">
                                                            <Box display={"flex"} alignItems="center">
                                                                  <Image src={post.userId.profilePicture.url} w="35px" height="35px" borderRadius="50%"></Image>
                                                                  <Link to={`/profile/${post.userId.username}`}>
                                                                        <Text ml={2} fontWeight={700}>{post?.userId?.username}</Text>
                                                                  </Link>
                                                            </Box>
                                                            {
                                                                  user?.username === post.userId.username ?
                                                                        <Box shadow="base" borderRadius={"15px"} display="flex" alignItems={"center"} py={2}>
                                                                              <Collapse in={isOpen}>
                                                                                    <Flex mt={20} boxShadow="base" flexDirection={"column"} rounded='md' zIndex="1" right={1} top={-10} position={"absolute"} backgroundColor="white" display="flex" cursor="pointer">
                                                                                          <Link to={`/editpost/${post._id}`}>
                                                                                                <Text p={2}>edit</Text>
                                                                                          </Link>
                                                                                          <Text borderTop={"1px"} borderTopColor={"gray.400"} p={2} onClick={deletePost}>delete</Text>
                                                                                    </Flex>
                                                                              </Collapse>

                                                                              <MoreVertIcon style={{ color: "gray.400" }} onClick={onToggle}></MoreVertIcon>
                                                                        </Box> : ""
                                                            }


                                                      </Flex>
                                                      <Image src={post.img.url} w="100%" height="400px" ></Image>
                                                      <Flex alignItems="center" ml={3} mt={2}>
                                                            {isLiked ?
                                                                  <FavoriteIcon style={{ fontSize: "35px", cursor: "pointer", color: "red" }} onClick={likeHandler} /> :
                                                                  <FavoriteBorderIcon style={{ fontSize: "35px", cursor: "pointer" }} onClick={likeHandler} />
                                                            }
                                                            {
                                                                  post.comments.length !== 0 ?
                                                                        <Link to={`/comments/${post._id}`}>
                                                                              <ChatBubbleOutlineIcon style={{ fontSize: "35px", marginLeft: "5px", marginTop: "5px" }} />
                                                                        </Link>
                                                                        : <ChatBubbleOutlineIcon style={{ fontSize: "35px", marginLeft: "5px" }} onClick={toggle} />
                                                            }
                                                      </Flex>
                                                      <Flex flexDirection="column" ml={3} mt={2}>
                                                            <Link to={`/${post._id}/likes`} >
                                                                  <Text fontWeight={900} fontSize={16}>{post.likes.length} likes</Text>
                                                            </Link>
                                                            <Flex alignItems="center" >
                                                                  <Text fontWeight={800}>{post.userId.username}</Text>
                                                                  <Text ml={1} color="gray.700">{post.desc}</Text>
                                                            </Flex>{
                                                                  post?.comments?.length !== 0 ?
                                                                        <Link to={`/comments/${post._id}`}>
                                                                              <Text color="gray.500">View all {post?.comments?.length} coments</Text>
                                                                        </Link> : ""
                                                            }

                                                            <Text fontSize={12} color="gray.500">{<TimeAgo datetime={post?.createdAt}/>}</Text>
                                                            <Collapse in={open}>
                                                                  <CommentBox display="flex" value={comment} onChange={(e) => setComment(e.target.value)} postCommentHandle={(e) => postComment(e, post._id, comment)} />
                                                            </Collapse>
                                                      </Flex>
                                                </Box> :
                                                ""

                                    }
                              </>
                  }

            </>

      )
}
export default PostDetails