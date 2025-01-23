"use client"

import type React from "react"
import { useState } from "react"
import { Button } from "../components/ui/button"
import { Input } from "../components/ui/input"
import { Textarea } from "../components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../components/ui/tabs"
import { Home, FileText, Briefcase } from "lucide-react"

type Blog = {
  id: number
  title: string
  content: string
}

type Job = {
  id: number
  title: string
  description: string
}

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState("blogs")
  const [blogs, setBlogs] = useState<Blog[]>([])
  const [jobs, setJobs] = useState<Job[]>([])
  const [blogTitle, setBlogTitle] = useState("")
  const [blogContent, setBlogContent] = useState("")
  const [jobTitle, setJobTitle] = useState("")
  const [jobDescription, setJobDescription] = useState("")

  const handleAddBlog = (e: React.FormEvent) => {
    e.preventDefault()
    const newBlog: Blog = {
      id: Date.now(),
      title: blogTitle,
      content: blogContent,
    }
    setBlogs([...blogs, newBlog])
    setBlogTitle("")
    setBlogContent("")
  }

  const handleAddJob = (e: React.FormEvent) => {
    e.preventDefault()
    const newJob: Job = {
      id: Date.now(),
      title: jobTitle,
      description: jobDescription,
    }
    setJobs([...jobs, newJob])
    setJobTitle("")
    setJobDescription("")
  }

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <div className="w-64 bg-white shadow-md">
        <div className="p-6">
          <h1 className="text-2xl font-bold">Dashboard</h1>
        </div>
        <nav className="mt-6">
          {[
            { name: "Dashboard", icon: Home },
            { name: "Blogs", icon: FileText },
            { name: "Jobs", icon: Briefcase },
          ].map((item) => (
            <button
              key={item.name}
              onClick={() => setActiveTab(item.name.toLowerCase())}
              className={`flex items-center w-full px-6 py-3 text-gray-700 hover:bg-gray-100 ${
                activeTab === item.name.toLowerCase() ? "bg-gray-100" : ""
              }`}
            >
              <item.icon className="mr-3 h-5 w-5" />
              {item.name}
            </button>
          ))}
        </nav>
      </div>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto p-8">
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList>
            <TabsTrigger value="dashboard">Dashboard</TabsTrigger>
            <TabsTrigger value="blogs">Blogs</TabsTrigger>
            <TabsTrigger value="jobs">Jobs</TabsTrigger>
          </TabsList>
          <TabsContent value="dashboard">
            <h2 className="text-2xl font-bold mb-4">Welcome to your Dashboard</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Card>
                <CardHeader>
                  <CardTitle>Total Blogs</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-4xl font-bold">{blogs.length}</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>Total Jobs</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-4xl font-bold">{jobs.length}</p>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
          <TabsContent value="blogs">
            <h2 className="text-2xl font-bold mb-4">Manage Blogs</h2>
            <Card className="mb-6">
              <CardHeader>
                <CardTitle>Add New Blog</CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleAddBlog} className="space-y-4">
                  <Input
                    placeholder="Blog Title"
                    value={blogTitle}
                    onChange={(e) => setBlogTitle(e.target.value)}
                    required
                  />
                  <Textarea
                    placeholder="Blog Content"
                    value={blogContent}
                    onChange={(e) => setBlogContent(e.target.value)}
                    required
                    rows={5}
                  />
                  <Button type="submit">Add Blog</Button>
                </form>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Your Blogs</CardTitle>
              </CardHeader>
              <CardContent>
                {blogs.map((blog) => (
                  <div key={blog.id} className="mb-4 p-4 border rounded">
                    <h3 className="text-lg font-semibold">{blog.title}</h3>
                    <p className="text-gray-600">{blog.content}</p>
                  </div>
                ))}
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="jobs">
            <h2 className="text-2xl font-bold mb-4">Manage Job Openings</h2>
            <Card className="mb-6">
              <CardHeader>
                <CardTitle>Add New Job Opening</CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleAddJob} className="space-y-4">
                  <Input
                    placeholder="Job Title"
                    value={jobTitle}
                    onChange={(e) => setJobTitle(e.target.value)}
                    required
                  />
                  <Textarea
                    placeholder="Job Description"
                    value={jobDescription}
                    onChange={(e) => setJobDescription(e.target.value)}
                    required
                    rows={5}
                  />
                  <Button type="submit">Add Job Opening</Button>
                </form>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Current Job Openings</CardTitle>
              </CardHeader>
              <CardContent>
                {jobs.map((job) => (
                  <div key={job.id} className="mb-4 p-4 border rounded">
                    <h3 className="text-lg font-semibold">{job.title}</h3>
                    <p className="text-gray-600">{job.description}</p>
                  </div>
                ))}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  )
}

