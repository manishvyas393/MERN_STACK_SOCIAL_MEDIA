import { Flex, Image, Text, Box } from '@chakra-ui/react'
import React from 'react'
import HomeIcon from '@mui/icons-material/Home';
import SearchIcon from '@mui/icons-material/Search';
import MovieIcon from '@mui/icons-material/Movie';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
const Footer = ({ show }) => {
      const { user } = useSelector(state => state.user)

      return (

            <Flex justifyContent="space-between"
                  alignItems="center" px={8} py={3}
                  borderTop="2px" borderTopColor="gray.400" position="fixed"
                  width={{ lg: "30%",  base: "100%",md:"200%" }} backgroundColor="white"
                  bottom="0px"
                  display={show}
            >
                  <Link to="/">
                        <Box shadow={"base"} borderRadius={"50px"} p={1} alignItems="center" display={"flex"}>
                              <HomeIcon style={{ fontSize: "36px" }} />
                        </Box>
                  </Link>

                  <Link to="/search">
                        <Box shadow={"base"} borderRadius={"50px"} p={1} alignItems="center" display={"flex"}>
                              <SearchIcon style={{ fontSize: "36px" }} />
                        </Box>

                  </Link>
                  <Box shadow={"base"} borderRadius={"50px"} p={1} alignItems="center" display={"flex"}>
                        <MovieIcon style={{ fontSize: "36px" }} />
                  </Box>

                  <Link to={"/activity"}>
                        <Box shadow={"base"} borderRadius={"50px"} p={1} alignItems="center" display={"flex"}>
                              <PersonAddIcon style={{ fontSize: "36px" }} />
                              {
                                    user?.followRequests?.length !== 0 ?
                                          <Text position="absolute" top={"-1"} backgroundColor="red" px={2}>{user?.followRequests?.length} Request</Text> : ""
                              }

                        </Box>
                  </Link>

                  <Link to="/profile">
                        <Box shadow={"base"} borderRadius={"50px"} p={1} alignItems="center" display={"flex"}>
                              <Image src={user?.profilePicture?.url} width="40px" borderRadius="50%" height="40px" border={"1px"} borderColor={"gray.600"} />

                        </Box>
                  </Link>

            </Flex>


      )
}

export default Footer