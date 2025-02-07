'use client';

import { useCart } from '../components/context/CartContext';
import Navbar from '../components/Navbar';


interface CartItem {
  _id: string;
  name: string;
  price: number;
}

export default function CartPage() {
  const { cart, removeFromCart, clearCart } = useCart();

  const totalPrice = cart.reduce((acc: number, item: CartItem) => acc + item.price, 0);

  return (
    <div className="bg-gray-100" style={{ minHeight: '92vh' }}>
      <Navbar />
      <div className="max-w-7xl mx-auto py-10 px-5">
        <h1 className="text-4xl font-bold text-gray-800 mb-8">Your Cart</h1>
        {cart.length > 0 ? (
          <>
            <ul>
              {cart.map((item: CartItem) => (
                <li key={item._id} className="flex items-center justify-between bg-white p-4 shadow mb-4 rounded-lg">
                  <div>
                    <h2 className="text-lg font-semibold">{item.name}</h2>
                    <p>${item.price.toFixed(2)}</p>
                  </div>
                  <button
                    onClick={() => removeFromCart(item._id)}
                    className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                  >
                    Remove
                  </button>
                </li>
              ))}
            </ul>
            <div className="mt-6">
              <h2 className="text-2xl font-bold">Total: ${totalPrice.toFixed(2)}</h2>
              <button
                onClick={clearCart}
                className="mt-3 bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
              >
                Clear Cart
              </button>
            </div>
          </>
        ) : (
          <p>Your cart is empty.</p>
        )}
      </div>
    </div>
  );
}
