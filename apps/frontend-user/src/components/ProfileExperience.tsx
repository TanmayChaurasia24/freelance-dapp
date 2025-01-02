"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { toast } from "react-hot-toast"

interface Experience {
  id: string
  title: string
  company: string
  startDate: string
  endDate: string
  description: string
}

interface ProfileExperienceProps {
  experiences: Experience[]
}

export function ProfileExperience({ experiences: initialExperiences }: ProfileExperienceProps) {
  const [experiences, setExperiences] = useState<Experience[]>(initialExperiences)
  const [newExperience, setNewExperience] = useState<Partial<Experience>>({})

  const handleAddExperience = () => {
    if (newExperience.title && newExperience.company) {
      setExperiences([...experiences, { ...newExperience, id: Date.now().toString() } as Experience])
      setNewExperience({})
      toast.success("Experience added")
    }
  }

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold">Experience</h3>
      {experiences.map((experience) => (
        <Card key={experience.id}>
          <CardHeader>
            <CardTitle>{experience.title}</CardTitle>
            <CardDescription>{experience.company}</CardDescription>
          </CardHeader>
          <CardContent>
            <p>{experience.startDate} - {experience.endDate}</p>
            <p>{experience.description}</p>
          </CardContent>
        </Card>
      ))}
      <Dialog>
        <DialogTrigger asChild>
          <Button>Add Experience</Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Add Experience</DialogTitle>
            <DialogDescription>
              Add a new work experience to your profile. Click save when you're done.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="title" className="text-right">
                Title
              </Label>
              <Input
                id="title"
                className="col-span-3"
                value={newExperience.title || ''}
                onChange={(e) => setNewExperience({ ...newExperience, title: e.target.value })}
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="company" className="text-right">
                Company
              </Label>
              <Input
                id="company"
                className="col-span-3"
                value={newExperience.company || ''}
                onChange={(e) => setNewExperience({ ...newExperience, company: e.target.value })}
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="startDate" className="text-right">
                Start Date
              </Label>
              <Input
                id="startDate"
                className="col-span-3"
                value={newExperience.startDate || ''}
                onChange={(e) => setNewExperience({ ...newExperience, startDate: e.target.value })}
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="endDate" className="text-right">
                End Date
              </Label>
              <Input
                id="endDate"
                className="col-span-3"
                value={newExperience.endDate || ''}
                onChange={(e) => setNewExperience({ ...newExperience, endDate: e.target.value })}
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="description" className="text-right">
                Description
              </Label>
              <Textarea
                id="description"
                className="col-span-3"
                value={newExperience.description || ''}
                onChange={(e) => setNewExperience({ ...newExperience, description: e.target.value })}
              />
            </div>
          </div>
          <DialogFooter>
            <Button type="submit" onClick={handleAddExperience}>Save changes</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}

