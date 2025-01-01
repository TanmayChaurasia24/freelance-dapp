import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Star } from 'lucide-react';

interface Testimonial {
  id: number;
  name: string;
  role: string;
  content: string;
}

interface TestimonialsProps {
  testimonials: Testimonial[];
}

export function Testimonials({ testimonials }: TestimonialsProps) {
  return (
    <section className="mb-12">
      <h2 className="text-3xl font-bold mb-6 text-center">What Our Users Say</h2>
      <div className="grid gap-6 md:grid-cols-3">
        {testimonials.map((testimonial) => (
          <Card key={testimonial.id}>
            <CardHeader>
              <CardTitle>{testimonial.name}</CardTitle>
              <CardDescription>{testimonial.role}</CardDescription>
            </CardHeader>
            <CardContent>
              <p>"{testimonial.content}"</p>
            </CardContent>
            <CardFooter>
              <div className="flex">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star key={star} className="h-5 w-5 fill-primary text-primary" />
                ))}
              </div>
            </CardFooter>
          </Card>
        ))}
      </div>
    </section>
  )
}

