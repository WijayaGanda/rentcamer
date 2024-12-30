import React from "react";
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
import { Header } from "../components";
import { datas, categoryBrands, getBrandInfo } from "../datas";
import { TouchableOpacity } from "react-native";

const Equipment = () => {
  const navigation = useNavigation();

  return (
    <Box flex={1} bg="">
      <Header title={"Equipment"} />
      <FlatList
            ListHeaderComponent={() => (
             <> 
                <Center>
                  <Box mt={4} px={5} shadow="" backgroundColor={"black"} borderRadius="10" width="90%">
                    <Center>
                      <Image
                        source={require("../assets/camera.jpeg")}
                        alt="Featured"
                        resizeMode="contain"
                      />
                    </Center>
                  </Box>
                </Center>

            <Box p={5}>
              <HStack justifyContent={"space-between"} alignItems={"center"}>
                <Text fontWeight={"bold"} fontSize={16}>
                  Select Brands
                </Text>
                <Text fontSize={16} color={"blue.600"}>
                  All
                </Text>
              </HStack>
              <FlatList
                data={categoryBrands}
                horizontal={true}
                showsHorizontalScrollIndicator={false}
                renderItem={({ item }) => (
                  <TouchableOpacity
                    activeOpacity={0.5}
                    onPress={() =>
                      navigation.navigate("Equipment", { brand: item.name })
                    }
                  >
                    <Box padding={1} py={6}>
                      <Box
                        backgroundColor={"white"}
                        width="95px"
                        height="40px"
                        borderRadius={6}
                      >
                        <Center flex={1}>
                          <Image
                            source={item.image}
                            alt={item.name}
                            resizeMode="contain"
                          />
                        </Center>
                      </Box>
                    </Box>
                  </TouchableOpacity>
                )}
                keyExtractor={(item) => item.id.toString()}
              />
            </Box>
          </>
        )}
        data={datas}
        numColumns={2}
        renderItem={({ item }) => {
          const brandInfo = getBrandInfo(item.category_id);

          return (
            <TouchableOpacity
              activeOpacity={0.7}
              onPress={() =>
                navigation.navigate("DetailItem", { itemId: item.id })
              }
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
                        source={item.image}
                        alt={item.name}
                        width="150px"
                        height="100px"
                        resizeMode="cover"
                      />
                      <Center>
                        <Text textAlign={"center"}>
                          {brandInfo.name || item.brand}
                        </Text>
                        <Heading textAlign={"center"} mb="2" mx="3" size="sm">
                          {item.name}
                        </Heading>
                        <Text bold italic underline>
                          Start from Rp.{item.price_6h}
                        </Text>
                      </Center>
                    </VStack>
                  </Box>
                </Center>
              </Box>
            </TouchableOpacity>
          );
        }}
        keyExtractor={(item) => item.id.toString()}
      />
    </Box>
  );
};

export default Equipment;
