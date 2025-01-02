import { Header } from "@/components/Header"
import { Footer } from "@/components/Footer"
import { ProfileBasicInfo } from "@/components/ProfileBasicInfo"
import { ResumeUpload } from "@/components/ResumeUpload"
import { ProfileExperience } from "@/components/ProfileExperience"
import { ProfileEducation } from "@/components/ProfileEducation"
import { ProfileProjects } from "@/components/ProfileProjects"

// This would typically come from your API or database
const mockUser = {
  name: "John Doe",
  email: "john@example.com",
  username: "johndoe",
  bio: "Passionate developer with 5 years of experience in web technologies.",
  skills: ["React", "Node.js", "TypeScript", "GraphQL"],
  profilepic: "/placeholder.svg?height=128&width=128",
}

const mockExperiences = [
  {
    id: "1",
    title: "Senior Frontend Developer",
    company: "Tech Corp",
    startDate: "Jan 2020",
    endDate: "Present",
    description: "Leading the frontend team in developing cutting-edge web applications.",
  },
  {
    id: "2",
    title: "Frontend Developer",
    company: "Web Solutions Inc",
    startDate: "Jun 2017",
    endDate: "Dec 2019",
    description: "Developed responsive web applications using React and Redux.",
  },
]

const mockEducation = [
  {
    id: "1",
    school: "University of Technology",
    degree: "Bachelor of Science",
    fieldOfStudy: "Computer Science",
    startDate: "Sep 2013",
    endDate: "Jun 2017",
  },
]

const mockProjects = [
  {
    id: "1",
    title: "E-commerce Platform",
    description: "Developed a full-stack e-commerce platform using React, Node.js, and MongoDB.",
    url: "https://github.com/johndoe/ecommerce-platform",
  },
  {
    id: "2",
    title: "Weather App",
    description: "Created a weather application using React and OpenWeatherMap API.",
    url: "https://github.com/johndoe/weather-app",
  },
]

export default function ProfilePage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <div className="space-y-12 flex flex-col justify-center items-center">
          <ProfileBasicInfo user={mockUser} />
          <ResumeUpload currentResume="john_doe_resume.pdf" />
          <ProfileExperience experiences={mockExperiences} />
          <ProfileEducation education={mockEducation} />
          <ProfileProjects projects={mockProjects} />
        </div>
      </main>
      <Footer />
    </div>
  )
}

