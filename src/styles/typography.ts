import { TextStyle } from "react-native"
import { systemWeights } from "react-native-typography"

type FontSize = "x10" | "x20" | "x30" | "x40" | "x50" | "x60" |  "x70"
export const fontSize: Record<FontSize, TextStyle> = {
  x10: {
    fontSize: 12,
  },
  x20: {
    fontSize: 14,
  },
  x30: {
    fontSize: 18,
  },
  x40: {
    fontSize: 24,
  },
  x50: {
    fontSize: 32,
  },
  x60: {
    fontSize: 38,
  },
  x70: {
    fontSize: 42,
  },

}

type FontWeight = "regular" | "semibold" | "bold"
export const fontWeight: Record<FontWeight, TextStyle> = {
  regular: {
    // ...systemWeights.regular,
    fontFamily: "Cairo-Regular"
  },
  semibold: {
    // ...systemWeights.semibold,
    fontFamily: "Cairo-SemiBold"
  },
  bold: {
    // ...systemWeights.bold,
    fontFamily: "Cairo-Bold"
  },
}

type LineHeight = "x10" | "x20" | "x30" | "x40" | "x50" | "x60" | "x70"
export const lineHeight: Record<LineHeight, TextStyle> = {
  x10: {
    lineHeight: 16,
  },
  x20: {
    lineHeight: 20,
  },
  x30: {
    lineHeight: 24,
  },
  x40: {
    lineHeight: 28,
  },
  x50: {
    lineHeight: 36,
  },
  x60: {
    lineHeight: 48,
  },
  x70: {
    lineHeight: 52,
  },
}

type Header = "x10" | "x20" | "x40" | "x30" |"x50" | "x60" 
export const header: Record<Header, TextStyle> = {
  x10: {
    ...fontSize.x10,
    // ...lineHeight.x10,
    ...fontWeight.regular,
  },
  x20: {
    ...fontSize.x20,
    // ...lineHeight.x30,
    ...fontWeight.semibold,
  },
  x30: {
    ...fontSize.x30,
    // ...lineHeight.x40,
    ...fontWeight.bold,
  },
  x40: {
    ...fontSize.x40,
    // ...lineHeight.x50,
    ...fontWeight.regular,
  },
  x50: {
    ...fontSize.x50,
    // ...lineHeight.x60,
    ...fontWeight.semibold,
  },
  x60: {
    ...fontSize.x60,
    // ...lineHeight.x60,
    ...fontWeight.bold,
  },
}


type Body = "x10" | "x20" | "x30"
export const body: Record<Body, TextStyle> = {
  x10: {
    ...fontSize.x10,
    ...fontWeight.regular,
    lineHeight: 16
  },
  x20: {
    ...fontSize.x20,
    ...fontWeight.semibold,
    lineHeight: 20
  },
  x30: {
    ...fontSize.x20,
    ...fontWeight.bold,
    lineHeight: 20

  }
}