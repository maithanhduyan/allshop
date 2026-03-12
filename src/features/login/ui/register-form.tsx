import { useState, type FormEvent } from 'react'
import { Input } from '@/shared/ui/input'
import { Button } from '@/shared/ui/button'
import { userApi } from '@/entities/user/api/user.api'

export function RegisterForm() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [phone, setPhone] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setError('')
    setLoading(true)
    try {
      const res = await userApi.register({ name, email, password, phone })
      localStorage.setItem('access_token', res.accessToken)
      window.location.href = '/'
    } catch {
      setError('Đăng ký thất bại. Vui lòng thử lại.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <Input
        label="Họ tên"
        placeholder="Nguyễn Văn A"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
      />
      <Input
        label="Email"
        type="email"
        placeholder="email@example.com"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />
      <Input
        label="Số điện thoại"
        type="tel"
        placeholder="0901234567"
        value={phone}
        onChange={(e) => setPhone(e.target.value)}
      />
      <Input
        label="Mật khẩu"
        type="password"
        placeholder="••••••••"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
        minLength={6}
      />
      {error && <p className="text-sm text-red-500">{error}</p>}
      <Button type="submit" disabled={loading}>
        {loading ? 'Đang đăng ký...' : 'Đăng ký'}
      </Button>
    </form>
  )
}
