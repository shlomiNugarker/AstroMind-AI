import { useState } from "react";
import { Link } from "react-router-dom";
import {
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuItem,
} from "@/components/ui/navigation-menu";
import { Menu, X } from "lucide-react";
import { useTranslation } from "react-i18next";
import { LanguageToggle } from "./LanguageToggle";
import { useAuth } from "@/context/AuthContext";
import Logo from "./Logo";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { t, i18n } = useTranslation();
  const { user, logout } = useAuth();

  const toggleMenu = () => setIsMenuOpen((prev) => !prev);

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
  };

  const menuItems = [
    {
      label: t("home_page"),
      path: "/",
      roles: [""],
    },
    {
      label: t("admin_dashboard"),
      path: "/admin/users",
      roles: ["admin"],
    },
  ];

  const authItems = [
    {
      label: t("login_page"),
      path: "/login",
    },
    {
      label: t("register_page"),
      path: "/register",
    },
  ];

  const renderMenuItems = (isMobile: boolean = false) => (
    <>
      <li>
        <LanguageToggle changeLanguage={changeLanguage} />
      </li>
      {menuItems
        .filter((item) => user && item.roles.includes(user.role))
        .map((item, index) => (
          <NavigationMenuItem key={index} asChild>
            <li>
              <Link
                to={item.path}
                className={`text-lg transition-all duration-300 px-4 py-2 rounded-lg hover:bg-accent hover:text-accent-foreground truncate ${
                  isMobile ? "text-center w-full block" : ""
                }`}
              >
                {item.label}
              </Link>
            </li>
          </NavigationMenuItem>
        ))}

      {user ? (
        <NavigationMenuItem>
          <button
            onClick={logout}
            className="text-lg transition-all duration-300 px-4 py-2 rounded-lg hover:bg-destructive hover:text-destructive-foreground"
          >
            {t("logout")}
          </button>
        </NavigationMenuItem>
      ) : (
        authItems.map((item, index) => (
          <NavigationMenuItem key={index} asChild>
            <li>
              <Link
                to={item.path}
                className={`text-lg transition-all duration-300 px-4 py-2 rounded-lg hover:bg-accent hover:text-accent-foreground truncate ${
                  isMobile ? "text-center w-full block" : ""
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
    <div className="shadow-lg from-primary to-secondary sticky top-0 w-full z-10 backdrop-blur-lg">
      <header className="container mx-auto flex justify-between items-center p-6 text-foreground">
        {user && (
          <div className="flex items-center gap-3">
            <div className="flex items-center justify-center">
              <Logo className="h-[80px]" />
            </div>

            <div className="w-12 h-12 rounded-full bg-accent flex items-center justify-center font-bold text-lg text-accent-foreground">
              {user.name.charAt(0).toUpperCase()}
            </div>
            <span className="font-semibold text-lg truncate">
              {t("welcome")}, {user.name}!
            </span>
          </div>
        )}

        <button
          aria-label="Menu"
          onClick={toggleMenu}
          className="md:hidden focus:outline-none text-foreground"
        >
          {isMenuOpen ? (
            <X className="h-8 w-8" />
          ) : (
            <Menu className="h-8 w-8" />
          )}
        </button>

        <NavigationMenu dir={i18n.dir()} className="hidden md:flex">
          <NavigationMenuList className="flex gap-6">
            {renderMenuItems()}
          </NavigationMenuList>
        </NavigationMenu>
      </header>

      {isMenuOpen && (
        <div className="md:hidden text-secondary-foreground">
          <ul className="flex flex-col p-4 items-center justify-center">
            {renderMenuItems(true)}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Header;
