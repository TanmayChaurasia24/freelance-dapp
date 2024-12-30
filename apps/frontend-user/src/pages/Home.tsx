"use client";

import React, { useEffect } from "react";
import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Moon, Sun, Briefcase, Code, Search } from "lucide-react";
import Link from "next/link";

const jobs = [
  {
    id: 1,
    title: "Senior React Developer",
    company: "TechCorp",
    type: "Full-time",
    location: "Remote",
  },
  {
    id: 2,
    title: "UX Designer",
    company: "DesignHub",
    type: "Contract",
    location: "Remote",
  },
  {
    id: 3,
    title: "DevOps Engineer",
    company: "CloudSys",
    type: "Full-time",
    location: "Remote",
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

export default function HomePage() {
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    if (theme === undefined) {
      setTheme("light"); // Default theme if undefined
    }
  }, [theme, setTheme]);

  return (
    <>
      <div className="min-h-screen bg-background text-foreground">
        <header className="border-b">
          <div className="container mx-auto px-4 py-4 flex justify-between items-center">
            <a href="/" className="text-2xl font-bold">
              RemoteWorkHub
            </a>
            <nav className="hidden md:flex space-x-4">
              <a href="/jobs" className="hover:text-primary">
                Jobs
              </a>
              <a href="/projects" className="hover:text-primary">
                Projects
              </a>
              <a href="/post" className="hover:text-primary">
                Post a Job/Project
              </a>
            </nav>
            <div className="flex items-center space-x-4">
              <Button
                variant="outline"
                size="icon"
                onClick={() => setTheme(theme === "light" ? "dark" : "light")}
                aria-label="Toggle theme"
              >
                {theme === "light" ? (
                  <Moon className="h-4 w-4" />
                ) : (
                  <Sun className="h-4 w-4" />
                )}
              </Button>
              <Button className="hidden md:inline-flex">Sign In</Button>
            </div>
          </div>
        </header>

        <main className="container mx-auto px-4 py-8">
          <section className="text-center mb-12">
            <h1 className="text-4xl font-bold mb-4">
              Find Your Next Remote Opportunity
            </h1>
            <p className="text-xl mb-8">
              Discover remote jobs and freelance projects all in one place
            </p>
            <div className="flex flex-col sm:flex-row justify-center items-center space-y-4 sm:space-y-0 sm:space-x-4">
              <Input
                className="max-w-xs"
                placeholder="Search jobs or projects"
              />
              <Button>
                <Search className="mr-2 h-4 w-4" />
                Search
              </Button>
            </div>
          </section>

          <Tabs defaultValue="jobs" className="mb-12">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="jobs">Remote Jobs</TabsTrigger>
              <TabsTrigger value="projects">Freelance Projects</TabsTrigger>
            </TabsList>
            <TabsContent value="jobs">
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {jobs.map((job) => (
                  <Card key={job.id}>
                    <CardHeader>
                      <CardTitle>{job.title}</CardTitle>
                      <CardDescription>{job.company}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <p>
                        <Briefcase className="inline mr-2 h-4 w-4" />
                        {job.type}
                      </p>
                      <p>{job.location}</p>
                    </CardContent>
                    <CardFooter>
                      <Button>Apply Now</Button>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            </TabsContent>
            <TabsContent value="projects">
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {projects.map((project) => (
                  <Card key={project.id}>
                    <CardHeader>
                      <CardTitle>{project.title}</CardTitle>
                      <CardDescription>{project.budget}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <p>
                        <Code className="inline mr-2 h-4 w-4" />
                        {project.duration}
                      </p>
                      <p>Skills: {project.skills.join(", ")}</p>
                    </CardContent>
                    <CardFooter>
                      <Button>Bid Now</Button>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            </TabsContent>
          </Tabs>

          <section className="text-center">
            <h2 className="text-3xl font-bold mb-4">
              Why Choose RemoteWorkHub?
            </h2>
            <div className="grid gap-6 md:grid-cols-3">
              <Card>
                <CardHeader>
                  <CardTitle>Curated Opportunities</CardTitle>
                </CardHeader>
                <CardContent>
                  <p>
                    We handpick the best remote jobs and freelance projects for
                    you.
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>Global Network</CardTitle>
                </CardHeader>
                <CardContent>
                  <p>
                    Connect with employers and clients from around the world.
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>Secure Payments</CardTitle>
                </CardHeader>
                <CardContent>
                  <p>
                    We ensure secure payments for freelancers and job seekers.
                  </p>
                </CardContent>
              </Card>
            </div>
          </section>
        </main>

        <footer className="border-t py-4">
          <div className="container mx-auto px-4 flex justify-between items-center">
            <p>&copy; 2024 RemoteWorkHub</p>
            <div className="space-x-4">
              <Link href="/about">About</Link>
              <Link href="/contact">Contact</Link>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
}
