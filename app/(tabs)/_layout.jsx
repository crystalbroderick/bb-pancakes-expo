// app/(tabs)/_layout.js
import { FONTS, spacingY } from "@/constants/theme";
import { useTheme } from "@/context/ThemeContext"; // update path if different
import { Ionicons } from "@expo/vector-icons";
import { Tabs, usePathname, useRouter } from "expo-router";
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  useWindowDimensions,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function TabsLayout() {
  const router = useRouter();
  const pathname = usePathname();
  const { theme, isLightTheme } = useTheme();
  const { width } = useWindowDimensions();
  const insets = useSafeAreaInsets();

  const isCreatePage = pathname === "/create";
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
      }}
      tabBar={({ state, descriptors, navigation }) => {
        return (
          <View
            style={[
              styles.tabContainer,
              {
                backgroundColor: isLightTheme ? theme.accent_blue : theme.white,
                width: width * 0.9,
                borderRadius: 15,
                position: "absolute",
                bottom: insets.bottom + spacingY._10,

                alignSelf: "center",
                shadowColor: "#000",
                shadowOffset: { width: 0, height: 3 },
                shadowOpacity: 0.1,
                shadowRadius: 5,
                elevation: 10,
                height: 70,
              },
            ]}>
            {(() => {
              const orderedRoutes = [
                "index",
                "favorites",
                "groceries",
                "calendar",
              ];

              const visibleRoutes = orderedRoutes
                .map((name) => state.routes.find((r) => r.name === name))
                .filter(Boolean);

              return visibleRoutes.map((route, index) => {
                const { options } = descriptors[route.key];
                const isFocused =
                  state.index ===
                  state.routes.findIndex((r) => r.key === route.key);

                let icon = "";
                let label = "";

                switch (route.name) {
                  case "index":
                    icon = "book";
                    label = "Recipes";
                    break;
                  case "favorites":
                    icon = "heart";
                    label = "Favs";
                    break;
                  case "groceries":
                    icon = "cart";
                    label = "Groceries";
                    break;
                  case "calendar":
                    icon = "calendar";
                    label = "Plan";
                    break;
                  default:
                    icon = "help-circle";
                    label = "Unknown";
                    break;
                }
                return (
                  <TouchableOpacity
                    key={route.key}
                    onPress={() => navigation.navigate(route.name)}
                    style={styles.tabButton}>
                    <Ionicons
                      name={icon}
                      size={30}
                      color={
                        isFocused
                          ? isLightTheme
                            ? theme.white
                            : theme.darkGray
                          : theme.gray
                      }
                    />
                    <Text
                      style={[
                        FONTS.label,
                        {
                          color: isFocused
                            ? isLightTheme
                              ? theme.white
                              : theme.darkGray
                            : "gray",
                        },
                      ]}>
                      {label}
                    </Text>
                  </TouchableOpacity>
                );
              });
            })()}

            {/* Custom FAB center button, only show if not on /create */}
            {/* {!isCreatePage && (
              <TouchableHighlight
                onPress={() => router.push("/create-recipe")}
                style={styles.fabButton}
                underlayColor={theme.secondary}
                activeOpacity={0.7}>
                <Ionicons name="add" size={32} color="white" />
              </TouchableHighlight>
            )} */}
          </View>
        );
      }}
    />
  );
}

const styles = StyleSheet.create({
  tabContainer: {
    flexDirection: "row",
    height: 65,
    justifyContent: "space-around",
    alignItems: "center",
  },
  tabButton: {
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
  },
  fabButton: {
    position: "absolute",
    top: -30,
    alignSelf: "center",
    backgroundColor: "#E0A840",
    width: 60,
    height: 60,
    borderRadius: 30,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 6,
  },
  tabText: {
    fontSize: 12,
    fontFamily: "Inter",
  },
});
