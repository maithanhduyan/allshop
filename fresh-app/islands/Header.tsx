import { useState, useEffect } from "preact/hooks";
import { CATEGORIES } from "../utils/constants.ts";
import { cartItems } from "../utils/cart.ts";

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [scrolled, setScrolled] = useState(false);
  const [theme, setThemeState] = useState("system");

  const cartCount = cartItems.value.reduce(
    (sum, i) => sum + i.quantity,
    0,
  );

  useEffect(() => {
    const onScroll = () => setScrolled(globalThis.scrollY > 10);
    globalThis.addEventListener("scroll", onScroll, { passive: true });
    return () => globalThis.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  useEffect(() => {
    const stored = localStorage.getItem("allshop-theme");
    if (stored) {
      setThemeState(stored);
      applyTheme(stored);
    } else {
      applyTheme("system");
    }
  }, []);

  function applyTheme(t: string) {
    const root = document.documentElement;
    if (
      t === "dark" ||
      (t === "system" &&
        globalThis.matchMedia("(prefers-color-scheme: dark)").matches)
    ) {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }
  }

  function cycleTheme() {
    const next = theme === "light"
      ? "dark"
      : theme === "dark"
      ? "system"
      : "light";
    setThemeState(next);
    localStorage.setItem("allshop-theme", next);
    applyTheme(next);
  }

  function handleSearch(e: Event) {
    e.preventDefault();
    if (searchQuery.trim()) {
      globalThis.location.href =
        `/?search=${encodeURIComponent(searchQuery.trim())}`;
    }
  }

  return (
    <header
      class={`sticky top-0 z-40 transition-all duration-300 ${
        scrolled
          ? "bg-white/80 backdrop-blur-xl border-b border-gray-200/60 shadow-lg shadow-black/5 dark:bg-gray-900/80 dark:border-gray-800/60"
          : "bg-white dark:bg-gray-950"
      }`}
    >
      {/* Promo bar */}
      <div class="overflow-hidden bg-gradient-to-r from-primary-600 via-accent-500 to-primary-600 px-4 py-1.5 text-center text-xs font-medium text-white">
        <p>
          🚀 Miễn phí vận chuyển cho đơn hàng từ 500.000₫ &nbsp;|&nbsp; 🎁
          Giảm thêm 10% cho thành viên mới
        </p>
      </div>

      {/* Main header */}
      <div class="mx-auto flex max-w-7xl items-center gap-3 px-4 py-2.5 md:gap-6 md:py-3">
        {/* Logo */}
        <a href="/" class="group flex shrink-0 items-center gap-1.5">
          <div class="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-primary-500 to-accent-600 text-sm font-extrabold text-white transition-transform group-hover:scale-105">
            A
          </div>
          <div class="hidden sm:block">
            <span class="text-xl font-extrabold text-primary-600 dark:text-primary-400">
              All
            </span>
            <span class="text-xl font-extrabold text-gray-800 dark:text-white">
              Shop
            </span>
          </div>
        </a>

        {/* Search */}
        <form onSubmit={handleSearch} class="flex min-w-0 flex-1">
          <div class="flex w-full rounded-xl border border-gray-200 bg-gray-50 transition-colors focus-within:border-primary-400 focus-within:bg-white focus-within:ring-2 focus-within:ring-primary-200 dark:border-gray-700 dark:bg-gray-800/60 dark:focus-within:border-primary-500 dark:focus-within:bg-gray-800 dark:focus-within:ring-primary-800">
            <input
              type="text"
              value={searchQuery}
              onInput={(e) =>
                setSearchQuery((e.target as HTMLInputElement).value)}
              placeholder="Tìm kiếm sản phẩm, thương hiệu..."
              class="min-w-0 flex-1 bg-transparent px-3 py-2 text-sm text-gray-900 outline-none placeholder:text-gray-400 dark:text-white dark:placeholder:text-gray-500 md:px-4"
            />
            <button
              type="submit"
              class="flex shrink-0 items-center justify-center rounded-r-xl bg-primary-600 px-3 text-white transition-colors hover:bg-primary-700 md:px-5"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-4 w-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                stroke-width={2.5}
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </button>
          </div>
        </form>

        {/* Right actions */}
        <div class="flex shrink-0 items-center gap-1 md:gap-2">
          {/* Theme toggle */}
          <button
            onClick={cycleTheme}
            aria-label={`Chế độ: ${theme}`}
            title={`Chế độ: ${
              theme === "light" ? "Sáng" : theme === "dark" ? "Tối" : "Hệ thống"
            }`}
            class="flex h-9 w-9 items-center justify-center rounded-lg text-gray-500 transition-colors hover:bg-gray-100 hover:text-gray-700 dark:text-gray-400 dark:hover:bg-gray-800 dark:hover:text-gray-200"
          >
            {theme === "light" && (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                stroke-width={2}
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
                />
              </svg>
            )}
            {theme === "dark" && (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                stroke-width={2}
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
                />
              </svg>
            )}
            {theme === "system" && (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                stroke-width={2}
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                />
              </svg>
            )}
          </button>

          <a
            href="/auth/login"
            class="hidden h-9 w-9 items-center justify-center rounded-lg text-gray-500 transition-colors hover:bg-gray-100 hover:text-gray-700 dark:text-gray-400 dark:hover:bg-gray-800 dark:hover:text-gray-200 md:flex"
            aria-label="Đăng nhập"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              stroke-width={2}
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
              />
            </svg>
          </a>

          <a
            href="/cart"
            class="relative flex h-9 w-9 items-center justify-center rounded-lg text-gray-500 transition-colors hover:bg-gray-100 hover:text-gray-700 dark:text-gray-400 dark:hover:bg-gray-800 dark:hover:text-gray-200"
            aria-label="Giỏ hàng"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              stroke-width={2}
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 100 4 2 2 0 000-4z"
              />
            </svg>
            {cartCount > 0 && (
              <span class="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-[10px] font-bold text-white ring-2 ring-white dark:ring-gray-950">
                {cartCount > 99 ? "99+" : cartCount}
              </span>
            )}
          </a>

          <button
            onClick={() => setMenuOpen(!menuOpen)}
            class="flex h-9 w-9 items-center justify-center rounded-lg text-gray-500 transition-colors hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-800 md:hidden"
            aria-label="Menu"
          >
            <div class="flex w-5 flex-col gap-1">
              <span
                class={`h-0.5 w-full rounded-full bg-current transition-all duration-300 ${
                  menuOpen ? "translate-y-1.5 rotate-45" : ""
                }`}
              />
              <span
                class={`h-0.5 w-full rounded-full bg-current transition-all duration-300 ${
                  menuOpen ? "opacity-0" : ""
                }`}
              />
              <span
                class={`h-0.5 w-full rounded-full bg-current transition-all duration-300 ${
                  menuOpen ? "-translate-y-1.5 -rotate-45" : ""
                }`}
              />
            </div>
          </button>
        </div>
      </div>

      {/* Desktop categories */}
      <nav class="hidden border-t border-gray-100 dark:border-gray-800 md:block">
        <div class="mx-auto flex max-w-7xl items-center gap-1 px-4 py-1.5">
          {CATEGORIES.map((cat) => (
            <a
              href={`/?category=${cat.id}`}
              class="rounded-lg px-3 py-1.5 text-sm font-medium text-gray-600 transition-all hover:bg-primary-50 hover:text-primary-600 dark:text-gray-400 dark:hover:bg-primary-900/30 dark:hover:text-primary-400"
            >
              {cat.icon} {cat.name}
            </a>
          ))}
        </div>
      </nav>

      {/* Mobile overlay */}
      {menuOpen && (
        <div
          class="fixed inset-0 top-0 z-50 bg-black/40 backdrop-blur-sm md:hidden"
          onClick={() => setMenuOpen(false)}
        />
      )}

      {/* Mobile drawer */}
      <div
        class={`fixed right-0 top-0 z-50 flex h-full w-72 flex-col bg-white shadow-2xl transition-transform duration-300 dark:bg-gray-900 md:hidden ${
          menuOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div class="flex items-center justify-between border-b border-gray-100 px-4 py-3 dark:border-gray-800">
          <span class="text-lg font-bold text-gray-800 dark:text-white">
            Menu
          </span>
          <button
            onClick={() => setMenuOpen(false)}
            class="flex h-8 w-8 items-center justify-center rounded-lg text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              stroke-width={2}
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        <div class="flex-1 overflow-y-auto px-2 py-3">
          <p class="mb-2 px-3 text-xs font-semibold uppercase tracking-wider text-gray-400 dark:text-gray-500">
            Danh mục
          </p>
          {CATEGORIES.map((cat) => (
            <a
              href={`/?category=${cat.id}`}
              class="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-gray-700 transition-colors hover:bg-primary-50 hover:text-primary-600 dark:text-gray-300 dark:hover:bg-primary-900/30 dark:hover:text-primary-400"
              onClick={() => setMenuOpen(false)}
            >
              <span class="text-lg">{cat.icon}</span>
              {cat.name}
            </a>
          ))}

          <div class="my-3 h-px bg-gray-100 dark:bg-gray-800" />

          <a
            href="/auth/login"
            class="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-gray-700 transition-colors hover:bg-primary-50 hover:text-primary-600 dark:text-gray-300 dark:hover:bg-primary-900/30 dark:hover:text-primary-400"
            onClick={() => setMenuOpen(false)}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              stroke-width={2}
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
              />
            </svg>
            Đăng nhập
          </a>
          <a
            href="/auth/register"
            class="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-primary-600 transition-colors hover:bg-primary-50 dark:text-primary-400 dark:hover:bg-primary-900/30"
            onClick={() => setMenuOpen(false)}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              stroke-width={2}
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z"
              />
            </svg>
            Đăng ký
          </a>
        </div>
      </div>
    </header>
  );
}
