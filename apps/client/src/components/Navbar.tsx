'use client'

import { useState } from 'react'
import Link from 'next/link'

export default function NavbarDropdown() {
  const [dropdownOpen, setDropdownOpen] = useState(false)

  return (
    <nav className="bg-white shadow p-4 flex justify-between items-center">
      <div className="max-w-screen-lg m-auto flex justify-between w-full items-center">
        <Link href="/" className="text-xl font-bold">
          Tienda Online
        </Link>

        <div className="relative">
          <button
            className="flex items-center space-x-1 text-gray-700 hover:text-black"
            onClick={() => setDropdownOpen((prev) => !prev)}
          >
            <span>Menu</span>
          </button>

          {dropdownOpen && (
            <div
              className="absolute right-0 mt-2 w-48 bg-white border border-slate-200 rounded shadow-md z-10"
              onClick={() => setDropdownOpen(false)}
            >
              <Link href="/" className="block px-4 py-2 hover:bg-gray-100">
                Página principal
              </Link>
              <Link href="/products" className="block px-4 py-2 hover:bg-gray-100">
                Productos
              </Link>
              <Link href="/products/create" className="block px-4 py-2 hover:bg-gray-100">
                Crear producto
              </Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  )
}
