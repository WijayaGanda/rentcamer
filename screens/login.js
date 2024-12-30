import React, { useState } from "react";
import { Heading, Center, Box, FormControl, VStack, Input, Button, Text, Spacer, Image, Pressable, ScrollView } from "native-base";
import { auth } from "../firebase"; // Mengimpor auth instance dari firebase
import { signInWithEmailAndPassword } from "firebase/auth"; // Import modular SDK untuk auth
import logo from "../assets/logo.png";

const Login = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false); // Status loading untuk tombol login

  // Fungsi login dengan email dan password
  const handleEmailLogin = async () => {
    setLoading(true); // Mulai loading
    try {
      await signInWithEmailAndPassword(auth, email, password); // Menggunakan API modular
      if (email === "admin@example.com" && password === "Admin123") {
        console.log("Admin logged in!");
        navigation.navigate("Admin"); // Arahkan ke halaman admin jika admin login
      } else {
        console.log("User logged in!");
        navigation.navigate("Tabs"); // Arahkan ke halaman Tabs jika pengguna biasa
      } // Arahkan ke halaman utama setelah login berhasil
    } catch (error) {
      console.error("Error during email login:", error.message);
      alert("Login failed: " + error.message); // Menampilkan pesan error
    } finally {
      setLoading(false); // Berhenti loading setelah selesai
    }
  };

  return (
    <ScrollView flex={1} bg="#F3F4F6">
      <Center flex={1}>
        <Box safeArea p="4" py="8" w="95%" maxW="350" bg="#F3F4F6" borderRadius="md">
          <Center>
            <Image source={logo} alt="logo" size="xl" />
          </Center>
          <Heading textAlign={"center"} marginBottom={10}>Log In</Heading>
          <VStack space={4}>
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
              mb={3}
              backgroundColor={"blue.800"}
              height={50}
              fontWeight={"bold"}
              onPress={handleEmailLogin}
              borderRadius={15}
              isLoading={loading} // Menampilkan loading pada tombol login
              isLoadingText="Logging In..."
            >
              Login
            </Button>
            <Text textAlign={"center"} color={"blue.800"} fontWeight={"bold"}>
              Forgot Password?
            </Text>
            <Spacer />
            <Pressable onPress={() => navigation.navigate("Register")}>
              <Text textAlign={"center"} color={"blue.800"} fontWeight={"bold"}>
                Create New Account
              </Text>
            </Pressable>
          </VStack>
        </Box>
      </Center>
    </ScrollView>
  );
};

export default Login;
