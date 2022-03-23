import Home from "./components/Home/Home";
import { Route, Routes } from "react-router-dom"
import Profile from "./components/Profile/Profile";
import { FollowTabs } from "./components/FollowersFollowingsTabs/FollowTabs";
import EditProfile from "./components/EditProfile/EditProfile";
import PersonalSettings from "./components/PersonalSettings/PersonalSettings";
import Login from "./components/Login/Login";
import Regsiter from "./components/Register/Register";
import { useEffect } from "react";
import store from "./store"
import { userProfileAction } from "./actions/userActions";
import ChangeProPic from "./components/ChangeProfilePic/ChangeProPic";
import ProctectedRoute from "./components/protected-route/ProtectedRoute";
import NewPost from "./components/NewPost/NewPost";
import Search from "./components/Search/Search";
import OtherUserProfile from "./components/OtherUserProfile/OtherUserProfile";
import LikersList from "./components/LikersList/LikersList"
import PostDetails from "./components/PostDetails/PostDetails";
import Activity from "./components/Activity/Activity";
import SetProfileStatus from "./components/SetProfileStatus/SetProfileStatus";
import PostComments from "./components/PostComments/PostComments";
import EditPost from "./components/EditPost/EditPost";
import SendResetLink from "./components/SendResetLinkForm/SendResetLink";
import ResetPassword from "./components/ResetPassword/ResetPassword";
function App() {
  const user = JSON.parse(localStorage.getItem("user"))
  useEffect(() => {
    if (user) {
      store.dispatch(userProfileAction())
    }
  })
  return (
    <Routes>
      <Route path="/" element={<Login />} />

      <Route path="/timeline" element={<ProctectedRoute>
        <Home />
      </ProctectedRoute>} />

      <Route path="/profile" element={<ProctectedRoute>
        <Profile />
      </ProctectedRoute>} />

      <Route path="/followers" element={<ProctectedRoute>
        <FollowTabs />
      </ProctectedRoute>} />
      <Route path="/followings" element={<ProctectedRoute>
        <FollowTabs />
      </ProctectedRoute>} />


      <Route path="/editprofile" element={<ProctectedRoute>
        <EditProfile />
      </ProctectedRoute>} />

      <Route path="/personel-settings" element={<ProctectedRoute>
        <PersonalSettings />
      </ProctectedRoute>} />

      <Route path="/register" element={<Regsiter />} />

      <Route path="/updateprofilepic" element={<ProctectedRoute>
        <ChangeProPic />
      </ProctectedRoute>} />

      <Route path="/newpost" element={<ProctectedRoute>
        <NewPost />
      </ProctectedRoute>} />

      <Route path="/search" element={<ProctectedRoute>
        <Search />
      </ProctectedRoute>} />

      <Route path="/profile/:username" element={<ProctectedRoute>
        <OtherUserProfile />
      </ProctectedRoute>} />

      <Route path="/:id/likes" element={<ProctectedRoute>
        <LikersList />
      </ProctectedRoute>} />

      <Route path="/post/:id" element={<ProctectedRoute>
        <PostDetails />
      </ProctectedRoute>} />

      <Route path="/activity" element={<ProctectedRoute>
        <Activity />
      </ProctectedRoute>} />

      <Route path="/account-privacy" element={<ProctectedRoute>
        <SetProfileStatus />
      </ProctectedRoute>} />

      <Route path="/comments/:id" element={<ProctectedRoute>
        <PostComments />
      </ProctectedRoute>} />

      <Route path="/editpost/:id" element={<ProctectedRoute>
        <EditPost />
      </ProctectedRoute>} />

      <Route path="/profile/:username/followers" element={<ProctectedRoute>
        <FollowTabs />
      </ProctectedRoute>} />

      <Route path="/profile/:username/followings" element={<ProctectedRoute>
        <FollowTabs />
      </ProctectedRoute>} />

      <Route path="/forgotpassword" element={<SendResetLink />} />  
      <Route path="/forgotpassword/:token" element={<ResetPassword/>} />  

    </Routes>
  );
}

export default App;
