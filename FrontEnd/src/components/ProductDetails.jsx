 
import React, { useState } from "react"
 import { useParams } from "react-router-dom"
 import { useQuery } from "react-query"
import axios from "axios"
 

 
export default function ProductDetails() {
  const { id } = useParams()

  console.log("id",id);
  const [selectedSize, setSelectedSize] = useState("")
  const [quantity, setQuantity] = useState(1)
  const [showFullDescription, setShowFullDescription] = useState(false)

  const { data, isLoading, error } = useQuery({
    queryKey: ["getSingleProduct"],
    queryFn: () => axios.get(`/api/v1/product/getSingleProduct/${id}`),
  })
   
   console.log("dara",data)
   const product = data?.data.findData

  console.log("productdata",product)

  const addToCart = () => {
    if (!selectedSize) {
      alert("Please select a size")
      return
    }
    // Add to cart logic here
    alert(`Added to cart: ${quantity} x ${product?.productname} (${selectedSize})`)
  }

  const buyNow = () => {
    if (!selectedSize) {
      alert("Please select a size")
      return
    }
    // Check if user is authenticated
    const isAuthenticated = false // Replace with actual auth check
    if (!isAuthenticated) {
      if (confirm("Please log in to continue. Go to login page?")) {
        // Implement redirection to login page here
        console.log("Redirecting to login page...")
      }
    } else {
      // Implement redirection to checkout page here
      console.log("Redirecting to checkout page...")
    }
  }

  if (isLoading) {
    return <ProductDetailsSkeleton />
  }

  if (error || !product) {
    return <div className="text-center text-red-500">Error loading product details</div>
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="bg-white rounded-xl shadow-2xl overflow-hidden">
        <div className="md:flex">
          <div className="md:w-1/2 relative  first-letter:md:h-64">
            <img
              src={product.imagelink}
              alt={product.productname}
              layout="fill"
             
              className="h-full w-full  object-cover rounded-t-lg md:rounded-l-lg md:rounded-t-none"
            />
          </div>
          <div className="p-8 md:w-1/2">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">{product.productname}</h1>
            <div className="flex items-center mb-4">
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <svg
                    key={i}
                    className={`h-5 w-5 ${
                      i < Math.round(product.productrating)
                        ? "text-yellow-400"
                        : "text-gray-300"
                    }`}
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              <p className="ml-2 text-sm text-gray-600">
                {product.productrating} out of 5 stars
              </p>
            </div>
            <p className="text-2xl font-bold text-gray-900 mb-4">
              ${product.productprice}
            </p>
            <div className="mb-6">
              <p className={`text-gray-700 ${showFullDescription ? '' : 'line-clamp-3'}`}>
                {product.productdescription}
              </p>
              {product.productdescription.length > 150 && (
                <button
                  onClick={() => setShowFullDescription(!showFullDescription)}
                  className="mt-2 text-indigo-600 hover:text-indigo-800 transition-colors duration-200"
                >
                  {showFullDescription ? "Show less" : "Show more"}
                </button>
              )}
            </div>
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Size
              </label>
              <select
                value={selectedSize}
                onChange={(e) => setSelectedSize(e.target.value)}
                className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
              >
                <option value="">Select a size</option>
                {product.sizeoptions.map((size, index) => (
                  <option
                    key={index}
                    value={size.size}
                    disabled={size.quantity === 0}
                  >
                    {size.size}{" "}
                    {size.quantity === 0
                      ? "(Out of stock)"
                      : `(${size.quantity} available)`}
                  </option>
                ))}
              </select>
            </div>
            <div className="mb-8">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Quantity
              </label>
              <input
                type="number"
                min="1"
                value={quantity}
                onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value)))}
                className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
              />
            </div>
            <div className="flex flex-col sm:flex-row gap-4">
              <button
                onClick={addToCart}
                className="flex-1 bg-indigo-600 text-white px-6 py-3 rounded-md hover:bg-indigo-700 transition-colors duration-300 flex items-center justify-center"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M3 1a1 1 0 000 2h1.22l.305 1.222a.997.997 0 00.01.042l1.358 5.43-.893.892C3.74 11.846 4.632 14 6.414 14H15a1 1 0 000-2H6.414l1-1H14a1 1 0 00.894-.553l3-6A1 1 0 0017 3H6.28l-.31-1.243A1 1 0 005 1H3zM16 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM6.5 18a1.5 1.5 0 100-3 1.5 1.5 0 000 3z" />
                </svg>
                Add to Cart
              </button>
              <button
                onClick={buyNow}
                className="flex-1 bg-green-600 text-white px-6 py-3 rounded-md hover:bg-green-700 transition-colors duration-300 flex items-center justify-center"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M4 4a2 2 0 00-2 2v1h16V6a2 2 0 00-2-2H4z" />
                  <path fillRule="evenodd" d="M18 9H2v5a2 2 0 002 2h12a2 2 0 002-2V9zM4 13a1 1 0 011-1h1a1 1 0 110 2H5a1 1 0 01-1-1zm5-1a1 1 0 100 2h1a1 1 0 100-2H9z" clipRule="evenodd" />
                </svg>
                Buy Now
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

function ProductDetailsSkeleton() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="bg-white rounded-xl shadow-2xl overflow-hidden animate-pulse">
        <div className="md:flex">
          <div className="md:w-1/2 h-96 bg-gray-300"></div>
          <div className="p-8 md:w-1/2">
            <div className="h-8 bg-gray-300 rounded w-3/4 mb-4"></div>
            <div className="h-4 bg-gray-300 rounded w-1/4 mb-4"></div>
            <div className="h-6 bg-gray-300 rounded w-1/4 mb-6"></div>
            <div className="h-20 bg-gray-300 rounded w-full mb-6"></div>
            <div className="h-10 bg-gray-300 rounded w-full mb-6"></div>
            <div className="h-10 bg-gray-300 rounded w-full mb-8"></div>
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="h-12 bg-gray-300 rounded flex-1"></div>
              <div className="h-12 bg-gray-300 rounded flex-1"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

