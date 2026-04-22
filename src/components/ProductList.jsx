"use client";

import FavoriteIcon from "./FavoriteIcon";
import Link from "next/link";
import useBasket from "@/store/Basket";
import { useEffect, useState } from "react";

const allowedCategories = ["beauty", "home-decoration", "skin-care", "sunglasses", "tops", "womens-bags", "womens-dresses", "womens-jewellery", "womens-shoes", "womens-watches", "fragrances"];

const ProductList = () => {
  const [allProducts, setAllProducts] = useState([]);
  const [activeCategory, setActiveCategory] = useState("All");
  const addToCart = useBasket((state) => state.addToCart);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const promises = allowedCategories.map((category) =>
          fetch(`https://dummyjson.com/products/category/${category}`)
            .then((res) => res.json())
            .then((data) => data.products),
        );
        const results = await Promise.all(promises);
        setAllProducts(results.flat());
      } catch (error) {
        console.error("Failed to fetch products:", error);
      }
    };

    fetchProducts();
  }, []);

  const filteredProducts = activeCategory === "All" ? allProducts : allProducts.filter((product) => product.category === activeCategory);

  return (
    <div className="flex-1 justify-start ">
      {/* Selve filter knapperne */}
      <div className="flex flex-wrap gap-2 px-10 pt-5">
        <button
          onClick={() => setActiveCategory("All")}
          className={`font-inria border px-3 py-1 rounded-full text-sm cursor-pointer transition-all
            ${activeCategory === "All" ? "bg-black text-white border-black" : "border-black"}`}
        >
          All
        </button>
        {allowedCategories.map((category) => (
          <button
            key={category}
            onClick={() => setActiveCategory(category)}
            className={`font-inria border px-3 py-1 rounded-full text-sm cursor-pointer transition-all capitalize
              ${activeCategory === category ? "bg-black text-white border-black" : "border-black"}`}
          >
            {category}
          </button>
        ))}
      </div>

      <div className=" bg-[#FAF6EA] rounded-2xl p-4 mr-10 mt-5 mb-5 ml-10 h-[calc(100vh-100px)] overflow-y-auto">
        <ul className="grid grid-cols-[repeat(auto-fit,minmax(240px,1fr))] gap-6 justify-items-center">
          {filteredProducts.map((product) => (
            <li key={product.id} className="bg-white w-ful mb-5 rounded-lg shadow-md">
              <div className="relative">
                <div className="absolute top-4 right-4">
                  <FavoriteIcon id={product.id} product={product} />
                </div>

                <Link href={`/detail-product-page/${product.id}`}>
                  <img className="rounded-t-lg" src={product.thumbnail} alt={product.title} width={300} height={400} />
                </Link>
              </div>

              <div className="pl-4 py-2 pr-4">
                <h3 className="text-gray-400 font-inria  font-bold">{product.brand}</h3>

                <h4 className="text-black font-inria pb-4">{product.title}</h4>

                <div className="flex justify-between">
                  <p className="text-black font-inria font-bold text-xl">${product.price}</p>

                  <button onClick={() => addToCart(product)} className="cursor-pointer font-inria border border-black px-2 rounded-md">
                    Add +
                  </button>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default ProductList;
