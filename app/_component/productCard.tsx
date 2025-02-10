"use client";
import { useState } from "react";
import { Product } from "./types/product";
import { Button, message } from "antd";
import Image from "next/image";
import { Minus, Plus,} from "lucide-react";

interface ProductCardProps {
  product: Product;
  onAddToCart: (product: Product) => void;
  cartItems: { id: number; quantity: number }[];
  setIsCartOpen: (isOpen: boolean) => void;
  updateQuantity: (id: number, quantity: number) => void;
}

const ProductCard = (props: ProductCardProps) => {
  const { product, onAddToCart, cartItems, updateQuantity } =
    props;
  const [isImageLoaded, setIsImageLoaded] = useState(false);

  const handleAddToCart = () => {
    const isInCart = cartItems.some((item) => item.id === product.id);
    if (isInCart) {
      message.error({
        content: `${product.title} is already in cart`,
      });
    }

    onAddToCart(product);
    message.success({
      content: `Added ${product.title} to cart`,
    });
  };

 

  return (
    <div className="bg-white rounded-lg overflow-hidden border hover:shadow-lg transition-all duration-300">
      <div className="aspect-square relative overflow-hidden bg-white p-4 group">
        <Image
          src={product.image}
          alt={product.title}
          fill
          className={`object-contain transition-transform duration-300 group-hover:scale-110 ${
            isImageLoaded ? "opacity-100" : "opacity-0"
          }`}
          onLoad={() => setIsImageLoaded(true)}
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          priority
        />
        {!isImageLoaded && (
          <div className="absolute inset-0 bg-gray-100 animate-pulse" />
        )}
      </div>
      <div className="p-4 space-y-4">
        <span className="inline-block px-3 py-1 text-xs font-medium bg-gray-100 text-gray-800 rounded-full hover:bg-gray-200 transition-colors">
          {product.category}
        </span>
        <div>
          <h3 className="font-medium line-clamp-2 h-12 text-gray-800 hover:text-gray-900">
            {product.title}
          </h3>
          <p className="text-lg font-semibold text-gray-900 mt-2">
            ${product.price.toFixed(2)}
          </p>
        </div>

        {cartItems.some((item) => item.id === product.id) ? (
          
          <div className="flex items-center justify-between w-full mt-4">
            <Button
              className="group p-2"
              onClick={() => {
                const item = cartItems.find((item) => item.id === product.id);
                if (item && item.quantity ) {
                  updateQuantity(product.id, item.quantity - 1);
                }
              }}
            >
              <Minus className="h-4 w-4 transition-transform group-hover:scale-125" />
            </Button>
            <span className="font-medium">
              {cartItems.find((item) => item.id === product.id)?.quantity || 0}
            </span>
            <Button
              className="group p-2"
              onClick={() => {
                const item = cartItems.find((item) => item.id === product.id);
                if (item) {
                  updateQuantity(product.id, item.quantity + 1);
                }
              }}
            >
              <Plus className="h-4 w-4 transition-transform group-hover:scale-125" />
            </Button>
          </div>
        ) : (
          <Button className="w-full mt-4 group" onClick={handleAddToCart}>
            <Plus className="mr-2 h-4 w-4 transition-transform group-hover:scale-125" />
            Add to Cart
          </Button>
        )}
      </div>
    </div>
  );
};

export default ProductCard;
