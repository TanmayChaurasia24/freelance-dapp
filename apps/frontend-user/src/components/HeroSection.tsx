import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search } from 'lucide-react';

export function HeroSection() {
  return (
    <section className="text-center mb-12">
      <h1 className="text-4xl font-bold mb-4">Find Your Next Remote Opportunity</h1>
      <p className="text-xl mb-8">Discover remote jobs and freelance projects all in one place</p>
      <div className="flex flex-col sm:flex-row justify-center items-center space-y-4 sm:space-y-0 sm:space-x-4">
        <Input className="max-w-xs w-full" placeholder="Search jobs or projects" />
        <Button className="w-full sm:w-auto">
          <Search className="mr-2 h-4 w-4" /> Search
        </Button>
      </div>
    </section>
  )
}

