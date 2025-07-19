import { FontAwesome5, MaterialCommunityIcons } from "@expo/vector-icons";

export const TAGS = [
  "breakfast",
  "dessert",
  "lunch",
  "dinner",
  "vegetarian",
  "vegan",
  "drinks",
  "other",
];

export const TAG_STYLES = {
  breakfast: {
    color: "#e7bc6c",
    icon: (
      <MaterialCommunityIcons name="food-croissant" size={14} color="#000000" />
    ),
  },
  lunch: {
    color: "#F76C5E",
    icon: <FontAwesome5 name="hamburger" size={12} color="#000000" />,
  },
  dinner: {
    color: "#3360b3",
    icon: <MaterialCommunityIcons name="food" size={14} color="#000000" />,
  },
  dessert: {
    color: "#E182AC",
    icon: <MaterialCommunityIcons name="cupcake" size={14} color="#FFFFFF " />,
  },
  vegan: {
    color: "#56B870",
    icon: <FontAwesome5 name="leaf" size={12} color="#FFFFFF" />,
  },
  vegetarian: {
    color: "#6FB48A",
    icon: <FontAwesome5 name="carrot" size={12} color="#000000" />,
  },
  drinks: {
    color: "#b45c84ff",
    icon: <FontAwesome5 name="coffee" size={12} color="#ffffff" />,
  },
  other: {
    color: "#744583ff",
    icon: (
      <MaterialCommunityIcons
        name="food-fork-drink"
        size={12}
        color="#000000"
      />
    ),
  },
  default: {
    color: "#D3D3D3",
    icon: <FontAwesome5 name="utensils" size={12} color="#333" />,
  },
};
