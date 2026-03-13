import { Header } from '@/components/header'
import { Footer } from '@/components/footer'
import { ScrollToTop } from '@/components/scroll-to-top'
import { ChatWidget } from '@/components/chat-widget'

export default function StoreLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <div className="flex min-h-screen flex-col bg-white text-gray-900 transition-colors dark:bg-gray-950 dark:text-gray-100">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </div>
      <ScrollToTop />
      <ChatWidget />
    </>
  )
}
