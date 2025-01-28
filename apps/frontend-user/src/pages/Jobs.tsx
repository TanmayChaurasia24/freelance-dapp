import { useEffect, useMemo, useState } from 'react'
import { Header } from "@/components/Header"
// import { Footer } from "@/components/Footer"
import { JobCard } from "@/components/JobCard"
import { FilterSidebar } from "@/components/FilterSidebar"
import axios from 'axios'

interface jobtype {
  _id: string,
  title: string,
  description: string,
  company: string,
  salary: string,
  type: string,
  location: string,
  applicationurl: string
  skills: string

}

export default function JobsPage() {
  const [jobs,setjobs] = useState<jobtype[]>([]);
  const [filteredJobs, setFilteredJobs] = useState(jobs)
  
  const locations = useMemo(() => [...new Set(jobs.map((job) => job.location))], [jobs]);
  const companies = useMemo(() => [...new Set(jobs.map((job) => job.company))], [jobs]);
  const jobTypes = useMemo(() => [...new Set(jobs.map((job) => job.type))], [jobs]);


  useEffect(() => {
    setFilteredJobs(jobs);
  }, [jobs]);
  useEffect(() => {
    const fetchalljobs = async() => {
      try {
        const response: any = await axios.get("http://localhost:3000/api/jobs/bulk");

        if(!response) {
          console.log("error: " + response);
        }

        console.log("response jobs: ", response.data.data.response);
        setjobs(response.data.data.response);
        
      } catch (error: any) {
        console.log("error is showing all the jobs: " + error.message);
        
      }
    }

    fetchalljobs()
  },[])

  const handleFilterChange = (filters: { search: string; locations: string | string[]; companies: string | string[]; jobTypes: string | string[] }) => {
    const filtered = jobs.filter((job: jobtype) => {
      const matchesSearch =
        job.title.toLowerCase().includes(filters.search.toLowerCase()) ||
        job.company.toLowerCase().includes(filters.search.toLowerCase())
      const matchesLocation =
        filters.locations.length === 0 || filters.locations.includes(job.location)
      const matchesCompany =
        filters.companies.length === 0 || filters.companies.includes(job.company)
      const matchesJobType =
        filters.jobTypes.length === 0 || filters.jobTypes.includes(job.type)

      return matchesSearch && matchesLocation && matchesCompany && matchesJobType
    })

    setFilteredJobs(filtered)
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold mb-8 text-center">Remote Jobs</h1>
        <div className="flex flex-col md:flex-row gap-8">
          <div className="md:w-1/4 ">
            <FilterSidebar
              locations={locations}
              companies={companies}
              jobTypes={jobTypes}
              onFilterChange={handleFilterChange}
            />
          </div>
          <div className="md:w-3/4 ">
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {filteredJobs.map((job: jobtype) => (
                <JobCard key={job._id} job={job} />
              ))}
            </div>
            {filteredJobs.length === 0 && (
              <p className="text-center text-muted-foreground mt-8">
                No jobs found matching your criteria. Try adjusting your filters.
              </p>
            )}
          </div>
        </div>
      </main>
    </div>
  )
}

