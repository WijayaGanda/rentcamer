import React, { useState, useEffect } from "react";
import { ScrollView, Platform, Linking, Alert } from "react-native";
import {
    Box,
    Text,
    Image,
    Button,
    VStack,
    Divider,
    Radio,
    FormControl,
} from "native-base";
import DateTimePicker from "@react-native-community/datetimepicker";
import { Header } from "../components";
import { auth, database } from "../firebase";
import { ref, onValue, push, set } from "firebase/database";
import * as FileSystem from 'expo-file-system'; // Import expo-file-system
import { PDFDocument, rgb } from 'pdf-lib'; // Assuming pdf-lib is used for PDF generation
import * as MediaLibrary from 'expo-media-library'; // Import expo-media-library

const Booking = ({ route, navigation }) => {
    const { itemId } = route.params;
    const [item, setItem] = useState(null);
    const [duration, setDuration] = useState("6h");
    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(new Date());
    const [totalDays, setTotalDays] = useState(1);
    const [totalPrice, setTotalPrice] = useState(0);
    const [showStartPicker, setShowStartPicker] = useState(false);
    const [pdfUri, setPdfUri] = useState(null); // State for PDF URI

    // Fetch item data from Firebase based on itemId
    useEffect(() => {
        const itemRef = ref(database, `items/${itemId}`);
        onValue(itemRef, (snapshot) => {
            if (snapshot.exists()) {
                const data = snapshot.val();
                setItem(data);
                setTotalPrice(parseInt(data.price6h)); // Default price (6h)
            } else {
                console.error("Item not found in Firebase.");
            }
        });
    }, [itemId]);

    const handleDurationChange = (value) => {
        setDuration(value);
        const selectedDate = new Date(startDate);

        if (item) {
            switch (value) {
                case "6h":
                    setEndDate(selectedDate);
                    setTotalDays(1);
                    setTotalPrice(parseInt(item.price6h));
                    break;
                case "12h":
                    setEndDate(selectedDate);
                    setTotalDays(1);
                    setTotalPrice(parseInt(item.price12h));
                    break;
                case "24h":
                    selectedDate.setDate(selectedDate.getDate() + 1);
                    setEndDate(selectedDate);
                    setTotalDays(1);
                    setTotalPrice(parseInt(item.price24h));
                    break;
                default:
                    const days = parseInt(value.replace("d", "")); 
                    selectedDate.setDate(selectedDate.getDate() + days);
                    setEndDate(selectedDate);
                    setTotalDays(days);
                    setTotalPrice(days * parseInt(item.price24h));
                    break;
            }
        }
    };

    const saveBooking = (bookingData) => {
        const bookingRef = ref(database, "bookings");
        const newBookingRef = push(bookingRef);

        console.log("Saving booking to Firebase:", bookingData);

        set(newBookingRef, bookingData)
            .then(() => {
                console.log("Booking successfully saved:", bookingData);
            })
            .catch((error) => {
                console.error("Error saving booking:", error);
                Alert.alert("Error", "Terjadi kesalahan saat menyimpan pemesanan.");
            });
    };

    const generateInvoicePDF = async (bookingData) => {
        try {
            const pdfPath = `${FileSystem.documentDirectory}booking_invoice.pdf`;
            console.log("Generating PDF at path:", pdfPath); // Log path
    
            const pdf = await PDFDocument.create();
            const page = pdf.addPage();
            const { width, height } = page.getSize();
    
            page.drawText('Booking Invoice', { x: 50, y: height - 50, size: 20, color: rgb(0, 0, 0) });
            page.drawText(`Item Name: ${bookingData.name}`, { x: 50, y: height - 80, size: 12, color: rgb(0, 0, 0) });
            page.drawText(`Brand: ${bookingData.brand}`, { x: 50, y: height - 100, size: 12, color: rgb(0, 0, 0) });
            page.drawText(`Start Date: ${bookingData.startDate}`, { x: 50, y: height - 120, size: 12, color: rgb(0, 0, 0) });
            page.drawText(`End Date: ${bookingData.endDate}`, { x: 50, y: height - 140, size: 12, color: rgb(0, 0, 0) });
            page.drawText(`Total Days: ${bookingData.totalDays}`, { x: 50, y: height - 160, size: 12, color: rgb(0, 0, 0) });
            page.drawText(`Total Price: Rp ${bookingData.totalPrice}`, { x: 50, y: height - 180, size: 12, color: rgb(0, 0, 0) });
    
            const pdfBytes = await pdf.save();
            console.log("PDF bytes generated:", pdfBytes);  // Log generated PDF bytes
    
            await FileSystem.writeAsStringAsync(pdfPath, pdfBytes, {
                encoding: FileSystem.EncodingType.Base64,  // Use Base64 encoding for writing the PDF
            });
    
            console.log('PDF successfully saved at:', pdfPath);
            
            // After PDF is created, move it to gallery
            const asset = await MediaLibrary.createAssetAsync(pdfPath);
            const album = await MediaLibrary.getAlbumAsync('Downloads') || await MediaLibrary.createAlbumAsync('Downloads', asset, false);
            console.log("PDF saved to gallery:", album);
    
            setPdfUri(pdfPath); // Set PDF URI for viewing
    
            return pdfPath;
        } catch (error) {
            console.error("Error generating PDF:", error);
            throw error;
        }
    };

    const handleBooking = () => {
        const user = auth.currentUser;

        if (user && item) {
            const userEmail = user.email || "Email not available";
            const bookingData = {
                itemId: itemId,
                name: item.name,
                brand: item.brand,
                imageUrl: item.imageUrl,
                startDate: startDate.toDateString(),
                endDate: endDate.toDateString(),
                totalDays,
                totalPrice,
                userId: user.uid,
                penyewa: userEmail,
            };

            console.log("Booking data to be saved:", bookingData);
            saveBooking(bookingData);

            // Show alert to confirm PDF download
            Alert.alert(
                "Cetak PDF",
                "Apakah Anda ingin mengunduh PDF?",
                [
                    {
                        text: "Yes",
                        onPress: async () => {
                            try {
                                const pdfPath = await generateInvoicePDF(bookingData);
                                Alert.alert("Sukses", `PDF berhasil diunduh!`);
                            } catch (error) {
                                Alert.alert("Gagal", "Terjadi kesalahan saat mengunduh PDF.");
                            }
                        },
                    },
                    {
                        text: "No",
                        onPress: () => {
                            Alert.alert("Gagal", "Pembatalan unduhan PDF.");
                        },
                        style: "cancel",
                    },
                ]
            );
        } else {
            console.log("Item data not loaded.");
            alert("Item data not loaded. Please try again.");
        }
    };

    return (
        <Box flex={1} bg="#F9F9F9">
            <Header title="Booking Now" withBack={true} />
            {item ? (
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
                            <Text fontSize="md" color="coolGray.500">
                                {item.brand}
                            </Text>

                            <Divider my="2" />

                            <Text fontSize="lg" fontWeight="bold">
                                Pilih Durasi:
                            </Text>
                            <Radio.Group
                                name="durationGroup"
                                value={duration}
                                onChange={(value) => handleDurationChange(value)}
                            >
                                <Radio value="6h" my={1}>
                                    6 Jam
                                </Radio>
                                <Radio value="12h" my={1}>
                                    12 Jam
                                </Radio>
                                <Radio value="24h" my={1}>
                                    24 Jam
                                </Radio>
                                <Radio value="2d" my={1}>
                                    2 Hari
                                </Radio>
                                <Radio value="3d" my={1}>
                                    3 Hari
                                </Radio>
                            </Radio.Group>

                            <Divider my="2" />

                            <Text fontSize="lg" fontWeight="bold">
                                Pilih Tanggal Mulai:
                            </Text>
                            <FormControl>
                                <Button
                                    onPress={() => setShowStartPicker(true)}
                                    bg="gray.100"
                                    _text={{ color: "black" }}
                                >
                                    {startDate.toDateString()}
                                </Button>
                                {showStartPicker && (
                                    <DateTimePicker
                                        value={startDate}
                                        mode="date"
                                        display={Platform.OS === "ios" ? "spinner" : "default"}
                                        onChange={(event, date) => {
                                            setShowStartPicker(false);
                                            if (date) setStartDate(date);
                                        }}
                                    />
                                )}
                            </FormControl>

                            <Divider my="2" />

                            <Text fontSize="lg" fontWeight="bold">
                                Ringkasan:
                            </Text>
                            <Text fontSize="md">Tanggal Mulai: {startDate.toDateString()}</Text>
                            <Text fontSize="md">Tanggal Selesai: {endDate.toDateString()}</Text>
                            <Text fontSize="md">Total Hari: {totalDays}</Text>
                            <Text fontSize="md" fontWeight="bold">
                                Total Harga: Rp {totalPrice}
                            </Text>

                            <Button mt="4" bg="green.600" _text={{ color: "white" }} onPress={handleBooking}>
                                Cetak PDF
                            </Button>

                            {/* Button to view PDF */}
                            {pdfUri && (
                                <Button mt="4" onPress={() => Linking.openURL(pdfUri)}>
                                    Lihat PDF
                                </Button>
                            )}
                        </VStack>
                    </Box>
                </ScrollView>
            ) : (
                <Text>Loading...</Text>
            )}
        </Box>
    );
};

export default Booking;
