import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Briefcase, MapPin, Building, DollarSign, Code } from "lucide-react"

interface JobCardProps {
  job: {
    _id: string
    title: string
    description: string
    company: string
    salary: string
    type: string
    location: string
    applicationurl: string
    skills: string
  }
}

export function JobCard({ job }: JobCardProps) {
  const skillsArray = job.skills.split(",").map((skill) => skill.trim())

  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle className="text-xl font-bold">{job.title}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid gap-3">
          <div className="flex items-center">
            <Building className="mr-2 h-4 w-4 text-gray-500" />
            <span className="text-sm">{job.company}</span>
          </div>
          <div className="flex items-center">
            <MapPin className="mr-2 h-4 w-4 text-gray-500" />
            <span className="text-sm">{job.location}</span>
          </div>
          <div className="flex items-center">
            <Briefcase className="mr-2 h-4 w-4 text-gray-500" />
            <span className="text-sm">{job.type}</span>
          </div>
          <div className="flex items-center">
            <DollarSign className="mr-2 h-4 w-4 text-gray-500" />
            <span className="text-sm">{job.salary}</span>
          </div>
          <div className="space-y-2">
            <div className="flex flex-wrap gap-2">
              {skillsArray.map((skill, index) => (
                <Badge key={index} variant="secondary" className="text-sm">
                  {skill}
                </Badge>
              ))}
            </div>
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex justify-center">
        <a href={job.applicationurl} target="_blank" rel="noopener noreferrer" className="w-full">
          <Button className="w-full bg-primary text-primary-foreground hover:bg-primary/90">Apply Now</Button>
        </a>
      </CardFooter>
    </Card>
  )
}

