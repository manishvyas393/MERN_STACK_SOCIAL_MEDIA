import {
      REQUESTED_USER_PROFILE_FAIL,
      REQUESTED_USER_PROFILE_SUCCESS,
      REQUESTED_USER_PROFILE_REQUEST,
} from "../constants/otherUserProfileConstants"

export const otherUserProfileReducer = (state = { profile: {user:{},post:[]} }, action) => {
      switch (action.type) {
            case REQUESTED_USER_PROFILE_REQUEST:
                  return {
                        ...state,
                        loading: true,
                  }
            case REQUESTED_USER_PROFILE_SUCCESS:
                  return {
                        ...state,
                        loading: false,
                        profile: {
                              user: action.payload.user,
                              post: action.payload.post,
                              followed: action.payload.youFollowed
                        },
                  }
            case REQUESTED_USER_PROFILE_FAIL:
                  return {
                        ...state,
                        loading: false,
                        profile: null,
                        error: action.payload
                  }

            default:
                  return state
      }
}
