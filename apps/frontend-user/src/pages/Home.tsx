"use client";

import { useState } from "react";
import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import {
  Moon,
  Sun,
  Briefcase,
  Code,
  Search,
  Star,
  ChevronRight,
  Menu
} from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"

const jobs = [
  {
    id: 1,
    title: "Senior React Developer",
    company: "TechCorp",
    type: "Full-time",
    location: "Remote",
    skills: ["React", "TypeScript", "Node.js"],
  },
  {
    id: 2,
    title: "UX Designer",
    company: "DesignHub",
    type: "Contract",
    location: "Remote",
    skills: ["Figma", "User Research", "Prototyping"],
  },
  {
    id: 3,
    title: "DevOps Engineer",
    company: "CloudSys",
    type: "Full-time",
    location: "Remote",
    skills: ["AWS", "Docker", "Kubernetes"],
  },
];

const projects = [
  {
    id: 1,
    title: "E-commerce Website",
    budget: "$5000-$10000",
    duration: "2 months",
    skills: ["React", "Node.js", "MongoDB"],
  },
  {
    id: 2,
    title: "Mobile App Development",
    budget: "$10000-$20000",
    duration: "3 months",
    skills: ["React Native", "Firebase"],
  },
  {
    id: 3,
    title: "Data Visualization Dashboard",
    budget: "$3000-$5000",
    duration: "1 month",
    skills: ["D3.js", "React", "Python"],
  },
];

const testimonials = [
  {
    id: 1,
    name: "John Doe",
    role: "Freelance Developer",
    content:
      "RemoteWorkHub has been a game-changer for my career. I've found amazing projects and clients here.",
  },
  {
    id: 2,
    name: "Jane Smith",
    role: "Project Manager",
    content:
      "As an employer, I've hired top-notch talent through RemoteWorkHub. The quality of professionals here is outstanding.",
  },
  {
    id: 3,
    name: "Alex Johnson",
    role: "UI/UX Designer",
    content:
      "The platform is user-friendly and the support team is always helpful. I've recommended RemoteWorkHub to all my colleagues.",
  },
];

const blogPosts = [
  {
    id: 1,
    title: "10 Tips for Successful Remote Work",
    excerpt:
      "Learn how to stay productive and maintain work-life balance while working remotely.",
  },
  {
    id: 2,
    title: "The Future of Freelancing in 2024",
    excerpt:
      "Explore the trends and opportunities shaping the freelance landscape in the coming year.",
  },
  {
    id: 3,
    title: "Building a Strong Online Portfolio",
    excerpt:
      "Discover effective strategies to showcase your skills and attract more clients.",
  },
];



export default function HomePage() {
  const { theme, setTheme } = useTheme()
  const [selectedSkills, setSelectedSkills] = useState<string[]>([])

  const allSkills = Array.from(new Set([...jobs, ...projects].flatMap(item => item.skills)))

  const toggleSkill = (skill: string) => {
    setSelectedSkills(prev => 
      prev.includes(skill) ? prev.filter(s => s !== skill) : [...prev, skill]
    )
  }

  const filteredJobs = jobs.filter(job => 
    selectedSkills.length === 0 || selectedSkills.some(skill => job.skills.includes(skill))
  )

  const filteredProjects = projects.filter(project => 
    selectedSkills.length === 0 || selectedSkills.some(skill => project.skills.includes(skill))
  )

  return (
    <div className="min-h-screen bg-background text-foreground">
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

      <main className="container mx-auto px-4 py-8">
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

        {/* Featured Job/Project Section */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold mb-6 text-center">Featured Opportunities</h2>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {[1, 2, 3].map((_, index) => (
              <Card key={index}>
                <CardHeader>
                  <CardTitle>Senior Full Stack Developer</CardTitle>
                  <CardDescription>TechInnovate Inc. • Full-time • Remote</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="mb-4">Join our dynamic team and work on cutting-edge projects using the latest technologies.</p>
                  <div className="flex flex-wrap gap-2">
                    {["React", "Node.js", "AWS", "GraphQL"].map((skill) => (
                      <Badge key={skill} variant="secondary">{skill}</Badge>
                    ))}
                  </div>
                </CardContent>
                <CardFooter>
                  <Button className="w-full">Apply Now</Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </section>

        {/* Skills Filter */}
        <section className="mb-6">
          <h3 className="text-2xl font-bold mb-4 text-center">Filter by Skills</h3>
          <div className="flex flex-wrap justify-center gap-2">
            {allSkills.map((skill) => (
              <Badge
                key={skill}
                variant={selectedSkills.includes(skill) ? "default" : "outline"}
                className="cursor-pointer"
                onClick={() => toggleSkill(skill)}
              >
                {skill}
              </Badge>
            ))}
          </div>
        </section>

        <Tabs defaultValue="jobs" className="mb-12">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="jobs">Remote Jobs</TabsTrigger>
            <TabsTrigger value="projects">Freelance Projects</TabsTrigger>
          </TabsList>
          <TabsContent value="jobs">
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {filteredJobs.map((job) => (
                <Card key={job.id}>
                  <CardHeader>
                    <CardTitle>{job.title}</CardTitle>
                    <CardDescription>{job.company}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p><Briefcase className="inline mr-2 h-4 w-4" />{job.type}</p>
                    <p>{job.location}</p>
                    <div className="mt-2 flex flex-wrap gap-2">
                      {job.skills.map((skill) => (
                        <Badge key={skill} variant="secondary">{skill}</Badge>
                      ))}
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button className="w-full">Apply Now</Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </TabsContent>
          <TabsContent value="projects">
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {filteredProjects.map((project) => (
                <Card key={project.id}>
                  <CardHeader>
                    <CardTitle>{project.title}</CardTitle>
                    <CardDescription>{project.budget}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p><Code className="inline mr-2 h-4 w-4" />{project.duration}</p>
                    <div className="mt-2 flex flex-wrap gap-2">
                      {project.skills.map((skill) => (
                        <Badge key={skill} variant="secondary">{skill}</Badge>
                      ))}
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button className="w-full">Bid Now</Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>

        {/* How it Works Section */}
        <section className="mb-12 bg-muted p-8 rounded-lg">
          <h2 className="text-3xl font-bold mb-6 text-center">How It Works</h2>
          <div className="grid gap-8 md:grid-cols-3">
            {[
              { title: "Create Your Profile", description: "Sign up and showcase your skills and experience." },
              { title: "Explore Opportunities", description: "Browse through our curated list of remote jobs and projects." },
              { title: "Apply or Bid", description: "Submit your application or proposal with just a few clicks." },
            ].map((step, index) => (
              <div key={index} className="flex flex-col items-center text-center">
                <div className="w-12 h-12 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-xl font-bold mb-4">
                  {index + 1}
                </div>
                <h3 className="text-xl font-bold mb-2">{step.title}</h3>
                <p>{step.description}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Testimonials Section */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold mb-6 text-center">What Our Users Say</h2>
          <div className="grid gap-6 md:grid-cols-3">
            {testimonials.map((testimonial) => (
              <Card key={testimonial.id}>
                <CardHeader>
                  <CardTitle>{testimonial.name}</CardTitle>
                  <CardDescription>{testimonial.role}</CardDescription>
                </CardHeader>
                <CardContent>
                  <p>"{testimonial.content}"</p>
                </CardContent>
                <CardFooter>
                  <div className="flex">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star key={star} className="h-5 w-5 fill-primary text-primary" />
                    ))}
                  </div>
                </CardFooter>
              </Card>
            ))}
          </div>
        </section>

        {/* Newsletter Subscription */}
        <section className="mb-12 bg-muted p-8 rounded-lg">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-2xl font-bold mb-4">Stay Updated with Remote Opportunities</h2>
            <p className="mb-6">Subscribe to our newsletter and receive the latest remote jobs and projects directly in your inbox.</p>
            <form className="flex flex-col sm:flex-row gap-4 justify-center">
              <Input type="email" placeholder="Enter your email" className="max-w-xs w-full" />
              <Button type="submit" className="w-full sm:w-auto">Subscribe</Button>
            </form>
          </div>
        </section>

        {/* Recent Blog Posts */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold mb-6 text-center">Recent Blog Posts</h2>
          <div className="grid gap-6 md:grid-cols-3">
            {blogPosts.map((post) => (
              <Card key={post.id}>
                <CardHeader>
                  <CardTitle>{post.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p>{post.excerpt}</p>
                </CardContent>
                <CardFooter>
                  <Button variant="outline" className="w-full">
                    Read More <ChevronRight className="ml-2 h-4 w-4" />
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </section>

        <section className="text-center">
          <h2 className="text-3xl font-bold mb-6">Why Choose FreeMotely?</h2>
          <div className="grid gap-6 md:grid-cols-3">
            <Card>
              <CardHeader>
                <CardTitle>Curated Opportunities</CardTitle>
              </CardHeader>
              <CardContent>
                <p>We handpick the best remote jobs and freelance projects for you.</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Global Network</CardTitle>
              </CardHeader>
              <CardContent>
                <p>Connect with employers and clients from around the world.</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Secure Payments</CardTitle>
              </CardHeader>
              <CardContent>
                <p>Our platform ensures timely and secure payments for your work.</p>
              </CardContent>
            </Card>
          </div>
        </section>
      </main>

      <footer className="border-t mt-12">
        <div className="container mx-auto px-4 py-8">
          <div className="grid gap-8 md:grid-cols-4">
            <div>
              <h3 className="font-bold mb-4">FreeMotely</h3>
              <p>Find your next remote opportunity, anywhere in the world.</p>
            </div>
            <div>
              <h4 className="font-bold mb-4">For Job Seekers</h4>
              <ul className="space-y-2">
                <li><a href="/browse-jobs" className="hover:text-primary">Browse Jobs</a></li>
                <li><a href="/browse-projects" className="hover:text-primary">Browse Projects</a></li>
                <li><a href="/create-profile" className="hover:text-primary">Create Profile</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-4">For Employers</h4>
              <ul className="space-y-2">
                <li><a href="/post-job" className="hover:text-primary">Post a Job</a></li>
                <li><a href="/post-project" className="hover:text-primary">Post a Project</a></li>
                <li><a href="/browse-freelancers" className="hover:text-primary">Browse Freelancers</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-4">Connect</h4>
              <ul className="space-y-2">
                <li><a href="/about" className="hover:text-primary">About Us</a></li>
                <li><a href="/contact" className="hover:text-primary">Contact</a></li>
                <li><a href="/blog" className="hover:text-primary">Blog</a></li>
              </ul>
            </div>
          </div>
          <div className="mt-8 text-center text-sm">
            <p>&copy; 2024 FreeMotely. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
