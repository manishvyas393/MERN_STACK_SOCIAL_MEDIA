import {
      GET_TIMELINE_POST_REQUEST,
      GET_TIMELINE_POST_SUCCESS,
      GET_TIMELINE_POST_FAIL,

      DO_LIKE_REQUEST,
      DO_LIKE_SUCCESS,
      DO_LIKE_FAIL,

      CLEAR_ERRORS
} from "../constants/timeLineConstants"
import axios from "axios"
const Axios = axios.create({
      baseURL: "http://localhost:3001",
      withCredentials: true,
      credentials: "include"

})
export const timelinePostAction = () => async (dispatch) => {
      try {
            dispatch({ type: GET_TIMELINE_POST_REQUEST })
            const { data } = await Axios.get("/api/post/timeline")
            dispatch({ type: GET_TIMELINE_POST_SUCCESS, payload: data.timeline })
      } catch (error) {
            dispatch({ type: GET_TIMELINE_POST_FAIL, payload: error })
      }
}
export const postlikestAction = (id) => async (dispatch) => {
      try {
            dispatch({ type: DO_LIKE_REQUEST })
            const { data } = await Axios.put(`/api/post/like/${id}`)
            dispatch({ type: DO_LIKE_SUCCESS, payload: data.success })
      } catch (error) {
            dispatch({ type: DO_LIKE_FAIL, payload: error })
      }
}
export const clearErrors = () => async (dispatch) => {
      dispatch({ type: CLEAR_ERRORS })
}