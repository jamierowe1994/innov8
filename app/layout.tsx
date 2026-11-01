import type { Metadata } from "next";
import { Instrument_Serif, League_Spartan, Montserrat } from "next/font/google";
import SmoothScroll from "@/components/SmoothScroll";
import "./globals.css";

const spartan = League_Spartan({
  variable: "--font-spartan",
  subsets: ["latin"],
  weight: ["200", "300", "400"],
});

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
  weight: ["300", "400", "500"],
});

const instrument = Instrument_Serif({
  variable: "--font-instrument",
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
});

export const metadata: Metadata = {
  title: "Innov8Search - MedTech and Life Sciences Executive Search",
  description:
    "Innov8Search is a leader in life sciences recruitment, specialising in the MedTech, biotech, pharma and life sciences sectors in Australia & NZ, APAC & the UK.",
  icons: { icon: "/images/innov8-mark.svg" },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en-GB"
      className={`${spartan.variable} ${montserrat.variable} ${instrument.variable} antialiased`}
    >
      <body>
        <SmoothScroll />
        {children}
      </body>
    </html>
  );
}
