import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Dashboard from "./admin/dashboard";
import AddItem from "./admin/addItem";
import AddCamera from "./admin/addCamera";
import CameraBucket from "./admin/cameraBucket.js";
import EditItem from "./admin/editItem";

const Stack = createNativeStackNavigator();

const AdminNavigation = () => {
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
                options={{ title: "Admin Dashboard" }}
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
