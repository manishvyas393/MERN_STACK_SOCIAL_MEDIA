import {
      CREATE_NEW_POST_REQUEST,
      CREATE_NEW_POST_SUCCESS,
      CREATE_NEW_POST_FAIL,
      CREATE_NEW_POST_RESET,

      GET_LIKES_USERS_REQUEST,
      GET_LIKES_USERS_SUCCESS,
      GET_LIKES_USERS_FAIL,

      GET_POST_DETAILS_REQUEST,
      GET_POST_DETAILS_SUCCESS,
      GET_POST_DETAILS_FAIL,

      CLEAR_ERRORS,

      GET_LOGGED_USER_POST_REQUEST,
      GET_LOGGED_USER_POST_SUCCESS,
      GET_LOGGED_USER_POST_FAIL,

      GET_POST_COMMENTS_REQUEST,
      GET_POST_COMMENTS_FAIL,
      GET_POST_COMMENTS_SUCCESS,

      POSTING_COMMENT_REQUEST,
      POSTING_COMMENT_SUCCESS,
      POSTING_COMMENT_FAIL,
      POSTING_COMMENT_RESET,

      POST_COMMENT_DELETE_REQUEST,
      POST_COMMENT_DELETE_SUCCESS,
      POST_COMMENT_DELETE_FAIL,
      POST_COMMENT_DELETE_RESET,

      DELETE_REPLY_OF_COMMENT_REQUEST,
      DELETE_REPLY_OF_COMMENT_SUCCESS,
      DELETE_REPLY_OF_COMMENT_FAIL,
      DELETE_REPLY_OF_COMMENT_RESET,

      POSTING_REPLIES_ON_COMMENT_FAIL,
      POSTING_REPLIES_ON_COMMENT_REQUEST,
      POSTING_REPLIES_ON_COMMENT_RESET,
      POSTING_REPLIES_ON_COMMENT_SUCCESS,

      DELETE_LOGGED_USER_POST_REQUEST,
      DELETE_LOGGED_USER_POST_SUCCESS,
      DELETE_LOGGED_USER_POST_FAIL,
      DELETE_LOGGED_USER_POST_RESET,

      UPDATE_LOGGED_USER_POST_REQUEST,
      UPDATE_LOGGED_USER_POST_SUCCESS,
      UPDATE_LOGGED_USER_POST_FAIL,
      UPDATE_LOGGED_USER_POST_RESET



} from "../constants/postConstants"

export const createPostAndUpdateReducer = (state = {}, action) => {
      switch (action.type) {
            case CREATE_NEW_POST_REQUEST:
            case UPDATE_LOGGED_USER_POST_REQUEST:
                  return {
                        ...state,
                        loading: true
                  }
            case CREATE_NEW_POST_SUCCESS:
            case UPDATE_LOGGED_USER_POST_SUCCESS:
                  return {
                        ...state,
                        loading: false,
                        created: action.payload.success,
                        updated: action.payload.updated
                  }
            case CREATE_NEW_POST_FAIL:
            case UPDATE_LOGGED_USER_POST_FAIL:
                  return {
                        ...state,
                        loading: false,
                        error: action.payload
                  }
            case CREATE_NEW_POST_RESET:
            case UPDATE_LOGGED_USER_POST_RESET:
                  return {
                        ...state,
                        loading: false,
                        created: false,
                        updated: false
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
export const getLoggedUserPostReducer = (state = { posts: [] }, action) => {
      switch (action.type) {
            case GET_LOGGED_USER_POST_REQUEST:
                  return {
                        ...state,
                        loading: true
                  }
            case GET_LOGGED_USER_POST_SUCCESS:
                  return {
                        ...state,
                        loading: false,
                        posts: action.payload
                  }
            case GET_LOGGED_USER_POST_FAIL:
                  return {
                        ...state,
                        loading: false,
                        posts: [],
                        error: action.payload
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
export const deleteLoggedUserPostReducer = (state = {}, action) => {
      switch (action.type) {
            case DELETE_LOGGED_USER_POST_REQUEST:
                  return {
                        ...state,
                        loading: true
                  }
            case DELETE_LOGGED_USER_POST_SUCCESS:
                  return {
                        ...state,
                        loading: false,
                        postDeleted: action.payload
                  }
            case DELETE_LOGGED_USER_POST_FAIL:
                  return {
                        ...state,
                        loading: false,
                        error: action.payload
                  }
            case DELETE_LOGGED_USER_POST_RESET:
                  return {
                        ...state,
                        loading: false,
                        postDeleted: false
                  }
            default:
                  return state
      }
}
export const getPostLikesUsersReducer = (state = { postLikers: [] }, action) => {
      switch (action.type) {
            case GET_LIKES_USERS_REQUEST:
                  return {
                        ...state,
                        loading: true
                  }
            case GET_LIKES_USERS_SUCCESS:
                  return {
                        ...state,
                        loading: false,
                        postLikers: action.payload
                  }
            case GET_LIKES_USERS_FAIL:
                  return {
                        ...state,
                        loading: false,
                        postLikers: [],
                        error: action.payload
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
export const getPostDetailsReducer = (state = { post: {} }, action) => {
      switch (action.type) {
            case GET_POST_DETAILS_REQUEST:
                  return {
                        loading: true
                  }
            case GET_POST_DETAILS_SUCCESS:
                  return {
                        ...state,
                        loading: false,
                        post: action.payload
                  }
            case GET_POST_DETAILS_FAIL:
                  return {
                        ...state,
                        loading: false,
                        post: {},
                        error: action.payload
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
export const getPostCommentsUsersReducer = (state = {}, action) => {
      switch (action.type) {
            case GET_POST_COMMENTS_REQUEST:
                  return {
                        ...state,
                        loading: true
                  }
            case GET_POST_COMMENTS_SUCCESS:
                  return {
                        ...state,
                        loading: false,
                        post: action.payload
                  }
            case GET_POST_COMMENTS_FAIL:
                  return {
                        ...state,
                        loading: false,
                        error: action.payload
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
export const postCommentReducer = (state = {}, action) => {
      switch (action.type) {
            case POSTING_COMMENT_REQUEST:
            case POST_COMMENT_DELETE_REQUEST:
            case DELETE_REPLY_OF_COMMENT_REQUEST:
            case POSTING_REPLIES_ON_COMMENT_REQUEST:
                  return {
                        ...state,
                        loading: true
                  }
            case POSTING_COMMENT_SUCCESS:
            case POST_COMMENT_DELETE_SUCCESS:
            case DELETE_REPLY_OF_COMMENT_SUCCESS:
            case POSTING_REPLIES_ON_COMMENT_SUCCESS:
                  return {
                        ...state,
                        loading: false,
                        replied: action.payload.replied,
                        commented: action.payload.commented,
                        deleted: action.payload.deleted,
                        replyDeleted: action.payload.replyDeleted

                  }
            case POSTING_COMMENT_FAIL:
            case POST_COMMENT_DELETE_FAIL:
            case DELETE_REPLY_OF_COMMENT_FAIL:
            case POSTING_REPLIES_ON_COMMENT_FAIL:
                  return {
                        ...state,
                        loading: false,
                        error: action.payload
                  }
            case POSTING_COMMENT_RESET:
            case POST_COMMENT_DELETE_RESET:
            case DELETE_REPLY_OF_COMMENT_RESET:
            case POSTING_REPLIES_ON_COMMENT_RESET:
                  return {
                        ...state,
                        loading: false,
                        commented: false,
                        replied: false,
                        deleted: false,
                        replyDeleted: false
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