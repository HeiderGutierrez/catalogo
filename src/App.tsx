import { useState, useEffect } from 'react'
import './App.css'
import Search from './components/Search'
import FilterPills from './components/FilterPills'
import ProductCard from './components/ProductCard'
import ProductModal from './components/ProductModal'
import BackToTop from './components/BackToTop'
import { getProducts } from './services/sheets'
import type { Product } from './types/product'

function App() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("TODAS LAS COLECCIONES");

  useEffect(() => {
    getProducts()
      .then((data) => {
        setProducts(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching products:", error);
        setLoading(false);
      });
  }, []);

  const filteredProducts = products.filter((product) => {
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.brand.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.olfactoryFamily.some(family => family.toLowerCase().includes(searchQuery.toLowerCase()));

    const matchesCategory = activeCategory === "TODAS LAS COLECCIONES" || product.collection === activeCategory;

    return matchesSearch && matchesCategory;
  });

  return (
    <div className="flex flex-col items-center justify-start p-8 bg-slate-50 min-h-screen gap-6 w-full relative">
      <Search
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />
      <FilterPills
        activeCategory={activeCategory}
        onCategoryChange={setActiveCategory}
      />

      {loading ? (
        <div className="flex justify-center items-center h-64 w-full">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[transparent] border-t-[#065A65]"></div>
        </div>
      ) : (
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-x-4 gap-y-8 md:gap-8 mt-4 w-full max-w-6xl items-stretch justify-items-center">
          {filteredProducts.map((product) => (
            <ProductCard
              key={product.id}
              name={product.name}
              brand={product.brand}
              price={product.price}
              image={product.image}
              isAvailable={product.isAvailable}
              onClick={() => setSelectedProduct(product)}
            />
          ))}
        </div>
      )}

      <ProductModal
        isOpen={!!selectedProduct}
        onClose={() => setSelectedProduct(null)}
        product={selectedProduct}
      />
      <BackToTop />
    </div>
  )
}

export default App
