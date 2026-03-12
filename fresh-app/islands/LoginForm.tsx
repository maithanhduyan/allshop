import { useState } from "preact/hooks";

export default function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e: Event) => {
    e.preventDefault();
    globalThis.location.href = "/";
  };

  return (
    <div class="mx-auto flex min-h-[60vh] max-w-md flex-col justify-center px-4 py-12">
      <div class="rounded-2xl border border-gray-200 bg-white p-8 shadow-sm dark:border-gray-700 dark:bg-gray-900">
        <div class="mb-6 text-center">
          <h1 class="text-2xl font-bold text-gray-800 dark:text-white">
            Đăng nhập
          </h1>
          <p class="mt-1 text-sm text-gray-500 dark:text-gray-400">
            Chào mừng bạn quay lại AllShop
          </p>
        </div>

        <form onSubmit={handleSubmit} class="space-y-4">
          <div>
            <label class="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300">
              Email
            </label>
            <input
              type="email"
              required
              value={email}
              onInput={(e) => setEmail((e.target as HTMLInputElement).value)}
              class="w-full rounded-xl border border-gray-300 px-4 py-2.5 text-sm outline-none transition-colors focus:border-primary-500 focus:ring-2 focus:ring-primary-200 dark:border-gray-600 dark:bg-gray-800 dark:text-white dark:focus:ring-primary-800"
              placeholder="email@example.com"
            />
          </div>
          <div>
            <label class="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300">
              Mật khẩu
            </label>
            <input
              type="password"
              required
              value={password}
              onInput={(e) =>
                setPassword((e.target as HTMLInputElement).value)}
              class="w-full rounded-xl border border-gray-300 px-4 py-2.5 text-sm outline-none transition-colors focus:border-primary-500 focus:ring-2 focus:ring-primary-200 dark:border-gray-600 dark:bg-gray-800 dark:text-white dark:focus:ring-primary-800"
              placeholder="••••••••"
            />
          </div>
          <button
            type="submit"
            class="w-full rounded-xl bg-primary-600 px-6 py-3 font-semibold text-white transition-colors hover:bg-primary-700"
          >
            Đăng nhập
          </button>
        </form>

        <p class="mt-6 text-center text-sm text-gray-500 dark:text-gray-400">
          Chưa có tài khoản?{" "}
          <a
            href="/auth/register"
            class="font-medium text-primary-600 hover:text-primary-700"
          >
            Đăng ký ngay
          </a>
        </p>
      </div>
    </div>
  );
}
