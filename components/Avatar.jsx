import { COLORS } from "@/constants/theme";
import { Image, StyleSheet } from "react-native";
import { getUserImageSrc } from "../services/imageService";
export default function Avatar({ uri, size = 150, style = {} }) {
  const avatarSize = { height: size, width: size };

  return (
    <Image
      source={getUserImageSrc(uri)}
      accessibilityLabel="Avatar"
      style={[avatarSize, styles.avatar, style]}
      contentFit="cover"
      transition={100}
    />
  );
}

const styles = StyleSheet.create({
  avatar: {
    borderRadius: 200,
    borderWidth: 1,
    borderColor: COLORS.primary_light,
    shadowColor: "#000",
    elevation: 10,
    shadowColor: "black",
    objectFit: "cover",
    paddingTop: 0,
  },
});
