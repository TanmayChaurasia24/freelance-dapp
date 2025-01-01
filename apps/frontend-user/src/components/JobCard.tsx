import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Briefcase, MapPin, Building, DollarSign } from 'lucide-react'

interface JobCardProps {
  job: {
    id: string
    title: string
    company: string
    location: string
    type: string
    salary: string
    skills: string[]
  }
}

export function JobCard({ job }: JobCardProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{job.title}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid gap-2">
          <div className="flex items-center">
            <Building className="mr-2 h-4 w-4" />
            <span>{job.company}</span>
          </div>
          <div className="flex items-center">
            <MapPin className="mr-2 h-4 w-4" />
            <span>{job.location}</span>
          </div>
          <div className="flex items-center">
            <Briefcase className="mr-2 h-4 w-4" />
            <span>{job.type}</span>
          </div>
          <div className="flex items-center">
            <DollarSign className="mr-2 h-4 w-4" />
            <span>{job.salary}</span>
          </div>
          <div className="flex flex-wrap gap-2 mt-2">
            {job.skills.map((skill) => (
              <Badge key={skill} variant="secondary">
                {skill}
              </Badge>
            ))}
          </div>
        </div>
      </CardContent>
      <CardFooter>
        <Button className="w-full">Apply Now</Button>
      </CardFooter>
    </Card>
  )
}


