import {
      LOGIN_REQUEST,
      LOGIN_SUCCESS,
      LOGIN_FAIL,

      REGISTRATION_REQUEST,
      REGISTRATION_SUCCESS,
      REGISTRATION_FAIL,
      REGISTRATION_RESET,

      LOGOUT_SUCCESS,
      LOGOUT_FAIL,

      USER_PROFILE_REQUEST,
      USER_PROFILE_SUCCESS,
      USER_PROFILE_FAIL,

      USER_EDIT_PROFILE_REQUEST,
      USER_EDIT_PROFILE_SUCCESS,
      USER_EDIT_PROFILE_FAIL,
      USER_EDIT_PROFILE_RESET,

      USER_EDIT_AVATAR_REQUEST,
      USER_EDIT_AVATAR_SUCCESS,
      USER_EDIT_AVATAR_FAIL,
      USER_EDIT_AVATAR_RESET,

      USER_UPDATE_PROFILE_STATUS_REQUEST,
      USER_UPDATE_PROFILE_STATUS_SUCCESS,
      USER_UPDATE_PROFILE_STATUS_FAIL,
      USER_UPDATE_PROFILE_STATUS_RESET,

      GET_RESET_PASSWORD_LINK_REQUEST,
      GET_RESET_PASSWORD_LINK_SUCCESS,
      GET_RESET_PASSWORD_LINK_FAIL,
      GET_RESET_PASSWORD_LINK_RESET,

      RESET_PASSWORD_REQUEST,
      RESET_PASSWORD_SUCCESS,
      RESET_PASSWORD_FAIL,
      RESET_PASSWORD_RESET,

      SEARCH_USER_REQUEST,
      SEARCH_USER_SUCCESS,
      SEARCH_USER_FAIL,
      SEARCH_USER_RESET,

      CLEAR_ERRORS,
      LOGIN_RESET,
} from "../constants/userConstants"

export const loginReducer = (state = { user: {} }, action) => {
      switch (action.type) {
            case LOGIN_REQUEST:
            case USER_PROFILE_REQUEST:
                  return {
                        loading: true,
                        isAuthenticated: false
                  }
            case LOGIN_SUCCESS:
            case USER_PROFILE_SUCCESS:
                  return {
                        ...state,
                        loading: false,
                        isAuthenticated: action.payload.success,
                        user: action.payload.user,
                        msg: action.payload.msg
                  }
            case LOGIN_FAIL:
            case USER_PROFILE_FAIL:
                  return {
                        ...state,
                        loading: false,
                        isAuthenticated: false,
                        user: null,
                        error: action.payload
                  }

            case LOGIN_RESET:
                  return {
                        ...state,
                        msg: null
                  }
            case LOGOUT_SUCCESS:
                  return {
                        ...state,
                        loading: false,
                        isAuthenticated: false,
                        loggedout: action.payload,
                        user: null,
                  }
            case LOGOUT_FAIL:
                  return {
                        ...state,
                        loading: false,
                        error: action.payload
                  }

            case CLEAR_ERRORS:
                  return {
                        ...state,
                        error: null
                  }
            default:
                  return state;

      }
}
export const registrationReducer = (state = {}, action) => {
      switch (action.type) {
            case REGISTRATION_REQUEST:
                  return {
                        loading: true,
                        isAuthenticated: false
                  }
            case REGISTRATION_SUCCESS:
                  return {
                        ...state,
                        loading: false,
                        created: action.payload.success,
                        msg: action.payload.msg,
                  }
            case REGISTRATION_FAIL:
                  return {
                        ...state,
                        loading: false,
                        created: null,
                        error: action.payload
                  }
            case REGISTRATION_RESET:
                  return {
                        ...state,
                        loading: false,
                        created: null,
                        msg: null
                  }
            case CLEAR_ERRORS:
                  return {
                        ...state,
                        error: null
                  }

            default:
                  return state
      }
}
export const editProfileReducer = (state = {}, action) => {
      switch (action.type) {
            case USER_EDIT_PROFILE_REQUEST:
            case USER_UPDATE_PROFILE_STATUS_REQUEST:
                  return {
                        ...state,
                        loading: true
                  }
            case USER_EDIT_PROFILE_SUCCESS:
            case USER_UPDATE_PROFILE_STATUS_SUCCESS:
                  return {
                        ...state,
                        loading: false,
                        isUpdated: action.payload.success,
                        msg: action.payload.msg
                  }
            case USER_EDIT_PROFILE_FAIL:
            case USER_UPDATE_PROFILE_STATUS_FAIL:
                  return {
                        ...state,
                        loading: false,
                        error: action.payload
                  }
            case USER_EDIT_PROFILE_RESET:
            case USER_UPDATE_PROFILE_STATUS_RESET:
                  return {
                        ...state,
                        isUpdated: false,
                        msg: null
                  }
            case CLEAR_ERRORS:
                  return {
                        ...state,
                        error: null
                  }

            default:
                  return state
      }
}
export const editAvatarReducer = (state = {}, action) => {
      switch (action.type) {
            case USER_EDIT_AVATAR_REQUEST:
                  return {
                        ...state,
                        loading: true
                  }
            case USER_EDIT_AVATAR_SUCCESS:
                  return {
                        ...state,
                        loading: false,
                        isUpdated: action.payload
                  }
            case USER_EDIT_AVATAR_FAIL:
                  return {
                        ...state,
                        loading: false,
                        error: action.payload
                  }
            case USER_EDIT_AVATAR_RESET:
                  return {
                        ...state,
                        isUpdated: false
                  }
            case CLEAR_ERRORS:
                  return {
                        ...state,
                        error: null
                  }

            default:
                  return state
      }
}
export const SearchUserReducer = (state = { users: [] }, action) => {
      switch (action.type) {
            case SEARCH_USER_REQUEST:
                  return {
                        ...state,
                        loading: true
                  }
            case SEARCH_USER_SUCCESS:
                  return {
                        ...state,
                        loading: false,
                        users: action.payload
                  }
            case SEARCH_USER_FAIL:
                  return {
                        ...state,
                        loading: false,
                        users: [],
                        error: action.payload
                  }
            case SEARCH_USER_RESET:
                  return {
                        loading: false,
                        users: []
                  }
            case CLEAR_ERRORS:
                  return {
                        ...state,
                        error: null,
                  }

            default:
                  return state
      }
}
export const resetPasswordReducer = (state = {}, action) => {
      switch (action.type) {
            case GET_RESET_PASSWORD_LINK_REQUEST:
            case RESET_PASSWORD_REQUEST:
                  return {
                        ...state,
                        loading: true
                  }
            case GET_RESET_PASSWORD_LINK_SUCCESS:
            case RESET_PASSWORD_SUCCESS:
                  return {
                        ...state,
                        loading: false,
                        sent: action.payload.sent,
                        reset:action.payload.reset,
                        msg: action.payload.msg
                  }
            case GET_RESET_PASSWORD_LINK_FAIL:
            case RESET_PASSWORD_FAIL:
                  return {
                        ...state,
                        loading: false,
                        error: action.payload
                  }
            case GET_RESET_PASSWORD_LINK_RESET:
            case RESET_PASSWORD_RESET:
                  return {
                        ...state,
                        loading: false,
                        reset:null,
                        sent: null,
                        msg: null
                  }
            case CLEAR_ERRORS:
                  return {
                        ...state,
                        error: null
                  }

            default:
                  return state
      }
}

