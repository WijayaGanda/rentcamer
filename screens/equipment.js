import React from "react";
import { Box, Center, Text, Image, VStack, Divider, HStack, FlatList, Button, Heading, Spacer } from "native-base";
import { useNavigation } from "@react-navigation/native";
import { Header } from "../components";
import datas from "../datas";
import { TouchableOpacity } from "react-native";

const Equipment = () => {
  const navigation = useNavigation();

  return (
    <FlatList
      ListHeaderComponent={() => (
        <>
          <Header title={"Equipment"} />
          <Center>
            <Box mt={4} px={5} shadow="" backgroundColor={"black"} borderRadius="10" width="90%">
              <Center>
                <Image source={require("../assets/camera.jpeg")} alt="Equipment" resizeMode="contain" />
              </Center>
            </Box>
          </Center>
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
        </>
      )}
      data={[]} // Empty data array as we're using ListHeaderComponent
      renderItem={() => null} // Placeholder renderItem
    />
  );
};

export default Equipment;