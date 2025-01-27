import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Briefcase, MapPin, Building, DollarSign } from "lucide-react";

interface JobCardProps {
  job: {
    _id: string;
    title: string;
    description: string;
    company: string;
    salary: string;
    type: string;
    location: string;
    applicationurl: string;
  };
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
        </div>
      </CardContent>
      <CardFooter className="">
        <a href={job.applicationurl} target="_blank" className="w-[50%] bg-black text-white text-center p-2 rounded-lg">Apply Now</a>
      </CardFooter>
    </Card>
  );
}
