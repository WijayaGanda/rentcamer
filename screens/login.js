import React, { useState } from "react";
import { Heading, Center, Box, FormControl, VStack, Input, Button, Text, Spacer, Image, Pressable, ScrollView } from "native-base";
import logo from "../assets/logo.png";

const Login = ({navigation}) => {

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const handleLogin = () => {
    console.log("Email:", email);
    console.log("Password:", password);
  
    if (email === "admin@example.com" && password === "admin123") {
      // Redirect to Admin Dashboard for admin users
      navigation.navigate("AdminDashboard");
    } else {
      // Redirect to Tabs for regular users
      navigation.navigate("Tabs");
    }
  };
  

  return (
    <ScrollView flex={1} bg="#F3F4F6">
        <Center flex={1}>
        <Box safeArea p="4" py="8" w="95%" maxW="350" bg="#F3F4F6" borderRadius="md" >
          <Center>
            <Image source={logo} alt="logo" size="xl"/>
          </Center>
          <Heading textAlign={"center"} marginBottom={10}>Log In</Heading>
          <VStack space={4}>
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

            <Button mt={4} mb={6} backgroundColor={"blue.800"} height={50} fontWeight={"bold"} onPress={handleLogin} borderRadius={15}>Login</Button>
            <Text textAlign={"center"} color={"blue.800"} fontWeight={"bold"}>Forgot Password?</Text>
            <Spacer  />
            <Spacer  />
            <Spacer  />
            <Spacer  />
            <Spacer  />
            
            <Pressable onPress={() => navigation.navigate("Register")}>
            <Text textAlign={"center"} color={"blue.800"} fontWeight={"bold"}>Create New Account</Text>
            </Pressable>
          </VStack>
          </Box>
        </Center>
        </ScrollView>
  );
};

export default Login;

