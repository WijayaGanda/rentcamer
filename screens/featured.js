import React from "react";
import { Box, Center, Text, Image, VStack, Divider, HStack, FlatList, Button, Heading, Spacer } from "native-base";
import { useNavigation } from "@react-navigation/native";
import { TouchableOpacity } from "react-native";
import { Header } from "../components";
import datas from "../datas";

const FeaturedCategory = () => {
  const navigation = useNavigation();

  return (
    <FlatList
      ListHeaderComponent={() => (
        <>
          <Header title={"Featured"} />
          <Center>
            <Box mt={4} px={5} shadow="" backgroundColor={"black"} borderRadius="10" width="90%">
              <Center>
                <Image source={require("../assets/camera.jpeg")} alt="Featured" resizeMode="contain" />
              </Center>
            </Box>
          </Center>

          {/* Featured Categories Section */}
          <Box p={5}>
            <HStack justifyContent={"space-between"} alignItems={"center"} mb={3}>
              <Text fontWeight={"bold"} fontSize={18}>Featured Categories</Text>
            </HStack>

            {/* Grid Layout for Featured Categories */}
            <FlatList
              data={datas}
              numColumns={1}
              keyExtractor={(item) => item.id.toString()}
              renderItem={({ item }) => (
                <TouchableOpacity
                  activeOpacity={0.4}
                  onPress={() => navigation.navigate("Detail", { item: item })}
                  style={{ flex: 1, margin: 8 }}
                >
                  <Box
                    backgroundColor={"white"}
                    borderRadius={10}
                    shadow="2"
                    width="100%"
                    height="200px"
                  >
                    {/* <Image
                      source={{ uri: item.imageUrl }}
                      alt={item.category_name}
                      width="10%"
                      height="120px"
                      borderTopRadius={10}
                      resizeMode="cover"
                    /> */}

                    <Box>
                      <Image mb={2} borderTopRadius={10} source={require("../assets/camera.jpeg")} alt="" width="100%" height="120px" resizeMode="cover" />
                      <Center>
                        <Heading>{item.name}</Heading>
                        <Text textAlign={"justify"}>{item.content}</Text>
                      </Center>
                  </Box>
                  </Box>
                </TouchableOpacity>
              )}
              showsVerticalScrollIndicator={false}
            />
          </Box>
        </>
      )}
    />
  );
};

export default FeaturedCategory;
