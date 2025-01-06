'use client'

import React, { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Pencil, MapPin, Briefcase, School, Home, Bell, MessageSquare, User, Search } from 'lucide-react'
import { Header } from '@/components/Header'

export default function ProfilePage() {
  const [isEditing, setIsEditing] = useState<Record<string, boolean>>({
    summary: false,
    about: false,
    experience: false,
    education: false,
    skills: false,
  })

  const [profile, setProfile] = useState({
    name: "John Doe",
    title: "Software Engineer",
    location: "San Francisco Bay Area",
    about: "Passionate software engineer with 5+ years of experience in developing scalable web applications. Skilled in JavaScript, React, Node.js, and cloud technologies. Always eager to learn and tackle new challenges.",
    experiences: [
      {
        title: "Senior Software Engineer",
        company: "Tech Company",
        duration: "2020 - Present",
        description: "Leading development of scalable web applications using React and Node.js."
      },
      {
        title: "Software Engineer",
        company: "Startup Inc.",
        duration: "2018 - 2020",
        description: "Developed and maintained full-stack applications using JavaScript technologies."
      }
    ],
    education: [
      {
        degree: "Master of Science in Computer Science",
        school: "University of Technology",
        duration: "2016 - 2018"
      },
      {
        degree: "Bachelor of Science in Computer Science",
        school: "State University",
        duration: "2012 - 2016"
      }
    ],
    skills: ["JavaScript", "React", "Node.js", "TypeScript", "GraphQL", "AWS", "Docker", "Git", "Agile Methodologies"]
  })

  const [newSkill, setNewSkill] = useState("")

  const toggleEdit = (section: string) => {
    setIsEditing(prev => ({ ...prev, [section]: !prev[section] }))
  }

  const handleSave = (section: string) => {
    // In a real application, you would send this data to your backend
    setIsEditing(prev => ({ ...prev, [section]: false }))
  }

  const updateProfile = (section: string, value: any) => {
    setProfile(prev => ({ ...prev, [section]: value }))
  }

  const addSkill = () => {
    if (newSkill && !profile.skills.includes(newSkill)) {
      setProfile(prev => ({ ...prev, skills: [...prev.skills, newSkill] }))
      setNewSkill("")
    }
  }

  const removeSkill = (skillToRemove: string) => {
    setProfile(prev => ({
      ...prev,
      skills: prev.skills.filter(skill => skill !== skillToRemove)
    }))
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <Header/>

      <main className="container mx-auto w-[50vw] px-4 py-8">
        <Card className="mb-6">
          <CardContent className="pt-6">
            <div className="flex justify-end mb-4">
              <Button variant="ghost" size="icon" onClick={() => toggleEdit('summary')}>
                <Pencil size={16} />
              </Button>
            </div>
            <div className="flex flex-col md:flex-row items-center md:items-start">
              <img src="/placeholder.svg?height=150&width=150" alt="Profile" className="rounded-full w-32 h-32 mb-4 md:mb-0 md:mr-6" />
              <div className="text-center md:text-left flex-grow">
                {isEditing.summary ? (
                  <div className="space-y-2">
                    <Input 
                      value={profile.name} 
                      onChange={(e) => updateProfile('name', e.target.value)}
                      placeholder="Name"
                    />
                    <Input 
                      value={profile.title} 
                      onChange={(e) => updateProfile('title', e.target.value)}
                      placeholder="Title"
                    />
                    <Input 
                      value={profile.location} 
                      onChange={(e) => updateProfile('location', e.target.value)}
                      placeholder="Location"
                    />
                  </div>
                ) : (
                  <>
                    <h1 className="text-2xl font-bold mb-2">{profile.name}</h1>
                    <p className="text-gray-600 mb-2">{profile.title}</p>
                    <p className="text-gray-500 mb-4 flex items-center justify-center md:justify-start">
                      <MapPin size={16} className="mr-1" /> {profile.location}
                    </p>
                  </>
                )}
                <div className="flex flex-wrap justify-center md:justify-start gap-2 mb-4">
                  <Button variant="outline">Connect</Button>
                  <Button variant="outline">Message</Button>
                  <Button variant="outline">More</Button>
                </div>
              </div>
            </div>
            {isEditing.summary && (
              <div className="mt-4 flex justify-end space-x-2">
                <Button variant="outline" onClick={() => toggleEdit('summary')}>Cancel</Button>
                <Button onClick={() => handleSave('summary')}>Save</Button>
              </div>
            )}
          </CardContent>
        </Card>

        <Card className="mb-6">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>About</CardTitle>
            <Button variant="ghost" size="icon" onClick={() => toggleEdit('about')}>
              <Pencil size={16} />
            </Button>
          </CardHeader>
          <CardContent>
            {isEditing.about ? (
              <div>
                <Textarea 
                  value={profile.about} 
                  onChange={(e) => updateProfile('about', e.target.value)}
                  rows={4}
                />
                <div className="mt-4 flex justify-end space-x-2">
                  <Button variant="outline" onClick={() => toggleEdit('about')}>Cancel</Button>
                  <Button onClick={() => handleSave('about')}>Save</Button>
                </div>
              </div>
            ) : (
              <p>{profile.about}</p>
            )}
          </CardContent>
        </Card>

        <Card className="mb-6">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>Experience</CardTitle>
            <Button variant="ghost" size="icon" onClick={() => toggleEdit('experience')}>
              <Pencil size={16} />
            </Button>
          </CardHeader>
          <CardContent>
            {profile.experiences.map((exp, index) => (
              <div key={index} className={index > 0 ? "mt-4" : ""}>
                {isEditing.experience ? (
                  <>
                    <Input 
                      value={exp.title} 
                      onChange={(e) => {
                        const newExperiences = [...profile.experiences]
                        newExperiences[index].title = e.target.value
                        updateProfile('experiences', newExperiences)
                      }}
                      className="mb-2"
                      placeholder="Job Title"
                    />
                    <Input 
                      value={exp.company} 
                      onChange={(e) => {
                        const newExperiences = [...profile.experiences]
                        newExperiences[index].company = e.target.value
                        updateProfile('experiences', newExperiences)
                      }}
                      className="mb-2"
                      placeholder="Company"
                    />
                    <Input 
                      value={exp.duration} 
                      onChange={(e) => {
                        const newExperiences = [...profile.experiences]
                        newExperiences[index].duration = e.target.value
                        updateProfile('experiences', newExperiences)
                      }}
                      className="mb-2"
                      placeholder="Duration"
                    />
                    <Textarea 
                      value={exp.description} 
                      onChange={(e) => {
                        const newExperiences = [...profile.experiences]
                        newExperiences[index].description = e.target.value
                        updateProfile('experiences', newExperiences)
                      }}
                      placeholder="Description"
                    />
                  </>
                ) : (
                  <>
                    <h3 className="text-lg font-semibold">{exp.title}</h3>
                    <p className="text-gray-600">{exp.company}</p>
                    <p className="text-gray-500 text-sm">{exp.duration}</p>
                    <p className="mt-2">{exp.description}</p>
                  </>
                )}
              </div>
            ))}
            {isEditing.experience && (
              <div className="mt-4 flex justify-end space-x-2">
                <Button variant="outline" onClick={() => toggleEdit('experience')}>Cancel</Button>
                <Button onClick={() => handleSave('experience')}>Save</Button>
              </div>
            )}
          </CardContent>
        </Card>

        <Card className="mb-6">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>Education</CardTitle>
            <Button variant="ghost" size="icon" onClick={() => toggleEdit('education')}>
              <Pencil size={16} />
            </Button>
          </CardHeader>
          <CardContent>
            {profile.education.map((edu, index) => (
              <div key={index} className={index > 0 ? "mt-4" : ""}>
                {isEditing.education ? (
                  <>
                    <Input 
                      value={edu.degree} 
                      onChange={(e) => {
                        const newEducation = [...profile.education]
                        newEducation[index].degree = e.target.value
                        updateProfile('education', newEducation)
                      }}
                      className="mb-2"
                      placeholder="Degree"
                    />
                    <Input 
                      value={edu.school} 
                      onChange={(e) => {
                        const newEducation = [...profile.education]
                        newEducation[index].school = e.target.value
                        updateProfile('education', newEducation)
                      }}
                      className="mb-2"
                      placeholder="School"
                    />
                    <Input 
                      value={edu.duration} 
                      onChange={(e) => {
                        const newEducation = [...profile.education]
                        newEducation[index].duration = e.target.value
                        updateProfile('education', newEducation)
                      }}
                      placeholder="Duration"
                    />
                  </>
                ) : (
                  <>
                    <h3 className="text-lg font-semibold">{edu.degree}</h3>
                    <p className="text-gray-600">{edu.school}</p>
                    <p className="text-gray-500 text-sm">{edu.duration}</p>
                  </>
                )}
              </div>
            ))}
            {isEditing.education && (
              <div className="mt-4 flex justify-end space-x-2">
                <Button variant="outline" onClick={() => toggleEdit('education')}>Cancel</Button>
                <Button onClick={() => handleSave('education')}>Save</Button>
              </div>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>Skills</CardTitle>
            <Button variant="ghost" size="icon" onClick={() => toggleEdit('skills')}>
              <Pencil size={16} />
            </Button>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2 mb-4">
              {profile.skills.map((skill, index) => (
                <Badge key={index} variant="secondary">
                  {skill}
                  {isEditing.skills && (
                    <button 
                      className="ml-2 text-red-500"
                      onClick={() => removeSkill(skill)}
                    >
                      ×
                    </button>
                  )}
                </Badge>
              ))}
            </div>
            {isEditing.skills && (
              <div className="mt-4">
                <div className="flex gap-2 mb-4">
                  <Input 
                    value={newSkill}
                    onChange={(e) => setNewSkill(e.target.value)}
                    placeholder="Add a new skill"
                  />
                  <Button onClick={addSkill}>Add</Button>
                </div>
                <div className="flex justify-end space-x-2">
                  <Button variant="outline" onClick={() => toggleEdit('skills')}>Cancel</Button>
                  <Button onClick={() => handleSave('skills')}>Save</Button>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </main>
    </div>
  )
}

