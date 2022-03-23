import { Box, Input, InputGroup, InputLeftElement, Image, Text } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import { SearchIcon } from "@chakra-ui/icons"
import { useDispatch } from 'react-redux'
import { useSelector } from 'react-redux'
import { Link, useParams } from 'react-router-dom'
import { getPostLikesUsersAction } from '../../actions/postAction'
const LikersList = () => {
      let { postLikers } = useSelector(state => state.postLikedUsers)
      const [search, setSearch] = useState("")
      const { id } = useParams()
      const dispatch = useDispatch()
      useEffect(() => {
            dispatch(getPostLikesUsersAction(id))
      }, [dispatch, id])
      return (
            <Box mt={20} px={6}>
                  <InputGroup>
                        <InputLeftElement
                              pointerEvents='none'
                              children={<SearchIcon color='gray.600' />}
                        />
                        <Input type='Text' value={search} name="query" placeholder='Search' onChange={(e) => setSearch(e.target.value)}/>
                  </InputGroup>
                  {
                        postLikers.filter(l => l.userId?.username.includes(search)).map((liker) => (
                              <Link to={`/profile/${liker?.userId?.username}`} key={liker.userId._id}>
                                    <Box mt={6} display="flex" alignItems="center" >
                                          <Image src={liker?.userId?.profilePicture?.url} w="35px" height="35px" borderRadius="50%" border={"1px"} borderColor={"gray.600"}></Image>
                                          <Text ml={4}>{liker?.userId?.username}</Text>
                                    </Box>
                              </Link>
))
                  }
              

            </Box>
      )
}

export default LikersList