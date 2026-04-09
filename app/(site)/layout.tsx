import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ScrollAnimationController from "@/components/ScrollAnimationController";
import ChatWidget from "@/components/ChatWidget";

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
      <ChatWidget />
    </>
  );
}
