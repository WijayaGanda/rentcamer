import React, { useState, useEffect } from "react";
import { Box, VStack, FormControl, Input, Button, Text, ScrollView } from "native-base";
import { database } from "../../firebase"; // Impor konfigurasi Firebase
import { ref, get, update } from "firebase/database"; // Impor fungsi Firebase Realtime Database

const EditItem = ({ route, navigation }) => {
    const { item } = route.params; // Ambil item ID dari parameter navigasi

    // State untuk data item
    const [name, setName] = useState("");
    const [brand, setBrand] = useState("");
    const [price6h, setPrice6h] = useState("");
    const [price12h, setPrice12h] = useState("");
    const [price24h, setPrice24h] = useState("");
    const [imageUrl, setImageUrl] = useState("");

    // Ambil data dari Firebase berdasarkan ID item
    useEffect(() => {
        const fetchItemData = async () => {
            try {
                const itemRef = ref(database, `items/${item.id}`); // Path ke data item
                const snapshot = await get(itemRef);

                if (snapshot.exists()) {
                    const data = snapshot.val();
                    setName(data.name || "");
                    setBrand(data.brand || "");
                    setPrice6h(data.price6h || "");
                    setPrice12h(data.price12h || "");
                    setPrice24h(data.price24h || "");
                    setImageUrl(data.imageUrl || "");
                } else {
                    console.log("Item data not found!");
                }
            } catch (error) {
                console.error("Error fetching item data:", error);
            }
        };

        fetchItemData();
    }, [item.id]); // Jalankan hanya saat item.id berubah

    const handleSubmit = async () => {
        try {
            const itemRef = ref(database, `items/${item.id}`); // Path ke data item

            // Data yang akan diperbarui
            const updatedData = {
                name,
                brand,
                price6h,
                price12h,
                price24h,
                imageUrl,
            };

            // Update data di Firebase
            await update(itemRef, updatedData);
            console.log("Data successfully updated:", updatedData);

            // Kembali ke halaman sebelumnya
            navigation.goBack();
        } catch (error) {
            console.error("Error updating item data:", error);
        }
    };

    return (
        <ScrollView contentContainerStyle={{ flexGrow: 1 }} keyboardShouldPersistTaps="handled">
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
                <FormControl>
                    <FormControl.Label>Image URL</FormControl.Label>
                    <Input value={imageUrl} onChangeText={setImageUrl}/>
                </FormControl>
                <Button onPress={handleSubmit} mt="4" bg="violet.800" _text={{ color: "white" }}>
                    Save Changes
                </Button>
            </VStack>
        </Box>
        </ScrollView>
    );
};

export default EditItem;
