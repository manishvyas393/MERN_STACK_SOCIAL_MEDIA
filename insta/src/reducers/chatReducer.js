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
      CREATE_CHAT_FAIL,
      CREATE_CHAT_RESET
} from "../constants/chatConstants"
export const createChatReducer = (state={},action) => {
      switch (action.type) {
            case CREATE_CHAT_REQUEST:
                  return {
                        ...state,
                        creating:true
                  }
            case CREATE_CHAT_SUCCESS:
                  return {
                        ...state,
                        creating: false,
                        created:true,
                        createdChat:action.payload
                  }
            case CREATE_CHAT_FAIL:
                  return {
                        ...state,
                        created:false,
                        error:action.payload
                  }
            case CREATE_CHAT_RESET:
                  return {
                        ...state,
                        creating: false,
                  }
            case CLEAR_ERRORS:
                  return {
                        ...state,
                        creating: false,
                        error: null
                  }
            default:
                  return state
      }
}
export const getChatsReducer = (state = { chats: [] }, action) => {
      switch (action.type) {
            case GET_USER_CHATS_REQUEST:
                  return {
                        ...state,
                        loading: true,
                  }
            case GET_USER_CHATS_SUCCESS:
                  return {
                        ...state,
                        loading: false,
                        chats: action.payload
                  }
            case GET_USER_CHATS_FAIL:
                  return {
                        ...state,
                        loading: false,
                        error: action.payload,
                        chats: []
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
export const getSingleChatReducer =(state = { currentChat: {} }, action) => {
      switch (action.type) {
            case GET_SINGLE_CHAT_REQUEST:
                  return {
                        ...state,
                        loading: true,
                  }
            case GET_SINGLE_CHAT_SUCCESS:
                  return {
                        ...state,
                        loading: false,
                        currentChat: action.payload
                  }
            case GET_SINGLE_CHAT_FAIL:
                  return {
                        ...state,
                        loading: false,
                        currentChat: {},
                        error: action.payload
                  }
            default:
                  return state
      }
}
