import React, { useState } from "react";
import { ScrollView } from "react-native";
import {
    Box,
    Text,
    Button,
    VStack,
    Divider,
    Item,
    Label,
    DatePicker,
} from "native-base";
import { Header } from "../components";

const Booking = ({ navigation }) => {
    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);
    const [totalCost, setTotalCost] = useState(0);

    const calculateCost = () => {
        if (startDate && endDate) {
            // Calculate the number of days between startDate and endDate
            const days = (new Date(endDate) - new Date(startDate)) / (1000 * 3600 * 24);
            if (days < 0) {
                alert("Tanggal selesai tidak boleh sebelum tanggal mulai");
                setTotalCost(0);
            } else {
                setTotalCost(days * 350000); // Rp 350.000 per day
            }
        }
    };

    return (
        <Box flex={1} bg="#F9F9F9">
            <Header title="Booking" withBack={true} />
            <ScrollView>
                <Box safeArea p="4" bg="#F9F9F9">
                    <VStack space={4} mt="4" px="4">
                        <Text fontSize="xl" fontWeight="bold">
                            Pilih Tanggal Sewa
                        </Text>

                        <Item stackedLabel>
                            <Label>Tanggal Mulai</Label>
                            <DatePicker
                                date={startDate}
                                onDateChange={setStartDate}
                            />
                        </Item>

                        <Item stackedLabel>
                            <Label>Tanggal Selesai</Label>
                            <DatePicker
                                date={endDate}
                                onDateChange={setEndDate}
                            />
                        </Item>

                        <Divider my="2" />

                        {/* Display total cost */}
                        {totalCost > 0 && (
                            <Text fontSize="lg" fontWeight="bold">
                                Total Biaya: Rp {totalCost}
                            </Text>
                        )}

                        <Divider my="2" />

                        {/* Calculate Button */}
                        <Button
                            mt="4"
                            bg="violet.800"
                            _text={{ color: "white", fontWeight: "bold" }}
                            onPress={calculateCost}
                            disabled={!startDate || !endDate}
                        >
                            Hitung Biaya
                        </Button>

                        {/* Close Button */}
                        <Button
                            mt="6"
                            bg="red.600"
                            _text={{ color: "white" }}
                            onPress={() => navigation.goBack()}
                        >
                            Kembali
                        </Button>
                    </VStack>
                </Box>
            </ScrollView>
        </Box>
    );
};

export default Booking;
