'use client'

import { useEffect, useState } from 'react'
import axios from 'axios'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Pencil, MapPin } from 'lucide-react'
import { Header } from '@/components/Header'
import toast from 'react-hot-toast'
import Cookies from 'js-cookie'

interface UserProfile {
  name: string;
  title: string;
  email: string;
  bio: string;
  skills: string[];
  location: {
      country: string;
      state: string;
      city: string;
  };
  education: {
      degree: string;
      school: string;
      duration: string;
  }[];
  experience: {
      position: string;
      company: string;
      duration: string;
      description: string;
  }[];
  socialLinks: {
      linkedin: string;
      github: string;
      portfolio: string;
  };
}


export default function ProfilePage() {
  const [isEditing, setIsEditing] = useState<Record<string, boolean>>({
    summary: false,
    about: false,
    experience: false,
    education: false,
    skills: false,
    socialLinks: false
  })

  const [profile, setProfile] = useState({
    name: "",
    title: "",
    email: "",
    bio: "",
    skills: [] as string[],
    location: {
      country: "",
      state: "",
      city: ""
    },
    education: [] as { degree: string; school: string; duration: string }[],
    experience: [] as { company: string; position: string; duration: string; description: string }[],
    socialLinks: {
      linkedin: "",
      github: "",
      portfolio: ""
    }
  })

  const [newSkill, setNewSkill] = useState("")

  const toggleEdit = (section: string) => {
    setIsEditing(prev => ({ ...prev, [section]: !prev[section] }))
  }

  const handleSave = async (section: string) => {
    try {
      const userToken = Cookies.get("User");
      if (!userToken) {
        toast.error("User token not found. Please log in again.");
        return;
      }

      const response = await axios.put("http://localhost:3000/api/user/update", {
        [section]: profile[section as keyof typeof profile]
      }, {
        headers: { Authorization: `Bearer ${userToken}` }
      });

      if (response.data) {
        toast.success("Profile updated successfully!");
        setIsEditing(prev => ({ ...prev, [section]: false }))
      } else {
        toast.error("Failed to update profile. Please try again.");
      }
    } catch (error) {
      console.error("Error updating profile:", error);
      toast.error("An error occurred. Please try again later.");
    }
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

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const usertoken = Cookies.get("User");
        if (!usertoken) {
          console.log("User token is not present");
          return;
        }
        console.log(usertoken);
        
        const response = await axios.get<UserProfile>("http://localhost:3000/api/auth/info", {
          headers: { Authorization: `Bearer ${usertoken}` }
      });
      

        if (response.data) {
          const userData = response.data;
          setProfile({
            name: userData.name || "",
            title: userData.title || "",
            email: userData.email || "",
            bio: userData.bio || "",
            skills: userData.skills || [],
            location: userData.location || { country: "", state: "", city: "" },
            education: userData.education || [],
            experience: userData.experience || [],
            socialLinks: userData.socialLinks || { linkedin: "", github: "", portfolio: "" }
          });
        } else {
          toast.error("Failed to fetch user data. Please try again.");
        }
      } catch (error) {
        console.error("Error fetching user info:", error);
        toast.error("An error occurred. Please try again later.");
      }
    };

    fetchUserInfo();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100">
      <Header />

      <main className="container mx-auto px-4 py-8 max-w-4xl">
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
                      value={profile.location.city} 
                      onChange={(e) => updateProfile('location', { ...profile.location, city: e.target.value })}
                      placeholder="City"
                    />
                  </div>
                ) : (
                  <>
                    <h1 className="text-2xl font-bold mb-2">{profile.name}</h1>
                    <p className="text-gray-600 mb-2">{profile.title}</p>
                    <p className="text-gray-500 mb-4 flex items-center justify-center md:justify-start">
                      <MapPin size={16} className="mr-1" /> {profile.location.city}
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
                  value={profile.bio} 
                  onChange={(e) => updateProfile('bio', e.target.value)}
                  rows={4}
                />
                <div className="mt-4 flex justify-end space-x-2">
                  <Button variant="outline" onClick={() => toggleEdit('about')}>Cancel</Button>
                  <Button onClick={() => handleSave('about')}>Save</Button>
                </div>
              </div>
            ) : (
              <p>{profile.bio}</p>
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
            {profile.experience.map((exp, index) => (
              <div key={index} className={index > 0 ? "mt-4" : ""}>
                {isEditing.experience ? (
                  <>
                    <Input 
                      value={exp.position} 
                      onChange={(e) => {
                        const newExperiences = [...profile.experience]
                        newExperiences[index].position = e.target.value
                        updateProfile('experience', newExperiences)
                      }}
                      className="mb-2"
                      placeholder="Job Title"
                    />
                    <Input 
                      value={exp.company} 
                      onChange={(e) => {
                        const newExperiences = [...profile.experience]
                        newExperiences[index].company = e.target.value
                        updateProfile('experience', newExperiences)
                      }}
                      className="mb-2"
                      placeholder="Company"
                    />
                    <Input 
                      value={exp.duration} 
                      onChange={(e) => {
                        const newExperiences = [...profile.experience]
                        newExperiences[index].duration = e.target.value
                        updateProfile('experience', newExperiences)
                      }}
                      className="mb-2"
                      placeholder="Duration"
                    />
                    <Textarea 
                      value={exp.description} 
                      onChange={(e) => {
                        const newExperiences = [...profile.experience]
                        newExperiences[index].description = e.target.value
                        updateProfile('experience', newExperiences)
                      }}
                      placeholder="Description"
                    />
                  </>
                ) : (
                  <>
                    <h3 className="text-lg font-semibold">{exp.position}</h3>
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

