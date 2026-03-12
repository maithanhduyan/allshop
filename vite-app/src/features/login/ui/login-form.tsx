import { useState, type FormEvent } from 'react'
import { Input } from '@/shared/ui/input'
import { Button } from '@/shared/ui/button'
import { userApi } from '@/entities/user/api/user.api'

export function LoginForm() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setError('')
    setLoading(true)
    try {
      const res = await userApi.login({ email, password })
      localStorage.setItem('access_token', res.accessToken)
      window.location.href = '/'
    } catch {
      setError('Email hoặc mật khẩu không đúng')
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <Input
        label="Email"
        type="email"
        placeholder="email@example.com"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />
      <Input
        label="Mật khẩu"
        type="password"
        placeholder="••••••••"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      />
      {error && <p className="text-sm text-red-500">{error}</p>}
      <Button type="submit" disabled={loading}>
        {loading ? 'Đang đăng nhập...' : 'Đăng nhập'}
      </Button>
    </form>
  )
}
