import { Box, Text } from '@chakra-ui/react'
import React from 'react'

const Msg = ({ text }) => {
      return (
            <Box backgroundColor={"red.400"} p={2} shadow="dark-lg" borderRadius="10px" color="white" mb={4} fontWeight={600}>
                  <Text align={"center"}>{text}</Text>
            </Box>
      )
}

export default Msg