import { ShoppingCart, X } from "lucide-react";
import CartList from "./CartList";
import { useState } from "react";

type Product = {
  id: number;
  title: string;
  price: number;
  image: string;
};

type NavbarProps = {
  cartCount: number;
  cart: Product[];
  setCart: React.Dispatch<React.SetStateAction<Product[]>>;
};

const Navbar = ({ cartCount, cart, setCart }: NavbarProps) => {
  const [toggle, setToggle] = useState<boolean>(false);

  return (
    <nav className="sticky top-0 z-50 flex items-center justify-between border-b-2 border-gray-600 bg-gray-900 px-8">
      <h1 className="text-2xl font-bold text-white">Eriam</h1>

      <div className="group relative">
        <button
          className="flex cursor-pointer items-center gap-2 py-8 text-white"
          onClick={() => setToggle((prev) => !prev)}
        >
          <div className="relative">
            {toggle ? <X size={32}/> : <ShoppingCart size={32} />}

            {!toggle && <span className="absolute -right-2 -top-2 flex h-6 min-w-6 items-center justify-center rounded-full bg-blue-500 p-1 text-sm font-semibold">
              {cartCount}
            </span>}
          </div>
        </button>

        <CartList cart={cart} setCart={setCart} visible={toggle} />
      </div>
    </nav>
  );
};

export default Navbar;
