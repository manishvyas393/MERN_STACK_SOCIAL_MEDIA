import { createStore, combineReducers, applyMiddleware } from "redux"
import thunk from "redux-thunk"
import { composeWithDevTools } from "redux-devtools-extension"
import { editAvatarReducer, editProfileReducer, loginReducer, registrationReducer, resetPasswordReducer, SearchUserReducer} from "./reducers/userReducer"
import {createPostAndUpdateReducer, deleteLoggedUserPostReducer, getLoggedUserPostReducer, getPostCommentsUsersReducer, getPostDetailsReducer, getPostLikesUsersReducer,postCommentReducer} from "./reducers/postReducer"
import { postLikeReducer, timeLineReducer } from "./reducers/timeLineReducer"
import { otherUserProfileReducer } from "./reducers/otherUserProfileReducer"
import { acceptOrCancelFollowRequestReducer, followUnfollowReducer } from "./reducers/followUnfollowReducer"
import { createChatReducer, getChatsReducer, getSingleChatReducer} from "./reducers/chatReducer"
import { getMessagesReducer, getNotificationReducer, sendMessageReducer } from "./reducers/messagesReducer"
const reducer = combineReducers({
      user: loginReducer,
      registration: registrationReducer,
      editProfile: editProfileReducer,
      editAvatar: editAvatarReducer,
      searchedUsers: SearchUserReducer,
      newPost: createPostAndUpdateReducer,
      deletePost:deleteLoggedUserPostReducer,
      yourPost: getLoggedUserPostReducer,
      timeline: timeLineReducer,
      otherUser: otherUserProfileReducer,
      postLike: postLikeReducer,
      postLikedUsers: getPostLikesUsersReducer,
      postDetails: getPostDetailsReducer,
      followUnfollow: followUnfollowReducer,
      acceptOrCancelRequest: acceptOrCancelFollowRequestReducer,
      postComments: getPostCommentsUsersReducer,
      postingComment: postCommentReducer,
      resetPassword: resetPasswordReducer,
      newChat:createChatReducer,
      userChats: getChatsReducer,
      userMessages: getMessagesReducer,
      selectedChat: getSingleChatReducer,
      sendMessage: sendMessageReducer,
      Notification:getNotificationReducer
})
let initialState = {}
const midleware = [thunk]
const store = createStore(reducer, initialState, composeWithDevTools(applyMiddleware(...midleware)))
export default store