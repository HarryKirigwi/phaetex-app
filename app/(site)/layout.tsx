import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ScrollAnimationController from "@/components/ScrollAnimationController";

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
    </>
  );
}
