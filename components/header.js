import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "react-native";
import { Box, HStack, Image, Heading } from "native-base";
import { TouchableOpacity } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useNavigation } from "@react-navigation/native";

const Header = ({ title, withBack = false }) => {
    const white = "#F3F4F6"
    const navigation = useNavigation()

    return (
        <SafeAreaView>
            <StatusBar barStyle="light" backgroundColor={white} />
            <Box bg="#F3F4F6" p={"4"}>
                <HStack alignItems={"center"}>
                    {!withBack ? (
                        <>
                            <Image
                                source={require("../assets/logo.png")}
                                w="12"
                                h="12"
                                alt="CNN Logo"
                                mr={"3"}
                            />
                        </>
                    ) : (
                        <TouchableOpacity
                            activeOpacity={0.5}
                            onPress={() => navigation.goBack()}
                        >
                            <Box mr={"3"}>
                                <Ionicons name="arrow-back-outline" size={32} color="black" />
                            </Box>
                        </TouchableOpacity>
                    )}
                    <Heading color={"black"}>{title}</Heading>
                </HStack>

            </Box>
        </SafeAreaView>
    )
}

export default Header;