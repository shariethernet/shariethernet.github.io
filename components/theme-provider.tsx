"use client"
import { ThemeProvider as NextThemesProvider } from "next-themes"

// Update the ThemeProvider to use dark theme by default
export function ThemeProvider({ children, ...props }) {
  return (
    <NextThemesProvider attribute="class" defaultTheme="dark" enableSystem={false} {...props}>
      {children}
    </NextThemesProvider>
  )
}
