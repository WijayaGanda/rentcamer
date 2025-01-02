import React, { useEffect, useState } from "react";
import { ScrollView } from "react-native";
import {
    Box,
    Text,
    Image,
    Button,
    VStack,
    Divider,
    Spinner,
} from "native-base";
import { Header } from "../components";
import { database } from "../firebase";
import { ref, get } from "firebase/database";

const Detail = ({ route, navigation }) => {
    const { itemId } = route.params;
    const [item, setItem] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Mendapatkan data item berdasarkan itemId dari Firebase
        const fetchItem = async () => {
        try {
            const itemRef = ref(database, `paket/${itemId}`);
            const snapshot = await get(itemRef);
            if (snapshot.exists()) {
            setItem(snapshot.val());
            } else {
            console.error("Item tidak ditemukan.");
            }
        } catch (error) {
            console.error("Gagal mengambil data dari Firebase:", error);
        } finally {
            setLoading(false);
        }
        };

        fetchItem();
    }, [itemId]);

    if (loading) {
        return (
        <Box flex={1} justifyContent="center" alignItems="center" bg="#F9F9F9">
            <Spinner size="lg" color="violet.800" />
        </Box>
        );
    }

    if (!item) {
        return (
        <Box flex={1} justifyContent="center" alignItems="center" bg="#F9F9F9">
            <Text>Data tidak tersedia</Text>
        </Box>
        );
    }

    return (
        <Box flex={1} bg="#F9F9F9">
        <Header title={"Detail Item"} withBack={true} />
        <ScrollView>
            <Box safeArea p="4" bg="#F9F9F9">
            <Box alignItems="center">
                <Image
                source={{ uri: item.imageUrl }}
                alt="Item Image"
                size="2xl"
                borderRadius="lg"
                />
            </Box>

            <VStack space={4} mt="4" px="4">
                <Text fontSize="xl" fontWeight="bold">
                {item.name}
                </Text>
                <Divider my="2" />

                <Text fontSize="lg" fontWeight="bold">
                Harga:
                </Text>
                <VStack space={1} pl="4">
                <Text fontSize="md">• Price (24h): Rp.{item.price24h}</Text>
                </VStack>

                <Divider my="2" />

                <Text fontSize="lg" fontWeight="bold">
                Detail Barang:  
                </Text>
                <VStack space={1} pl="4">
                <Text fontSize="md" color="coolGray.500">
                {item.detailBarang}
                </Text>
                </VStack>

                <Button
                mt="6"
                bg="violet.800"
                _text={{ color: "white", fontWeight: "bold" }}
                onPress={() =>
                    navigation.navigate("OrderPaket", { itemId: itemId })
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