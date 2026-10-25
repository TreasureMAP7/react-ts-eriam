import { useEffect, useState } from "react";
import ProductCard from "./components/ProductCard";
import Navbar from "./components/Navbar";

type Product = {
  id: number;
  title: string;
  price: number;
  image: string;
};

function App() {
  const [products, setProducts] = useState<Product[]>([]);
  const [seed] = useState<number | null>(() => {
    const storageSeed = localStorage.getItem("seed");

    if (storageSeed !== null) {
      const parsedSeed = Number(storageSeed);

      if (Number.isInteger(parsedSeed) && parsedSeed >= 1 && parsedSeed <= 64) {
        return parsedSeed;
      }
    }

    const newSeed = Math.floor(Math.random() * 64) + 1;

    localStorage.setItem("seed", String(newSeed));
    return newSeed;
  });
  const [cart, setCart] = useState<Product[]>(() => {
    const storageCart = localStorage.getItem("cart");

    return storageCart ? JSON.parse(storageCart) : [];
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (seed === null) return;

    const selectId = (seed: number): number[] => {
      const ids = new Set<number>();

      for (let i = 0; ids.size < 10; i++) {
        const id = ((seed - 1 + i * 3) % 20) + 1;
        ids.add(id);
      }

      return [...ids];
    };

    const selectedId = selectId(seed);

    const fetchProducts = async () => {
      try {
        const response = await fetch("https://fakestoreapi.com/products");

        if (!response.ok) {
          throw new Error("Gagal mengambil produk");
        }

        const data: Product[] = await response.json();
        setProducts(data.filter((data) => selectedId.includes(data.id)));
        console.log(data.filter((data) => selectedId.includes(data.id)));
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [seed]);

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  return (
    <>
      <div className="bg-gray-900">
        <Navbar cartCount={cart.length} cart={cart} setCart={setCart} />
        <main className="flex min-h-screen items-center justify-center p-8 ">
          {loading ? (
            <h1 className="text-white text-3xl font-bold">Loading...</h1>
          ) : products === null ? (
            <h1 className="text-white text-3xl font-bold">
              Product Fetching Failed
            </h1>
          ) : (
            <div className="space-y-3 grid grid-cols-4 gap-8 text-center">
              {products.map((product) => (
                <ProductCard
                  key={product.id}
                  name={product.title}
                  price={product.price}
                  image={product.image}
                  isAdded={cart.some((item) => item.id === product.id)}
                  onAddToCart={() => {
                    setCart((prev) => {
                      console.log("Product added");
                      console.log(cart);
                      return [...prev, product];
                    });
                  }}
                />
              ))}
            </div>
          )}
        </main>
      </div>
    </>
  );
}

export default App;
