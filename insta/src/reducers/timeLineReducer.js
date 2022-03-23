import {
      GET_TIMELINE_POST_REQUEST,
      GET_TIMELINE_POST_SUCCESS,
      GET_TIMELINE_POST_FAIL,
      CLEAR_ERRORS,
      
      DO_LIKE_REQUEST,
      DO_LIKE_SUCCESS,
      DO_LIKE_FAIL,
      DO_LIKE_RESET
} from "../constants/timeLineConstants"

export const timeLineReducer = (state = { timeline:[] }, action) => {
      switch (action.type) {
            case GET_TIMELINE_POST_REQUEST:
                  return {
                        ...state,
                        loading: true,
                  }
            case GET_TIMELINE_POST_SUCCESS:
                  return {
                        ...state,
                        loading: false,
                        timeline: action.payload
                  }
            case GET_TIMELINE_POST_FAIL:
                  return {
                        ...state,
                        loading: false,
                        error: action.payload
                  }
            case CLEAR_ERRORS:
                  return {
                        ...state,
                        loading: false,
                        error:null
                  }

            default:
                  return state
      }
}
export const postLikeReducer = (state = {}, action) => {
      switch (action.type) {
            case DO_LIKE_REQUEST:
                  return {
                        ...state,
                        loading: true,
                  }
            case DO_LIKE_SUCCESS:
                  return {
                        ...state,
                        loading: false,
                        liked: action.payload
                  }
            case DO_LIKE_FAIL:
                  return {
                        ...state,
                        loading: false,
                        error: action.payload
                  }
            case DO_LIKE_RESET: 
                  return {
                        ...state,
                        loading: false,
                        liked:false
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