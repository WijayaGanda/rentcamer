import React, { useState } from "react";
import { Heading, Center, Box, FormControl, VStack, Input, Button, Text, Spacer, Image, ScrollView } from "native-base";
import { auth } from "../firebase"; // Pastikan mengimpor auth instance dari Firebase
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth"; // Firebase modular
import logo from "../assets/logo.png";

const Register = ({ navigation }) => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false); // Menambahkan loading state untuk tombol

  // Fungsi untuk handle registrasi
  const handleRegister = async () => {
    setLoading(true); // Mulai loading ketika registrasi dimulai
    try {
      // Membuat akun dengan email dan password
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      
      // Menambahkan nama depan dan belakang pada profil pengguna
      await updateProfile(userCredential.user, {
        displayName: `${firstName} ${lastName}`
      });

      console.log("User registered successfully!");
      navigation.navigate("Login"); // Setelah berhasil registrasi, arahkan ke halaman login
    } catch (error) {
      console.error("Error during registration:", error.message);
      alert("Registration failed: " + error.message); // Menampilkan pesan error jika registrasi gagal
    } finally {
      setLoading(false); // Hentikan loading setelah selesai
    }
  };

  return (
    <ScrollView flex={1} bg="#F3F4F6">
      <Center flex={1}>
        <Box safeArea p="4" py="8" w="95%" maxW="350" bg="#F3F4F6" borderRadius="md">
          <Center>
            <Image source={logo} alt="logo" size="xl" />
          </Center>
          <Heading textAlign={"center"} mb={7}>Create New Account</Heading>
          <VStack space={4}>
            <FormControl isRequired>
              <FormControl.Label fontWeight={"bold"}>First Name</FormControl.Label>
              <Input
                placeholder="First Name"
                value={firstName}
                onChangeText={(text) => setFirstName(text)}
                height={50}
              />
            </FormControl>
            <FormControl isRequired>
              <FormControl.Label fontWeight={"bold"}>Last Name</FormControl.Label>
              <Input
                placeholder="Last Name"
                value={lastName}
                onChangeText={(text) => setLastName(text)}
                height={50}
              />
            </FormControl>
            <FormControl isRequired>
              <FormControl.Label fontWeight={"bold"}>Email</FormControl.Label>
              <Input
                placeholder="Masukkan email"
                value={email}
                onChangeText={(text) => setEmail(text)}
                keyboardType="email-address"
                autoCapitalize="none"
                height={50}
              />
            </FormControl>
            <FormControl isRequired>
              <FormControl.Label>Password</FormControl.Label>
              <Input
                placeholder="Masukkan Password"
                value={password}
                onChangeText={(text) => setPassword(text)}
                secureTextEntry
                height={50}
              />
            </FormControl>

            <Button
              mt={4}
              mb={6}
              backgroundColor={"blue.800"}
              height={50}
              fontWeight={"bold"}
              onPress={handleRegister}
              borderRadius={15}
              isLoading={loading} // Menambahkan status loading untuk tombol
              isLoadingText="Signing Up..." // Menampilkan teks loading saat proses
            >
              Sign Up
            </Button>
          </VStack>
        </Box>
      </Center>
    </ScrollView>
  );
};

export default Register;
