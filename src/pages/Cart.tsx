// import { Button } from "@/components/ui/button";
// import { useCart } from "@/contexts/CartContext";
// import { Minus, Plus, Trash2 } from "lucide-react";
// import { Link } from "react-router-dom";

// export default function Cart() {
//   const { items, removeFromCart, updateQuantity } = useCart();

//   const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

//   if (items.length === 0) {
//     return (
//       <div className="container mx-auto py-8">
//         <div className="bg-white rounded-xl p-8 shadow-lg text-center">
//           <h1 className="text-3xl font-bold text-dribbble-heading mb-4">
//             Your Cart is Empty
//           </h1>
//           <p className="text-dribbble-text mb-8">
//             Looks like you haven't added any items to your cart yet.
//           </p>
//           <Button asChild className="bg-dribbble-primary hover:bg-dribbble-secondary">
//             <Link to="/products">Continue Shopping</Link>
//           </Button>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="container mx-auto py-8">
//       <h1 className="text-3xl font-bold text-dribbble-heading mb-8">
//         Shopping Cart
//       </h1>
//       <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
//         <div className="lg:col-span-2 space-y-4">
//           {items.map((item) => (
//             <div
//               key={item.id}
//               className="bg-white rounded-xl p-6 shadow-lg flex gap-4"
//             >
//               <img
//                 src={item.image}
//                 alt={item.name}
//                 className="w-24 h-24 object-cover rounded-lg"
//               />
//               <div className="flex-1 space-y-2">
//                 <h3 className="text-lg font-semibold text-dribbble-heading">
//                   {item.name}
//                 </h3>
//                 <p className="text-dribbble-primary font-bold">
//                   ${item.price}
//                 </p>
//                 <div className="flex items-center gap-4">
//                   <div className="flex items-center gap-2">
//                     <Button
//                       variant="outline"
//                       size="icon"
//                       onClick={() =>
//                         updateQuantity(item.id, Math.max(1, item.quantity - 1))
//                       }
//                     >
//                       <Minus className="h-4 w-4" />
//                     </Button>
//                     <span className="w-8 text-center">{item.quantity}</span>
//                     <Button
//                       variant="outline"
//                       size="icon"
//                       onClick={() => updateQuantity(item.id, item.quantity + 1)}
//                     >
//                       <Plus className="h-4 w-4" />
//                     </Button>
//                   </div>
//                   <Button
//                     variant="ghost"
//                     size="icon"
//                     onClick={() => removeFromCart(item.id)}
//                     className="text-red-500 hover:text-red-700"
//                   >
//                     <Trash2 className="h-4 w-4" />
//                   </Button>
//                 </div>
//               </div>
//             </div>
//           ))}
//         </div>
//         <div className="bg-white rounded-xl p-6 shadow-lg h-fit">
//           <h2 className="text-xl font-semibold text-dribbble-heading mb-4">
//             Order Summary
//           </h2>
//           <div className="space-y-2 mb-4">
//             <div className="flex justify-between text-dribbble-text">
//               <span>Subtotal</span>
//               <span>${total.toFixed(2)}</span>
//             </div>
//             <div className="flex justify-between font-bold text-dribbble-heading">
//               <span>Total</span>
//               <span>${total.toFixed(2)}</span>
//             </div>
//           </div>
//           <Button
//             asChild
//             className="w-full bg-dribbble-primary hover:bg-dribbble-secondary"
//           >
//             <Link to="/checkout">Proceed to Checkout</Link>
//           </Button>
//         </div>
//       </div>
//     </div>
//   );
// }

import CartPage from "@/features/cart/CartPage";

export default function Cart() {
  return <CartPage />;
}
