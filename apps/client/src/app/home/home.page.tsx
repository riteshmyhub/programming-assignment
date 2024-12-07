import { Button } from "@/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/ui/card";
import { useNavigate } from "react-router";

export default function HomePage() {
   const navigate = useNavigate();
   return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-blue-600 to-green-500 text-white px-4">
         {/* Hero Section */}
         <div className="text-center max-w-2xl space-y-6">
            <h1 className="text-5xl font-extrabold leading-tight">
               Welcome to the <span className="text-yellow-300">Banking System</span>
            </h1>
            <p className="text-lg">Simplify your finances with secure, reliable, and user-friendly banking services. Your trusted partner for managing transactions, savings, and more.</p>
            <div className="flex flex-wrap justify-center gap-4 mt-6">
               <Button //
                  className="bg-yellow-300 text-blue-800 font-medium px-6 py-3 rounded-full shadow-lg hover:bg-yellow-400 focus:ring-2 focus:ring-yellow-200 transition-all"
                  onClick={() => navigate("/auth/login")}>
                  Login
               </Button>
               <Button
                  variant="outline" //
                  className="border-white text-black font-medium px-6 py-3 rounded-full shadow-lg hover:bg-white hover:text-blue-800 focus:ring-2 focus:ring-blue-200 transition-all"
                  onClick={() => navigate("/auth/register")}>
                  Sign Up
               </Button>
            </div>
         </div>

         {/* Features Section */}
         <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mt-16">
            <Card className="bg-white/10 backdrop-blur-lg">
               <CardHeader>
                  <CardTitle className="text-xl text-white">Secure Transactions</CardTitle>
               </CardHeader>
               <CardContent className="text-sm text-white/80">Enjoy cutting-edge encryption and fraud protection for peace of mind.</CardContent>
            </Card>
            <Card className="bg-white/10 backdrop-blur-lg">
               <CardHeader>
                  <CardTitle className="text-xl text-white">24/7 Support</CardTitle>
               </CardHeader>
               <CardContent className="text-sm text-white/80">Our team is always here to assist you, anytime, anywhere.</CardContent>
            </Card>
            <Card className="bg-white/10 backdrop-blur-lg">
               <CardHeader>
                  <CardTitle className="text-xl text-white">Customizable Tools</CardTitle>
               </CardHeader>
               <CardContent className="text-sm text-white/80">Personalize your banking experience with innovative features.</CardContent>
            </Card>
         </div>

         {/* Footer Section */}
         <footer className="mt-16 text-center">
            <p className="text-sm text-white/80">© {new Date().getFullYear()} Banking System. All rights reserved.</p>
         </footer>
      </div>
   );
}
