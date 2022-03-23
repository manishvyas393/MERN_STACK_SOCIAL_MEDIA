import { Box, Image, Button, Input } from '@chakra-ui/react'
import React from 'react'
import { useSelector } from 'react-redux'

const CommentBox = ({display,postCommentHandle,value,onChange,btnName}) => {
      const { user } = useSelector(state => state.user)
      return (
            <Box display={display} alignItems="center" mt={2} py={3}>
                  <Image src={user?.profilePicture?.url} w="35px" height="35px" borderRadius="50%" border={"1px"} borderColor={"gray.600"}></Image>
                  <Input type={"text"} name="comment" value={value} mx={4} onChange={onChange}></Input>
                  <Button fontSize={"12px"} px={6} backgroundColor="blue.400" color={'white'} onClick={postCommentHandle}>Post {btnName}</Button>
      
            </Box>
      )
}

export default CommentBox