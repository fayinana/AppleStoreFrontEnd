// import { useState } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import { useAuth } from "@/contexts/AuthContext";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";
// import { ArrowLeft } from "lucide-react";
// import { users } from "@/data/mockData";
// import { useToast } from "@/components/ui/use-toast";

// export default function Login() {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [loading, setLoading] = useState(false);
//   // const { login } = useAuth();
//   const navigate = useNavigate();
//   const { toast } = useToast();

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     setLoading(true);

//     // Simulate API call delay
//     await new Promise((resolve) => setTimeout(resolve, 1000));

//     const user = users.find(
//       (u) => u.email === email && u.password === password
//     );

//     if (user) {
//       await login(email, password);
//       toast({
//         title: "Welcome back!",
//         description: "You've successfully logged in.",
//       });
//       navigate("/");
//     } else {
//       toast({
//         variant: "destructive",
//         title: "Error",
//         description: "Invalid email or password",
//       });
//     }

//     setLoading(false);
//   };

//   return (
//     <div className="min-h-screen bg-dribbble-light flex flex-col">
//       <Link
//         to="/"
//         className="p-4 text-dribbble-primary hover:text-dribbble-secondary transition-colors inline-flex items-center"
//       >
//         <ArrowLeft className="h-4 w-4 mr-2" />
//         Back to Home
//       </Link>

//       <div className="flex-1 flex items-center justify-center px-4 sm:px-6 lg:px-8">
//         <div className="w-full max-w-md space-y-8 bg-white p-8 rounded-xl shadow-lg">
//           <div className="text-center">
//             <h2 className="text-3xl font-bold tracking-tight text-dribbble-heading">
//               Sign in to your account
//             </h2>
//             <p className="mt-2 text-sm text-dribbble-text">
//               Or{" "}
//               <Link
//                 to="/signup"
//                 className="font-medium text-dribbble-primary hover:text-dribbble-secondary"
//               >
//                 create a new account
//               </Link>
//             </p>
//           </div>

//           <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
//             <div className="space-y-4">
//               <div>
//                 <Label htmlFor="email" className="text-dribbble-heading">
//                   Email address
//                 </Label>
//                 <Input
//                   id="email"
//                   type="email"
//                   value={email}
//                   onChange={(e) => setEmail(e.target.value)}
//                   required
//                   className="mt-1"
//                 />
//               </div>

//               <div>
//                 <Label htmlFor="password" className="text-dribbble-heading">
//                   Password
//                 </Label>
//                 <Input
//                   id="password"
//                   type="password"
//                   value={password}
//                   onChange={(e) => setPassword(e.target.value)}
//                   required
//                   className="mt-1"
//                 />
//               </div>
//             </div>

//             <div className="flex items-center justify-between">
//               <Link
//                 to="/forgot-password"
//                 className="text-sm font-medium text-dribbble-primary hover:text-dribbble-secondary"
//               >
//                 Forgot your password?
//               </Link>
//             </div>

//             <Button
//               type="submit"
//               className="w-full bg-dribbble-primary hover:bg-dribbble-secondary text-white"
//               disabled={loading}
//             >
//               {loading ? "Signing in..." : "Sign in"}
//             </Button>
//           </form>
//         </div>
//       </div>
//     </div>
//   );
// }

import LoginPage from "@/features/account/LoginPage";

export default function Login() {
  return <LoginPage />;
}
