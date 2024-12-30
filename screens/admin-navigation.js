import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons"; // Pastikan Anda mengimpor Ionicons
import { useNavigation } from "@react-navigation/native"; // Untuk navigasi
import Dashboard from "./admin/dashboard";
import AddItem from "./admin/addItem";
import AddCamera from "./admin/addCamera";
import CameraBucket from "./admin/cameraBucket.js";
import EditItem from "./admin/editItem";
import { auth } from "../firebase"; // Pastikan auth sudah diinisialisasi dengan Firebase

const Stack = createNativeStackNavigator();

const AdminNavigation = () => {
    const navigation = useNavigation(); // Mendapatkan fungsi navigasi

    const handleLogout = async () => {
        try {
            await auth.signOut();  // Logout dari Firebase
            console.log("User logged out!");
            navigation.navigate("Login");  // Arahkan ke halaman Login
        } catch (error) {
            console.error("Error during logout:", error.message);
        }
    };

    return (
        <Stack.Navigator
            initialRouteName="Dashboard"
            screenOptions={{
                headerStyle: { backgroundColor: "#6200EE" },
                headerTintColor: "#fff",
                headerTitleStyle: { fontWeight: "bold" },
            }}
        >
            <Stack.Screen
                name="Dashboard"
                component={Dashboard}
                options={{
                    title: "Admin Dashboard",
                    headerRight: () => (
                        <TouchableOpacity onPress={handleLogout} style={{ marginRight: 15 }}>
                            <Ionicons name="log-out-outline" size={32} color="white" />
                        </TouchableOpacity>
                    ),
                }}
            />
            <Stack.Screen
                name="AddItem"
                component={AddItem}
                options={{ title: "Add New Camera" }}
            />
            <Stack.Screen
                name="AddCamera"
                component={AddCamera}
                options={{ title: "Add Camera" }}
            />
            <Stack.Screen
                name="CameraBucket"
                component={CameraBucket}
                options={{ title: "Camera Bucket" }}
            />
            <Stack.Screen
                name="EditItem"
                component={EditItem}
                options={{ title: "Edit Camera" }}
            />
        </Stack.Navigator>
    );
};

export default AdminNavigation;
