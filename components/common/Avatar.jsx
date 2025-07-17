import { COLORS } from "@/constants/theme";
import { getUserImageSrc } from "@/services/imageService";
import { Image, StyleSheet } from "react-native";
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
    borderColor: COLORS.darkGray,
    shadowColor: "black",
    elevation: 6,
    objectFit: "cover",
    paddingTop: 0,
  },
});
