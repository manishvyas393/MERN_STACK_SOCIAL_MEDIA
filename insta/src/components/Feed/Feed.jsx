import { Flex, Image, Text, Box, Collapse, useDisclosure } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import TimeAgo from 'timeago-react';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { postlikestAction, timelinePostAction } from '../../actions/timeLineAction';
import CommentBox from '../CommentBox/CommentBox';
import { clearErrors, deletePostAction, postCommentAction } from '../../actions/postAction';
import { DELETE_LOGGED_USER_POST_RESET, POSTING_COMMENT_RESET } from '../../constants/postConstants';
import MoreVertIcon from '@mui/icons-material/MoreVert';
const Feed = ({ post }) => {
      const { user } = useSelector(state => state.user)
      const { postDeleted } = useSelector(state => state.deletePost)
      const [comment, setComment] = useState("")
      const { commented, error } = useSelector(state => state.postingComment)
      const dispatch = useDispatch()
      const [like, setLike] = useState(post.likes.length);
      const [isLiked, setIsLiked] = useState(false);
      const { isOpen, onToggle } = useDisclosure()
      const { isOpen: open, onToggle: toggle } = useDisclosure()
      const likeHandler = () => {
            dispatch(postlikestAction(post._id))
            setLike(isLiked ? like - 1 : like + 1);
            setIsLiked(!isLiked);
      };
      const postComment = async (e, id, com) => {
            e.preventDefault()
            dispatch(postCommentAction(id, com))
      }
      const deletePost = (e, id) => {
            e.preventDefault()
            dispatch(deletePostAction(id))
      }
      useEffect(() => {
            post?.likes?.map((l) => (
                  l?.userId === user?._id ?
                        setIsLiked(true) : setIsLiked(false)
            ))
            if (commented || postDeleted) {
                  dispatch(timelinePostAction())
                  dispatch({ type: POSTING_COMMENT_RESET })
                  dispatch({ type: DELETE_LOGGED_USER_POST_RESET })
            }
            if (error) {
                  dispatch(clearErrors())
            }
      }, [user?._id, post?.likes, dispatch, commented, error, postDeleted]);
      return (
            <Box mt={{base:24,md:36,lg:16}} px={2} >
                  <Box backgroundColor="white" px={2} py={4} key={post._id} shadow="dark-lg" borderRadius={"15px"} >
                        <Flex justifyContent={"space-between"} alignItems="center" position={"relative"} borderBottom="1px" pb={2} borderBottomColor="gray.300">
                              <Box display={"flex"} alignItems="center">
                                    <Image src={post.userId.profilePicture.url} w="35px" height="35px" borderRadius="50%" border={"1px"} borderColor={"gray.600"}></Image>
                                    <Link to={`/profile/${post.userId.username}`}>
                                          <Text ml={2} fontWeight={700}>{post.userId.username}</Text>
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
                                                            <Text borderTop={"1px"} borderTopColor={"gray.400"} p={2} onClick={(e) => deletePost(e, post?._id)}>delete</Text>
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
                                    <Text fontWeight={900} fontSize={16}>{like} likes</Text>
                              </Link>
                              <Flex alignItems="center">
                                    <Link to={`/profile/${post.userId.username}`}>
                                          <Text fontWeight={700}>{post.userId.username}</Text>
                                    </Link>
                                    <Text ml={1.5} color="gray.700">{post.desc}</Text>
                              </Flex>{
                                    post.comments.length !== 0 ?
                                          <Link to={`/comments/${post._id}`}>
                                                <Text color="gray.500">View all {post.comments.length} coments</Text>
                                          </Link>
                                          : ""
                              }
                              <Text fontSize={12} color="gray.500">{<TimeAgo datetime={post?.createdAt}/>}</Text>
                              <Collapse in={open}>
                                    <CommentBox display="flex" value={comment} onChange={(e) => setComment(e.target.value)} postCommentHandle={(e) => postComment(e, post._id, comment)} />
                              </Collapse>

                        </Flex>
                  </Box>
            </Box>


      )
}
export default Feed