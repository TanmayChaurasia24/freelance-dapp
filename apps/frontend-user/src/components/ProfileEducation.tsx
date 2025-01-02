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
import { toast } from "react-hot-toast"

interface Education {
  id: string
  school: string
  degree: string
  fieldOfStudy: string
  startDate: string
  endDate: string
}

interface ProfileEducationProps {
  education: Education[]
}

export function ProfileEducation({ education: initialEducation }: ProfileEducationProps) {
  const [education, setEducation] = useState<Education[]>(initialEducation)
  const [newEducation, setNewEducation] = useState<Partial<Education>>({})

  const handleAddEducation = () => {
    if (newEducation.school && newEducation.degree) {
      setEducation([...education, { ...newEducation, id: Date.now().toString() } as Education])
      setNewEducation({})
      toast.success("Education Added!")
    }
  }

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold">Education</h3>
      {education.map((edu) => (
        <Card key={edu.id}>
          <CardHeader>
            <CardTitle>{edu.school}</CardTitle>
            <CardDescription>{edu.degree} in {edu.fieldOfStudy}</CardDescription>
          </CardHeader>
          <CardContent>
            <p>{edu.startDate} - {edu.endDate}</p>
          </CardContent>
        </Card>
      ))}
      <Dialog>
        <DialogTrigger asChild>
          <Button>Add Education</Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Add Education</DialogTitle>
            <DialogDescription>
              Add a new education entry to your profile. Click save when you're done.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="school" className="text-right">
                School
              </Label>
              <Input
                id="school"
                className="col-span-3"
                value={newEducation.school || ''}
                onChange={(e) => setNewEducation({ ...newEducation, school: e.target.value })}
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="degree" className="text-right">
                Degree
              </Label>
              <Input
                id="degree"
                className="col-span-3"
                value={newEducation.degree || ''}
                onChange={(e) => setNewEducation({ ...newEducation, degree: e.target.value })}
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="fieldOfStudy" className="text-right">
                Field of Study
              </Label>
              <Input
                id="fieldOfStudy"
                className="col-span-3"
                value={newEducation.fieldOfStudy || ''}
                onChange={(e) => setNewEducation({ ...newEducation, fieldOfStudy: e.target.value })}
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="startDate" className="text-right">
                Start Date
              </Label>
              <Input
                id="startDate"
                className="col-span-3"
                value={newEducation.startDate || ''}
                onChange={(e) => setNewEducation({ ...newEducation, startDate: e.target.value })}
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="endDate" className="text-right">
                End Date
              </Label>
              <Input
                id="endDate"
                className="col-span-3"
                value={newEducation.endDate || ''}
                onChange={(e) => setNewEducation({ ...newEducation, endDate: e.target.value })}
              />
            </div>
          </div>
          <DialogFooter>
            <Button type="submit" onClick={handleAddEducation}>Save changes</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}


