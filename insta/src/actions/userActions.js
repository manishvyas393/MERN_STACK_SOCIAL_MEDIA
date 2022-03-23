import axios from "axios";
import {
      LOGIN_REQUEST,
      LOGIN_SUCCESS,
      LOGIN_FAIL,

      REGISTRATION_REQUEST,
      REGISTRATION_SUCCESS,
      REGISTRATION_FAIL,

      LOGOUT_SUCCESS,
      LOGOUT_FAIL,

      USER_PROFILE_REQUEST,
      USER_PROFILE_SUCCESS,
      USER_PROFILE_FAIL,

      USER_EDIT_PROFILE_REQUEST,
      USER_EDIT_PROFILE_SUCCESS,
      USER_EDIT_PROFILE_FAIL,

      USER_EDIT_AVATAR_REQUEST,
      USER_EDIT_AVATAR_SUCCESS,
      USER_EDIT_AVATAR_FAIL,

      USER_UPDATE_PROFILE_STATUS_REQUEST,
      USER_UPDATE_PROFILE_STATUS_SUCCESS,
      USER_UPDATE_PROFILE_STATUS_FAIL,

      RESET_PASSWORD_REQUEST,
      RESET_PASSWORD_SUCCESS,
      RESET_PASSWORD_FAIL,

      GET_RESET_PASSWORD_LINK_REQUEST,
      GET_RESET_PASSWORD_LINK_SUCCESS,
      GET_RESET_PASSWORD_LINK_FAIL,

      SEARCH_USER_REQUEST,
      SEARCH_USER_SUCCESS,
      SEARCH_USER_FAIL,

      CLEAR_ERRORS,
      SEARCH_USER_RESET
} from "../constants/userConstants"
const Axios = axios.create({
      baseURL: "http://localhost:3001",
      withCredentials: true,
      credentials: "include"

})
export const loginAction = (form) => async (dispatch) => {
      try {
            dispatch({ type: LOGIN_REQUEST })
            const { data } = await Axios.post("/api/auth/login", form)
            dispatch({ type: LOGIN_SUCCESS, payload: data })
            localStorage.setItem("user", JSON.stringify(data.user._id))
      } catch (error) {
            dispatch({ type: LOGIN_FAIL, payload: error })
      }
}
export const registrationAction = (form) => async (dispatch) => {
      try {
            dispatch({ type: REGISTRATION_REQUEST })
            const { data } = await Axios.post("/api/auth/register", form)
            dispatch({ type: REGISTRATION_SUCCESS, payload: data })
      } catch (error) {
            dispatch({ type: REGISTRATION_FAIL, payload: error })
      }
}
export const userProfileAction = () => async (dispatch) => {
      try {
            dispatch({ type: USER_PROFILE_REQUEST })
            const { data } = await Axios.get("/api/user/profile")
            dispatch({ type: USER_PROFILE_SUCCESS, payload: data })
      } catch (error) {
            localStorage.clear()
            dispatch({ type: USER_PROFILE_FAIL, payload: error })
      }
}
export const editProfileAction = (form, id) => async (dispatch) => {
      try {
            dispatch({ type: USER_EDIT_PROFILE_REQUEST })
            const { data } = await Axios.put(`/api/user/updateprofile/${id}`, form)
            dispatch({ type: USER_EDIT_PROFILE_SUCCESS, payload: data })
            localStorage.setItem("user", JSON.stringify(data.user))
      } catch (error) {
            dispatch({ type: USER_EDIT_PROFILE_FAIL, payload: error })
      }
}
export const editAvatarAction = (image) => async (dispatch) => {
      try {
            dispatch({ type: USER_EDIT_AVATAR_REQUEST })
            const { data } = await Axios.put(`/api/user/profilepic/`, image)
            dispatch({ type: USER_EDIT_AVATAR_SUCCESS, payload: data.success })
            localStorage.setItem("user", JSON.stringify(data.user))
      } catch (error) {
            dispatch({ type: USER_EDIT_AVATAR_FAIL, payload: error })
      }
}
export const logOutAction = () => async (dispatch) => {
      try {
            const { data } = await Axios.get("/api/auth/logout")
            dispatch({ type: LOGOUT_SUCCESS, payload: data.success })
            localStorage.clear()
      } catch (error) {
            dispatch({ type: LOGOUT_FAIL, payload: error.response.data.error })
      }
}
export const searchAction = (keyword) => async (dispatch) => {
      try {
            if (keyword !== "") {
                  dispatch({ type: SEARCH_USER_REQUEST })
                  const { data } = await Axios.get(`/api/user/getuser?keyword=${keyword}`)
                  dispatch({ type: SEARCH_USER_SUCCESS, payload: data.users })
            }
            else {
                  dispatch({ type: SEARCH_USER_RESET })
            }

      } catch (error) {
            dispatch({ type: SEARCH_USER_FAIL, payload: error })
      }
}
export const setProfileStatusAction = (status) => async (dispatch) => {
      try {
            dispatch({ type: USER_UPDATE_PROFILE_STATUS_REQUEST })
            const { data } = await Axios.put(`/api/user/setstatus`, status)
            dispatch({ type: USER_UPDATE_PROFILE_STATUS_SUCCESS, payload: data })

      } catch (error) {
            dispatch({ type: USER_UPDATE_PROFILE_STATUS_FAIL, payload: error })
      }
}
export const requestResetPasswordLinkAction = (email) => async (dispatch) => {
      try {
            dispatch({ type: GET_RESET_PASSWORD_LINK_REQUEST })
            const { data } = await Axios.put(`/api/auth/requestresetlink`, { email })
            dispatch({ type: GET_RESET_PASSWORD_LINK_SUCCESS, payload: data })
      } catch (error) {
            dispatch({ type: GET_RESET_PASSWORD_LINK_FAIL, payload: error })
      }
}
export const updatePasswordAction = (token, password) => async (dispatch) => {
      try {
            dispatch({ type: RESET_PASSWORD_REQUEST })
            const { data } = await Axios.put(`/api/auth/resetpassword/${token}`, { password })
            dispatch({ type: RESET_PASSWORD_SUCCESS, payload: data })
      } catch (error) {
            dispatch({ type: RESET_PASSWORD_FAIL, payload: error })
      }
}
export const clearErrors = () => async (dispatch) => {
      dispatch({ type: CLEAR_ERRORS })
}