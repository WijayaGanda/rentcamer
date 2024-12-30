import React from "react";
import { Box, Center, Text, Image, VStack, HStack, ScrollView } from "native-base";
import { Header } from "../components";
import { useNavigation } from "@react-navigation/native";

const AboutUs = () => {
  const navigation = useNavigation();

  return (
    <ScrollView flex={1} backgroundColor="white">
      <Header title="About Us" />
      <Center mt={4} px={3}>
          <Center>
            <Box mt={4} px={50} mb={4} shadow="4" backgroundColor={"black"} borderRadius="20" width="90%">
              <Center>
                <Image source={require("../assets/camera.jpeg")} alt="camera" resizeMode="contain" />
              </Center>
            </Box>
          </Center>
        {/* Company Logo */}
        {/* <Image
          source={require("../assets/camera.jpeg")}
          // alt="Company Logo"
          size="xl"
          resizeMode="contain"
          mb={4}
        /> */}

        {/* About Us Section */}
        <VStack space={4} alignItems="justify" w="90%">
          <Text fontWeight="bold" fontSize="lg" textAlign="center">
            About Our Company
          </Text>
          <Text textAlign="justify">
            {/* Welcome to our company! We specialize in providing top-notch equipment and services.
            Our mission is to offer the highest quality products to help our customers achieve
            their goals. With a team of experienced professionals, we’re dedicated to innovation,
            excellence, and sustainability. */}
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras gravida, orci nec feugiat commodo, ipsum orci consequat nulla.
          </Text>
        </VStack>

        {/* Mission Statement Section */}
        <Box mt={6} w="90%">
          <Text fontWeight="bold" fontSize="lg" textAlign="center" mb={2}>
            Our Mission
          </Text>
          <Text textAlign="justify">
            {/* We strive to make a positive impact by developing solutions that empower our customers
            and benefit the world. Our goal is to set a high standard in our industry and to be a
            trusted partner to all our clients. */}
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras gravida, orci nec feugiat commodo, ipsum orci consequat nulla.
          </Text>
        </Box>

        {/* Team Section */}
        <Box mt={6} w="90%">
          <Text fontWeight="bold" fontSize="lg" mb={2}>
            Meet Our Team
          </Text>
          <VStack space={4}>
            <HStack space={4} alignItems="center">
              <Image
                source={require("../assets/camera.jpeg")} // Replace with actual image path
                alt="Team Member 1"
                size="sm"
                borderRadius={100}
              />
              <VStack>
                <Text fontWeight="bold">Ferdynal Christian Valentino</Text>
                <Text color="gray.500">Founder</Text>
              </VStack>
            </HStack>
            <HStack space={4} alignItems="center">
              <Image
                source={require("../assets/camera.jpeg")} // Replace with actual image path
                alt="Team Member 2"
                size="sm"
                borderRadius={100}
              />
              <VStack>
                <Text fontWeight="bold">Wijaya Ganda</Text>
                <Text color="gray.500">Founder</Text>
              </VStack>
            </HStack>
            <HStack space={4} alignItems="center">
              <Image
                source={require("../assets/camera.jpeg")} // Replace with actual image path
                alt="Team Member 2"
                size="sm"
                borderRadius={100}
              />
              <VStack>
                <Text fontWeight="bold">Athallah</Text>
                <Text color="gray.500">Chief Technology Officer</Text>
              </VStack>
            </HStack>
            <HStack space={4} alignItems="center">
              <Image
                source={require("../assets/camera.jpeg")} // Replace with actual image path
                alt="Team Member 2"
                size="sm"
                borderRadius={100}
              />
              <VStack>
                <Text fontWeight="bold">Jane Smith</Text>
                <Text color="gray.500">Chief Administrator</Text>
              </VStack>
            </HStack>
          </VStack>
        </Box>
      </Center>
    </ScrollView>
  );
};

export default AboutUs;

