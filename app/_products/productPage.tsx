import React, { useState } from "react";
import { Product } from "../_component/types/product";
import { useCart } from "../_component/context/CartContext";
import { useQuery } from "@tanstack/react-query";
import Pagination from "../_component/pagination";
import ProductCard from "../_component/productCard";
import SearchComponent from "../_component/searchComponent";
import ProductCardSkeleton from "../_component/Ui/skeletons/productCardSkeleton";
import Cart from "../_component/cart";
import NotFoundProduct from "../_component/Ui/notFoundProduct";

const ITEMS_PER_PAGE = 5;

const fetchProducts = async () => {
  try {
    const response = await fetch("https://fakestoreapi.com/products");
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    return data as Product[];
  } catch (error) {
    console.error("Error fetching products:", error);
    throw error;
  }
};

interface ProductPageProps {
  isCartOpen: boolean;
  setIsCartOpen: (isOpen: boolean) => void;
}

const ProductPage = (props: ProductPageProps) => {
  const { setIsCartOpen, isCartOpen } = props;

  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const { cartItems, addToCart, updateQuantity } = useCart();

  const { data: products, isLoading } = useQuery({
    queryKey: ["products"],
    queryFn: fetchProducts,
  });

  const filteredProducts = products?.filter((product: Product) =>
    product.title.toLowerCase().includes(searchTerm.toLowerCase())
  );


  
  const totalPages = filteredProducts
    ? Math.ceil(filteredProducts.length / ITEMS_PER_PAGE)
    : 0;
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const currentProducts = filteredProducts?.slice(
    startIndex,
    startIndex + ITEMS_PER_PAGE
  );
  
  return (
    <>
      <div className="flex justify-center mb-6 w-full ">
        <SearchComponent
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}

        />
      </div>
      {isLoading && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
          {[...new Array(ITEMS_PER_PAGE)].map((_, index) => (
            <div key={`skeleton-${index}`}>
              <div className="p-4 space-y-3">
                <ProductCardSkeleton />
              </div>
            </div>
          ))}
        </div>
      )}

      {!isLoading && (
        <>
          {currentProducts?.length === 0 && (
            <div className="flex flex-col items-center justify-center min-h-[400px] w-full ">
              <div className="w-48 h-48 mb-4">

              <NotFoundProduct />
            </div>
            <h3 className="text-xl font-semibold text-gray-700 mb-2">
              No Products Found
            </h3>
          </div>
        )}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
          
          {currentProducts?.map((product: Product) => (
            <ProductCard
              key={product.id}
              product={product}
              onAddToCart={addToCart}
              cartItems={cartItems}
              setIsCartOpen={setIsCartOpen}
              updateQuantity={updateQuantity}
            />
          ))}
          
        </div>
        </>
      )}

      {totalPages > 1 && (

        <div className="flex justify-center items-center space-x-2 mt-8">
          <Pagination
            totalPages={totalPages}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
          />
        </div>
      )}
      <Cart
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cartItems}
        onUpdateQuantity={updateQuantity}
      />
    </>
  );
};

export default ProductPage;
