import { type PageProps } from "$fresh/server.ts";

export default function App({ Component }: PageProps) {
  return (
    <html lang="vi">
      <head>
        <meta charset="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>AllShop — Mua sắm trực tuyến hàng đầu Việt Nam</title>
        <meta
          name="description"
          content="Nền tảng mua sắm trực tuyến hàng đầu Việt Nam. Thời trang, điện máy, công nghệ chính hãng — giao nhanh, giá tốt."
        />
        <link rel="icon" href="/favicon.svg" />
        {/* Polyfill utilities unsupported by twind v0 (Tailwind v3 opacity modifier + backdrop-blur) */}
        <style dangerouslySetInnerHTML={{ __html: `
          /* ── bg-{color}/{opacity} ── */
          .bg-white\\/10{background-color:rgba(255,255,255,.1)}
          .bg-white\\/15{background-color:rgba(255,255,255,.15)}
          .bg-white\\/20{background-color:rgba(255,255,255,.2)}
          .bg-white\\/80{background-color:rgba(255,255,255,.8)}
          .bg-black\\/5{background-color:rgba(0,0,0,.05)}
          .bg-black\\/20{background-color:rgba(0,0,0,.2)}
          .bg-black\\/40{background-color:rgba(0,0,0,.4)}
          .bg-accent-400\\/20{background-color:rgba(167,139,250,.2)}

          /* ── hover:bg-{color}/{opacity} ── */
          .hover\\:bg-white\\/10:hover{background-color:rgba(255,255,255,.1)}
          .hover\\:bg-white\\/15:hover{background-color:rgba(255,255,255,.15)}

          /* ── text-{color}/{opacity} ── */
          .text-blue-100\\/80{color:rgba(219,234,254,.8)}
          .text-blue-100\\/90{color:rgba(219,234,254,.9)}
          .text-white\\/80{color:rgba(255,255,255,.8)}

          /* ── border-{color}/{opacity} ── */
          .border-white\\/30{border-color:rgba(255,255,255,.3)}
          .border-gray-200\\/60{border-color:rgba(229,231,235,.6)}

          /* ── shadow-{color}/{opacity} ── */
          .shadow-black\\/5{--tw-shadow-color:rgba(0,0,0,.05)}
          .shadow-black\\/10{--tw-shadow-color:rgba(0,0,0,.1)}
          .shadow-primary-600\\/30{--tw-shadow-color:rgba(37,99,235,.3)}
          .shadow-primary-600\\/40{--tw-shadow-color:rgba(37,99,235,.4)}

          /* ── backdrop-filter & filter ── */
          .backdrop-blur-sm{-webkit-backdrop-filter:blur(4px);backdrop-filter:blur(4px)}
          .backdrop-blur-md{-webkit-backdrop-filter:blur(12px);backdrop-filter:blur(12px)}
          .backdrop-blur-xl{-webkit-backdrop-filter:blur(24px);backdrop-filter:blur(24px)}
          .blur-3xl{filter:blur(64px)}

          /* ── dark mode variants ── */
          .dark .dark\\:bg-gray-800\\/60{background-color:rgba(31,41,55,.6)}
          .dark .dark\\:bg-gray-900\\/80{background-color:rgba(17,24,39,.8)}
          .dark .dark\\:border-gray-800\\/60{border-color:rgba(31,41,55,.6)}
          .dark .dark\\:bg-primary-900\\/30{background-color:rgba(30,58,138,.3)}
          .dark .dark\\:hover\\:bg-primary-900\\/30:hover{background-color:rgba(30,58,138,.3)}
          .dark .dark\\:hover\\:bg-primary-900\\/40:hover{background-color:rgba(30,58,138,.4)}
          .dark .dark\\:shadow-gray-900\\/50{--tw-shadow-color:rgba(17,24,39,.5)}
          .dark .hover\\:shadow-primary-600\\/40:hover{--tw-shadow-color:rgba(37,99,235,.4)}
        `}} />
      </head>
      <body class="antialiased">
        <Component />
      </body>
    </html>
  );
}
