import { Newspaper, ArrowRight, LineChart } from 'lucide-react'
import { createFileRoute, Link } from '@tanstack/react-router'

export const Route = createFileRoute('/')({
  component: App,
})

function App() {
  return (
    <div className="min-h-screen bg-zinc-50 text-zinc-900 flex flex-col items-center justify-center p-6 font-sans">
      {/* Main Container */}
      <div className="w-full max-w-4xl space-y-8">
        {/* Header Section */}
        <div className="text-center space-y-2">
          <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-zinc-900">
            Analytics Dashboard
          </h1>
          <p className="text-zinc-500 text-lg">
            Select a publication to view performance metrics.
          </p>
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4">
          {/* TKP Card */}
          <Link
            to="/analytics/tkp"
            className="group relative flex flex-col items-center justify-center p-10 h-64 bg-white border border-zinc-200 rounded-xl shadow-sm hover:shadow-md hover:border-zinc-300 transition-all duration-200 cursor-pointer overflow-hidden"
          >
            <div className="absolute top-0 left-0 w-full h-1 bg-blue-600 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300" />

            <div className="p-4 bg-blue-50 rounded-full mb-6 group-hover:bg-blue-100 transition-colors">
              <Newspaper className="w-10 h-10 text-blue-600" />
            </div>

            <h2 className="text-2xl font-semibold text-zinc-800 mb-2">TKP</h2>
            <p className="text-zinc-500 text-sm font-medium uppercase tracking-wider">
              The Kathmandu Post
            </p>

            <div className="absolute bottom-6 opacity-0 transform translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300 flex items-center text-blue-600 text-sm font-medium">
              View Analytics <ArrowRight className="w-4 h-4 ml-1" />
            </div>
          </Link>

          {/* Ekantipur Card */}
          <Link
            to="/analytics/ekantipur"
            className="group relative flex flex-col items-center justify-center p-10 h-64 bg-white border border-zinc-200 rounded-xl shadow-sm hover:shadow-md hover:border-zinc-300 transition-all duration-200 cursor-pointer overflow-hidden"
          >
            <div className="absolute top-0 left-0 w-full h-1 bg-red-600 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300" />

            <div className="p-4 bg-red-50 rounded-full mb-6 group-hover:bg-red-100 transition-colors">
              <LineChart className="w-10 h-10 text-red-600" />
            </div>

            <h2 className="text-2xl font-semibold text-zinc-800 mb-2">
              Ekantipur
            </h2>
            <p className="text-zinc-500 text-sm font-medium uppercase tracking-wider">
              Ekantipur Daily
            </p>

            <div className="absolute bottom-6 opacity-0 transform translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300 flex items-center text-red-600 text-sm font-medium">
              View Analytics <ArrowRight className="w-4 h-4 ml-1" />
            </div>
          </Link>
        </div>
      </div>
    </div>
  )
}
