import React from "react";
import { Link } from "react-router-dom";
import { Star, ShoppingCart } from "lucide-react";
import productsData from "./data/products.json";
import axios from "axios";
import { useQuery } from "react-query";
const ProductList = () => {
  const addToCart = (product) => {
    const cart = JSON.parse(localStorage.getItem("cart") || "[]");
    cart.push(product);
    localStorage.setItem("cart", JSON.stringify(cart));
    window.location.reload();
  };

  const { data } = useQuery({
    queryKey: ["productDetails"],
    queryFn: () => {
      return axios.get("/api/v1/product/getallproducts");
    },
  });

  const productListData = data?.data?.allProduct;

  console.log("productListData", productListData);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold text-center mb-12 text-purple-800">
        Our Luxurious Collection
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
        {productListData?.map((product) => (
          <div
            key={product.id}
            className="bg-gradient-to-r from-yellow-400 via-yellow-500 to-yellow-600 text-white rounded-xl shadow-2xl overflow-hidden transform transition-all duration-300 hover:scale-105 hover:shadow-2xl"
          >
            <div className="relative pb-3/4">
              <img
                src={product?.imagelin}
                alt={product?.productname}
                className="absolute h-full w-full object-cover rounded-t-xl"
              />
            </div>
            <div className="p-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-2">
                {product?.productname}
              </h2>
              <p className="text-gray-200 mb-4 line-clamp-3">
                {product?.productdescription}
              </p>
              <div className="flex justify-between items-center mb-4">
                <span className="text-3xl font-bold text-yellow-400">
                  ${product?.productprice}
                </span>
                <div className="flex items-center">
                  <Star className="w-6 h-6 text-yellow-400 fill-current" />
                  <span className="ml-1 text-gray-300">
                    {product?.productrating}
                  </span>
                </div>
              </div>
              <div className="flex space-x-4">
                <Link
                  to={`/product/${product._id}`}
                  className="flex-1 bg-purple-600 text-white text-center py-3 rounded-md hover:bg-purple-700 transition-colors duration-300"
                >
                  View Details
                </Link>
                <button
                  onClick={() => addToCart(product)}
                  className="bg-yellow-500 text-purple-800 px-6 py-3 rounded-md hover:bg-yellow-600 transition-colors duration-300 flex items-center justify-center"
                >
                  <ShoppingCart className="w-6 h-6 mr-2" />
                  Add to Cart
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductList;
