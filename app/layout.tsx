import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
    title: "FSW Barber",
    description: "App para reserva de horários em uma barbearia.",
    authors: {
        name: "Bruno Carvaçlho Feitosa",
        url: ""
    },
    icons: {
        icon: "./favicon/favicon.ico",
        shortcut: "./favicon/favicon.ico"
    },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
        <body className={`${inter.className} dark`}>
            {children}
        </body>
    </html>
  )
}
