import React, { useState } from "react";
import ProductsCard from "../cards/ProductsCard";
import s from "@/styles/components/shared/cards/ProdustCard.module.scss";
import useProducts from "@/hooks/admin/useProducts";
import EditProductsModal from "./modals/ProductEditModal";
import Loading from "./Loading";

export default function ProductsList() {
  const { products, isLoading, error, deleteProduct } = useProducts();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentProduct, setCurrentProduct] = useState(null);

  const handleEditProduct = (product) => {
    setCurrentProduct(product);
    setIsModalOpen(true);
  };

  if (isLoading) return <Loading />;
  if (error) return <p>Ошибка: {error}</p>;

  return (
    <section className={s.products_list}>
      {products.map((product) => (
        <ProductsCard
          key={product.id}
          title={product.title}
          link={product.link}
          image={product.image}
          editProduct={() => handleEditProduct(product)}
          deleteProduct={() => deleteProduct(product.id)}
        />
      ))}
      {isModalOpen && (
        <EditProductsModal
          isOpen={isModalOpen}
          toggleModal={() => setIsModalOpen(false)}
          product={currentProduct}
        />
      )}
    </section>
  );
}
