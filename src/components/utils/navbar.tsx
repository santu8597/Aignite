"use client"

import { useState } from "react"
import { ConnectButton } from "@rainbow-me/rainbowkit"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ModeToggle } from "@/components/utils/mode-toggle"
import { ChevronDown, HandCoins, Menu, X } from "lucide-react"

export function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [mobileExpandedMenu, setMobileExpandedMenu] = useState<string | null>(null)

  const toggleMobileSubmenu = (menu: string) => {
    setMobileExpandedMenu(mobileExpandedMenu === menu ? null : menu)
  }

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 items-center justify-between">
        <div className="flex items-center gap-2">
          {/* Mobile Menu Button */}
          <Button variant="ghost" size="icon" className="md:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>

          {/* Logo - Always visible */}
          <Link href="/" className="flex items-center space-x-2 transition-opacity hover:opacity-80">
          <HandCoins className="h-6 w-6 text-rose-500" />
            <span className="font-rubik text-xl font-bold">FundRise</span>
          </Link>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden flex-1 items-center space-x-6 text-sm font-medium md:flex md:ml-4 ">
        <Link href="#features" className="text-sm font-medium transition-colors hover:text-foreground/80">
              Features
            </Link>
            <Link href="#how-it-works" className="text-sm font-medium transition-colors hover:text-foreground/80">
              How It Works
            </Link>
            <Link href="#testimonials" className="text-sm font-medium transition-colors hover:text-foreground/80">
              Success Stories
            </Link>
            <Link href="#faq" className="text-sm font-medium transition-colors hover:text-foreground/80">
              FAQ
            </Link>

          {/* Dashboard Dropdown */}
         

          {/* Organ Dropdown */}
         

          
        </nav>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="absolute left-0 top-14 w-full bg-background md:hidden border-b">
            <div className="container py-4 space-y-4">
              

              
              

              

              <Link href="#features" className="block transition-colors hover:text-primary duration-200">
              Features
            </Link>
            <Link href="#how-it-works" className="block transition-colors hover:text-primary duration-200">
              How It Works
            </Link>
            <Link href="#testimonials" className="block transition-colors hover:text-primary duration-200">
              Success Stories
            </Link>
            <Link href="#faq" className="block transition-colors hover:text-primary duration-200">
              FAQ
            </Link>
            
            </div>
          </div>
        )}

        {/* Right Side Controls */}
        <div className="flex items-center space-x-4">
          

          <ConnectButton
            accountStatus={{
              smallScreen: "avatar",
              largeScreen: "avatar",
            }}
            chainStatus="icon"
            showBalance={false}
          />
        </div>
      </div>
    </header>
  )
}

