
export const COLORS = {
  primary: "#E0A840",
  primary_light: "#f5d497",
  secondary: "#4078e0",
  black: "#000",
  white: "#fff",
  accent: "#cb5f6f",
  accent_blue: "#253A4A",
  onPrimary: "#000000",
  onSecondary: "#fff",
  gray: "#808080",
  darkGray: "#1E293B",
  
};

export const themes = {
  light: {
    mode: "light",
    background: "#FFFFFF",
    text: "#2D2C2C",
    ...COLORS,
  },
  dark: {
    mode: "dark",
    background: "#253A4A",
    text: "#F8F8F8",
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

export const RADIUS = {
  xs: 10,
  sm: 12,
  md: 14,
  lg: 16,
  xl: 18,
}

export const FONTS = {
title: {
  fontSize: 28,
  fontFamily: 'Molle',
  color: COLORS.primary,
},
 h1: {
    fontSize: 24,
    fontFamily: 'Cherry',
    color: COLORS.primary
  },
  h2: {
    fontSize: 22,
    fontFamily: 'Mont-bold',
  },
  h3: {
    fontSize: 20,
    fontFamily: 'Mont-bold',
  },
  body: {
    fontSize: 16,
  },
  caption: {
    fontSize: 12,
    fontFamily: 'Cherry',
  },
  buttonText: {
    fontSize: 14,
    fontFamily: 'Mont_bold',
    textTransform: 'uppercase'
  },
}
