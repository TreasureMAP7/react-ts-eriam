import { Check, ShoppingCart } from "lucide-react";

type ProductCardProps = {
  name: string;
  price: number;
  image: string;
  onAddToCart: () => void;
  isAdded: boolean;
};

const ProductCard = ({
  name,
  price,
  image,
  onAddToCart,
  isAdded,
}: ProductCardProps) => {
  return (
    <div className="flex gap-2 aspect-square">
      <div
        className={`group relative flex aspect-square w-full items-center justify-center overflow-hidden rounded-2xl border-2 transition duration-300 ${isAdded ? "hover:border-green-500 border-green-700 " : "hover:border-blue-400 border-gray-600 "}`}
      >
        <img
          src={image}
          alt={`${name} ${price}`}
          className="h-full w-full object-contain p-6 transition duration-300 group-hover:scale-105"
        />

        <div className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 transition duration-300 group-hover:opacity-100">
          <button
            type="button"
            onClick={onAddToCart}
            disabled={isAdded}
            className={`absolute bottom-3 right-3 flex rounded-full p-3 transition duration-300 ${
              isAdded
                ? "cursor-default bg-green-500 text-white"
                : "cursor-pointer bg-blue-400 text-black hover:bg-black hover:text-blue-400"
            }`}
          >
            {isAdded ? <Check size={20} /> : <ShoppingCart size={20} />}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
