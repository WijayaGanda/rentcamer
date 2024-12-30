import React, { useState, useEffect } from "react";
import { Box, VStack, HStack, Button, FlatList, Text, IconButton, Icon, Image } from "native-base";
import { MaterialIcons } from "@expo/vector-icons";
import { supabase } from "../../src/supabase";  // Impor client Supabase

const cameraItems = [
    { id: "1", name: "Canon EOS 5D", brand: "Canon", price_6h: "100K", price_12h: "150K", price_24h: "200K", imagePath: "https://gmejhueduqofgkjkadtr.supabase.co/storage/v1/object/sign/img-camera-rent/Canon5DMarkIV.webp?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJpbWctY2FtZXJhLXJlbnQvQ2Fub241RE1hcmtJVi53ZWJwIiwiaWF0IjoxNzM1NTc1MjIzLCJleHAiOjE3NjcxMTEyMjN9.0SUzKXDmrpwZkYifPfR86uuTp2Mwq5C6QFKvTzFvNPQ&t=2024-12-30T16%3A13%3A42.001Z" },
    { id: "2", name: "Sony Alpha A7ii", brand: "Sony", price_6h: "120K", price_12h: "180K", price_24h: "250K", imagePath: "https://gmejhueduqofgkjkadtr.supabase.co/storage/v1/object/sign/img-camera-rent/SonyA7ii.webp?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJpbWctY2FtZXJhLXJlbnQvU29ueUE3aWkud2VicCIsImlhdCI6MTczNTU3NTQ4MiwiZXhwIjoxNzY3MTExNDgyfQ.WU0TzKiK6kkzCjcJUoxrfL8Je3yCg25-RCK4cxne1Lk&t=2024-12-30T16%3A18%3A00.631Z" },
    // Tambahkan item lainnya
];

const Dashboard = ({ navigation }) => {
    const [images, setImages] = useState([]);

    useEffect(() => {
        // Ambil gambar dari Supabase Storage
        const fetchImages = async () => {
            try {
                const { data, error } = await supabase.storage
                    .from('img-camera-rent') // Gantilah dengan nama bucket Anda
                    .list('', { limit: 5, offset: 0 });

                if (error) throw error;

                // Dapatkan URL gambar yang dihasilkan
                const imageUrls = data.map((file) => supabase.storage
                    .from('img-camera-rent')
                    .getPublicUrl(file.name).publicURL);

                setImages(imageUrls);
            } catch (error) {
                console.error('Error fetching images:', error);
            }
        };

        fetchImages();
    }, []);

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
                                    6h: {item.price_6h} | 12h: {item.price_12h} | 24h: {item.price_24h}
                                </Text>
                            </VStack>

                            <Image
                                source={{ uri: item.imagePath }}
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
                                onPress={() => console.log("Delete", item.id)}
                            />
                        </HStack>
                    </Box>
                )}
            />
        </Box>
    );
};

export default Dashboard;
