import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { createPortal } from "react-dom";
import {
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuItem,
} from "@/components/ui/navigation-menu";
import { Menu, X } from "lucide-react";
import { useTranslation } from "react-i18next";
import { LanguageToggle } from "./LanguageToggle";
import { useAuth } from "@/context/AuthContext";

const MenuOverlay = ({
  children,
  toggleMenu,
}: {
  children: React.ReactNode;
  toggleMenu: () => void;
}) => {
  return createPortal(
    <div className="fixed inset-0 z-[100] bg-black bg-opacity-70 flex items-center justify-center">
      <div className="relative bg-background rounded-lg p-8 w-11/12 max-w-sm">
        <button
          aria-label="Close Menu"
          onClick={toggleMenu}
          className="absolute top-4 right-4 focus:outline-none text-foreground"
        >
          <X size={28} />
        </button>
        {children}
      </div>
    </div>,
    document.body
  );
};

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { t, i18n } = useTranslation();
  const { user, logout } = useAuth();

  const toggleMenu = () => setIsMenuOpen((prev) => !prev);

  // מניעת גלילה ברקע כאשר התפריט פתוח
  useEffect(() => {
    document.body.style.overflow = isMenuOpen ? "hidden" : "auto";
  }, [isMenuOpen]);

  const menuItems = [
    { label: t("home_page"), path: "/" },
    { label: t("admin_dashboard"), path: "/admin/users", roles: ["admin"] },
  ];

  const authItems = [
    { label: t("login_page"), path: "/login" },
    { label: t("register_page"), path: "/register" },
  ];

  // בודק אם יש להציג את הפריט בהתבסס על הרשאות המשתמש
  const shouldDisplayItem = (item: {
    label: string;
    path: string;
    roles?: string[];
  }) => !item.roles || (user && item.roles.includes(user.role));

  // רכיב להצגת פריטי התפריט (למובייל ולדסקטופ)
  const NavigationItems = ({ isMobile = false }) => (
    <>
      <li className="text-lg flex justify-center">
        <LanguageToggle changeLanguage={(lng) => i18n.changeLanguage(lng)} />
      </li>
      {menuItems.filter(shouldDisplayItem).map((item, index) => (
        <NavigationMenuItem key={`menu-${index}`} asChild>
          <li>
            <Link
              to={item.path}
              onClick={() => isMobile && toggleMenu()}
              className={`text-lg transition-all duration-300 px-4 py-2 rounded hover:bg-accent hover:text-accent-foreground ${
                isMobile ? "w-full text-center block" : ""
              }`}
            >
              {item.label}
            </Link>
          </li>
        </NavigationMenuItem>
      ))}
      {user ? (
        <NavigationMenuItem asChild>
          <li>
            <button
              onClick={() => {
                logout();
                if (isMobile) toggleMenu();
              }}
              className={`text-lg transition-all duration-300 px-4 py-2 rounded hover:bg-destructive hover:text-destructive-foreground ${
                isMobile ? "w-full text-center block" : ""
              }`}
            >
              {t("logout")}
            </button>
          </li>
        </NavigationMenuItem>
      ) : (
        authItems.map((item, index) => (
          <NavigationMenuItem key={`auth-${index}`} asChild>
            <li>
              <Link
                to={item.path}
                onClick={() => isMobile && toggleMenu()}
                className={`text-lg transition-all duration-300 px-4 py-2 rounded hover:bg-accent hover:text-accent-foreground ${
                  isMobile ? "w-full text-center block" : ""
                }`}
              >
                {item.label}
              </Link>
            </li>
          </NavigationMenuItem>
        ))
      )}
    </>
  );

  return (
    <div className="sticky top-0 z-50 bg-background backdrop-blur shadow">
      <header className="container mx-auto flex items-center justify-between py-4 px-6 text-foreground">
        <div className="flex items-center gap-4">
          {user && (
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 rounded-full bg-accent flex items-center justify-center font-bold text-lg text-accent-foreground">
                {user.name.charAt(0).toUpperCase()}
              </div>
              <span className="font-medium text-lg">
                {t("welcome")}, {user.name}!
              </span>
            </div>
          )}
        </div>
        <div className="flex items-center">
          <NavigationMenu className="hidden md:block">
            <NavigationMenuList className="flex space-x-6">
              <NavigationItems />
            </NavigationMenuList>
          </NavigationMenu>
          <button
            aria-label="Toggle Menu"
            onClick={toggleMenu}
            className="md:hidden ml-4 focus:outline-none text-foreground"
          >
            <Menu size={28} />
          </button>
        </div>
      </header>

      {isMenuOpen && (
        <MenuOverlay toggleMenu={toggleMenu}>
          <nav>
            <ul className="space-y-4">
              <NavigationItems isMobile />
            </ul>
          </nav>
        </MenuOverlay>
      )}
    </div>
  );
};

export default Header;
