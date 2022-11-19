import { Box, Button, Image, Input } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { clearErrors, editAvatarAction } from '../../actions/userActions';
import { USER_EDIT_AVATAR_RESET } from '../../constants/userConstants';

const ChangeProPic = () => {
      const { error, isUpdated, loading } = useSelector(state => state.editAvatar)
      const [avatar, setAvatar] = useState(null);
      const navigate=useNavigate()
      const [AvatarPreview, setAvatarPreview] = useState(null);
      const dispatch = useDispatch()
      const editAvatarHandle = (e) => {
            const myform = new FormData()
            myform.set("avatar", avatar)
            dispatch(editAvatarAction(myform))
      }
      const updateProfileDataChange = (e) => {
            setAvatar(e.target.files[0]);
            const reader = new FileReader();
            reader.onload = () => {
                  if (reader.readyState === 2) {
                        setAvatarPreview(reader.result);
                  }
            };
            reader.readAsDataURL(e.target.files[0]);
      };
      useEffect(() => {
            if (isUpdated) {
                  navigate("/profile")
                  dispatch({type:USER_EDIT_AVATAR_RESET})
            }
            if (error) {
                  dispatch(clearErrors())
            }
      },[isUpdated,navigate,dispatch,error])
      return (
            <Box mt={52} display="flex" flexDirection="column" justifyContent="center" alignItems="center" px={6}>

                  <Box display="flex" alignItems="center" justifyContent="center" mb={4}>
                        <Image src={AvatarPreview} w="40%" height="40%" borderRadius="50%"></Image>
                  </Box>
                  <Input type="file" name='avatar' onChange={updateProfileDataChange}></Input>
                  <Button backgroundColor="blue.400" color="white" mt={6} onClick={editAvatarHandle} disabled={avatar === null ? true : false}>{loading?"updating":"Update Profile"}</Button>
            </Box>
      )
}

export default ChangeProPic