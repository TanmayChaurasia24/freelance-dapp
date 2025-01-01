import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export function WhyChooseUs() {
  const reasons = [
    {
      title: "Curated Opportunities",
      description: "We handpick the best remote jobs and freelance projects for you."
    },
    {
      title: "Global Network",
      description: "Connect with employers and clients from around the world."
    },
    {
      title: "Secure Payments",
      description: "Our platform ensures timely and secure payments for your work."
    }
  ];

  return (
    <section className="text-center mb-12">
      <h2 className="text-3xl font-bold mb-6">Why Choose FreeMotely?</h2>
      <div className="grid gap-6 md:grid-cols-3">
        {reasons.map((reason, index) => (
          <Card key={index}>
            <CardHeader>
              <CardTitle>{reason.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <p>{reason.description}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  )
}

