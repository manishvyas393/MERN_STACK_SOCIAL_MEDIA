import { Box, Image, Text, Button } from '@chakra-ui/react'
import React, { useEffect } from 'react'
import GridOnIcon from '@mui/icons-material/GridOn';
import AssignmentIndIcon from '@mui/icons-material/AssignmentInd';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { otherUserProfileAction, clearErrors } from '../../actions/otherUserProfileAction';
import { followUnfollowAction } from '../../actions/followUnfollowAction';
import Loader from "../Loader/Loader"
const OtherUserProfile = () => {
      const { username } = useParams()
      const { success } = useSelector(state => state.followUnfollow)
      const { loading, profile, error } = useSelector(state => state.otherUser)
      const { user } = useSelector(state => state.user)
      const dispatch = useDispatch()
      const navigate = useNavigate()
      useEffect(() => {
            console.log(window.location.pathname === `/profile/${username}`)
            if (error) {
                  dispatch(clearErrors())
            }
            if (user?.username === username) {
                  navigate("/profile")
            }
            if (success) {
                  dispatch(otherUserProfileAction(username))
            }
            dispatch(otherUserProfileAction(username))
            sessionStorage.setItem("username",JSON.stringify(username))
      }, [dispatch, username, navigate, user?.username, error, success])
      return (
            <>
                  {loading ? <Loader /> :
                        profile?.user?.profileStatus === "private" ?
                              (profile?.user?.requested === true) | (profile?.user?.notRequested && profile?.user?.notFollowed) ?
                                    /*Private Account Requested or Not Requested And Following*/
                                    <Box mt={16} key={profile?.userId}>
                                          <Box display="flex" justifyContent="space-between" px={6}>
                                                <Image src={profile?.user?.dp?.url} width="60px" height="60px" borderRadius="50%" border={"1px"} borderColor={"gray.600"} />
                                                <Box display="flex" flexDirection="column" alignItems="center">
                                                      <Text fontSize={20} fontWeight={800}>
                                                            {profile?.user?.totalPosts}
                                                      </Text>
                                                      <Text>
                                                            Posts
                                                      </Text>
                                                </Box>
                                                <Box display="flex" flexDirection="column" alignItems="center">

                                                      <Text fontSize={20} fontWeight={800}>
                                                            {profile?.user?.totalFollowers}
                                                      </Text>
                                                      <Text>
                                                            followers
                                                      </Text>
                                                </Box>
                                                <Box display="flex" flexDirection="column" alignItems="center">

                                                      <Text fontSize={20} fontWeight={800}>
                                                            {profile?.user?.totalFollowings}
                                                      </Text>
                                                      <Text>
                                                            followings
                                                      </Text>
                                                </Box>
                                          </Box>
                                          <Box px={6} mt={4}>
                                                <Text>{profile?.user?.userUserName}</Text>
                                                <Text>{profile?.user?.userBio}</Text>
                                                <Text>{profile?.user?.userWebsite}</Text>
                                          </Box>

                                          {
                                                user?.followers?.length !== 0 && user?.followers?.map((follower) => (
                                                      follower.user.username === username ? <Text align="center">{username} Follows you</Text> : ""
                                                ))
                                          }
                                          <Button width="90%" mt={4} mx={6} border="1px" backgroundColor="blue.500" color="white" onClick={(e) => {
                                                e.preventDefault()
                                                dispatch(followUnfollowAction(profile.user.userId))
                                          }} >
                                                {profile?.user?.requested ? "Requested" : profile?.user?.notRequested && profile?.user?.notFollowed ? "Follow" : ""}
                                          </Button>
                                          <Box display="flex" width="100%" justifyContent="space-evenly" alignItems="center" mt={5}>
                                                <Box borderBottom="1px" width="50%" display="flex" alignItems="center" justifyContent="center" py={2}>
                                                      <GridOnIcon style={{ fontSize: "30px" }} />
                                                </Box>
                                                <Box width="50%" display="flex" alignItems="center" justifyContent="center" py={2}>
                                                      <AssignmentIndIcon style={{ fontSize: "30px" }} />
                                                </Box>
                                          </Box>
                                          <Box pl={1} mt={20} mb={20} display="flex" justifyContent={"center"} alignItems="center">
                                                <Text fontWeight={800} fontSize="20px">Follow {username} To See Their Posts</Text>
                                          </Box>
                                    </Box>
                                    :
                                    /*Private Account Followed*/
                                    profile?.followed &&
                                    <Box mt={16} key={profile?.user._id}>
                                          <Box display="flex" justifyContent="space-between" px={6}>
                                                <Image src={profile?.user?.profilePicture?.url} width="60px" height="60px" borderRadius="50%" border={"1px"} borderColor={"gray.600"} />
                                                <Box display="flex" flexDirection="column" alignItems="center">
                                                      <Text fontSize={20} fontWeight={800}>
                                                            {profile?.post?.length}
                                                      </Text>
                                                      <Text>
                                                            Posts
                                                      </Text>
                                                </Box>
                                                <Link to={`/profile/${username}/followers`}>
                                                      <Box display="flex" flexDirection="column" alignItems="center">

                                                            <Text fontSize={20} fontWeight={800}>
                                                                  {profile?.user?.followers?.length}
                                                            </Text>
                                                            <Text>
                                                                  followers
                                                            </Text>
                                                      </Box>
                                                </Link>
                                                <Link to={`/profile/${username}/followings`}>
                                                      <Box display="flex" flexDirection="column" alignItems="center">
                                                            <Text fontSize={20} fontWeight={800}>
                                                                  {profile?.user?.followings?.length}
                                                            </Text>
                                                            <Text>
                                                                  followings
                                                            </Text>
                                                      </Box>
                                                </Link>
                                          </Box>
                                          <Box px={6} mt={4}>
                                                <Text>{profile?.user?.full_name}</Text>
                                                <Text>{profile?.user?.bio}</Text>
                                                <Text>website</Text>
                                          </Box>

                                          {
                                                user?.followers?.length !== 0 && user?.followers?.map((follower) => (
                                                      follower.user.username === username ? <Text align="center">{username} Follows you</Text> : ""
                                                ))
                                          }
                                          <Button width="90%" mt={4} mx={6} border="1px" backgroundColor="blue.500" color="white" onClick={(e) => {
                                                e.preventDefault()
                                                dispatch(followUnfollowAction(profile.user._id))
                                          }} >
                                                Following
                                          </Button>

                                          <Box display="flex" width="100%" justifyContent="space-evenly" alignItems="center" mt={5}>
                                                <Box borderBottom="1px" width="50%" display="flex" alignItems="center" justifyContent="center" py={2}>
                                                      <GridOnIcon style={{ fontSize: "30px" }} />
                                                </Box>
                                                <Box width="50%" display="flex" alignItems="center" justifyContent="center" py={2}>
                                                      <AssignmentIndIcon style={{ fontSize: "30px" }} />
                                                </Box>
                                          </Box>
                                          <Box display="flex" flexWrap="wrap" pl={1} mt={2} mb={20}>
                                                {
                                                      profile?.post && profile?.post?.map((post) => (
                                                            <Image src={post?.img?.url} width="180px" height="160px" mr={2} mb={3} key={post.img.public_id} cursor="pointer" />

                                                      ))
                                                }
                                          </Box>
                                    </Box> :
                              /*Public Account */
                              <Box mt={16} key={profile?.user?._id}>
                                    <Box display="flex" justifyContent="space-between" px={6}>
                                          <Image src={profile?.user?.profilePicture?.url} width="60px" height="60px" borderRadius="50%" border={"1px"} borderColor={"gray.600"} />
                                          <Box display="flex" flexDirection="column" alignItems="center">
                                                <Text fontSize={20} fontWeight={800}>
                                                      {profile?.post?.length}
                                                </Text>
                                                <Text>
                                                      Posts
                                                </Text>
                                          </Box>
                                          <Link to={`/profile/${username}/followers`}>
                                                <Box display="flex" flexDirection="column" alignItems="center">

                                                      <Text fontSize={20} fontWeight={800}>
                                                            {profile?.user?.followers?.length}
                                                      </Text>
                                                      <Text>
                                                            followers
                                                      </Text>
                                                </Box>
                                          </Link>
                                          <Link to={`/profile/${username}/followings`}>
                                                <Box display="flex" flexDirection="column" alignItems="center">

                                                      <Text fontSize={20} fontWeight={800}>
                                                            {profile?.user?.followings?.length}
                                                      </Text>
                                                      <Text>
                                                            followings
                                                      </Text>
                                                </Box>
                                          </Link>
                                    </Box>
                                    <Box px={6} mt={4}>
                                          <Text>{profile?.user?.full_name}</Text>
                                          <Text>{profile?.user?.bio}</Text>
                                          <Text>website</Text>
                                    </Box>

                                    {
                                          user?.followers?.length !== 0 && user?.followers?.map((follower) => (
                                                follower.user.username === username ? <Text align="center">{username} Follows you</Text> : ""
                                          ))
                                    }
                                    <Button width="90%" mt={4} mx={6} border="1px" backgroundColor="blue.500" color="white" onClick={(e) => {
                                          e.preventDefault()
                                          dispatch(followUnfollowAction(profile.user._id))
                                    }} >
                                          {profile?.followed ? "Following" : "Follow"}
                                    </Button>

                                    <Box display="flex" width="100%" justifyContent="space-evenly" alignItems="center" mt={5}>
                                          <Box borderBottom="1px" width="50%" display="flex" alignItems="center" justifyContent="center" py={2}>
                                                <GridOnIcon style={{ fontSize: "30px" }} />
                                          </Box>
                                          <Box width="50%" display="flex" alignItems="center" justifyContent="center" py={2}>
                                                <AssignmentIndIcon style={{ fontSize: "30px" }} />
                                          </Box>
                                    </Box>
                                    <Box display="flex" flexWrap="wrap" pl={1} mt={2} mb={20}>
                                          {
                                                profile?.post && profile?.post?.map((post) => (
                                                      <Image src={post?.img?.url} width="180px" height="160px" mr={2} mb={3} key={post.img.public_id} cursor="pointer" />

                                                ))
                                          }
                                    </Box>
                              </Box>
                  }
            </>
      )
}

export default OtherUserProfile