type Product = {
  id: number;
  title: string;
  price: number;
  image: string;
};

type CartDropdownProps = {
  cart: Product[];
  setCart: React.Dispatch<React.SetStateAction<Product[]>>;
  visible: boolean;
};

export default function CartDropdown({
  cart,
  setCart,
  visible,
}: CartDropdownProps) {
  const total = cart.reduce((sum, item) => sum + item.price, 0);

  function removeItem(id: number) {
    setCart((prev) => prev.filter((item) => item.id !== id));
  }

  return (
    <div
      className={`gap-4 absolute right-0 top-full z-50 w-80 rounded-lg border bg-gray-800 p-4 shadow-lg transition duration-300 ${visible ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}`}
    >
      <h2 className="mb-3 text-lg font-semibold text-white border-b-gray-400">
        Your Cart ({cart.length})
      </h2>

      {cart.length === 0 ? (
        <p className="py-4 text-center text-gray-500">Your cart is empty.</p>
      ) : (
        <>
          <div className="max-h-80 space-y-4 overflow-y-auto text-white">
            {cart.map((item) => (
              <div key={item.id} className="flex gap-3">
                <img
                  src={item.image}
                  alt={item.title}
                  className="h-16 w-16 object-contain"
                />

                <div className="min-w-0 flex-1">
                  <p className="truncate font-medium">{item.title}</p>
                  <p>${item.price.toFixed(2)}</p>

                  <button
                    onClick={() => removeItem(item.id)}
                    className="cursor-pointer text-sm text-red-500 hover:underline font-semibold"
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-4 flex flex-col gap-4 justify-between pt-3 font-semibold text-white">
            <div className="flex justify-between">
              <span>Total</span>
              <span>${total.toFixed(2)}</span>
            </div>
            <button
              className="w-full p-2 flex bg-blue-400 hover:bg-black hover:text-blue-400 justify-center rounded-full transition duration-300 cursor-pointer"
              onClick={() => {
                {
                  alert("Checkout success!");
                  setCart([]);
                }
              }}
            >
              Checkout
            </button>
          </div>
        </>
      )}
    </div>
  );
}
