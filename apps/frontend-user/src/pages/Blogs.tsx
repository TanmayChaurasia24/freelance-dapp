import { Header } from "@/components/Header";
import { BlogList } from "@/components/BlogList";
import { Footer } from "@/components/Footer";

const blogPosts = [
  {
    id: 1,
    title: "10 Tips for Successful Remote Work",
    excerpt: "Learn how to stay productive and maintain work-life balance while working remotely.",
    date: "May 15, 2024",
    author: "Jane Doe"
  },
  {
    id: 2,
    title: "The Future of Freelancing in 2024",
    excerpt: "Explore the trends and opportunities shaping the freelance landscape in the coming year.",
    date: "May 12, 2024",
    author: "John Smith"
  },
  {
    id: 3,
    title: "Building a Strong Online Portfolio",
    excerpt: "Discover effective strategies to showcase your skills and attract more clients.",
    date: "May 10, 2024",
    author: "Alice Johnson"
  },
  {
    id: 4,
    title: "Navigating Tax Season as a Freelancer",
    excerpt: "Essential tips for managing your finances and staying compliant with tax regulations.",
    date: "May 8, 2024",
    author: "Bob Wilson"
  },
  {
    id: 5,
    title: "The Rise of AI in Remote Work",
    excerpt: "How artificial intelligence is shaping the future of remote work and freelancing.",
    date: "May 5, 2024",
    author: "Eva Chen"
  },
  {
    id: 6,
    title: "Mastering Time Management for Freelancers",
    excerpt: "Practical strategies to boost productivity and achieve a better work-life balance.",
    date: "May 2, 2024",
    author: "Mike Brown"
  }
];

export default function Blogs() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold mb-8 text-center">FreeMotely Blog</h1>
        <p className="text-xl text-center mb-12 text-muted-foreground">
          Stay updated with the latest trends, tips, and insights in remote work and freelancing.
        </p>
        <BlogList blogPosts={blogPosts} />
      </main>
      <Footer />
    </div>
  )
}

