import { Box, Card, Image, Heading, Text, Flex } from 'rebass'

const IndexPage = () => {
  return (
    <Flex justifyContent="space-between">
      <Box width={256}>
        <Card p={1} borderRadius={2} boxShadow="0 0 16px rgba(0, 0, 0, .25)">
          <Image src={'https://source.unsplash.com/random'} />
          <Box px={2}>
            <Heading as="h3">Card</Heading>
            <Text fontSize={0}>Small meta text</Text>
          </Box>
        </Card>
      </Box>

      <Box width={256}>
        <Card p={1} borderRadius={2} boxShadow="0 0 16px rgba(0, 0, 0, .25)">
          <Image src={'https://source.unsplash.com/random'} />
          <Box px={2}>
            <Heading as="h3">Card</Heading>
            <Text fontSize={0}>Small meta text</Text>
          </Box>
        </Card>
      </Box>

      <Box width={256}>
        <Card p={1} borderRadius={2} boxShadow="0 0 16px rgba(0, 0, 0, .25)">
          <Image src={'https://source.unsplash.com/random'} />
          <Box px={2}>
            <Heading as="h3">Card</Heading>
            <Text fontSize={0}>Small meta text</Text>
          </Box>
        </Card>
      </Box>
    </Flex>
  )
}

export default IndexPage
