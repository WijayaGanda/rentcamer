import React, { useState, useEffect } from "react";
import { Box, VStack, HStack, Button, FlatList, Text, IconButton, Icon, Image } from "native-base";
import { MaterialIcons } from "@expo/vector-icons";
import { supabase } from "../../src/supabase"; // Impor client Supabase (tetap ada)
import { database } from "../../firebase"; // Impor Firebase Database
import { ref, onValue, remove  } from "firebase/database"; // Fungsi untuk Realtime Database

const Dashboard = ({ navigation }) => {
    const [cameraItems, setCameraItems] = useState([]);

    useEffect(() => {
        // Ambil data dari Firebase Realtime Database
        const fetchData = () => {
            const itemsRef = ref(database, "items"); // Path 'items' di Realtime Database
            onValue(itemsRef, (snapshot) => {
                if (snapshot.exists()) {
                    const data = snapshot.val();
                    // Format data menjadi array
                    const formattedData = Object.keys(data).map((key) => ({
                        id: key,
                        ...data[key],
                    }));
                    setCameraItems(formattedData);
                } else {
                    setCameraItems([]); // Jika tidak ada data
                }
            });
        };

        fetchData();
    }, []);

    const handleDelete = async (id) => {
        try {
            const itemRef = ref(database, `items/${id}`); // Referensi ke item berdasarkan ID
            await remove(itemRef); // Hapus item
            console.log(`Item dengan ID ${id} berhasil dihapus.`);
        } catch (error) {
            console.error(`Gagal menghapus item dengan ID ${id}:`, error);
        }
    };

    return (
        <Box flex={1} p="4" bg="#F9F9F9">
            <Button
                mb="4"
                bg="violet.800"
                _text={{ color: "white", fontWeight: "bold" }}
                onPress={() => navigation.navigate("AddItem")}
            >
                Add New Item
            </Button>
            <Button
                mb="4"
                bg="green.800"
                _text={{ color: "white", fontWeight: "bold" }}
                onPress={() => navigation.navigate("CameraBucket")}
            >
                Camera Bucket
            </Button>
            <FlatList
                data={cameraItems}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                    <Box
                        borderBottomWidth="1"
                        borderColor="coolGray.200"
                        p="4"
                        rounded="md"
                        bg="white"
                        mb="4"
                    >
                        <HStack space={4} alignItems="center">
                            <VStack flex={1} space={2}>
                                <Text fontWeight="bold" fontSize="lg">
                                    {item.name}
                                </Text>
                                <Text color="gray.500">{item.brand}</Text>
                                <Text color="gray.600">
                                    6h: {item.price6h} | 12h: {item.price12h} | 24h: {item.price24h}
                                </Text>
                            </VStack>

                            <Image
                                source={{ uri: item.imageUrl }}
                                alt={item.name}
                                size="xl"
                                borderRadius="md"
                                w="40%"
                            />
                        </HStack>

                        <HStack justifyContent="space-between" mt="2">
                            <IconButton
                                icon={<Icon as={MaterialIcons} name="edit" color="violet.800" />}
                                onPress={() => navigation.navigate("EditItem", { item })}
                            />
                            <IconButton
                                icon={<Icon as={MaterialIcons} name="delete" color="red.500" />}
                                onPress={() => handleDelete(item.id)}
                            />
                        </HStack>
                    </Box>
                )}
            />
        </Box>
    );
};

export default Dashboard;
