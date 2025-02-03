import React, { useState } from 'react';
import { 
  ChevronLeft, 
  Clock, 
  User, 
  Tag, 
  Heart, 
  MessageCircle, 
  Share2,
  Search,
  Filter
} from 'lucide-react';
import { Header } from '@/components/Header';

// Types
interface BlogPost {
  id: number;
  title: string;
  excerpt: string;
  content: string;
  author: string;
  date: string;
  readTime: string;
  category: string;
  image: string;
  likes: number;
  comments: number;
}

const blogPosts: BlogPost[] = [
  {
    id: 1,
    title: "The Future of Web Development: What's Next in 2024",
    excerpt: "Explore the upcoming trends and technologies that will shape the future of web development...",
    content: `The landscape of web development is constantly evolving, and 2024 promises to bring even more exciting changes. From AI-powered development tools to WebAssembly becoming mainstream, developers have a lot to look forward to.

    One of the most significant trends we're seeing is the rise of AI-assisted coding. Tools powered by large language models are becoming increasingly sophisticated, helping developers write better code faster and catch potential issues before they become problems.

    WebAssembly (Wasm) is another technology that's gaining significant traction. It allows high-performance code written in languages like Rust and C++ to run in the browser, opening up new possibilities for web applications that previously required native software.

    The adoption of Edge Computing continues to grow, with more developers leveraging edge functions and distributed computing to deliver faster, more reliable user experiences. This shift is particularly important as users expect increasingly sophisticated applications with near-native performance.

    We're also seeing a strong push towards improved accessibility and inclusive design. This isn't just about compliance – it's about building better experiences for everyone. Tools and frameworks are increasingly baking in accessibility features by default.

    As we look ahead, it's clear that the role of web developers will continue to evolve. The key to success will be staying adaptable and embracing these new technologies while maintaining a strong foundation in the fundamentals of web development.`,
    author: "Sarah Johnson",
    date: "March 1, 2024",
    readTime: "8 min read",
    category: "Technology",
    image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=800&q=80",
    likes: 234,
    comments: 56
  },
  {
    id: 2,
    title: "Building Scalable Applications with Modern Architecture",
    excerpt: "Learn the best practices for creating scalable and maintainable applications...",
    content: `Building scalable applications requires careful consideration of architecture, infrastructure, and development practices. In this comprehensive guide, we'll explore the key principles and patterns that enable applications to grow seamlessly.

    Microservices architecture has become a go-to solution for many organizations, but it's not without its challenges. We'll discuss when to use microservices, how to properly implement them, and common pitfalls to avoid.

    The role of containerization and orchestration cannot be overstated. Docker and Kubernetes have revolutionized how we deploy and manage applications, providing consistency across environments and making scaling more manageable.

    Data management is another crucial aspect of scalable applications. We'll explore different database solutions, caching strategies, and how to handle data consistency in distributed systems.

    Finally, we'll look at monitoring and observability solutions that help teams maintain and troubleshoot large-scale applications effectively.`,
    author: "Michael Chen",
    date: "February 28, 2024",
    readTime: "12 min read",
    category: "Architecture",
    image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=800&q=80",
    likes: 189,
    comments: 42
  },
  {
    id: 3,
    title: "Mastering TypeScript: Advanced Patterns and Best Practices",
    excerpt: "Dive deep into TypeScript's advanced features and learn how to write better code...",
    content: `TypeScript has become an essential tool in modern web development, offering powerful features that help developers write safer, more maintainable code. In this in-depth guide, we'll explore advanced patterns and best practices that will take your TypeScript skills to the next level.

    We'll start by examining advanced type system features like conditional types, mapped types, and template literal types. These powerful features enable you to create flexible, reusable type definitions that can handle complex scenarios.

    Design patterns in TypeScript deserve special attention. We'll look at how traditional patterns can be implemented with TypeScript's type system, and explore patterns that are unique to TypeScript development.

    Error handling is another crucial aspect we'll cover. You'll learn how to create custom error types, implement error boundaries, and use TypeScript to ensure errors are handled consistently throughout your application.

    Finally, we'll discuss testing strategies for TypeScript applications, including how to properly type test fixtures and mock objects.`,
    author: "Emily Rodriguez",
    date: "February 27, 2024",
    readTime: "15 min read",
    category: "Programming",
    image: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&w=800&q=80",
    likes: 312,
    comments: 89
  }
];

function App() {
  const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null);

  const BlogList = () => (
    <div className="max-w-5xl mx-auto px-4 py-8">
      {/* Search and Filter Section */}
      <div className="mb-8 flex flex-col sm:flex-row gap-4 justify-between items-center">
        <div className="relative flex-1 max-w-md">
          <input
            type="text"
            placeholder="Search articles..."
            className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <Search className="absolute left-3 top-2.5 text-gray-400" size={20} />
        </div>
        <button className="flex items-center gap-2 px-4 py-2 border border-gray-200 rounded-lg hover:bg-gray-50">
          <Filter size={20} />
          Filter
        </button>
      </div>

      {/* Blog Posts Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {blogPosts.map((post) => (
          <article key={post.id} className="bg-white rounded-xl shadow-sm overflow-hidden hover:shadow-md transition-shadow">
            <img
              src={post.image}
              alt={post.title}
              className="w-full h-48 object-cover"
            />
            <div className="p-6">
              <div className="flex items-center gap-2 mb-4">
                <span className="px-3 py-1 bg-blue-50 text-blue-600 text-sm font-medium rounded-full">
                  {post.category}
                </span>
              </div>
              <h2 className="text-xl font-bold text-gray-900 mb-2 line-clamp-2">
                {post.title}
              </h2>
              <p className="text-gray-600 mb-4 line-clamp-3">
                {post.excerpt}
              </p>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center">
                    <User size={16} className="text-gray-600" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-900">{post.author}</p>
                    <div className="flex items-center gap-2 text-sm text-gray-500">
                      <Clock size={14} />
                      {post.readTime}
                    </div>
                  </div>
                </div>
                <button
                  onClick={() => setSelectedPost(post)}
                  className="text-blue-600 hover:text-blue-700 font-medium"
                >
                  Read more
                </button>
              </div>
            </div>
          </article>
        ))}
      </div>
    </div>
  );

  const BlogPost = ({ post }: { post: BlogPost }) => (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <button
        onClick={() => setSelectedPost(null)}
        className="flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-8"
      >
        <ChevronLeft size={20} />
        Back to all posts
      </button>
      
      <article>
        <img
          src={post.image}
          alt={post.title}
          className="w-full h-[400px] object-cover rounded-xl mb-8"
        />
        
        <div className="flex items-center gap-4 mb-6">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center">
              <User size={20} className="text-gray-600" />
            </div>
            <div>
              <p className="font-medium text-gray-900">{post.author}</p>
              <p className="text-sm text-gray-500">{post.date}</p>
            </div>
          </div>
          <div className="flex items-center gap-2 text-gray-500">
            <Clock size={16} />
            {post.readTime}
          </div>
          <span className="px-3 py-1 bg-blue-50 text-blue-600 text-sm font-medium rounded-full">
            {post.category}
          </span>
        </div>

        <h1 className="text-4xl font-bold text-gray-900 mb-6">
          {post.title}
        </h1>

        <div className="prose prose-lg max-w-none">
          {post.content.split('\n\n').map((paragraph, index) => (
            <p key={index} className="text-gray-600 mb-4">
              {paragraph.trim()}
            </p>
          ))}
        </div>

        <div className="flex items-center gap-6 mt-8 pt-8 border-t">
          <button className="flex items-center gap-2 text-gray-600 hover:text-red-600">
            <Heart size={20} />
            {post.likes}
          </button>
          <button className="flex items-center gap-2 text-gray-600 hover:text-blue-600">
            <MessageCircle size={20} />
            {post.comments}
          </button>
          <button className="flex items-center gap-2 text-gray-600 hover:text-green-600">
            <Share2 size={20} />
            Share
          </button>
        </div>
      </article>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50">
    <Header/>

      {/* Main Content */}
      <main>
        {selectedPost ? <BlogPost post={selectedPost} /> : <BlogList />}
      </main>
    </div>
  );
}

export default App;