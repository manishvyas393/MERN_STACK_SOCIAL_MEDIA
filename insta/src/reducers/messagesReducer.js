
import {
      GET_USER_MESSAGES_REQUEST,
      GET_USER_MESSAGES_SUCCESS,
      GET_USER_MESSAGES_FAIL,

      CLEAR_ERRORS,
      SEND_MESSAGE_REQUEST,
      SEND_MESSAGE_SUCCESS,
      SEND_MESSAGE_FAIL,
      SEND_MESSAGE_RESET,
      UPDATE_MESSAGES,
      GET_NOTIFICATIONS
} from "../constants/messagesConstants"

export const getMessagesReducer = (state = { messages: [] }, action) => {
      switch (action.type) {
            case GET_USER_MESSAGES_REQUEST:
                  return {
                        ...state,
                        loading: true,
                  }
            case GET_USER_MESSAGES_SUCCESS:
                  return {
                        ...state,
                        loading: false,
                        messages: action.payload
                  }
            case GET_USER_MESSAGES_FAIL:
                  return {
                        ...state,
                        loading: false,
                        error: action.payload,
                        messages: []
                  }
            case UPDATE_MESSAGES:
                  return {
                        messages:[...state.messages,action.payload]
                  }
            case CLEAR_ERRORS:
                  return {
                        ...state,
                        loading: false,
                        error: null
                  }

            default:
                  return state
      }
}
export const sendMessageReducer = (state = {}, action) => {
      switch (action.type) {
            case SEND_MESSAGE_REQUEST:
                  return {
                        ...state,
                        sending: true,
                  }
            case SEND_MESSAGE_SUCCESS:
                  return {
                        ...state,
                        sending: false,
                        message: action.payload,
                        sent: true
                  }
            case SEND_MESSAGE_FAIL:
                  return {
                        ...state,
                        sending: false,
                        sent: false
                  }
            case SEND_MESSAGE_RESET:
                  return {
                        ...state,
                        sent: false
                  }
            case CLEAR_ERRORS:
                  return {
                        ...state,
                        loading: false,
                        error: null
                  }
            default:
                  return state
      }
}
export const getNotificationReducer = (state = { notifications: [] }, action) => {
      switch (action.type) {
            case GET_NOTIFICATIONS:
                  return {
                        notifications:[...state.notifications,action.payload]
                  }
            default:
                  return state
      }
}
