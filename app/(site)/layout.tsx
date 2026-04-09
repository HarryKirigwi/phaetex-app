import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ScrollAnimationController from "@/components/ScrollAnimationController";
import Script from "next/script";

export default function SiteLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <ScrollAnimationController />
      <Header />
      <main>{children}</main>
      <Footer />
      <Script
        id="phaetex-chat-widget"
        src="/widget/widget.js"
        strategy="afterInteractive"
        data-backend-url={process.env.NEXT_PUBLIC_WIDGET_BACKEND_URL || "http://localhost:4000"}
        data-title="Chat with Phaetex"
        data-position="right"
      />
    </>
  );
}
