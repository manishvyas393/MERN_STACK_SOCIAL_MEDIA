import { Box, Spinner } from '@chakra-ui/react'
import React from 'react'

const Loader = () => {
  return (
    <Box display={"flex"} justifyContent="center" alignItems={"center"} mt={20}>
      <Spinner
        thickness='5px'
        speed='0.65s'
        emptyColor='gray.200'
        color='blue.500'
        size="xl"
      />
    </Box>
  
  )
}

export default Loader