import React, { useState } from "react";
import { Box, VStack, FormControl, Input, Button, Text, Image, ScrollView } from "native-base";
import { database } from "../../firebase"; // Pastikan path ini sesuai dengan file firebase.js
import { ref, push } from "firebase/database";

const AddItem = ({ navigation }) => {
    const [name, setName] = useState("");
    const [detailBarang, setDetailBarang] = useState("");
    const [price24h, setPrice24h] = useState("");
    const [imageUrl, setImageUrl] = useState("");

    const handleSubmit = async () => {
        // Logika untuk menambahkan item baru
        const newItem = {
            name,
            detailBarang,
            price24h,
            imageUrl,
        };
        try {
            // Buat referensi ke path "items" di Realtime Database
            const itemsRef = ref(database, "paket");
            await push(itemsRef, newItem); // Tambahkan data ke path "items"
            console.log("Data berhasil disimpan:", newItem);
            navigation.goBack(); // Kembali ke halaman sebelumnya
          } catch (error) {
            console.error("Gagal menyimpan data:", error);
          }
    };

    return (
        <Box safeArea p="4" flex={1} bg="#F9F9F9">
            <ScrollView keyboardShouldPersistTaps="handled">
                <Text fontSize="2xl" fontWeight="bold" mb="4">
                    Add New Paket
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
                        <FormControl.Label>Price 1 Hari</FormControl.Label>
                        <Input value={price24h} onChangeText={setPrice24h} keyboardType="numeric" />
                    </FormControl>
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
                        Save
                    </Button>
                </VStack>
            </ScrollView>
        </Box>
    );
};

export default AddItem;
