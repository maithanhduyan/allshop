import type { Metadata } from 'next'
import '@/styles/globals.css'
import StoreProvider from '@/store/provider'
import { ThemeProvider } from '@/providers/theme-provider'

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
            {children}
          </ThemeProvider>
        </StoreProvider>
      </body>
    </html>
  )
}
