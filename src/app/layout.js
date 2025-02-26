// "use client"

import "./globals.css";
import UiProvider from "./components/UiProvider";

import StoreProvider from "./components/StoreProvider";
export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`antialiased`}>
        <UiProvider>
          <StoreProvider>{children}</StoreProvider>
        </UiProvider>
      </body>
    </html>
  );
}
