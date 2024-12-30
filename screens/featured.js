import React from "react";
import { Box, Center, Text, Image, VStack, HStack, FlatList, Heading } from "native-base";
import { useNavigation } from "@react-navigation/native";
import { TouchableOpacity } from "react-native";
import { Header } from "../components";
import { featured } from "../datas"; // Import `featured` data

const FeaturedCategory = () => {
  const navigation = useNavigation();

  return (
     <FlatList
          ListHeaderComponent={() => (
            <>
              <Header title={"Featured"} />
              <Center>
                <Box mt={4} px={5} shadow="4" backgroundColor={"black"} borderRadius="10" width="90%">
                  <Center>
                    <Image source={require("../assets/camera.jpeg")} alt="camera" resizeMode="contain" />
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
              data={featured} // Use `featured` data
              numColumns={2} // Set 2 columns per row
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
                    height="220px"
                    flex={1} // Allow flexible width
                    padding={3} // Add padding for better spacing
                  >
                    <Box>
                      <Image
                        mb={2}
                        borderTopRadius={10}
                        source={item.image} // Use dynamic image from `item`
                        alt={item.name}
                        width="100%"
                        height="100px"
                        resizeMode="cover"
                      />
                      <Center>
                        <Heading size="sm" numberOfLines={1} isTruncated>
                          {item.name}
                        </Heading>
                        <Text
                          textAlign={"center"}
                          fontSize="sm"
                          numberOfLines={2}
                          isTruncated // Ensure text is truncated with "..."
                        >
                          {item.description} {/* Use `description` from `featured` */}
                        </Text>
                      </Center>
                    </Box>
                  </Box>
                </TouchableOpacity>
              )}
              showsVerticalScrollIndicator={false}
              columnWrapperStyle={{
                justifyContent: "space-between", // Space between columns
              }}
            />
          </Box>
        </>
      )}
    />
  );
};

export default FeaturedCategory;
