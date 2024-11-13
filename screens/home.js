import React from "react";
import { Box, Center, Text, Image, VStack, Divider, HStack, FlatList, Button, Heading, Spacer } from "native-base";
import { useNavigation } from "@react-navigation/native";
import { Header } from "../components";
import datas from "../datas";
import { TouchableOpacity } from "react-native";

const Home = () => {
  const navigation = useNavigation();

  const renderitem = ({ item }) => {
    return (
      <TouchableOpacity
        activeOpacity={0.5}
        onPress={() => navigation.navigate("Equipment", { item: item })}
      >
        <Box p={"10"} flexDirection="row">
          <Text>{item.brand}</Text>
        </Box>
      </TouchableOpacity>
    );
  };

  return (
    <FlatList
      ListHeaderComponent={() => (
        <>
          <Header title={"Home"} />
          <Center>
            <Box mt={4} px={5} shadow="4" backgroundColor={"black"} borderRadius="10" width="90%">
              <Center>
                <Image source={require("../assets/camera.jpeg")} alt="camera" resizeMode="contain" />
              </Center>
            </Box>
          </Center>

          {/* Top Categories */}
          <Box p={5}>
            <HStack justifyContent={"space-between"} alignItems={"center"}>
              <Text fontWeight={"bold"} fontSize={16}>Top Categories</Text>
              <Text fontSize={16} color={"blue.600"}>All</Text>
            </HStack>
            <FlatList
              data={datas}
              horizontal={true}
              showsHorizontalScrollIndicator={false}
              renderItem={({ item, index }) => (
                <TouchableOpacity
                  activeOpacity={0.5}
                  key={index}
                  onPress={() => navigation.navigate("Equipment", { item: item })}
                >
                  <Box padding={1} py={6}>
                    <Box backgroundColor={"white"} width="95px" height="40px" borderRadius={6}>
                      <Center flex={1}>
                        <Text textAlign={"center"}>{item.category_name}</Text>
                      </Center>
                    </Box>
                  </Box>
                </TouchableOpacity>
              )}
            />
          </Box>

          {/* Recommendation Section */}
          <Box px={5}>
            <HStack justifyContent={"space-between"} alignItems={"center"} mb={3}>
              <Text fontWeight={"bold"} fontSize={16}>Recommendation</Text>
            </HStack>
            <FlatList
              data={datas}
              horizontal={true}
              showsHorizontalScrollIndicator={false}
              renderItem={({ item, index }) => (
                <TouchableOpacity
                  activeOpacity={0.5}
                  key={index}
                  onPress={() => navigation.navigate("Equipment", { item: item })}
                >
                  <Box padding={2}>
                    <Box backgroundColor={"white"} borderRadius={10} width="240px" height="350">
                      <Image mb={6} borderTopRadius={10} source={require("../assets/camera.jpeg")} alt="camera" width="240px" height="200px" resizeMode="cover" />
                      <Center>
                        <Heading>{item.name}</Heading>
                        <Text textAlign={"justify"}>{item.content}</Text>
                      </Center>
                    </Box>
                  </Box>
                </TouchableOpacity>
              )}
            />
          </Box>
          <Spacer/>
        </>
      )}
    />
  );
};

export default Home;
