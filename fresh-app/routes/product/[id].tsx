import { type PageProps } from "$fresh/server.ts";
import { MOCK_PRODUCTS } from "../../utils/mock-data.ts";
import ProductDetail from "../../islands/ProductDetail.tsx";

export default function ProductPage(props: PageProps) {
  const id = props.params.id;
  const product = MOCK_PRODUCTS.find((p) => p.id === id) ?? MOCK_PRODUCTS[0];

  return <ProductDetail product={product} />;
}
