import React from "react";
import { ScrollView } from "react-native";
import {
    Box,
    Text,
    Image,
    Button,
    VStack,
    Divider,
} from "native-base";
import { Header } from "../components";
import { featured, datas } from "../datas"; // Impor datas.js

const Detail = ({ route, navigation }) => {
    const { itemId } = route.params;
    // Cari item di featured
    const item = 
    datas.find((data) => data.id === itemId);
    const barang =
    featured.find((data) => data.id === itemId);

    return (
        <Box flex={1} bg="#F9F9F9">
            <Header title={"Detail Paket"} withBack={true} />
            <ScrollView>
                <Box safeArea p="4" bg="#F9F9F9">
                    <Box alignItems="center">
                        <Image
                            source={featured.image}
                            alt="Item Image"
                            size="2xl"
                            borderRadius="lg"
                        />
                    </Box>

                    <VStack space={1} pl="4">
                        <Text fontSize="xl" fontWeight="bold">
                            {featured.name}
                        </Text>

                        <Divider my="2" />

                        <Text fontSize="lg" fontWeight="bold">
                            Description:
                        </Text>
                        <VStack space={1} pl="4">             
                        <Text fontSize="md"> {featured.description} </Text>
                        </VStack>

                        <Divider my="2" />

                        <Text fontSize="lg" fontWeight="bold">
                            Include:
                        </Text>
                        <VStack space={1} pl="4">
                            <Text fontSize="md">• Unit</Text>
                            <Text fontSize="md">• Battery x2</Text>
                            <Text fontSize="md">• Desktop Charger</Text>
                            <Text fontSize="md">• Memory Micro SD 64GB Extreme</Text>
                            <Text fontSize="md">• Mini Tripod Multifunction Monopod</Text>
                            <Text fontSize="md">• Case/Bag</Text>
                        </VStack>

                        <Button
                            mt="6"
                            bg="violet.800"
                            _text={{ color: "white", fontWeight: "bold" }}
                            onPress={() =>
                                navigation.navigate("Booking", { itemId: item.id })
                            }
                        >
                            Checkout
                        </Button>
                    </VStack>
                </Box>
            </ScrollView>
        </Box>
    );
};

export default Detail;
