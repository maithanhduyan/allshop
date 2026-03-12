import type { Metadata } from 'next'
import '@/styles/globals.css'
import StoreProvider from '@/store/provider'
import { ThemeProvider } from '@/providers/theme-provider'
import { Header } from '@/components/header'
import { Footer } from '@/components/footer'
import { ScrollToTop } from '@/components/scroll-to-top'
import { ChatWidget } from '@/components/chat-widget'

export const metadata: Metadata = {
  title: 'AllShop — Mua sắm trực tuyến hàng đầu Việt Nam',
  description:
    'Nền tảng mua sắm trực tuyến hàng đầu Việt Nam. Thời trang, điện máy, công nghệ chính hãng — giao nhanh, giá tốt.',
  icons: { icon: '/favicon.svg' },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="vi" suppressHydrationWarning>
      <body className="antialiased">
        <StoreProvider>
          <ThemeProvider>
            <div className="flex min-h-screen flex-col bg-white text-gray-900 transition-colors dark:bg-gray-950 dark:text-gray-100">
              <Header />
              <main className="flex-1">{children}</main>
              <Footer />
            </div>
            <ScrollToTop />
            <ChatWidget />
          </ThemeProvider>
        </StoreProvider>
      </body>
    </html>
  )
}
