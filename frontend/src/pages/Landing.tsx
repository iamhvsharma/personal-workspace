import React from 'react';
import { Link } from 'react-router-dom';
import { 
  BookMarked, 
  Link as LinkIcon, 
  Share2, 
  Search, 
  FolderGit2,
  Shield,
  Sparkles,
  Github
} from 'lucide-react';
import { Button } from '../components/Button';
import { ThemeToggle } from '../components/ThemeToggle';

export function Landing() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-[40%] -left-[20%] w-[70%] h-[70%] rounded-full bg-blue-500/10 blur-[120px] animate-pulse" />
        <div className="absolute -bottom-[40%] -right-[20%] w-[70%] h-[70%] rounded-full bg-purple-500/10 blur-[120px] animate-pulse delay-1000" />
      </div>

      <nav className="sticky top-0 z-50 border-b border-gray-200 dark:border-gray-800 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            <div className="flex items-center">
              <BookMarked className="h-6 w-6 sm:h-8 sm:w-8 text-blue-600 animate-bounce" />
              <span className="ml-2 text-lg sm:text-xl font-bold text-gray-900 dark:text-white">
                LinkVault
              </span>
            </div>
            <div className="flex items-center space-x-2 sm:space-x-4">
              <ThemeToggle />
              <Link to="/login">
                <Button variant="outline" size="sm" className="hidden sm:inline-flex">Sign in</Button>
                <Button variant="outline" size="sm" className="sm:hidden">Sign in</Button>
              </Link>
              <Link to="/signup">
                <Button size="sm">Get Started</Button>
              </Link>
            </div>
          </div>
        </div>
      </nav>

      <main className="relative">
        {/* Hero Section */}
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12 sm:py-16 md:py-24">
          <div className="text-center animate-fade-in">
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-gray-900 dark:text-white bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600">
              Your Digital Library,
              <br />
              <span className="animate-text-slide-up inline-block mt-2">Organized & Beautiful</span>
            </h1>
            <p className="mt-4 sm:mt-6 text-base sm:text-lg leading-7 sm:leading-8 text-gray-600 dark:text-gray-300 max-w-2xl mx-auto animate-fade-in-up">
              Save, organize, and access your important links in one beautiful place.
              Never lose track of valuable resources again with LinkVault's powerful
              organization tools.
            </p>
            <div className="mt-6 sm:mt-10 flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-x-6 animate-fade-in-up">
              <Link to="/signup" className="w-full sm:w-auto">
                <Button size="lg" className="w-full sm:w-auto group">
                  Get started for free
                  <span className="group-hover:translate-x-1 transition-transform">→</span>
                </Button>
              </Link>
              <Link to="/login" className="w-full sm:w-auto">
                <Button variant="outline" size="lg" className="w-full sm:w-auto">
                  Learn more
                </Button>
              </Link>
            </div>
          </div>
        </div>

        {/* Features Section */}
        <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm py-16 sm:py-24">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-2xl lg:text-center">
              <h2 className="text-sm sm:text-base font-semibold leading-7 text-blue-600 animate-fade-in">
                Features
              </h2>
              <p className="mt-2 text-2xl sm:text-3xl font-bold tracking-tight text-gray-900 dark:text-white animate-fade-in">
                Everything you need to manage your digital resources
              </p>
            </div>
            <div className="mx-auto mt-8 sm:mt-16 max-w-2xl lg:max-w-none">
              <dl className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
                {[
                  {
                    name: 'Smart Organization',
                    description: 'Create custom folders and tags to organize your links exactly how you want.',
                    icon: FolderGit2,
                  },
                  {
                    name: 'Instant Search',
                    description: 'Find any link in seconds with our powerful search and filtering system.',
                    icon: Search,
                  },
                  {
                    name: 'Secure Storage',
                    description: 'Your data is encrypted and securely stored with enterprise-grade security.',
                    icon: Shield,
                  },
                  {
                    name: 'AI Powered',
                    description: 'Smart suggestions and automatic categorization using AI technology.',
                    icon: Sparkles,
                  },
                ].map((feature, index) => (
                  <div 
                    key={feature.name} 
                    className="group flex flex-col bg-white/50 dark:bg-gray-800/50 p-4 sm:p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 backdrop-blur-sm animate-fade-in"
                    style={{ animationDelay: `${index * 150}ms` }}
                  >
                    <dt className="flex items-center gap-x-3 text-base sm:text-lg font-semibold leading-7 text-gray-900 dark:text-white">
                      <feature.icon className="h-5 w-5 sm:h-6 sm:w-6 flex-none text-blue-600 group-hover:scale-110 transition-transform" />
                      {feature.name}
                    </dt>
                    <dd className="mt-2 sm:mt-4 flex flex-auto flex-col text-sm sm:text-base leading-6 sm:leading-7 text-gray-600 dark:text-gray-300">
                      <p className="flex-auto">{feature.description}</p>
                    </dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>
        </div>

        {/* Stats Section */}
        <div className="py-16 sm:py-24">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-8">
              {[
                { label: 'Active Users', value: '10K+' },
                { label: 'Links Saved', value: '1M+' },
                { label: 'Countries', value: '150+' },
                { label: 'Uptime', value: '99.9%' },
              ].map((stat, index) => (
                <div 
                  key={stat.label}
                  className="bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm rounded-2xl p-4 sm:p-6 text-center animate-fade-in"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className="text-2xl sm:text-3xl font-bold text-blue-600">{stat.value}</div>
                  <div className="mt-1 text-sm sm:text-base text-gray-600 dark:text-gray-300">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="relative border-t border-gray-200 dark:border-gray-800 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm py-6 sm:py-8">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col items-center justify-center space-y-4">
            <div className="flex items-center space-x-2 text-sm sm:text-base">
              <span className="text-gray-600 dark:text-gray-400">Made with</span>
              <span className="text-red-500 animate-pulse">❤</span>
              <span className="text-gray-600 dark:text-gray-400">by</span>
              <a 
                href="https://github.com/iamhvsharma" 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center space-x-1 text-blue-600 hover:text-blue-500 transition-colors group"
              >
                <span>Harshvardhan</span>
                <Github className="h-4 w-4 group-hover:rotate-12 transition-transform" />
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}