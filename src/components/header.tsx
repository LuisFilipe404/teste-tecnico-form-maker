'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState } from 'react'

export default function Header() {
  const pathname = usePathname()
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <header className="border-gray-border fixed z-30 mb-8 flex h-[72px] w-full items-center justify-between border-b bg-white px-6 py-4 lg:px-20">
      <div>
        <h1 className="text-black-text text-xl font-semibold">
          Criador De Formulários
        </h1>
      </div>

      <button
        onClick={() => setMenuOpen(!menuOpen)}
        className="focus:outline-none lg:hidden"
        aria-label="Toggle Menu"
      >
        <svg
          className="h-6 w-6 text-gray-700"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d={menuOpen ? 'M6 18L18 6M6 6l12 12' : 'M4 6h16M4 12h16M4 18h16'}
          />
        </svg>
      </button>

      <nav
        className={`text-gray-text absolute top-[72px] left-0 w-full flex-col items-center gap-6 bg-white px-6 py-4 font-medium shadow-md transition-all lg:static lg:flex lg:w-auto lg:flex-row lg:gap-6 lg:shadow-none ${
          menuOpen ? 'flex' : 'hidden'
        }`}
      >
        <Link
          href="/"
          data-active={pathname === '/'}
          className="data-[active=true]:text-primary-600 transition-colors"
        >
          Home
        </Link>
        <Link
          data-active={pathname === '/create'}
          className="data-[active=true]:text-primary-600 transition-colors"
          href="/create"
        >
          Criar Formulário
        </Link>
      </nav>

      <div className="hidden w-[212px] lg:block"></div>
    </header>
  )
}
