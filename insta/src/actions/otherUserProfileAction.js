import {
      REQUESTED_USER_PROFILE_FAIL,
      REQUESTED_USER_PROFILE_SUCCESS,
      REQUESTED_USER_PROFILE_REQUEST,
      CLEAR_ERRORS
} from "../constants/otherUserProfileConstants"
import axios from "axios"
const Axios = axios.create({
     // baseURL: "http://localhost:3001",
      baseURL: "https://mern-instagram-cloned.herokuapp.com/",
      withCredentials: true,
      credentials: "include"

})
export const otherUserProfileAction = (username) => async (dispatch) => {
      try {
            dispatch({ type: REQUESTED_USER_PROFILE_REQUEST })
            const { data } = await Axios.get(`/api/user/${username}`)
            dispatch({ type: REQUESTED_USER_PROFILE_SUCCESS, payload: data })
      } catch (error) {
            dispatch({ type: REQUESTED_USER_PROFILE_FAIL, payload: error })
      }
}
export const clearErrors = () => async (dispatch) => {
      dispatch({ type: CLEAR_ERRORS })
}