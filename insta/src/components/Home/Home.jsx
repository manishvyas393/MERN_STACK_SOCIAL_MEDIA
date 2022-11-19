import { Box } from '@chakra-ui/react'
import React, { useEffect } from 'react'
import Feed from '../Feed/Feed'
import { timelinePostAction } from "../../actions/timeLineAction"
import { useSelector, useDispatch } from 'react-redux';
import Loader from "../Loader/Loader"
const Home = () => {
  const { timeline,loading } = useSelector(state => state.timeline)
  const dispatch = useDispatch()
  timeline.sort((a, b) => {
    var dateA = new Date(a.createdAt).getTime();
    var dateB = new Date(b.createdAt).getTime();
    return dateA > dateB ? -1 : 1;
  });
  useEffect(() => {
    dispatch(timelinePostAction())
  }, [dispatch])
  return (
    <Box>
      {
        loading?<Loader></Loader>:
        timeline.map((post) => (
          <Feed post={post} key={post._id}/>
        ))}
      <Box mb="80px"></Box>
    </Box>
  )
}

export default Home