import React, { useState } from "react";
import { ScrollView, Platform } from "react-native";
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
import { datas } from "../datas"; // Pastikan file ini benar-benar ada

const Booking = ({ route, navigation }) => {
    const { itemId } = route.params;
    const item = datas.find((data) => data.id === itemId);

    const [duration, setDuration] = useState("6h"); // Default durasi
    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(new Date());
    const [totalDays, setTotalDays] = useState(1); // Default hari
    const [totalPrice, setTotalPrice] = useState(item.price_6h); // Harga default
    const [showStartPicker, setShowStartPicker] = useState(false);

    const handleDurationChange = (value) => {
        setDuration(value);
        const selectedDate = new Date(startDate);

        switch (value) {
            case "6h":
                setEndDate(selectedDate); // Tanggal selesai sama
                setTotalDays(1);
                setTotalPrice(item.price_6h);
                break;
            case "12h":
                setEndDate(selectedDate); // Tanggal selesai sama
                setTotalDays(1);
                setTotalPrice(item.price_12h);
                break;
            case "24h":
                selectedDate.setDate(selectedDate.getDate() + 1);
                setEndDate(selectedDate); // Tanggal selesai 1 hari setelahnya
                setTotalDays(1);
                setTotalPrice(item.price_24h);
                break;
            default:
                const days = parseInt(value.replace("d", "")); // Ambil jumlah hari
                selectedDate.setDate(selectedDate.getDate() + days);
                setEndDate(selectedDate); // Tambahkan jumlah hari ke tanggal selesai
                setTotalDays(days);
                setTotalPrice(days * item.price_24h);
                break;
        }
    };

    const handleBooking = () => {
        console.log({
            itemId: item.id,
            name: item.name,
            startDate: startDate.toDateString(),
            endDate: endDate.toDateString(),
            totalDays,
            totalPrice,
        });
        alert(`Booking berhasil!\nTotal harga: Rp ${totalPrice}`);
    };

    return (
        <Box flex={1} bg="#F9F9F9">
            <Header title="Booking Now" withBack={true} />
            <ScrollView>
                <Box safeArea p="4" bg="#F9F9F9">
                    <Box alignItems="center">
                        <Image
                            source={item.image}
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
                            Cetak Booking
                        </Button>
                    </VStack>
                </Box>
            </ScrollView>
        </Box>
    );
};

export default Booking;
