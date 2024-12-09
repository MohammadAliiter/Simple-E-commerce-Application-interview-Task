import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Trash2, ShoppingBag } from 'lucide-react';

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    const cart = JSON.parse(localStorage.getItem('cart') || '[]');
    setCartItems(cart);
  }, []);

  const removeFromCart = (index) => {
    const newCart = [...cartItems];
    newCart.splice(index, 1);
    setCartItems(newCart);
    localStorage.setItem('cart', JSON.stringify(newCart));
  };

  const totalPrice = cartItems.reduce((sum, item) => sum + item.price, 0);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold text-center mb-8 text-yellow-600">Your Shopping Cart</h1>
      {cartItems.length === 0 ? (
        <div className="text-center">
          <ShoppingBag className="w-16 h-16 mx-auto text-gray-400 mb-4" />
          <p className="text-xl text-gray-600 mb-4">Your cart is empty</p>
          <Link
            to="/"
            className="bg-gradient-to-r from-yellow-500 to-yellow-600 text-white px-6 py-3 rounded-md shadow-lg hover:from-yellow-600 hover:to-yellow-700 transition-colors duration-300"
          >
            Continue Shopping
          </Link>
        </div>
      ) : (
        <div className="bg-white rounded-xl shadow-xl p-6 space-y-6">
          {cartItems.map((item, index) => (
            <div key={index} className="flex items-center justify-between border-b border-gray-200 py-4 last:border-b-0">
              <div className="flex items-center space-x-6">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-24 h-24 object-cover rounded-lg shadow-md"
                />
                <div className="space-y-2">
                  <h2 className="text-xl font-semibold text-gray-800">{item.name}</h2>
                  <p className="text-gray-600">Size: {item.selectedSize}</p>
                  <p className="text-yellow-600 font-semibold text-lg">${item.price}</p>
                </div>
              </div>
              <button
                onClick={() => removeFromCart(index)}
                className="text-red-500 hover:text-red-700 transition-colors duration-300"
              >
                <Trash2 className="w-6 h-6" />
              </button>
            </div>
          ))}
          <div className="mt-6 flex justify-between items-center">
            <span className="text-2xl font-bold text-gray-800">Total: <span className="text-yellow-600">${totalPrice }</span></span>
            <button className="bg-gradient-to-r from-yellow-500 to-yellow-600 text-white px-6 py-3 rounded-md shadow-lg hover:from-yellow-600 hover:to-yellow-700 transition-all duration-300">
              Proceed to Checkout
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
