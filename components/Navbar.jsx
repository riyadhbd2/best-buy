"use client";
import { useState, useRef, useEffect } from "react";
import { assets } from "@/assets/assets";
import { useAppContext } from "@/context/AppContext";
import Image from "next/image";
import Link from "next/link";
import { BsCartCheck } from "react-icons/bs";
import SearchBar from "./Search";

const Navbar = () => {
  const { isSeller, router } = useAppContext();
  const user = true; // Replace with actual user state
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const menuRef = useRef(null);

  // Close dropdown on outside click (mobile)
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setMobileMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <nav className="flex items-center justify-between px-6 md:px-16 lg:px-32 py-3 border-b border-gray-300 text-gray-700">
      {/* Left: Logo */}
      <div className="w-1/3">
        <Image
          className="cursor-pointer w-28 md:w-32"
          onClick={() => router.push("/")}
          src={assets.logo}
          alt="logo"
          width={128}
          height={40}
        />
      </div>

      {/* Center: Nav Links (Desktop only) */}
      <div className="flex items-center gap-4 lg:gap-8 max-md:hidden w-1/3">
        <Link href="/" className="hover:text-gray-900 transition">Home</Link>
        <Link href="/all-products" className="hover:text-gray-900 transition">Shop</Link>
        <Link href="/" className="hover:text-gray-900 transition">About Us</Link>
        <Link href="/" className="hover:text-gray-900 transition">Contact</Link>

        {isSeller && (
          <button
            onClick={() => router.push("/seller")}
            className="text-xs border px-4 py-1.5 rounded-full"
          >
            Seller Dashboard
          </button>
        )}
      </div>

      {/* Right: Icons & User */}
      <div>
        {/* Desktop view */}
        <ul className="hidden md:flex items-center gap-4">
          <SearchBar />

          {user ? (
            <>
              <BsCartCheck
                onClick={() => router.push("/cart")}
                className="text-xl cursor-pointer"
              />

              {/* Hover-based Dropdown for Desktop */}
              <div className="relative group">
                <button className="flex items-center gap-2 hover:text-gray-900 transition">
                  <Image
                    src={assets.user_icon}
                    alt="user icon"
                    width={20}
                    height={20}
                  />
                </button>

                <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border opacity-0 group-hover:opacity-100 invisible group-hover:visible transition-all duration-200 z-50">
                  <ul className="py-1">
                    <li>
                      <Link
                        href="/my-account"
                        className="block px-4 py-2 hover:bg-gray-100 text-sm text-gray-700"
                      >
                        My Account
                      </Link>
                    </li>
                    <li>
                      <Link
                        href="/my-orders"
                        className="block px-4 py-2 hover:bg-gray-100 text-sm text-gray-700"
                      >
                        My Orders
                      </Link>
                    </li>
                    <li>
                      <button
                        onClick={() => alert("Logging out...")}
                        className="w-full text-left px-4 py-2 hover:bg-gray-100 text-sm text-gray-700"
                      >
                        Logout
                      </button>
                    </li>
                  </ul>
                </div>
              </div>
            </>
          ) : (
            <p onClick={() => router.push("/login")} className="cursor-pointer">
              Login
            </p>
          )}
        </ul>

        {/* Mobile view */}
        <div className="flex items-center md:hidden gap-3" ref={menuRef}>
          {isSeller && (
            <button
              onClick={() => router.push("/seller")}
              className="text-xs border px-4 py-1.5 rounded-full"
            >
              Seller Dashboard
            </button>
          )}

          {user ? (
            <>
              <BsCartCheck
                onClick={() => router.push("/cart")}
                className="text-xl cursor-pointer"
              />

              {/* Click-based Dropdown for Mobile */}
              <button
                onClick={() => setMobileMenuOpen((prev) => !prev)}
                className="flex items-center gap-2 hover:text-gray-900 transition"
              >
                <Image
                  src={assets.user_icon}
                  alt="user icon"
                  width={20}
                  height={20}
                />
              </button>

              {mobileMenuOpen && (
                <div className="absolute right-4 top-16 w-48 bg-white rounded-lg shadow-lg border z-50">
                  <ul className="py-1">
                    <li>
                      <Link
                        href="/my-account"
                        className="block px-4 py-2 hover:bg-gray-100 text-sm text-gray-700"
                      >
                        My Account
                      </Link>
                    </li>
                    <li>
                      <Link
                        href="/orders"
                        className="block px-4 py-2 hover:bg-gray-100 text-sm text-gray-700"
                      >
                        My Orders
                      </Link>
                    </li>
                    <li>
                      <button
                        onClick={() => {
                          setMobileMenuOpen(false);
                          alert("Logging out...");
                        }}
                        className="w-full text-left px-4 py-2 hover:bg-gray-100 text-sm text-gray-700"
                      >
                        Logout
                      </button>
                    </li>
                  </ul>
                </div>
              )}
            </>
          ) : (
            <p onClick={() => router.push("/login")} className="cursor-pointer">
              Login
            </p>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
