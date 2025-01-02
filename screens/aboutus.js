import React from "react";
import { Box, Center, Text, Image, VStack, HStack, ScrollView, Heading, Spacer } from "native-base";
import { Header } from "../components";
import { useNavigation } from "@react-navigation/native";

const AboutUs = () => {
  const navigation = useNavigation();

  return (
    <ScrollView flex={1} backgroundColor="">
      <Header title="About Us" />
      <Center mt={4}>
            <Box mb={4} shadow="4" backgroundColor={"black"} borderRadius="10" width="90%">
              <Center>
                <Image source={require("../assets/thumbnail-1.webp")} alt="camera" resizeMode="stretch"  height="220px" borderRadius="9"/>
              </Center>
            </Box>
            
        {/* About Us Section */}
        <VStack space={4} alignItems="justify" w="90%">
          <Text fontWeight="bold" fontSize={20} textAlign="center">
           About Our Company
          </Text>
          <Text textAlign="justify">
            <Center>
            <Center>PixRent, "Your Pixels, Your Story".</Center>
            <Spacer>PixRent hadir sebagai ruang kreatif yang menghubungkan Anda dengan dunia visual tanpa batas. 
            Dengan pilihan kamera, lensa, dan aksesori terbaik, kami membantu Anda mengabadikan setiap detail momen,
            satu piksel indah pada satu waktu. Estetika, teknologi, dan kemudahan berpadu di PixRent, 
            menjadikan setiap cerita Anda berharga. 🎥✨ </Spacer>
            </Center>
          </Text>
        </VStack>

        {/* Mission Statement Section */}
        <Box mt={6} w="90%">
          <Text fontWeight="bold" fontSize={20} textAlign="center" mb={2}>
            Our Mission
          </Text>
          <Text textAlign="justify">
           Menjadi penyedia solusi fotografi terbaik yang menginspirasi kreativitas dan membantu setiap individu mengabadikan momen dengan cara yang indah,
           mudah, dan inovatif.
          </Text>
        </Box>

        {/* Team Section */}
        <Box mt={6} w="90%">
          <Text fontWeight="bold" fontSize="lg" mb={2} textAlign="center">
            Meet Our Team
          </Text>
          <VStack space={4}>
            <HStack space={4} alignItems="center">
              <Image
                source={require("../assets/vecteezy_3d-kid-character-laying-on-transparent-wall_34918440.png")} // Replace with actual image path
                alt="Team Member 1"
                size="sm"
                borderRadius={100}
              />
               <VStack>
                <Text fontWeight="bold">Wijaya Ganda Prasetyo</Text>
                <Text color="gray.500">Founder</Text>
              </VStack>
            </HStack>
            <HStack space={4} alignItems="center">
              <Image
                source={require("../assets/vecteezy_3d-kid-character-laying-on-transparent-wall_34618171.png")} // Replace with actual image path
                alt="Team Member 2"
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
                source={require("../assets/vecteezy_3d-kid-character-laying-on-transparent-wall_34339885.png")} // Replace with actual image path
                alt="Team Member 2"
                size="sm"
                borderRadius={100}
              />
              <VStack>
                <Text fontWeight="bold">Athalla Naufal Zuhdi</Text>
                <Text color="gray.500">Founder</Text>
              </VStack>
            </HStack>
          </VStack>
        </Box>
      </Center>
    </ScrollView>
  );
};

export default AboutUs;

