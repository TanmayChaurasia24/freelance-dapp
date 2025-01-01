import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ChevronRight } from 'lucide-react';

interface BlogPost {
  id: number;
  title: string;
  excerpt: string;
}

interface BlogPostsProps {
  blogPosts: BlogPost[];
}

export function BlogPosts({ blogPosts }: BlogPostsProps) {
  return (
    <section className="mb-12">
      <h2 className="text-3xl font-bold mb-6 text-center">Recent Blog Posts</h2>
      <div className="grid gap-6 md:grid-cols-3">
        {blogPosts.map((post) => (
          <Card key={post.id}>
            <CardHeader><CardHeader/>
              <CardTitle>{post.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <p>{post.excerpt}</p>
            </CardContent>
            <CardFooter>
              <Button variant="outline" className="w-full">
                Read More <ChevronRight className="ml-2 h-4 w-4" />
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </section>
  )
}

