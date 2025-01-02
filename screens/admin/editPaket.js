import React, { useState, useEffect } from "react";
import { Box, VStack, FormControl, Input, Button, Text, ScrollView } from "native-base";
import { database } from "../../firebase"; // Impor konfigurasi Firebase
import { ref, get, update } from "firebase/database"; // Impor fungsi Firebase Realtime Database

const EditItem = ({ route, navigation }) => {
    const { item } = route.params; // Ambil item ID dari parameter navigasi

    // State untuk data item
    const [name, setName] = useState("");
    const [detailBarang, setDetailBarang] = useState("");
    const [price24h, setPrice24h] = useState("");
    const [imageUrl, setImageUrl] = useState("");

    // Ambil data dari Firebase berdasarkan ID item
    useEffect(() => {
        const fetchDataPaket = async () => {
            try {
                const itemRef = ref(database, `paket/${item.id}`); // Path ke data item
                const snapshot = await get(itemRef);

                if (snapshot.exists()) {
                    const data = snapshot.val();
                    setName(data.name || "");
                    setDetailBarang(data.detailBarang || "");
                    setPrice24h(data.price24h || "");
                    setImageUrl(data.imageUrl || "");
                } else {
                    console.log("Item data not found!");
                }
            } catch (error) {
                console.error("Error fetching item data:", error);
            }
        };

        fetchDataPaket();
    }, [item.id]); // Jalankan hanya saat item.id berubah

    const handleSubmit = async () => {
        try {
            const itemRef = ref(database, `paket/${item.id}`); // Path ke data item

            // Data yang akan diperbarui
            const updatedData = {
                name,
                detailBarang,
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
                Edit Paket
            </Text>
            <VStack space={4}>
                <FormControl>
                    <FormControl.Label>Nama Paket</FormControl.Label>
                    <Input value={name} onChangeText={setName} />
                </FormControl>
                <FormControl>
                    <FormControl.Label>Detail Barang</FormControl.Label>
                    <Input value={detailBarang} onChangeText={setDetailBarang} />
                </FormControl>
                <FormControl>
                    <FormControl.Label>Harga 1 Hari</FormControl.Label>
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
