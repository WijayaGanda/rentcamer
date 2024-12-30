import { Box, Center, Heading, Image, Text, VStack } from "native-base";
import { Header } from "../components";

const Detail = () => {
  return (
    <>
      <Header title={"Detail Package"} withBack={true} />
      <Center bg={"gray.100"}flex={1} justifyContent={"center"}>
        <VStack space={1}>
        <Center>
          <Box bg={"black"} width="300px" height="200px" borderRadius={10}>
            <Image
              source={require("../assets/camera.jpeg")}
              alt="camera"
              resizeMode="cover"
              borderRadius={10}
            />
          </Box>
          </Center>
          
          <Center>
          <Heading>Cinema Set</Heading>
          <Text>By Sony</Text>
          </Center>

          <Box bg={"yellow.100"} borderRadius={10} padding={5}>
            <Heading size={"md"}>Product Info:</Heading>
            <Text>- Sony A7RIII</Text>
            <Text>- 24-35mm Lens</Text>
            <Text>- ND Filter (8 Rings)</Text>
            <Text>- Dji Ronin S2</Text>
            <Text>- Kingjoy Tripod</Text>
            <Text>- Godox LD-60</Text>
          </Box>

          <Box bg={"red.100"} borderRadius={10} padding={5}>
            <Heading size={"md"}>Include:</Heading>
            <Text>- Stab Bag </Text>
            <Text>- Camera Bag </Text>
            <Text>- Sony battery x2</Text>
            <Text>- charger</Text>
          </Box>
          
        </VStack>
      </Center>
    </>
  );
};
export default Detail;