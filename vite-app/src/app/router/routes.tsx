import { lazy } from 'react'
import { Routes, Route } from 'react-router-dom'

const HomePage = lazy(() => import('@/pages/home'))
const ProductDetailPage = lazy(() => import('@/pages/product-detail'))
const CartPage = lazy(() => import('@/pages/cart'))
const CheckoutPage = lazy(() => import('@/pages/checkout'))
const LoginPage = lazy(() => import('@/pages/auth/login'))
const RegisterPage = lazy(() => import('@/pages/auth/register'))

export function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/product/:id" element={<ProductDetailPage />} />
      <Route path="/cart" element={<CartPage />} />
      <Route path="/checkout" element={<CheckoutPage />} />
      <Route path="/auth/login" element={<LoginPage />} />
      <Route path="/auth/register" element={<RegisterPage />} />
    </Routes>
  )
}
