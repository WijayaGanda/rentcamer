import React, { useState } from "react";
import { Box, VStack, FormControl, Input, Button, Text, Image } from "native-base";

const EditItem = ({ route, navigation }) => {
    const { item } = route.params;

    const [name, setName] = useState(item.name);
    const [brand, setBrand] = useState(item.brand);
    const [price6h, setPrice6h] = useState(item.price_6h);
    const [price12h, setPrice12h] = useState(item.price_12h);
    const [price24h, setPrice24h] = useState(item.price_24h);
    const [imageUrl, setImageUrl] = useState(item.imageUrl || ""); // Menambahkan state untuk gambar

    const handleSubmit = () => {
        // Logika untuk menyimpan perubahan data
        console.log({
            id: item.id,
            name,
            brand,
            price6h,
            price12h,
            price24h,
            imageUrl, // Menyertakan URL gambar dalam data yang dikirim
        });

        navigation.goBack(); // Kembali ke halaman sebelumnya
    };

    return (
        <Box safeArea p="4" flex={1} bg="#F9F9F9">
            <Text fontSize="2xl" fontWeight="bold" mb="4">
                Edit Camera
            </Text>
            <VStack space={4}>
                <FormControl>
                    <FormControl.Label>Camera Name</FormControl.Label>
                    <Input value={name} onChangeText={setName} />
                </FormControl>
                <FormControl>
                    <FormControl.Label>Brand</FormControl.Label>
                    <Input value={brand} onChangeText={setBrand} />
                </FormControl>
                <FormControl>
                    <FormControl.Label>Price (6h)</FormControl.Label>
                    <Input value={price6h} onChangeText={setPrice6h} keyboardType="numeric" />
                </FormControl>
                <FormControl>
                    <FormControl.Label>Price (12h)</FormControl.Label>
                    <Input value={price12h} onChangeText={setPrice12h} keyboardType="numeric" />
                </FormControl>
                <FormControl>
                    <FormControl.Label>Price (24h)</FormControl.Label>
                    <Input value={price24h} onChangeText={setPrice24h} keyboardType="numeric" />
                </FormControl>

                {/* Input URL gambar */}
                <FormControl>
                    <FormControl.Label>Image URL</FormControl.Label>
                    <Input value={imageUrl} onChangeText={setImageUrl} />
                </FormControl>

                {/* Tampilkan gambar jika URL tersedia */}
                {imageUrl ? (
                    <Image
                        source={{ uri: imageUrl }}
                        alt="Camera Image"
                        size="xl"
                        rounded="md"
                        mt="4"
                    />
                ) : null}

                <Button onPress={handleSubmit} mt="4" bg="violet.800" _text={{ color: "white" }}>
                    Save Changes
                </Button>
            </VStack>
        </Box>
    );
};

export default EditItem;
