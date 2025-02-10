"use client";
import { Button } from "antd";
import { ShoppingCart } from "lucide-react";
import Link from "next/link";

interface HeaderProps {
  cartItemCount: number;
  onCartClick: () => void;
}

const Header = (props: HeaderProps) => {
  const { cartItemCount, onCartClick } = props;
const handleCartClick = () => {
    onCartClick();
  };

  return (
    
      <header className="fixed top-0 left-0 right-0 z-50 glass border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <Link href="/" className="flex items-center">
              <span className="text-xl font-semibold">Store</span>
            </Link>
            <Button
              type="text"
              className="relative hover:bg-gray-100 rounded-full p-2"
              onClick={handleCartClick}
            >
              <ShoppingCart className="h-6 w-6" />
              {cartItemCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-primary text-white text-xs font-medium rounded-full h-5 w-5 flex items-center justify-center">
                  {cartItemCount}
                </span>
              )}
            </Button>
          </div>
        </div>
      </header>
    
  );
};

export default Header;
