import axios from "axios";
import {
      CREATE_NEW_POST_REQUEST,
      CREATE_NEW_POST_SUCCESS,
      CREATE_NEW_POST_FAIL,

      GET_LOGGED_USER_POST_REQUEST,
      GET_LOGGED_USER_POST_SUCCESS,
      GET_LOGGED_USER_POST_FAIL,

      GET_LIKES_USERS_REQUEST,
      GET_LIKES_USERS_SUCCESS,
      GET_LIKES_USERS_FAIL,

      GET_POST_DETAILS_REQUEST,
      GET_POST_DETAILS_SUCCESS,
      GET_POST_DETAILS_FAIL,

      GET_POST_COMMENTS_REQUEST,
      GET_POST_COMMENTS_FAIL,
      GET_POST_COMMENTS_SUCCESS,

      POSTING_COMMENT_REQUEST,
      POSTING_COMMENT_SUCCESS,
      POSTING_COMMENT_FAIL,

      POSTING_REPLIES_ON_COMMENT_FAIL,
      POSTING_REPLIES_ON_COMMENT_REQUEST,
      POSTING_REPLIES_ON_COMMENT_SUCCESS,

      POST_COMMENT_DELETE_REQUEST,
      POST_COMMENT_DELETE_SUCCESS,
      POST_COMMENT_DELETE_FAIL,

      DELETE_REPLY_OF_COMMENT_REQUEST,
      DELETE_REPLY_OF_COMMENT_SUCCESS,
      DELETE_REPLY_OF_COMMENT_FAIL,

      DELETE_LOGGED_USER_POST_REQUEST,
      DELETE_LOGGED_USER_POST_SUCCESS,
      DELETE_LOGGED_USER_POST_FAIL,

      UPDATE_LOGGED_USER_POST_REQUEST,
      UPDATE_LOGGED_USER_POST_SUCCESS,
      UPDATE_LOGGED_USER_POST_FAIL,

      CLEAR_ERRORS,
} from "../constants/postConstants"
const Axios = axios.create({
      baseURL: "http://localhost:3001",
      //baseURL: "https://mern-instagram-cloned.herokuapp.com/",
      withCredentials: true,
      credentials: "include"

})
export const newPostAction = (postDetails) => async (dispatch) => {
      try {
            dispatch({ type: CREATE_NEW_POST_REQUEST })
            const { data } = await Axios.post("/api/post/newpost", postDetails)
            dispatch({ type: CREATE_NEW_POST_SUCCESS, payload: data })
      } catch (error) {
            dispatch({ type: CREATE_NEW_POST_FAIL, payload: error })
      }
}
export const updatePostAction = (id, form) => async (dispatch) => {
      try {
            dispatch({ type: UPDATE_LOGGED_USER_POST_REQUEST })
            const { data } = await Axios.put(`/api/post/update/${id}`, form)
            dispatch({ type: UPDATE_LOGGED_USER_POST_SUCCESS, payload: data })
      } catch (error) {
            dispatch({ type: UPDATE_LOGGED_USER_POST_FAIL, payload: error })
      }
}
export const getLoggedUserPostAction = () => async (dispatch) => {
      try {
            dispatch({ type: GET_LOGGED_USER_POST_REQUEST })
            const { data } = await Axios.get("/api/user/posts")
            dispatch({ type: GET_LOGGED_USER_POST_SUCCESS, payload: data.posts })
      } catch (error) {
            dispatch({ type: GET_LOGGED_USER_POST_FAIL, payload: error })
      }
}
export const getPostLikesUsersAction = (id) => async (dispatch) => {
      try {
            dispatch({ type: GET_LIKES_USERS_REQUEST })
            const { data } = await Axios.get(`/api/post/likes/${id}`)
            dispatch({ type: GET_LIKES_USERS_SUCCESS, payload: data.users })
      } catch (error) {
            dispatch({ type: GET_LIKES_USERS_FAIL, payload: error })
      }
}
export const deletePostAction = (id) => async (dispatch) => {
      try {
            dispatch({ type: DELETE_LOGGED_USER_POST_REQUEST })
            const { data } = await Axios.delete(`/api/post/delete/${id}`)
            dispatch({ type: DELETE_LOGGED_USER_POST_SUCCESS, payload: data.deletedPost })
      } catch (error) {
            dispatch({ type: DELETE_LOGGED_USER_POST_FAIL, payload: error })
      }
}
export const getPostDetailsAction = (id) => async (dispatch) => {
      try {
            dispatch({ type: GET_POST_DETAILS_REQUEST })
            const { data } = await Axios.get(`/api/post/${id}`)
            dispatch({ type: GET_POST_DETAILS_SUCCESS, payload: data.post })
      } catch (error) {
            dispatch({ type: GET_POST_DETAILS_FAIL, payload: error })
      }
}
export const getPostCommentsUsersAction = (id) => async (dispatch) => {
      try {
            dispatch({ type: GET_POST_COMMENTS_REQUEST })
            const { data } = await Axios.get(`/api/post/getcomments/${id}`)
            dispatch({ type: GET_POST_COMMENTS_SUCCESS, payload: data.post })
      } catch (error) {
            dispatch({ type: GET_POST_COMMENTS_FAIL, payload: error })
      }
}
export const postCommentAction = (id, comment) => async (dispatch) => {
      try {
            dispatch({ type: POSTING_COMMENT_REQUEST })
            const { data } = await Axios.put(`/api/post/comment/${id}`, { comment })
            dispatch({ type: POSTING_COMMENT_SUCCESS, payload: data })
      } catch (error) {
            dispatch({ type: POSTING_COMMENT_FAIL, payload: error })
      }
}
export const postCommentDeleteAction = (postId, commentId) => async (dispatch) => {
      try {
            dispatch({ type: POST_COMMENT_DELETE_REQUEST })
            const { data } = await Axios.delete(`/api/post/comment/delete?postId=${postId}&commentId=${commentId}`)
            dispatch({ type: POST_COMMENT_DELETE_SUCCESS, payload: data })
      } catch (error) {
            dispatch({ type: POST_COMMENT_DELETE_FAIL, payload: error })
      }
}
export const postReplyOnCommentAction = (postId, commentId, reply) => async (dispatch) => {
      try {
            dispatch({ type: POSTING_REPLIES_ON_COMMENT_REQUEST })
            const { data } = await Axios.put(`/api/post/replyon/${postId}/comment/${commentId}`, { reply })
            dispatch({ type: POSTING_REPLIES_ON_COMMENT_SUCCESS, payload: data })
      } catch (error) {
            dispatch({ type: POSTING_REPLIES_ON_COMMENT_FAIL, payload: error })
      }
}
export const postReplyOfCommentDeleteAction = (postId, commentId, replyId) => async (dispatch) => {
      try {
            dispatch({ type: DELETE_REPLY_OF_COMMENT_REQUEST })
            const { data } = await Axios.delete(`/api/post/comment/reply/delete?postId=${postId}&commentId=${commentId}&replyId=${replyId}`)
            dispatch({ type: DELETE_REPLY_OF_COMMENT_SUCCESS, payload: data })
      } catch (error) {
            dispatch({ type: DELETE_REPLY_OF_COMMENT_FAIL, payload: error })
      }
}
export const clearErrors = () => async (dispatch) => {
      dispatch({ type: CLEAR_ERRORS })
}