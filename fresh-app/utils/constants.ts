export const API_BASE_URL =
  (typeof Deno !== "undefined" ? Deno.env.get("API_URL") : undefined) ||
  "https://api.example.com";

export const CATEGORIES = [
  { id: "fashion", name: "Thời trang", icon: "👕", emoji: "👕" },
  { id: "electronics", name: "Điện máy", icon: "📺", emoji: "📺" },
  { id: "tools", name: "Công cụ", icon: "🔧", emoji: "🔧" },
  { id: "computers", name: "Máy tính", icon: "💻", emoji: "💻" },
  { id: "phones", name: "Điện thoại", icon: "📱", emoji: "📱" },
  { id: "accessories", name: "Phụ kiện", icon: "🎧", emoji: "🎧" },
] as const;
