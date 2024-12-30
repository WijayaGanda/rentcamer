import React, { useState, useEffect } from 'react';
import { Box, VStack, Button, FlatList, Text, Image, HStack, IconButton, Icon } from 'native-base';
import { MaterialIcons } from '@expo/vector-icons';
import { supabase } from '../../src/supabase';

const Dashboard = ({ navigation }) => {
    const [cameraItems, setCameraItems] = useState([]);

    useEffect(() => {
        const fetchCameraItems = async () => {
            const { data, error } = await supabase.storage
                .from('img-camera-rent') // Gantilah dengan nama bucket Anda
                .list('img-camera-rent', { limit: 10 });

            if (error) {
                console.error('Error fetching images:', error.message);
                return;
            }

            // Ambil URL gambar publik dan informasi brand dan name
            const imageUrls = data.map((file) => ({
                name: file.name,
                cameraName: file.name.split('.')[0], // Assume the name is the camera name, modify as needed
                cameraBrand: "Unknown", // Default value for brand, modify based on your data
                publicUrl: supabase.storage.from('img-camera-rent').getPublicUrl(file.name).publicURL,
            }));

            setCameraItems(imageUrls);
        };

        fetchCameraItems();
    }, []);

    const handleGetUrl = (fileName) => {
        const publicUrl = supabase.storage
            .from('img-camera-rent')
            .getPublicUrl(fileName).publicURL;
        alert(`Image URL: ${publicUrl}`);
    };

    return (
        <Box flex={1} p="4" bg="#F9F9F9">
            <Button
                mb="4"
                bg="violet.800"
                _text={{ color: 'white', fontWeight: 'bold' }}
                onPress={() => navigation.navigate('AddCamera')}
            >
                Add New Camera
            </Button>
            <FlatList
                data={cameraItems}
                keyExtractor={(item) => item.name}
                renderItem={({ item }) => (
                    <Box
                        borderBottomWidth="1"
                        borderColor="coolGray.200"
                        p="4"
                        rounded="md"
                        bg="white"
                        mb="2"
                    >
                        <VStack space={2}>
                            <Text fontWeight="bold">{item.cameraName}</Text> {/* Show camera name */}
                            <Text>{item.cameraBrand}</Text> {/* Show camera brand */}
                            <Image source={{ uri: item.publicUrl }} alt={item.name} size="xl" />
                        </VStack>
                        <HStack justifyContent="space-between" mt="2">
                            <IconButton
                                icon={<Icon as={MaterialIcons} name="link" color="violet.800" />}
                                onPress={() => handleGetUrl(item.name)}
                            />
                        </HStack>
                    </Box>
                )}
            />
        </Box>
    );
};

export default Dashboard;
