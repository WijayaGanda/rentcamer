import React, { useEffect, useState } from "react";
import {
  Box,
  Center,
  Text,
  Image,
  VStack,
  HStack,
  FlatList,
  Heading,
} from "native-base";
import { useNavigation } from "@react-navigation/native";
import { TouchableOpacity } from "react-native";
import { Header } from "../components";
import { featured } from "../datas"; // Import `featured` data
import { database } from "../firebase";
import { ref, onValue } from "firebase/database";

const FeaturedCategory = () => {
  const navigation = useNavigation();
  const [items, setItems] = useState([]);

  useEffect(() => {
    const itemsRef = ref(database, "paket");
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
    <Box flex={1} bg="">
      <Header title={"Featured"} />
      <FlatList
        ListHeaderComponent={() => (
          <>
            <Center>
              <Box
                mt={4}
                px={5}
                shadow=""
                backgroundColor={"black"}
                borderRadius="10"
                width="90%"
                height="200px" // Set the desired height for the box
              >
                <Center>
                  <Image
                    source={require("../assets/image_home_second_1.jpg")}
                    alt="Featured"
                    resizeMode="cover" // or "stretch"
                    style={{ width: "100%", height: "100%" }} // Ensure the image takes the full width and height of the box
                  />
                </Center>
              </Box>
            </Center>
            <Box p={5}>
              <HStack justifyContent={"space-between"} alignItems={"center"}>
                <Text fontWeight={"bold"} fontSize={16}>
                  Select Featured
                </Text>
                <Text fontSize={16} color={"blue.600"}>
                  All
                </Text>
              </HStack>
            </Box>
          </>
        )}
        data={items}
        numColumns={2}
        renderItem={({ item }) => (
          <TouchableOpacity
            activeOpacity={0.7}
            onPress={() => navigation.navigate("Detail", { itemId: item.id })}
          >
            <Box padding={2} width="100%">
              <Center>
                <Box
                  backgroundColor={"white"}
                  borderRadius={10}
                  width="190"
                  height="230"
                >
                  <VStack space={2} alignItems="center">
                    <Image
                      my={3}
                      borderTopRadius={10}
                      source={{ uri: item.imageUrl }}
                      alt={item.name}
                      width="150px"
                      height="100px"
                      resizeMode="cover"
                    />
                    <Center>
                      <Text textAlign={"center"}>{item.detailBarang}</Text>
                      <Heading textAlign={"center"} mb="2" mx="3" size="sm">
                        {item.name}
                      </Heading>
                      <Text bold italic underline>
                        Start from Rp.{item.price24h}
                      </Text>
                    </Center>
                  </VStack>
                </Box>
              </Center>
            </Box>
          </TouchableOpacity>
        )}
        keyExtractor={(item) => item.id.toString()}
      />
    </Box>
  );
};

export default FeaturedCategory;
