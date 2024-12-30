import React, { useState } from 'react';
import { Button, Box, Input, Text, Image } from 'native-base';
import * as ImagePicker from 'expo-image-picker';
import { supabase } from '../../src/supabase'; // Impor client Supabase

const AddCamera = ({ navigation }) => {
    const [imageUri, setImageUri] = useState(null);
    const [cameraName, setCameraName] = useState('');
    const [cameraBrand, setCameraBrand] = useState(''); // State for brand
    const [uploading, setUploading] = useState(false);

    const pickImage = async () => {
        const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (permissionResult.granted === false) {
            alert('Permission to access media library is required!');
            return;
        }
    
        const pickerResult = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaType.Image, // Menggunakan ImagePicker.MediaType.Image
            allowsEditing: true,
            quality: 1,
        });
    
        if (!pickerResult.cancelled) {
            setImageUri(pickerResult.uri);
        }
    };

    const uploadImageToSupabase = async () => {
        if (!imageUri || !cameraName || !cameraBrand) {
            alert('Please provide a camera name, brand, and select an image');
            return;
        }

        setUploading(true);
        try {
            const response = await fetch(imageUri);
            const blob = await response.blob();

            // Tentukan nama file dan path di Supabase Storage
            const fileName = imageUri.split('/').pop();
            const filePath = `img-camera-rent/${fileName}`;

            const { data, error } = await supabase.storage
                .from('img-camera-rent') // Gantilah dengan nama bucket Anda
                .upload(filePath, blob);

            if (error) {
                console.error('Error uploading image:', error.message);
                alert('Error uploading image!');
            } else {
                console.log('Image uploaded successfully:', data);

                // Optionally, save camera name, brand, and image URL to your database
                const publicUrl = supabase.storage
                    .from('img-camera-rent')
                    .getPublicUrl(filePath).publicURL;

                // You can store the camera name, brand, and image URL in your database here

                alert('Image uploaded successfully!');
                navigation.navigate('Dashboard');
            }
        } catch (error) {
            console.error('Error uploading image:', error);
            alert('Error uploading image!');
        } finally {
            setUploading(false);
        }
    };

    return (
        <Box flex={1} p="4" bg="#F9F9F9">
            <Input
                placeholder="Camera Name"
                value={cameraName}
                onChangeText={setCameraName}
                mb="4"
            />
            <Input
                placeholder="Brand"
                value={cameraBrand}
                onChangeText={setCameraBrand} // Update brand state
                mb="4"
            />
            <Button mb="4" onPress={pickImage}>
                Pick an Image
            </Button>
            {imageUri && <Image source={{ uri: imageUri }} alt="Picked Image" size="xl" />}
            <Button
                mt="4"
                isLoading={uploading}
                isLoadingText="Uploading..."
                onPress={uploadImageToSupabase}
            >
                Upload Camera
            </Button>
        </Box>
    );
};

export default AddCamera;
