export function HowItWorks() {
    const steps = [
      { title: "Create Your Profile", description: "Sign up and showcase your skills and experience." },
      { title: "Explore Opportunities", description: "Browse through our curated list of remote jobs and projects." },
      { title: "Apply or Bid", description: "Submit your application or proposal with just a few clicks." },
    ];
  
    return (
      <section className="mb-12 bg-muted p-8 rounded-lg">
        <h2 className="text-3xl font-bold mb-6 text-center">How It Works</h2>
        <div className="grid gap-8 md:grid-cols-3">
          {steps.map((step, index) => (
            <div key={index} className="flex flex-col items-center text-center">
              <div className="w-12 h-12 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-xl font-bold mb-4">
                {index + 1}
              </div>
              <h3 className="text-xl font-bold mb-2">{step.title}</h3>
              <p>{step.description}</p>
            </div>
          ))}
        </div>
      </section>
    )
  }
  
  