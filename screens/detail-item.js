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
import { datas } from "../datas";

const DetailItem = ({ route, navigation }) => {
const { itemId } = route.params;
const item = datas.find((data) => data.id === itemId);

return (
    <Box flex={1} bg="#F9F9F9">
        <Header title={"Detail Item"} withBack={true} />
    <ScrollView>
        <Box safeArea p="4" bg="#F9F9F9">
        <Box alignItems="center">
            <Image
                source={item.image}
                alt="Item Image"
                size="2xl"
                borderRadius="lg"
            />
        </Box>

        <VStack space={4} mt="4" px="4">
            <Text fontSize="xl" fontWeight="bold">
                {item.name}
            </Text>
            <Text fontSize="md" color="coolGray.500">
                {item.brand}
            </Text>

            <Divider my="2" />

            <Text fontSize="lg" fontWeight="bold">
                Product Info:
            </Text>
            <VStack space={1} pl="4">
                <Text fontSize="md">• Price (6h): {item.price_6h}</Text>
                <Text fontSize="md">• Price (12h): {item.price_12h}</Text>
                <Text fontSize="md">• Price (24h): {item.price_24h}</Text>
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
                onPress={() => navigation.navigate('Booking', {itemId: item.id,})}
                >
                Checkout
            </Button>
            </VStack>
            </Box>
        </ScrollView>
        </Box>
    );
};

export default DetailItem;
