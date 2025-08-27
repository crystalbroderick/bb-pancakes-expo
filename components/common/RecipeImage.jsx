import { COLORS } from "@/constants/theme";
import { getRecipeImageSrc } from "@/services/imageService";
import { Image, StyleSheet } from "react-native";
export default function RecipeImage({ uri, size = 150, style = {} }) {
  const imageSize = { height: size, width: size };

  return (
    <Image
      source={getRecipeImageSrc(uri)}
      accessibilityLabel="Recipe Image"
      style={[imageSize, styles.image, style]}
      contentFit="cover"
      transition={100}
    />
  );
}

const styles = StyleSheet.create({
  image: {
    borderRadius: 200,
    borderColor: COLORS.darkGray,
    shadowColor: "black",
    elevation: 6,
    objectFit: "cover",
    paddingTop: 0,
  },
});
