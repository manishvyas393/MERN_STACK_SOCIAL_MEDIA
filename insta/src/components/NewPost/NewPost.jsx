import React, { useEffect, useState } from 'react'
import { Box, Button, Image, Input } from '@chakra-ui/react'
import { useDispatch, useSelector } from 'react-redux'
import { clearErrors, newPostAction } from "../../actions/postAction"
import { useNavigate } from 'react-router-dom'
import { CREATE_NEW_POST_RESET } from '../../constants/postConstants'
const NewPost = () => {
      const [image, setImage] = useState("")
      const [caption, setCaption] = useState("")
      const [AvatarPreview, setAvatarPreview] = useState(null);
      const dispatch = useDispatch()
      const { loading, error, created } = useSelector(state => state.newPost)
      const navigate=useNavigate()
      const newPostHandle = (e) => {
            e.preventDefault()
            const myForm = new FormData()
            myForm.set("postImage", image)
            myForm.set("desc", caption)
            dispatch(newPostAction(myForm))
      }
      const postImageChange = (e) => {
            setImage(e.target.files[0]);
            const reader = new FileReader();
            reader.onload = () => {
                  if (reader.readyState === 2) {
                        setAvatarPreview(reader.result);
                  }
            };
            reader.readAsDataURL(e.target.files[0]);
      };
      useEffect(() => {
            if (created) {
                  navigate("/timeline")
                  dispatch({type:CREATE_NEW_POST_RESET})
            }
            if (error) {
                  dispatch(clearErrors())
            }
      },[created,dispatch,navigate,error])
      return (
            <Box mt={52}>
                  <form onSubmit={newPostHandle}>
                        <Box display="flex" flexDirection="column" justifyContent="center" alignItems="center" px={6}>
                              <Box display="flex" alignItems="center" justifyContent="center" mb={4}>
                                    <Image src={AvatarPreview} w="40%" height="40%"></Image>
                              </Box>
                              <Box display="flex" alignItems="center" justifyContent="center" mb={4}>
                                    <Image src w="40%" height="40%" borderRadius="50%"></Image>
                              </Box>
                              <Input type="file" name='avatar' onChange={postImageChange}></Input>
                              <Input type="text" placeholder='Post Caption' mt={4} onChange={(e) => setCaption(e.target.value)}></Input>
                              <Button type="submit" backgroundColor="blue.400" color="white" mt={6}>{loading ? "Posting" : "Post"}</Button>
                        </Box>
                  </form>

            </Box>
      )
}

export default NewPost