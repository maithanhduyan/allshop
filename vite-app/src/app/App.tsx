import { Suspense } from 'react'
import { StoreProvider } from '@/app/providers/store-provider'
import { QueryProvider } from '@/app/providers/query-provider'
import { RouterProvider } from '@/app/providers/router-provider'
import { ThemeProvider } from '@/app/providers/theme-provider'
import { AppRoutes } from '@/app/router'
import { Header } from '@/widgets/header/ui/header'
import { Footer } from '@/widgets/footer/ui/footer'
import { Spinner } from '@/shared/ui/spinner'
import { ScrollToTop } from '@/shared/ui/scroll-to-top'
import { ChatWidget } from '@/shared/ui/chat-widget'

export default function App() {
  return (
    <StoreProvider>
      <QueryProvider>
        <ThemeProvider>
          <RouterProvider>
            <div className="flex min-h-screen flex-col bg-white text-gray-900 transition-colors dark:bg-gray-950 dark:text-gray-100">
              <Header />
              <main className="flex-1">
                <Suspense
                  fallback={
                    <div className="flex h-64 items-center justify-center">
                      <Spinner size="lg" />
                    </div>
                  }
                >
                  <AppRoutes />
                </Suspense>
              </main>
              <Footer />
            </div>
            <ScrollToTop />
            <ChatWidget />
          </RouterProvider>
        </ThemeProvider>
      </QueryProvider>
    </StoreProvider>
  )
}
