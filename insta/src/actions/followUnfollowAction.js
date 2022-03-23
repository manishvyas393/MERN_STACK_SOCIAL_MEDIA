import axios from "axios"
import {
      SEND_FOLLOW_UNFOLLOW_REQUEST,
      SEND_FOLLOW_UNFOLLOW_SUCCESS,
      SEND_FOLLOW_UNFOLLOW_FAIL,

      ACCEPT_FOLLOW_REQUEST,
      ACCEPT_FOLLOW_SUCCESS,
      ACCEPT_FOLLOW_FAIL,

      CANCEL_FOLLOW_REQUEST,
      CANCEL_FOLLOW_SUCCESS,
      CANCEL_FOLLOW_FAIL,

      REMOVE_FOLLOWER_FROM_FOLLOWERS_REQUEST,
      REMOVE_FOLLOWER_FROM_FOLLOWERS_SUCCESS,
      REMOVE_FOLLOWER_FROM_FOLLOWERS_FAIL,

      CLEAR_ERRORS
} from "../constants/followUnfollowConstants"
const Axios = axios.create({
      baseURL: "https://mern-instagram-cloned.herokuapp.com/",
      withCredentials: true,
      credentials: "include"

})
export const followUnfollowAction = (id) => async (dispatch) => {
      try {
            dispatch({ type: SEND_FOLLOW_UNFOLLOW_REQUEST })
            const { data } = await Axios.put(`/api/user/follow/${id}`)
            dispatch({ type: SEND_FOLLOW_UNFOLLOW_SUCCESS, payload: data.success })
      } catch (error) {
            dispatch({ type: SEND_FOLLOW_UNFOLLOW_FAIL, payload: error })
      }
}
export const acceptFollowRequestAction = (id) => async (dispatch) => {
      try {
            dispatch({ type: ACCEPT_FOLLOW_REQUEST })
            const { data } = await Axios.put(`/api/user/accept-follow-request/${id}`)
            dispatch({ type: ACCEPT_FOLLOW_SUCCESS, payload: data })
      } catch (error) {
            dispatch({ type: ACCEPT_FOLLOW_FAIL, payload: error })
      }
}
export const cancelFollowRequestAction = (id) => async (dispatch) => {
      try {
            dispatch({ type: CANCEL_FOLLOW_REQUEST })
            const { data } = await Axios.delete(`/api/user/cancel-follow-request/${id}`)
            dispatch({ type: CANCEL_FOLLOW_SUCCESS, payload: data })
      } catch (error) {
            dispatch({ type: CANCEL_FOLLOW_FAIL, payload: error })
      }
}
export const removeFollowerRequestAction = (id) => async (dispatch) => {
      try {
            dispatch({ type: REMOVE_FOLLOWER_FROM_FOLLOWERS_REQUEST })
            const { data } = await Axios.delete(`/api/user/remove/follower/${id}`)
            dispatch({ type: REMOVE_FOLLOWER_FROM_FOLLOWERS_SUCCESS, payload: data })
      } catch (error) {
            dispatch({ type: REMOVE_FOLLOWER_FROM_FOLLOWERS_FAIL, payload: error })
      }
}
export const clearErrors = () => async (dispatch) => {
      dispatch({ type: CLEAR_ERRORS })
}