import Link from 'next/link'
import { CATEGORIES } from '@/lib/constants'

export function Footer() {
  return (
    <footer className="mt-auto border-t border-gray-200 bg-gray-50 dark:border-gray-800 dark:bg-gray-900">
      {/* Trust badges */}
      <div className="border-b border-gray-200 dark:border-gray-800">
        <div className="mx-auto grid max-w-7xl grid-cols-2 gap-4 px-4 py-6 md:grid-cols-4">
          {[
            { icon: '🚚', title: 'Giao hàng miễn phí', desc: 'Đơn từ 500K' },
            { icon: '🔄', title: 'Đổi trả 30 ngày', desc: 'Hoàn tiền 100%' },
            { icon: '🛡️', title: 'Hàng chính hãng', desc: 'Bảo hành toàn quốc' },
            { icon: '💳', title: 'Thanh toán an toàn', desc: 'Bảo mật SSL' },
          ].map((item) => (
            <div key={item.title} className="flex items-center gap-3">
              <span className="text-2xl">{item.icon}</span>
              <div>
                <p className="text-sm font-semibold text-gray-800 dark:text-gray-200">{item.title}</p>
                <p className="text-xs text-gray-500 dark:text-gray-400">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Main footer */}
      <div className="mx-auto max-w-7xl px-4 py-10">
        <div className="grid grid-cols-2 gap-8 md:grid-cols-4 lg:grid-cols-5">
          {/* Brand */}
          <div className="col-span-2 md:col-span-1 lg:col-span-2">
            <Link href="/" className="mb-4 inline-flex items-center gap-1.5">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-primary-500 to-accent-600 text-sm font-extrabold text-white">
                A
              </div>
              <span className="text-xl font-extrabold text-primary-600 dark:text-primary-400">All</span>
              <span className="text-xl font-extrabold text-gray-800 dark:text-white">Shop</span>
            </Link>
            <p className="mt-3 max-w-xs text-sm leading-relaxed text-gray-500 dark:text-gray-400">
              Nền tảng mua sắm trực tuyến hàng đầu Việt Nam. Thời trang, điện máy, công nghệ chính hãng — giao nhanh, giá tốt.
            </p>
            <div className="mt-4 flex gap-3">
              {['facebook', 'instagram', 'youtube', 'tiktok'].map((s) => (
                <span
                  key={s}
                  className="flex h-9 w-9 items-center justify-center rounded-full bg-gray-200 text-xs font-bold uppercase text-gray-500 transition-colors hover:bg-primary-100 hover:text-primary-600 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-primary-900/40 dark:hover:text-primary-400"
                >
                  {s[0]}
                </span>
              ))}
            </div>
          </div>

          {/* Danh mục */}
          <div>
            <h3 className="mb-3 text-sm font-semibold uppercase tracking-wider text-gray-800 dark:text-gray-200">
              Danh mục
            </h3>
            <ul className="space-y-2">
              {CATEGORIES.map((cat) => (
                <li key={cat.id}>
                  <Link
                    href={`/?category=${cat.id}`}
                    className="text-sm text-gray-500 transition-colors hover:text-primary-600 dark:text-gray-400 dark:hover:text-primary-400"
                  >
                    {cat.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Hỗ trợ */}
          <div>
            <h3 className="mb-3 text-sm font-semibold uppercase tracking-wider text-gray-800 dark:text-gray-200">
              Hỗ trợ
            </h3>
            <ul className="space-y-2 text-sm text-gray-500 dark:text-gray-400">
              <li className="cursor-pointer transition-colors hover:text-primary-600 dark:hover:text-primary-400">Hướng dẫn mua hàng</li>
              <li className="cursor-pointer transition-colors hover:text-primary-600 dark:hover:text-primary-400">Chính sách đổi trả</li>
              <li className="cursor-pointer transition-colors hover:text-primary-600 dark:hover:text-primary-400">Chính sách bảo hành</li>
              <li className="cursor-pointer transition-colors hover:text-primary-600 dark:hover:text-primary-400">Thanh toán</li>
              <li className="cursor-pointer transition-colors hover:text-primary-600 dark:hover:text-primary-400">Vận chuyển</li>
            </ul>
          </div>

          {/* Liên hệ */}
          <div className="col-span-2 md:col-span-1">
            <h3 className="mb-3 text-sm font-semibold uppercase tracking-wider text-gray-800 dark:text-gray-200">
              Liên hệ
            </h3>
            <ul className="space-y-2.5 text-sm text-gray-500 dark:text-gray-400">
              <li className="flex items-center gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-primary-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                Hotline: <strong className="text-gray-700 dark:text-gray-300">1900-xxxx</strong>
              </li>
              <li className="flex items-center gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-primary-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                support@allshop.vn
              </li>
              <li className="flex items-center gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-primary-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                TP. Hồ Chí Minh
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Copyright */}
      <div className="border-t border-gray-200 dark:border-gray-800">
        <div className="mx-auto flex max-w-7xl flex-col items-center gap-2 px-4 py-4 text-xs text-gray-400 dark:text-gray-500 md:flex-row md:justify-between">
          <p>&copy; {new Date().getFullYear()} AllShop. All rights reserved.</p>
          <div className="flex gap-4">
            <span className="cursor-pointer hover:text-gray-600 dark:hover:text-gray-300">Điều khoản</span>
            <span className="cursor-pointer hover:text-gray-600 dark:hover:text-gray-300">Bảo mật</span>
            <span className="cursor-pointer hover:text-gray-600 dark:hover:text-gray-300">Cookie</span>
          </div>
        </div>
      </div>
    </footer>
  )
}
