import { FontAwesome5, MaterialCommunityIcons } from "@expo/vector-icons";

export const TAGS = [
  "breakfast",
  "main",
  "sides",
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
    color: "#3360b3",
    icon: <FontAwesome5 name="hamburger" size={12} color="#000000" />,
  },
  dinner: {
    color: "#6C97E7",
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
    color: "#B95EF7",
    icon: <FontAwesome5 name="coffee" size={12} color="#ffffff" />,
  },
  main: {
    color: "#b45c84ff",
    icon: <FontAwesome5 name="coffee" size={12} color="#ffffff" />,
  },
  sides: {
    color: "#F76C5E",
    icon: <FontAwesome5 name="coffee" size={12} color="#ffffff" />,
  },
  other: {
    color: "#a673b8ff",
    icon: (
      <MaterialCommunityIcons
        name="food-fork-drink"
        size={12}
        color="#000000"
      />
    ),
  },
  default: {
    color: "#cf3737ff",
    icon: <FontAwesome5 name="utensils" size={12} color="#333" />,
  },
};
