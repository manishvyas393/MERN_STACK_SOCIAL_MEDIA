import React, { useEffect, useState } from 'react'
import {
      Box, Button,
      FormLabel,
      Text,
      Select
} from '@chakra-ui/react'
import { useDispatch, useSelector } from 'react-redux'
import { clearErrors, setProfileStatusAction, userProfileAction } from '../../actions/userActions'
import { USER_UPDATE_PROFILE_STATUS_RESET } from '../../constants/userConstants'
import { useNavigate } from 'react-router-dom'
const SetProfileStatus = () => {
      const { user } = useSelector(state => state.user)
      const { isUpdated, msg, error } = useSelector(state => state.editProfile)
      const [status, setStatus] = useState("")
      const dispatch = useDispatch()
      const navigate=useNavigate()
      const updateStatusHandle = (e) => {
            e.preventDefault()
            const myForm = new FormData()
            myForm.set("status",status)
            dispatch(setProfileStatusAction(myForm))

      }
      useEffect(() => {
            if (error) {
                  console.log(error)
                  dispatch(clearErrors())

            }
            if (isUpdated) {
                  dispatch({ type: USER_UPDATE_PROFILE_STATUS_RESET })
                  navigate("/profile")
                  dispatch(userProfileAction())
            }
            if (msg) {
                  console.log(msg)
            }
      },[error,isUpdated,msg,dispatch,navigate])
      return (
            <Box mt="150px" px={4}>
                  <Box>
                        <Text align={"center"}>{user?.username} your account is {user?.profileStatus}</Text>
                  </Box>
                  <Box mt={4}>
                        <FormLabel color={"blue.500"} fontWeight={600}>Change Account Visibility</FormLabel>
                        <Select placeholder="change account status" value={status} name='profileStatus' onChange={(e) => setStatus(e.target.value)}>
                              <option value='public'>public</option>
                              <option value='private'>private</option>
                        </Select>
                  </Box>
                  <Box display={"flex"} justifyContent={"center"} mt={4}>
                        <Button w={"250px"} backgroundColor={"blue.500"} disabled={status === "" ? true : false} color="white" onClick={updateStatusHandle}>Update Visibility</Button>
                  </Box>


            </Box>
      )
}

export default SetProfileStatus