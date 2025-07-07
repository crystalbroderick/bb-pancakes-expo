import { scale, verticalScale } from "@/utils/styling";

export const COLORS = {
  primary: "#E0A840",
  primary_light: "#e7bc6c",
  secondary: "#4078e0",
  black: "#000",
  white: "#fff",
  accent: "#cb5f6f",
  accent_blue: "#253A4A",
  onPrimary: "#000000",
  onSecondary: "#fff",
  gray: "#808080",
  lightGray: "#f2f2f2",
  darkGray: "#1E293B",
};

export const themes = {
  light: {
    mode: "light",
    background: "#FFFFFF",
    text: "#2D2C2C",
    input_bg: "#f2f2f2",
    ...COLORS,
  },
  dark: {
    mode: "dark",
    background: "#253A4A",
    text: "#F8F8F8",
    input_bg: "#1E293B",

    ...COLORS,
  },
};

export const SPACING = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
};

export const spacingX = {
  _3: scale(3),
  _5: scale(5),
  _7: scale(7),
  _10: scale(10),
  _12: scale(12),
  _15: scale(15),
  _20: scale(20),
  _25: scale(25),
  _30: scale(30),
  _35: scale(35),
  _40: scale(40),
};

export const spacingY = {
  _5: verticalScale(5),
  _7: verticalScale(7),
  _10: verticalScale(10),
  _12: verticalScale(12),
  _15: verticalScale(15),
  _17: verticalScale(17),
  _20: verticalScale(20),
  _25: verticalScale(25),
  _30: verticalScale(30),
  _35: verticalScale(35),
  _40: verticalScale(40),
  _50: verticalScale(50),
  _60: verticalScale(60),
};

export const radius = {
  _3: verticalScale(3),
  _6: verticalScale(6),
  _10: verticalScale(10),
  _12: verticalScale(12),
  _15: verticalScale(15),
  _17: verticalScale(17),
  _20: verticalScale(20),
  _30: verticalScale(30),
};

export const RADIUS = {
  xs: 10,
  sm: 12,
  md: 14,
  lg: 16,
  xl: 18,
};

// Inter: Inter_400Regular,
// Inter_bold: Inter_700Bold,
// Molle: Molle_400Regular_Italic,
// Mont: Montserrat_400Regular,
// Mont_semi: Montserrat_600SemiBold,
// Mont_bold: Montserrat_700Bold,
// Cherry: CherryCreamSoda_400Regular,

export const FONTS = {
  title: {
    fontSize: 28,
    fontFamily: "Molle",
    color: COLORS.primary,
  },
  h1: {
    fontSize: 28,
    fontFamily: "Mont_bold",
    color: COLORS.primary,
  },
  h2: {
    fontSize: 22,
    fontFamily: "Mont_bold",
  },
  h3: {
    fontSize: 20,
    fontFamily: "Mont_semi",
  },
  pageTitle: {
    fontSize: 28,
    fontFamily: "Inter",
  },
  body: {
    fontSize: 16,
  },
  caption: {
    fontSize: 12,
    fontFamily: "Cherry",
  },
  label: {
    fontSize: 14,
    fontFamily: "Mont_semi",
  },
  buttonText: {
    fontSize: 14,
    fontFamily: "Mont_bold",
    textTransform: "uppercase",
  },
};
