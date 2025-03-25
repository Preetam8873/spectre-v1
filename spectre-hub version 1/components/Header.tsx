"use client"

import { useState } from "react"
import Link from "next/link"
import { Search, Moon, Sun } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { useMediaQuery } from "@/hooks/use-media-query"
import ProfileButton from "@/components/ProfileButton"

interface HeaderProps {
  onSearch?: (query: string) => void
  isDarkMode: boolean
  toggleTheme: () => void
}

export default function Header({ onSearch, isDarkMode, toggleTheme }: HeaderProps) {
  const [searchQuery, setSearchQuery] = useState("")
  const [isSearchOpen, setIsSearchOpen] = useState(false)
  const isMobile = useMediaQuery("(max-width: 768px)")

  const handleSearch = (e) => {
    e.preventDefault()
    if (onSearch) {
      onSearch(searchQuery)
    }
  }

  return (
    <header className="sticky top-0 z-10 bg-background border-b border-border">
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between gap-4">
          <Link href="/" className="text-2xl font-bold text-primary hover:text-primary/90 transition-colors">
            Spectre Hub
          </Link>

          {isMobile ? (
            <>
              <div className="flex items-center gap-2">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setIsSearchOpen(!isSearchOpen)}
                  aria-label="Toggle search"
                >
                  <Search className="h-5 w-5" />
                </Button>

                <Button
                  variant="ghost"
                  size="icon"
                  onClick={toggleTheme}
                  aria-label={isDarkMode ? "Switch to light mode" : "Switch to dark mode"}
                >
                  {isDarkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
                </Button>

                <ProfileButton />
              </div>

              {isSearchOpen && (
                <div className="absolute top-full left-0 right-0 p-2 bg-background border-b border-border">
                  <form onSubmit={handleSearch} className="flex gap-2">
                    <Input
                      type="search"
                      placeholder="Search videos..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-full"
                    />
                    <Button type="submit" size="sm">
                      Search
                    </Button>
                  </form>
                </div>
              )}
            </>
          ) : (
            <>
              <form onSubmit={handleSearch} className="flex-1 max-w-xl mx-4">
                <div className="relative">
                  <Input
                    type="search"
                    placeholder="Search videos..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-10 pr-4 py-2"
                  />
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                </div>
              </form>

              <div className="flex items-center gap-3">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={toggleTheme}
                  aria-label={isDarkMode ? "Switch to light mode" : "Switch to dark mode"}
                  className="relative overflow-hidden"
                >
                  <div className="absolute inset-0 opacity-0 transition-opacity duration-300 bg-primary/10 rounded-full scale-0 animate-ripple"></div>
                  {isDarkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
                </Button>

                <ProfileButton />
              </div>
            </>
          )}
        </div>
      </div>
    </header>
  )
}

