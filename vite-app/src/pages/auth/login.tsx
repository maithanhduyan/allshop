import { LoginForm } from '@/features/login/ui/login-form'
import { Link } from 'react-router-dom'

export default function LoginPage() {
  return (
    <div className="mx-auto flex min-h-[60vh] max-w-md flex-col justify-center px-4 py-12">
      <div className="rounded-2xl border border-gray-200 bg-white p-8 shadow-sm dark:border-gray-700 dark:bg-gray-900">
        <div className="mb-6 text-center">
          <h1 className="text-2xl font-bold text-gray-800 dark:text-white">Đăng nhập</h1>
          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
            Chào mừng bạn quay lại AllShop
          </p>
        </div>
        <LoginForm />
        <p className="mt-6 text-center text-sm text-gray-500 dark:text-gray-400">
          Chưa có tài khoản?{' '}
          <Link to="/auth/register" className="font-medium text-primary-600 hover:text-primary-700">
            Đăng ký ngay
          </Link>
        </p>
      </div>
    </div>
  )
}
