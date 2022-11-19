import {
      SEND_FOLLOW_UNFOLLOW_REQUEST,
      SEND_FOLLOW_UNFOLLOW_SUCCESS,
      SEND_FOLLOW_UNFOLLOW_FAIL,
      SEND_FOLLOW_UNFOLLOW_RESET,

      ACCEPT_FOLLOW_REQUEST,
      ACCEPT_FOLLOW_SUCCESS,
      ACCEPT_FOLLOW_FAIL,

      CANCEL_FOLLOW_REQUEST,
      CANCEL_FOLLOW_SUCCESS,
      CANCEL_FOLLOW_FAIL,

      REMOVE_FOLLOWER_FROM_FOLLOWERS_REQUEST,
      REMOVE_FOLLOWER_FROM_FOLLOWERS_SUCCESS,
      REMOVE_FOLLOWER_FROM_FOLLOWERS_FAIL,
      REMOVE_FOLLOWER_FROM_FOLLOWERS_RESET,

      CLEAR_ERRORS
} from "../constants/followUnfollowConstants"
export const followUnfollowReducer = (state = {}, action) => {
      switch (action.type) {
            case SEND_FOLLOW_UNFOLLOW_REQUEST:
                  return {
                        ...state,
                        loading: false,

                  }
            case SEND_FOLLOW_UNFOLLOW_SUCCESS:
                  return {
                        ...state,
                        loading: false,
                        success: action.payload
                  }
            case SEND_FOLLOW_UNFOLLOW_FAIL:
                  return {
                        ...state,
                        loading: false,
                        error: action.payload
                  }
            case SEND_FOLLOW_UNFOLLOW_RESET:
                  return {
                        ...state,
                        loading: false,
                        success: false
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
export const acceptOrCancelFollowRequestReducer = (state = {}, action) => {
      switch (action.type) {
            case ACCEPT_FOLLOW_REQUEST:
            case CANCEL_FOLLOW_REQUEST:
            case REMOVE_FOLLOWER_FROM_FOLLOWERS_REQUEST:
                  return {
                        ...state,
                        loading: false,
                  }
            case ACCEPT_FOLLOW_SUCCESS:
            case CANCEL_FOLLOW_SUCCESS:
            case REMOVE_FOLLOWER_FROM_FOLLOWERS_SUCCESS:
                  return {
                        ...state,
                        loading: false,
                        success: action.payload.success,
                        msg: action.payload.msg,
                        removed:action.payload.removed
                  }
            case ACCEPT_FOLLOW_FAIL:
            case CANCEL_FOLLOW_FAIL:
            case REMOVE_FOLLOWER_FROM_FOLLOWERS_FAIL:
                  return {
                        ...state,
                        loading: false,
                        error: action.payload
                  }
            case REMOVE_FOLLOWER_FROM_FOLLOWERS_RESET:
                  return {
                        ...state,
                        loading: false,
                        removed:null
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