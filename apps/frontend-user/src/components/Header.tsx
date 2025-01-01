import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Moon, Sun, Menu } from 'lucide-react';

export function Header() {
  const { theme, setTheme } = useTheme()

  return (
    <header className="border-b sticky top-0 z-50 bg-background">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <a href="/" className="text-2xl font-bold">FreeMotely</a>
        <nav className="hidden md:flex space-x-4">
          <a href="/jobs" className="hover:text-primary">Jobs</a>
          <a href="/projects" className="hover:text-primary">Projects</a>
          <a href="/post" className="hover:text-primary">Post a Job/Project</a>
        </nav>
        <div className="flex items-center space-x-4">
          <Button
            variant="outline"
            size="icon"
            onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
          >
            {theme === 'light' ? <Moon className="h-4 w-4" /> : <Sun className="h-4 w-4" />}
            <span className="sr-only">Toggle theme</span>
          </Button>
          <Button className="hidden md:inline-flex">Sign In</Button>
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline" size="icon" className="md:hidden">
                <Menu className="h-4 w-4" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right">
              <nav className="flex flex-col space-y-4">
                <a href="/jobs" className="hover:text-primary">Jobs</a>
                <a href="/projects" className="hover:text-primary">Projects</a>
                <a href="/post" className="hover:text-primary">Post a Job/Project</a>
                <Button>Sign In</Button>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  )
}
