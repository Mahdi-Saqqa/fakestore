import React from "react";
import axios from "axios";
import NavBar from "../components/NavBar";
import SearchBox from "../components/SearchBox";
import { useSearchParams } from "react-router-dom";
import useSWR from "swr";
import ProductGride from "../components/ProductGride";

const fetcher = (url) => axios.get(url).then((res) => res.data);
const Home = () => {
  if(!localStorage.getItem('token')){
    window.location.href='/login'
  }
  const [searchParams, setSearchParams] = useSearchParams();
  const selectedCategory = searchParams.get("category");
  const searchQuery = searchParams.get("search");
  const [filteredProducts, setFilteredProducts] = React.useState([]);
  const {
    data: categories,
    isLoading: categoriesLoading,
  } = useSWR("https://fakestoreapi.com/products/categories", fetcher);
  console.log(categories);

  const {
    data: allProducts,
    error: productError,
    isLoading: productLoading,
  } = useSWR("https://fakestoreapi.com/products", fetcher);
  React.useEffect(() => {
    if (!productLoading) {
      if (selectedCategory) {
        setFilteredProducts(
          allProducts.filter((product) => product.category === selectedCategory)
        );
      } else if (searchQuery) {
        setFilteredProducts(
          allProducts.filter((product) =>
            product.title.toLowerCase().includes(searchQuery.toLowerCase())
          )
        );
      } else {
        setFilteredProducts(allProducts);
      }
    }
  }, [selectedCategory, allProducts,searchQuery]);

  return (
    <div className="flex flex-col items-center justify-center gap-[48px]">
      <NavBar
        categories={categories}
        categoriesLoading={categoriesLoading}
        setSearchParams={setSearchParams}
      />
      <SearchBox setSearchParams={setSearchParams} />
      <h3 className="text-4xl font-bold">Products</h3>
      <p className="text-lg">
        {filteredProducts.length} products found
      </p>

      <ProductGride
        products={filteredProducts}
        productLoading={productLoading}
        productError={productError}
      />
    </div>
  );
};

export default Home;
