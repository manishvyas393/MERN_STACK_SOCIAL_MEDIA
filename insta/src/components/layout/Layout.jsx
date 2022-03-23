import { Box } from '@chakra-ui/react'
import React, { useState,useEffect } from 'react'
import Footer from '../Footer/Footer'
import Header from '../Header/Header'
import {useSelector } from "react-redux"

const Layout = ({ children }) => {
      const { user: User } = useSelector(state => state.user)
      const [display, setDisplay] = useState("none")
      useEffect(() => {
            if (User?._id) {
                  setDisplay("flex")  
            }   
      },[User?._id])
      return (
            <>
                  <Box backgroundColor="black" m="auto" height="100vh">
                        <Box backgroundColor="white"
                              width={{ lg: "30%", sm: "98%" }}
                              m="auto" pt={4}
                              overflowY="scroll" height="100vh"
                              css={{
                                    '&::-webkit-scrollbar': {
                                          width: '0px',
                                    },
                                    '&::-webkit-scrollbar-track': {
                                          width: '0px',
                                    },
                              }}
                        >

                              <Header show={display} />
                              {children}
                              <Footer show={display}/>


                        </Box>

                  </Box>
            </>

      )
}

export default Layout