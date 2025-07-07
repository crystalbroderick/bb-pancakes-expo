import { useState } from "react";
import { ActivityIndicator, StyleSheet, Text, View } from "react-native";

const Loading = ({
  loading,
  contentStyle = {},
  loadingStyle = {},
  loadingText = "",
  success = "Success!",
}) => {
  const [isLoading, setIsLoading] = useState(true);

  if (isLoading) {
    return (
      <View style={[styles.loadingContainer, loadingStyle]}>
        <ActivityIndicator size="large" color="#0000ff" />
        <Text>{loadingText}</Text>
      </View>
    );
  }

  return (
    <View style={[styles.contentContainer, contentStyle]}>
      <Text>{success}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  contentContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default Loading;
