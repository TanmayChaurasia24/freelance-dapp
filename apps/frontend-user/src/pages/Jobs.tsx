import { useState } from 'react'
import { Header } from "@/components/Header"
import { Footer } from "@/components/Footer"
import { JobCard } from "@/components/JobCard"
import { FilterSidebar } from "@/components/FilterSidebar"

const jobs = [
  {
    id: '1',
    title: 'Senior React Developer',
    company: 'TechCorp',
    location: 'Remote - US',
    type: 'Full-time',
    salary: '$120,000 - $150,000',
    skills: ['React', 'TypeScript', 'Node.js'],
  },
  {
    id: '2',
    title: 'UX Designer',
    company: 'DesignHub',
    location: 'Remote - Worldwide',
    type: 'Contract',
    salary: '$80,000 - $100,000',
    skills: ['Figma', 'User Research', 'Prototyping'],
  },
  {
    id: '3',
    title: 'DevOps Engineer',
    company: 'CloudSys',
    location: 'Remote - Europe',
    type: 'Full-time',
    salary: '$100,000 - $130,000',
    skills: ['AWS', 'Docker', 'Kubernetes'],
  },
  {
    id: '4',
    title: 'Frontend Developer',
    company: 'WebTech',
    location: 'Remote - US',
    type: 'Part-time',
    salary: '$60,000 - $80,000',
    skills: ['JavaScript', 'React', 'CSS'],
  },
  {
    id: '5',
    title: 'Data Scientist',
    company: 'DataCorp',
    location: 'Remote - Worldwide',
    type: 'Full-time',
    salary: '$130,000 - $160,000',
    skills: ['Python', 'Machine Learning', 'SQL'],
  },
  {
    id: '4',
    title: 'Frontend Developer',
    company: 'WebTech',
    location: 'Remote - US',
    type: 'Part-time',
    salary: '$60,000 - $80,000',
    skills: ['JavaScript', 'React', 'CSS'],
  },
  {
    id: '5',
    title: 'Data Scientist',
    company: 'DataCorp',
    location: 'Remote - Worldwide',
    type: 'Full-time',
    salary: '$130,000 - $160,000',
    skills: ['Python', 'Machine Learning', 'SQL'],
  },
  {
    id: '4',
    title: 'Frontend Developer',
    company: 'WebTech',
    location: 'Remote - US',
    type: 'Part-time',
    salary: '$60,000 - $80,000',
    skills: ['JavaScript', 'React', 'CSS'],
  },
  {
    id: '5',
    title: 'Data Scientist',
    company: 'DataCorp',
    location: 'Remote - Worldwide',
    type: 'Full-time',
    salary: '$130,000 - $160,000',
    skills: ['Python', 'Machine Learning', 'SQL'],
  },
  {
    id: '4',
    title: 'Frontend Developer',
    company: 'WebTech',
    location: 'Remote - US',
    type: 'Part-time',
    salary: '$60,000 - $80,000',
    skills: ['JavaScript', 'React', 'CSS'],
  },
  {
    id: '5',
    title: 'Data Scientist',
    company: 'DataCorp',
    location: 'Remote - Worldwide',
    type: 'Full-time',
    salary: '$130,000 - $160,000',
    skills: ['Python', 'Machine Learning', 'SQL'],
  },
]

export default function JobsPage() {
  const [filteredJobs, setFilteredJobs] = useState(jobs)

  const locations = Array.from(new Set(jobs.map((job) => job.location)))
  const companies = Array.from(new Set(jobs.map((job) => job.company)))
  const jobTypes = Array.from(new Set(jobs.map((job) => job.type)))

  const handleFilterChange = (filters: { search: string; locations: string | string[]; companies: string | string[]; jobTypes: string | string[] }) => {
    const filtered = jobs.filter((job) => {
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
              {filteredJobs.map((job) => (
                <JobCard key={job.id} job={job} />
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

