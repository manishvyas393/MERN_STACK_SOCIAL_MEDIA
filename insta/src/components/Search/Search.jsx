import { Box, Input, InputGroup, InputLeftElement,Image,Text} from '@chakra-ui/react'
import React, { useEffect,useState} from 'react'
import { SearchIcon } from "@chakra-ui/icons"
import { useDispatch } from 'react-redux'
import { searchAction } from '../../actions/userActions'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
const Search = () => {
      const [keyword, setKeyword] = useState("")
      let {users}=useSelector(state=>state.searchedUsers)
      const dispatch = useDispatch()
      useEffect(() => {
                  dispatch(searchAction(keyword))
      },[keyword,dispatch])
      
      return (
            <Box mt={20} px={6}>
                  <InputGroup>
                        <InputLeftElement
                              pointerEvents='none'
                              children={<SearchIcon color='gray.600' />}
                        />
                        <Input type='Text' name="query" placeholder='Search' value={keyword} onChange={(e)=>setKeyword(e.target.value)}/>
                  </InputGroup>
                  {
                        users.map((user) => (
                              <Link to={`/profile/${user.username}`} key={user._id}>
                                    <Box mt={6} display="flex" alignItems="center" key={user._id}>
                                          <Image src={user.profilePicture.url} w="35px" height="35px" borderRadius="50%"></Image>
                                          <Text ml={4}>{user.full_name}</Text>
                                    </Box>  
                              </Link>
                             
                        ))
                  }
                 
            </Box>
      )
}

export default Search