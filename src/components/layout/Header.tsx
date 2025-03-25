import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { cn } from "@/lib/utils";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Bell, ChevronDown, Menu } from "lucide-react";
import { useAuth } from "../auth/AuthContext";

interface HeaderProps {
  userName?: string;
  userRole?: "individual" | "branch" | "admin";
  userAvatar?: string;
  onLogout?: () => void;
}

const Header = ({
  userName = "John Doe",
  userRole = "individual",
  userAvatar = "",
  onLogout = () => console.log("Logout clicked"),
}: HeaderProps) => {
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  // Use props if provided, otherwise fall back to auth context
  const displayName = userName || (user ? user.userName : "Guest");
  const displayRole = userRole || (user ? user.role : "individual");

  const handleLogout = () => {
    if (onLogout) {
      onLogout();
    } else {
      logout();
      navigate("/");
    }
  };

  const roleLabel = {
    individual: "Member",
    branch: "Branch Coordinator",
    admin: "Administrator",
  };

  const navigationLinks = [
    { name: "Dashboard", href: "/dashboard" },
    { name: "Projects", href: "/projects" },
    { name: "Magazine", href: "/magazine" },
  ];

  // Add role-specific links
  if (displayRole === "branch" || displayRole === "admin") {
    navigationLinks.push({ name: "Members", href: "/members" });
  }
  if (displayRole === "admin") {
    navigationLinks.push({ name: "System", href: "/system" });
  }

  return (
    <header className="bg-black text-white w-full h-20 border-b border-gold/20 sticky top-0 z-50">
      <div className="container mx-auto h-full px-4 flex items-center justify-between">
        {/* Logo and Brand */}
        <div className="flex items-center">
          <Link to="/" className="flex items-center">
            <div className="w-10 h-10 rounded-full bg-red-700 flex items-center justify-center mr-3">
              <span className="text-gold font-bold text-xl">G</span>
            </div>
            <div className="hidden md:block">
              <h1 className="text-xl font-bold text-gold">Guta Ra Mwari</h1>
              <p className="text-xs text-white/70">Fundraising Hub</p>
            </div>
          </Link>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-6">
          {navigationLinks.map((link) => (
            <Link
              key={link.name}
              to={link.href}
              className="text-white/80 hover:text-gold transition-colors"
            >
              {link.name}
            </Link>
          ))}
        </nav>

        {/* User Actions */}
        <div className="flex items-center space-x-4">
          {/* Notifications */}
          <Button
            variant="ghost"
            size="icon"
            className="text-white/80 hover:text-gold"
          >
            <Bell size={20} />
          </Button>

          {/* User Profile Dropdown */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                className="flex items-center space-x-2 hover:bg-white/10"
              >
                <Avatar className="h-8 w-8 border border-gold/30">
                  <AvatarImage src={userAvatar} alt={displayName} />
                  <AvatarFallback className="bg-red-800 text-white">
                    {displayName
                      .split(" ")
                      .map((name) => name[0])
                      .join("")}
                  </AvatarFallback>
                </Avatar>
                <div className="hidden md:block text-left">
                  <p className="text-sm font-medium">{displayName}</p>
                  <p className="text-xs text-white/60">
                    {roleLabel[displayRole]}
                  </p>
                </div>
                <ChevronDown size={16} className="text-white/60" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <Link to="/profile" className="w-full">
                  Profile
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Link to="/settings" className="w-full">
                  Settings
                </Link>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={handleLogout} className="text-red-500">
                Logout
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden text-white/80 hover:text-gold"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            <Menu size={24} />
          </Button>
        </div>
      </div>

      {/* Mobile Navigation Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-black/95 border-t border-gold/20 absolute w-full left-0 py-4 px-6">
          <nav className="flex flex-col space-y-4">
            {navigationLinks.map((link) => (
              <Link
                key={link.name}
                to={link.href}
                className="text-white/80 hover:text-gold transition-colors py-2"
                onClick={() => setMobileMenuOpen(false)}
              >
                {link.name}
              </Link>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;
