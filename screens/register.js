import React, { useState } from "react";
import { Heading, Center, Box, FormControl, VStack, Input, Button, Text, Spacer, Image, Pressable, ScrollView } from "native-base";
import logo from "../assets/logo.png";

const Register = ({ navigation }) => {
    const [firstName, setFirstName] = useState("")
    const [lastName, setLastName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const handleRegister = () => {
        console.log("FirstName", firstName)
        console.log("LastName", lastName)
        console.log("Email", email)
        console.log("Password", password)

        navigation.navigate("Login")
    }

    return (
        <ScrollView flex={1} bg="#F3F4F6">
            <Center flex={1}>
                <Box safeArea p="4" py="8" w="95%" maxW="350" bg="#F3F4F6" borderRadius="md" >
                    <Center>
                        <Image source={logo} alt="logo" size="xl"></Image>
                    </Center>
                    <Heading textAlign={"center"} mb={7}>Create New Account</Heading>
                    <VStack space={4}>
                        <FormControl isRequired>
                            <FormControl.Label fontWeight={"bold"}>FirstName</FormControl.Label>
                            <Input placeholder="First Name"
                                value={firstName}
                                onChangeText={(text) => setFirstName(text)}
                                height={50}
                            />
                        </FormControl>
                        <FormControl isRequired>
                            <FormControl.Label fontWeight={"bold"}>LastName</FormControl.Label>
                            <Input placeholder="Last Name"
                                value={lastName}
                                onChangeText={(text) => setLastName(text)}
                                height={50}
                            />
                        </FormControl>
                        <FormControl isRequired>
                            <FormControl.Label fontWeight={"bold"}>Email</FormControl.Label>
                            <Input placeholder="Masukkan email"
                                value={email}
                                onChangeText={(text) => setEmail(text)}
                                keyboardType="email-address"
                                autoCapitalize="none"
                                height={50}
                            />
                        </FormControl>
                        <FormControl isRequired>
                            <FormControl.Label>Password</FormControl.Label>
                            <Input placeholder="Masukkan Password"
                                value={password}
                                onChangeText={(text) => setPassword(text)}
                                secureTextEntry
                                height={50}
                            />
                        </FormControl>

                        <Button mt={4} mb={6} backgroundColor={"blue.800"} height={50} fontWeight={"bold"} onPress={handleRegister} borderRadius={15}>Sign Up</Button>
                    </VStack>
                </Box>
            </Center>
        </ScrollView>

    )
}

export default Register;