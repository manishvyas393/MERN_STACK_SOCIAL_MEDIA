import React from 'react'
import { Tabs, TabList, TabPanels, Tab, TabPanel } from '@chakra-ui/react'
import Followers from '../Followers/Followers'
import Followings from '../Followings/Followings'
export const FollowTabs = () => {
      const username = JSON.parse(sessionStorage.getItem("username"))
      console.log(username)
      return (
            <Tabs isFitted mt={16} variant='soft-rounded'
                  defaultIndex={window.location.pathname === "/followers" ? 0 : 1 && window.location.pathname === `/profile/${username}/followers`?0:1}>
                  <TabList px={4}>
                        <Tab _focus="none" _selected={{ color: 'white', bg: 'blue.400' }}>Followers</Tab>
                        <Tab _focus="none" _selected={{ color: 'white', bg: 'blue.400' }}>Followings</Tab>
                  </TabList>
                  <TabPanels mt={-1}>
                        <TabPanel >
                              <Followers />
                        </TabPanel>
                        <TabPanel>
                              <Followings />
                        </TabPanel>
                  </TabPanels>
            </Tabs>
      )
}
