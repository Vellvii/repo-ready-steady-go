import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu, Home, Package, Info, Phone, ShoppingCart } from "lucide-react";
import { useCart } from "@/hooks/useCart";

export const MobileMenu = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { getTotalItems } = useCart();

  const menuItems = [
    { icon: Home, label: "Home", href: "/" },
    { icon: Package, label: "Products", href: "/products" },
    { icon: Info, label: "About", href: "/about" },
    { icon: Phone, label: "Contact", href: "/contact" },
  ];

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        <Button variant="ghost" size="sm" className="md:hidden text-white">
          <Menu className="w-5 h-5" />
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="bg-gradient-dark border-white/20 w-72">
        <div className="flex flex-col space-y-6 mt-8">
          <div className="text-center">
            <h2 className="text-2xl font-playfair font-bold gradient-text">Vellvii</h2>
            <p className="text-white/60 text-sm">Luxury Intimacy</p>
          </div>
          
          <nav className="space-y-2">
            {menuItems.map((item) => (
              <Link
                key={item.href}
                to={item.href}
                onClick={() => setIsOpen(false)}
                className="flex items-center gap-3 px-4 py-3 rounded-lg text-white hover:bg-white/10 transition-colors"
              >
                <item.icon className="w-5 h-5" />
                <span>{item.label}</span>
              </Link>
            ))}
          </nav>

          <div className="border-t border-white/20 pt-4">
            <Button 
              variant="luxury" 
              className="w-full justify-start"
              onClick={() => setIsOpen(false)}
            >
              <ShoppingCart className="w-4 h-4 mr-2" />
              Cart ({getTotalItems()})
            </Button>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
};