import type { Metadata } from "next";
import { Montserrat, Roboto } from "next/font/google";
import { HeroUIProvider } from '@heroui/react';

import "./globals.css";
import 'react-circular-progressbar/dist/styles.css';

// Load Montserrat and Roboto from Google Fonts
const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["100", "300", "400", "500", "700", "900"], // Specify the weights you want
  variable: "--font-montserrat",
});

const roboto = Roboto({
  subsets: ["latin"],
  weight: ["100", "300", "400", "500", "700", "900"], // Specify the weights you want
  variable: "--font-roboto",
});

export const metadata: Metadata = {
  title: "Jackson Portfolio",
  description:
    "Jackson Franklin Portfolio using Next.js. Full Stack Developer Ready !! ",
  icons: {
    icon: '/profile.png',
  },
  creator: 'Jackson Franklin',
  keywords: 'Portfolio, Full Stack, Development, Freelance, Jackson, Franklin, Frontend, Backend, Design, Web3, Crypto',
  abstract: 'Jackson Franklin Portfolio',
  applicationName: 'shinobi',
  openGraph: {
    type: "website",
    images: [
      {
        url: 'https://i.postimg.cc/J0YgDV6Y/1729103170256.jpg', // Must be an absolute URL
        width: 800,
        height: 600,
      },
      {
        url: 'https://i.postimg.cc/J0YgDV6Y/1729103170256.jpg', // Must be an absolute URL
        width: 1800,
        height: 1600,
        alt: 'cover',
      },
    ],
    title: "Jackson Franklin",
    description: "🌟 Full Stack Developer with 6 years of experience specializing in JavaScript-based development and Web3 technologies.",
    url:"https://JacksonFranklin.vercel.app"
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  return (
    <html lang="en">
      <body className={`${montserrat.variable} ${roboto.variable} antialiased`}>
        <HeroUIProvider>
          {children}
        </HeroUIProvider>
      </body>
    </html>
  );
}
