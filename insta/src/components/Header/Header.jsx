import { Box, Flex, Text, Image, Button, Collapse, useDisclosure, Divider } from '@chakra-ui/react'
import React, { useState } from 'react'
import { AddIcon, WarningIcon, ChatIcon } from "@chakra-ui/icons"
import { useDispatch } from "react-redux"
import logo from "../../assests/logo.png"
import { Backdrop } from '@material-ui/core'
import { logOutAction } from '../../actions/userActions';
import { Link } from 'react-router-dom';
const Header = ({ show }) => {
      const [open, setOpen] = useState(false)
      const { isOpen, onToggle } = useDisclosure()
      const dispatch = useDispatch()
      function logout() {
            dispatch(logOutAction())
            setOpen(false)
      }
      const hideShow = (e) => {
            e.preventDefault()
            if (!open) {
                  setOpen(true)
            }
            else {
                  setOpen(false)
            }
      }
      return (
            <Flex justifyContent="space-between" px={4} position="fixed" width={{ lg: "30%", sm: "98%" }} backgroundColor="white" mt={-4} boxShadow="md" display={show}>
                  <Box display="flex" alignItems="center" >
                        <Image src={logo} width="50%" height="60%" shadow={"base"} p={2} borderRadius={"50px"}></Image>
                  </Box>
                  <Box display="flex" justifyContent="center" alignItems="center" >
                        <Collapse in={isOpen}>
                              <Flex mt={20} boxShadow='dark-lg' alignItems={"center"} rounded='md' flexDirection={"column"} position="absolute" zIndex="10"  py={2} backgroundColor="white" shadow={"base"} left="340px" top="-35px"  cursor="pointer">
                                    <Link to="/newpost">
                                          <Text px={2} py={1}>New Post</Text>
                                    </Link>
                                    <Divider border={"1px"} borderColor="gray.400"></Divider>
                                    <Text px={2} py={1}>Story</Text>

                              </Flex>
                        </Collapse>
                        <AddIcon fontSize="40px" px={2} mr={4} shadow={"base"} cursor="pointer" onClick={onToggle} borderRadius="50px"/>
                        <ChatIcon fontSize="40px" px={2} mr={4} shadow={"base"} cursor="pointer" borderRadius="50px"/>
                        <WarningIcon fontSize="40px" px={2} mr={4} shadow={"base"} cursor="pointer" borderRadius="50px" onClick={hideShow} />

                        <Box position="absolute" mt={52} widt="100%">
                              <Backdrop open={open} style={{ zIndex: "1" }} >
                                    <Box display="flex" justifyContent="center" shadow="dark-lg" borderRadius={"15px"} alignItems="center" flexDirection="column" backgroundColor="white" py={8} px={4}>
                                          <Text mb={5} fontSize="18px" fontWeight={800}>Are you sure want to logout?</Text>
                                          <Flex borderTop="1px" width="100%" justifyContent="space-between">
                                                <Button onClick={hideShow} mt={4} width="45%" backgroundColor="blue.400" color="white">Cancel</Button>
                                                <Button mt={4} width="45%" backgroundColor="blue.400" color="white" onClick={logout}>Yes</Button>
                                          </Flex>
                                    </Box>
                              </Backdrop>
                        </Box>
                  </Box>
            </Flex>
      )
}

export default Header