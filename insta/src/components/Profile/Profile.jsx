import { Box, Image, Text, Button } from '@chakra-ui/react'
import React, { useEffect } from 'react'
import GridOnIcon from '@mui/icons-material/GridOn';
import AssignmentIndIcon from '@mui/icons-material/AssignmentInd';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { clearErrors, getLoggedUserPostAction } from '../../actions/postAction';
import Loader from "../Loader/Loader"

const Profile = () => {
      const { posts, error, loading } = useSelector(state => state.yourPost)
      const { user: User, loading: userLoading } = useSelector(state => state.user)
      const dispatch = useDispatch()
      posts.sort((a, b) => {
            var dateA = new Date(a.createdAt).getTime();
            var dateB = new Date(b.createdAt).getTime();
            return dateA > dateB ? -1 : 1;
      });
      useEffect(() => {
            dispatch(getLoggedUserPostAction())
            if (error) {
                  dispatch(clearErrors())
            }
      }, [dispatch, error])
      return (
            <Box mt={16}>
                  <Box display="flex" justifyContent="space-between" px={6}>
                        <Image src={User?.profilePicture?.url} width="60px" height="60px" borderRadius="50%" border={"1px"} borderColor={"gray.600"} />
                        <Box display="flex" flexDirection="column" alignItems="center">
                              <Text fontSize={20} fontWeight={800}>
                                    {posts.length}
                              </Text>
                              <Text>
                                    Posts
                              </Text>
                        </Box>
                        <Link to="/followers">
                              <Box display="flex" flexDirection="column" alignItems="center">

                                    <Text fontSize={20} fontWeight={800}>
                                          {userLoading ? "0" : User?.followers?.length}
                                    </Text>
                                    <Text>
                                          followers
                                    </Text>
                              </Box>
                        </Link>
                        <Link to="/followings">
                              <Box display="flex" flexDirection="column" alignItems="center">

                                    <Text fontSize={20} fontWeight={800}>
                                          {userLoading ? "0" :
                                                User?.followings?.length}
                                    </Text>
                                    <Text>
                                          followings
                                    </Text>
                              </Box>
                        </Link>
                  </Box>
                  <Box px={6} mt={4}>
                        <Text>{User?.full_name}</Text>
                        <Text>{User?.bio}</Text>
                        <Text color={"blue.600"}>{User?.website}</Text>


                  </Box>
                  <Link to="/editprofile">
                        <Button width="90%" mt={4} mx={6} border="1px"  backgroundColor="blue.500" color={"white"}>Edit Profile</Button>
                  </Link>
                  <Box display="flex" width="100%" justifyContent="space-evenly" alignItems="center" mt={5}>
                        <Box borderBottom="1px" width="50%" display="flex" alignItems="center" justifyContent="center" py={2}>
                              <GridOnIcon style={{ fontSize: "30px" }} />
                        </Box>
                        <Box width="50%" display="flex" alignItems="center" justifyContent="center" py={2}>
                              <AssignmentIndIcon style={{ fontSize: "30px" }} />
                        </Box>
                  </Box>
                  {
                        loading ? <Loader /> : <Box display="flex" flexWrap="wrap" pl={1} mt={2} mb={20}>
                              {
                                    posts && posts.map((post) => (
                                          <Link to={`/post/${post._id}`} key={post.img.public_id}>
                                                <Image src={post.img.url} width="180px" height="160px" mr={2} mb={3} cursor="pointer" shadow={"base"} />
                                          </Link>

                                    ))
                              }
                        </Box>
                  }


            </Box>
      )
}

export default Profile