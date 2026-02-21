import type { Metadata } from "next";
import Script from "next/script";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ScrollAnimationController from "@/components/ScrollAnimationController";

export const metadata: Metadata = {
  title: "Phaetex Solutions | Enterprise Systems for Businesses",
  description:
    "Phaetex Solutions builds enterprise systems for businesses. Explore our products and get in touch for custom solutions.",
  openGraph: {
    title: "Phaetex Solutions | Enterprise Systems for Businesses",
    description:
      "Phaetex Solutions builds enterprise systems for businesses. Explore our products and get in touch for custom solutions.",
    type: "website",
  },
  metadataBase: new URL("https://phaetex.com"),
  alternates: { canonical: "/" },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="bg-white text-primary-dark dark:bg-primary-dark dark:text-gray-100 antialiased min-h-screen" suppressHydrationWarning>
        <Script
          id="theme-script"
          strategy="beforeInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                var theme = localStorage.getItem('theme');
                if (theme === 'dark') {
                  document.documentElement.classList.add('dark');
                } else {
                  document.documentElement.classList.remove('dark');
                }
              })();
            `,
          }}
        />
        <ScrollAnimationController />
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
