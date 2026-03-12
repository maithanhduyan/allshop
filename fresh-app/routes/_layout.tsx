import { type PageProps } from "$fresh/server.ts";
import Header from "../islands/Header.tsx";
import Footer from "../components/Footer.tsx";
import ScrollToTop from "../islands/ScrollToTop.tsx";
import ChatWidget from "../islands/ChatWidget.tsx";

export default function Layout({ Component }: PageProps) {
  return (
    <div class="flex min-h-screen flex-col bg-white text-gray-900 dark:bg-gray-950 dark:text-gray-100 transition-colors">
      <Header />
      <main class="flex-1">
        <Component />
      </main>
      <Footer />
      <ScrollToTop />
      <ChatWidget />
    </div>
  );
}
