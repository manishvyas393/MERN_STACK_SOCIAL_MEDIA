import {
      GET_USER_CHATS_REQUEST,
      GET_USER_CHATS_SUCCESS,
      GET_USER_CHATS_FAIL,

      GET_SINGLE_CHAT_REQUEST,
      GET_SINGLE_CHAT_SUCCESS,
      GET_SINGLE_CHAT_FAIL,

      CLEAR_ERRORS,
      CREATE_CHAT_REQUEST,
      CREATE_CHAT_SUCCESS,
      CREATE_CHAT_FAIL
} from "../constants/chatConstants"
import axios from "axios"
const Axios = axios.create({
      baseURL: "http://localhost:3001" |"https://mern-instagram-cloned.herokuapp.com/",
      //baseURL: "https://mern-instagram-cloned.herokuapp.com/",
      withCredentials: true,
      credentials: "include"

})
export const createChatAction = (user) => async (dispatch) => {
      try {
            dispatch({ type: CREATE_CHAT_REQUEST })
            const { data } = await Axios.post(`/api/chat/createchat/${user}`)
            dispatch({ type: CREATE_CHAT_SUCCESS, payload: data.chat })
      } catch (error) {
            dispatch({ type: CREATE_CHAT_FAIL, payload: error })
      }
}
export const getChatsAction = () => async (dispatch) => {
      try {
            dispatch({ type: GET_USER_CHATS_REQUEST })
            const { data } = await Axios.get("/api/chat/getchats")
            dispatch({ type: GET_USER_CHATS_SUCCESS, payload: data.chats })
      } catch (error) {
            dispatch({ type: GET_USER_CHATS_FAIL, payload: error })
      }
}
export const getSingleChatAction = (id) => async (dispatch) => {
      try {
            dispatch({ type: GET_SINGLE_CHAT_REQUEST })
            const { data } = await Axios.get(`/api/chat/singlechat/${id}`)
            dispatch({type:GET_SINGLE_CHAT_SUCCESS,payload:data.chat})
      } catch (error) {
            dispatch({type:GET_SINGLE_CHAT_FAIL,payload:error})
      }
}

export const clearErrors = () => async (dispatch) => {
      dispatch({ type: CLEAR_ERRORS })
}