import React, { useEffect, useState } from "react";
import { Box, Center, Text, Image, VStack, Divider, HStack, FlatList, Button, Heading, Spacer, ScrollView } from "native-base";
import { useNavigation } from "@react-navigation/native";
import { Header } from "../components";
import { datas, categoryBrands, getBrandInfo } from "../datas";
import { TouchableOpacity } from "react-native";
import { database } from "../firebase";
import { ref, onValue } from "firebase/database";

const Home = () => {
  const navigation = useNavigation();
  const [items, setItems] = useState([]);

  useEffect(() => {
    const itemsRef = ref(database, "items");
    const unsubscribe = onValue(itemsRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const formattedData = Object.keys(data).map((key) => ({
          id: key,
          ...data[key],
        }));
        setItems(formattedData);
      }
    });

    return () => unsubscribe();
  }, []);

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
              data={categoryBrands}
              horizontal={true}
              showsHorizontalScrollIndicator={false}
              renderItem={({ item }) => (
                <TouchableOpacity
                  activeOpacity={0.5}
                  onPress={() => navigation.navigate("Home", { brand: item.name })}
                >
                  <Box padding={1} py={6}>
                    <Box backgroundColor={"white"} width="95px" height="40px" borderRadius={6}>
                      <Center flex={1}>
                        <Image source={item.image} alt={item.name} resizeMode="contain" />
                      </Center>
                    </Box>
                  </Box>
                </TouchableOpacity>
              )}
              keyExtractor={(item) => item.id.toString()}
            />
          </Box>

          {/* Recommendation Section */}
          <Box px={5}>
            <HStack justifyContent={"space-between"} alignItems={"center"} mb={3}>
              <Text fontWeight={"bold"} fontSize={16}>Recommendation</Text>
            </HStack>
            <FlatList
              data={items}
              horizontal={true}
              showsHorizontalScrollIndicator={false}
              renderItem={({ item }) => (
                <TouchableOpacity
                  activeOpacity={0.7}
                  onPress={() => navigation.navigate("DetailItem", { itemId: item.id })}
                >
                  <ScrollView>
                    <Box padding={2}>
                      <Box backgroundColor={"white"} borderRadius={10} width="240px" height="400px">
                        <Image mb={6} borderTopRadius={10} source={{ uri: item.imageUrl }} alt="camera" width="240px" height="200px" resizeMode="cover" />
                        <Center>
                          <Heading>{item.name}</Heading>
                          <Text textAlign={"justify"}>{item.brand}</Text>
                          <Text bold italic underline>
                            Start from Rp.{item.price6h}
                          </Text>
                        </Center>
                      </Box>
                    </Box>
                  </ScrollView>
                </TouchableOpacity>
              )}
            />
          </Box>
          <Spacer />
        </>
      )}
    />
  );
};

export default Home;
