import { useState, useEffect } from 'react'
import './App.css'
import Search from './components/Search'
import FilterPills from './components/FilterPills'
import ProductCard from './components/ProductCard'
import ProductModal from './components/ProductModal'
import BackToTop from './components/BackToTop'
import FilterDrawer, { type FilterState } from './components/FilterDrawer'
import { getProducts } from './services/sheets'
import type { Product } from './types/product'

function App() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("TODAS LAS COLECCIONES");

  const [isFilterDrawerOpen, setIsFilterDrawerOpen] = useState(false);
  const [advancedFilters, setAdvancedFilters] = useState<FilterState | null>(null);

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

    let matchesAdvanced = true;
    if (advancedFilters) {
      if (advancedFilters.inStockOnly && !product.isAvailable) {
        matchesAdvanced = false;
      }
      if (advancedFilters.gender.length > 0 && !advancedFilters.gender.includes(product.gender)) {
        matchesAdvanced = false;
      }
      if (advancedFilters.intensity.length > 0 && !advancedFilters.intensity.includes(product.intensity)) {
        matchesAdvanced = false;
      }
      if (advancedFilters.bestTime.length > 0 && !advancedFilters.bestTime.some((time: string) => product.bestTime.includes(time))) {
        matchesAdvanced = false;
      }
      if (advancedFilters.minPrice !== '' && product.price < advancedFilters.minPrice) {
        matchesAdvanced = false;
      }
      if (advancedFilters.maxPrice !== '' && product.price > advancedFilters.maxPrice) {
        matchesAdvanced = false;
      }
      if (advancedFilters.olfactoryFamily.length > 0 && !advancedFilters.olfactoryFamily.some(fam => product.olfactoryFamily.includes(fam))) {
        matchesAdvanced = false;
      }
    }

    return matchesSearch && matchesCategory && matchesAdvanced;
  });

  // Sort logic if needed could be added before rendering
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    if (!advancedFilters) return 0;
    if (advancedFilters.sortBy === 'price_asc') return a.price - b.price;
    if (advancedFilters.sortBy === 'price_desc') return b.price - a.price;
    return 0; // fallback to default/newest
  });

  return (
    <div className="flex flex-col items-center justify-start p-8 bg-slate-50 min-h-screen gap-6 w-full relative overflow-x-hidden">
      <Search
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />
      <FilterPills
        activeCategory={activeCategory}
        onCategoryChange={setActiveCategory}
        onOpenFilters={() => setIsFilterDrawerOpen(true)}
      />

      {loading ? (
        <div className="flex justify-center items-center h-64 w-full">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[transparent] border-t-[#065A65]"></div>
        </div>
      ) : (
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-x-4 gap-y-8 md:gap-8 mt-4 w-full max-w-6xl items-stretch justify-items-center">
          {sortedProducts.map((product) => (
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

      <FilterDrawer
        isOpen={isFilterDrawerOpen}
        onClose={() => setIsFilterDrawerOpen(false)}
        onApplyFilters={(filters) => setAdvancedFilters(filters)}
      />

      <BackToTop />
    </div>
  )
}

export default App
