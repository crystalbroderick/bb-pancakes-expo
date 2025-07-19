import ThemedText from "@/components/theme/ThemedText";
import { Link } from "expo-router";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import Header from "../../components/common/Header";
import SubHeader from "../../components/common/SubHeader";
import SafeScreen from "../../components/SafeScreen";

const AboutScreen = () => {
  const features = ["Save your favorite meals", "Create new meals"];
  const futureFeatures = [
    "Recipe Notes: remember family favorites",
    "Draggable Ingredients/Steps",
    "Grocery list",
    "Meal planner",
  ];
  const renderItem = ({ item, index }) => (
    <View style={styles.listItem} key={index}>
      <ThemedText style={styles.listItemNumber}>{index + 1}.</ThemedText>
      <ThemedText>{item}</ThemedText>
    </View>
  );

  return (
    <SafeScreen paddingHorizontal>
      <Header showBackButton title="About"></Header>
      <ScrollView style={styles.container}>
        <SubHeader>Welcome to BB Pancakes!</SubHeader>
        <ThemedText style={{}}>
          Hi! When I'm not coding or playing video games, you'll find me in the
          kitchen making meals for my little family. I started building this app
          to create the kind of recipe experience I always wished existed; One
          with family ratings, meal stats, and colorful themes.
        </ThemedText>
        <SubHeader>Features</SubHeader>
        <ThemedText>With BB Pancakes, you can:</ThemedText>
        {features.map((item, index) => renderItem({ item, index }))}

        <SubHeader>Future Plans</SubHeader>
        {futureFeatures.map((item, index) => renderItem({ item, index }))}

        <SubHeader>Got Suggestions?</SubHeader>
        <ThemedText>
          This app is a passion project built with love, and I'm always working
          to make it better. Got ideas, feedback, or just want to say hi? Send
          me a message.
        </ThemedText>
        <SubHeader>Atributions</SubHeader>
        <Link href="https://www.freepik.com/free-vector/happy-cute-girl-chef-showing-welcome-sign-with-her-hand-banner-logo-cartoon-art-illustration_17565124.htm#fromView=search&page=1&position=16&uuid=45ff9e45-5f77-43d1-aa02-f9f13c061e76&query=Little+Chef+cute+girl+pink+smile+">
          <ThemedText>
            Chef Images by <Text style={{ fontWeight: "bold" }}>mamewmy</Text>{" "}
            on Freepik
          </ThemedText>
        </Link>
      </ScrollView>
    </SafeScreen>
  );
};

export default AboutScreen;
const styles = StyleSheet.create({
  container: {
    flexDirection: "column",
    gap: 10,
  },
  listContainer: {
    padding: 10,
  },
  listItem: {
    flexDirection: "row",
    alignItems: "flex-start", // Align number and text to the top
    marginBottom: 5,
  },
  listItemNumber: {
    marginRight: 8,
    fontSize: 16,
    fontWeight: "bold",
  },
});
