import React from 'react';
import { 
  MapPin, 
  Briefcase, 
  School, 
  Mail, 
  Globe, 
  LinkedinIcon,
  Twitter,
  Github,
  Edit,
  MessageSquare,
  UserPlus,
  MoreHorizontal
} from 'lucide-react';
import { Header } from '@/components/Header';

function App() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <Header/>

      <main className="max-w-5xl mx-auto px-4 py-8">
        <div className="bg-white rounded-lg shadow">
          {/* Cover Photo */}
          <div 
            className="h-60 rounded-t-lg bg-cover bg-center"
            style={{
              backgroundImage: 'url("https://images.unsplash.com/photo-1579546929518-9e396f3cc809?auto=format&fit=crop&w=1200&q=80")'
            }}
          />

          {/* Profile Section */}
          <div className="px-8 pb-8">
            {/* Profile Picture */}
            <div className="relative -mt-20 mb-4">
              <img
                src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=150&h=150&q=80"
                alt="Profile"
                className="w-40 h-40 rounded-full border-4 border-white shadow-lg"
              />
              <button className="absolute bottom-2 right-2 p-2 bg-white rounded-full shadow-md hover:bg-gray-50">
                <Edit size={20} className="text-gray-600" />
              </button>
            </div>

            {/* Profile Info */}
            <div className="flex justify-between items-start mb-6">
              <div>
                <h2 className="text-3xl font-bold text-gray-900">John Doe</h2>
                <p className="text-xl text-gray-600">Senior Software Engineer</p>
                <div className="flex items-center gap-4 mt-2 text-gray-600">
                  <span className="flex items-center gap-1">
                    <MapPin size={18} />
                    San Francisco, CA
                  </span>
                  <span className="flex items-center gap-1">
                    <Mail size={18} />
                    john.doe@example.com
                  </span>
                </div>
              </div>
              <div className="flex gap-2">
                <button className="px-4 py-2 bg-blue-600 text-white rounded-full hover:bg-blue-700 flex items-center gap-2">
                  <MessageSquare size={18} />
                  Message
                </button>
                <button className="px-4 py-2 border border-gray-300 rounded-full hover:bg-gray-50 flex items-center gap-2">
                  <UserPlus size={18} />
                  Connect
                </button>
                <button className="p-2 border border-gray-300 rounded-full hover:bg-gray-50">
                  <MoreHorizontal size={20} />
                </button>
              </div>
            </div>

            {/* About */}
            <section className="mb-8">
              <h3 className="text-xl font-bold text-gray-900 mb-4">About</h3>
              <p className="text-gray-600">
                Passionate software engineer with 8+ years of experience in full-stack development.
                Specialized in React, TypeScript, and cloud technologies. Always eager to learn and
                share knowledge with the community.
              </p>
            </section>

            {/* Experience */}
            <section className="mb-8">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Experience</h3>
              <div className="space-y-4">
                <div className="flex gap-4">
                  <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center">
                    <Briefcase className="text-gray-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">Senior Software Engineer</h4>
                    <p className="text-gray-600">Tech Corp Inc.</p>
                    <p className="text-sm text-gray-500">2020 - Present · 3 years</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center">
                    <Briefcase className="text-gray-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">Software Engineer</h4>
                    <p className="text-gray-600">StartUp Co.</p>
                    <p className="text-sm text-gray-500">2017 - 2020 · 3 years</p>
                  </div>
                </div>
              </div>
            </section>

            {/* Education */}
            <section className="mb-8">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Education</h3>
              <div className="flex gap-4">
                <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center">
                  <School className="text-gray-600" />
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900">Computer Science, BSc</h4>
                  <p className="text-gray-600">University of Technology</p>
                  <p className="text-sm text-gray-500">2013 - 2017</p>
                </div>
              </div>
            </section>

            {/* Social Links */}
            <section>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Connect</h3>
              <div className="flex gap-4">
                <a href="#" className="text-gray-600 hover:text-blue-600">
                  <LinkedinIcon size={24} />
                </a>
                <a href="#" className="text-gray-600 hover:text-blue-400">
                  <Twitter size={24} />
                </a>
                <a href="#" className="text-gray-600 hover:text-gray-900">
                  <Github size={24} />
                </a>
                <a href="#" className="text-gray-600 hover:text-blue-600">
                  <Globe size={24} />
                </a>
              </div>
            </section>
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;