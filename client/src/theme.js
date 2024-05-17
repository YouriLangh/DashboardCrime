export const tokens = {
    grey: {
      200: "#EFEFEF",
      500: "#b3b6c2",

    },
    background: {
      light: "#2d2d34",
      main: "#1f2026",
    },
  };
  
  //TODO: CHECK WHAT I CAN REMOVE FROM FONTS
  // mui theme settings
  export const themeSettings = {
    palette: {
      grey: {
        ...tokens.grey,
        main: tokens.grey[500],
      },
      background: {
        default: tokens.background.main,
        light: tokens.background.light,
      },
    },
    typography: {
      fontFamily: ["Sora", "sans-serif"].join(","),
      fontSize: 12,
      h1: {
        fontFamily: ["Sora", "sans-serif"].join(","),
        fontSize: 16,
      },
      h2: {
        fontFamily: ["Sora", "sans-serif"].join(","),
        fontWeight: 600,
        color: tokens.grey[200],
        fontSize: 24,
      },
      h3: {
        fontFamily: ["Sora", "sans-serif"].join(","),
        fontSize: 26,
        fontWeight: 800,
        color: tokens.grey[200],
      },
      h4: {
        fontFamily: ["Sora", "sans-serif"].join(","),
        fontSize: 14,
        fontWeight: 600,
        color: tokens.grey[200],
      },
      h5: {
        fontFamily: ["Sora", "sans-serif"].join(","),
        fontSize: 15,
        fontWeight: 500,
        color: tokens.grey[200],
      },
      h6: {
        fontFamily: ["Sora", "sans-serif"].join(","),
        fontSize: 10,
        color: tokens.grey[200],
      },
    },
  };