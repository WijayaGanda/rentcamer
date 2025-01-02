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

const OrderPaket = ({ route, navigation }) => {
    const { itemId } = route.params;
    const [item, setItem] = useState(null);
    const [duration, setDuration] = useState("6h");
    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(new Date());
    const [totalDays, setTotalDays] = useState(1);
    const [totalPrice, setTotalPrice] = useState(0);
    const [showStartPicker, setShowStartPicker] = useState(false);

    // Fetch item data from Firebase based on itemId
    useEffect(() => {
        const itemRef = ref(database, `paket/${itemId}`);
        onValue(itemRef, (snapshot) => {
            if (snapshot.exists()) {
                const data = snapshot.val();
                setItem(data);
                setTotalPrice(parseInt(data.price24h)); // Default price (6h)
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
        const bookingRef = ref(database, "paketBookings");
        const newBookingRef = push(bookingRef);

        console.log("Saving booking to Firebase:", bookingData);

        set(newBookingRef, bookingData)
            .then(() => {
                console.log("Booking successfully saved:", bookingData);
                // Do not call PDF generation here anymore
            })
            .catch((error) => {
                console.error("Error saving booking:", error);
                Alert.alert("Error", "Terjadi kesalahan saat menyimpan pemesanan.");
            });
    };

    const handleBooking = () => {
        const user = auth.currentUser;

        if (user && item) {
            const userEmail = user.email || "Email not available";
            const bookingData = {
                itemId: itemId,
                name: item.name,
                imageUrl: item.imageUrl,
                startDate: startDate.toDateString(),
                endDate: endDate.toDateString(),
                totalDays,
                totalPrice,
                userId: user.uid,
                penyewa: userEmail,
            };

            alert("Berhasil Booking.");
            console.log("Booking data to be saved:", bookingData);
            saveBooking(bookingData);

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
                            {/* <Text fontSize="md" color="coolGray.500">
                                {item.brand}
                            </Text> */}

                            <Divider my="2" />

                            <Text fontSize="lg" fontWeight="bold">
                                Pilih Durasi:
                            </Text>
                            <Radio.Group
                                name="durationGroup"
                                value={duration}
                                onChange={(value) => handleDurationChange(value)}
                            >
                                <Radio value="24h" my={1}>
                                    24 Jam
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
                               BOOKING
                            </Button>
                        </VStack>
                    </Box>
                </ScrollView>
            ) : (
                <Text>Memuat data item...</Text>
            )}
        </Box>
    );
};

export default OrderPaket;