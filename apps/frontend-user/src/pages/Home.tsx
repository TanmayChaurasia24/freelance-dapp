"use client";

import { useState } from "react";
import { Header } from "@/components/Header";
import { HeroSection } from "@/components/HeroSection";
import { FeaturedOpportunities } from "@/components/FeaturedOpportunities";
import { SkillsFilter } from "@/components/SkillsFilter";
import { JobsAndProjects } from "@/components/JobsAndProjects";
import { HowItWorks } from "@/components/HowItWorks";
import { Testimonials } from "@/components/Testimonials";
import { Newsletter } from "@/components/Newsletter";
import { BlogPosts } from "@/components/BlogPost";
import { WhyChooseUs } from "@/components/WhyChooseUs";
import { Footer } from "@/components/Footer";

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
  const [selectedSkills, setSelectedSkills] = useState<string[]>([]);
  const allSkills = Array.from(new Set([...jobs, ...projects].flatMap(item => item.skills)));

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <HeroSection />
        <FeaturedOpportunities />
        <SkillsFilter allSkills={allSkills} onSkillsChange={setSelectedSkills} />
        <JobsAndProjects jobs={jobs} projects={projects} selectedSkills={selectedSkills} />
        <HowItWorks />
        <Testimonials testimonials={testimonials} />
        <Newsletter />
        <BlogPosts blogPosts={blogPosts} />
        <WhyChooseUs />
      </main>
      <Footer />
    </div>
  )
}

