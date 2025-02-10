"use client";
import { useEffect } from "react";
import { CartItem } from "./types/cart";
import { Button } from "antd";
import Image from "next/image";
import { formatPrice } from "../_libs/utils";
import { MinusCircleFilled, PlusCircleFilled } from "@ant-design/icons";
import { X } from "lucide-react";

interface CartProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onUpdateQuantity: (id: number, quantity: number) => void;
}

const Cart = (props: CartProps) => {
  const { isOpen, onClose, items, onUpdateQuantity } = props;

  const total = items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleEscape);
    return () => window.removeEventListener("keydown", handleEscape);
  }, [onClose]);

  return (
    <>
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/30 backdrop-blur-[2px] transition-opacity z-40"
          onClick={onClose}
        />
      )}
      <div
        className={`fixed top-0 right-0 h-full w-full sm:w-[400px] bg-white shadow-xl z-50 transform transition-all duration-300 ease-in-out ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
          <div className="flex flex-col h-full">
            <div className="flex items-center justify-between p-4 border-b">
              <h2 className="text-xl font-semibold">Shopping Cart</h2>
              <Button
                type="text"
                onClick={onClose}
                icon={<X className="h-5 w-5" />}
                className="hover:bg-gray-100 rounded-full"
              />
            </div>
            {items.length === 0 && (
              <div className="flex flex-col items-center justify-center flex-1 p-8">
                <div className="w-24 h-24 rounded-full bg-gray-100 flex items-center justify-center mb-4">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-12 w-12 text-gray-400"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1.5}
                      d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
                    />
                  </svg>
                </div>
                <p className="text-lg font-medium text-gray-900">
                  Your cart is empty
                </p>
                <p className="text-sm text-gray-500 mt-1">
                  Add items to get started
                </p>
                <Button type="primary" onClick={onClose} className="mt-6">
                  Continue Shopping
                </Button>
              </div>
            )}
            {items.length > 0 && (
              <>
                <div className="flex-1 overflow-y-auto p-4 space-y-4 model-scroll">
                  {items.map((item) => (
                    <div
                      key={item.id}
                      className="flex gap-4 p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                    >
                      <div className="relative w-20 h-20 bg-white rounded-md border p-2 flex-shrink-0">
                        <Image
                          src={item.image}
                          alt={item.title}
                          fill
                          className="object-contain"
                          sizes="80px"
                        />
                      </div>

                      <div className="flex flex-col flex-1 min-w-0">
                        <h3 className="font-medium text-sm text-gray-900 truncate">
                          {item.title}
                        </h3>
                        <p className="text-sm text-gray-500 mt-1">
                          ${formatPrice(item.price)}
                        </p>

                        <div className="flex items-center gap-2 mt-2">
                          <Button
                            type="text"
                            icon={<MinusCircleFilled />}
                            onClick={() =>
                              onUpdateQuantity(item.id, item.quantity - 1)
                            }
                            className="text-gray-500 hover:text-gray-700"
                          />
                          <span className="w-8 text-center">{item.quantity}</span>
                          <Button
                            type="text"
                            icon={<PlusCircleFilled />}
                            onClick={() =>
                              onUpdateQuantity(item.id, item.quantity + 1)
                            }
                            className="text-gray-500 hover:text-gray-700"
                          />
                        </div>
                      </div>

                      <div className="flex flex-col items-end gap-2">
                        <span className="font-medium">
                          ${formatPrice(item.price * item.quantity)}
                        </span>
                        <Button
                          type="text"
                          danger
                          onClick={() => onUpdateQuantity(item.id, 0)}
                          className="text-sm"
                        >
                          Remove
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="border-t p-4 space-y-4">
                  <div className="flex justify-between text-base font-semibold">
                    <span>Total</span>
                    <span>${formatPrice(total)}</span>
                  </div>
                  <Button type="primary" block size="large">

                    Checkout
                  </Button>
                </div>
              </>
            )}
          </div>
      </div>
    </>
  );
};

export default Cart;
