import {
      GET_USER_MESSAGES_REQUEST,
      GET_USER_MESSAGES_SUCCESS,
      GET_USER_MESSAGES_FAIL,

      CLEAR_ERRORS,
      SEND_MESSAGE_REQUEST,
      SEND_MESSAGE_SUCCESS,
      SEND_MESSAGE_FAIL,
      GET_NOTIFICATIONS
} from "../constants/messagesConstants"
import axios from "axios"
const Axios = axios.create({
      baseURL: "http://localhost:3001" | "https://mern-instagram-cloned.herokuapp.com/",
      //baseURL: "https://mern-instagram-cloned.herokuapp.com/",
      withCredentials: true,
      credentials: "include"

})
export const getMessagesAction = (id) => async (dispatch) => {
      try {
            dispatch({ type: GET_USER_MESSAGES_REQUEST })
            const { data } = await Axios.get(`/api/message/getmessages/${id}`)
            dispatch({ type: GET_USER_MESSAGES_SUCCESS, payload: data.messages })
      } catch (error) {
            dispatch({ type: GET_USER_MESSAGES_FAIL, payload: error })
      }
}
export const sendMessageAction = (id, msg) => async (dispatch) => {
      try {
            dispatch({ type: SEND_MESSAGE_REQUEST })
            const { data } = await Axios.post(`/api/message/sendmessage/${id}`, {msg})
            dispatch({ type: SEND_MESSAGE_SUCCESS, payload: data.message })
            return data
      } catch (error) {
            dispatch({ type: SEND_MESSAGE_FAIL, payload: error })
      }
}
export const setNotificationAction = (msg) => (dispatch) => {
      dispatch({ type: GET_NOTIFICATIONS, payload: msg })
}
export const clearErrors = () => async (dispatch) => {
      dispatch({ type: CLEAR_ERRORS })
}