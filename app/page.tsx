import Link from 'next/link'

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <nav className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-xl font-bold text-gray-900">Project Generator V2</h1>
          <div className="space-x-4">
            <Link href="/login" className="text-gray-600 hover:text-gray-900">
              Sign In
            </Link>
            <Link href="/signup" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
              Get Started
            </Link>
          </div>
        </div>
      </nav>

      <main className="max-w-6xl mx-auto px-4 py-16">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-6">
            Enhanced Project Generation with Database Design & Team Collaboration
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
            Generate comprehensive project specifications including Postgres schema design, 
            site map architecture, and share with your team for collaborative planning.
          </p>
          <Link href="/signup" className="bg-blue-600 text-white px-8 py-3 rounded-lg text-lg font-semibold hover:bg-blue-700">
            Start Your Project
          </Link>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mb-16">
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
              <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 7v10c0 2.21 1.79 4 4 4h8c0-2.21-1.79-4-4-4H8c-2.21 0-4-1.79-4-4zm16 0V7a4 4 0 00-4-4H8a4 4 0 00-4 4v10"></path>
              </svg>
            </div>
            <h3 className="text-lg font-semibold mb-2">Database Schema Generation</h3>
            <p className="text-gray-600">
              Generate complete Postgres schemas with tables, columns, data types, indexes, and RLS policies based on your project requirements.
            </p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-sm">
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
              <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7"></path>
              </svg>
            </div>
            <h3 className="text-lg font-semibold mb-2">Site Map Architecture</h3>
            <p className="text-gray-600">
              Create detailed site maps with routes, page purposes, authentication requirements, and component specifications.
            </p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-sm">
            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
              <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"></path>
              </svg>
            </div>
            <h3 className="text-lg font-semibold mb-2">Team Collaboration</h3>
            <p className="text-gray-600">
              Invite team members via email to review and collaborate on project specifications with proper permission controls.
            </p>
          </div>
        </div>

        <div className="bg-white p-8 rounded-lg shadow-sm">
          <h3 className="text-2xl font-bold text-gray-900 mb-4">Perfect for Product Teams</h3>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-semibold text-gray-900 mb-2">Product Managers</h4>
              <p className="text-gray-600">
                Generate technical specifications that bridge business requirements with development implementation.
              </p>
            </div>
            <div>
              <h4 className="font-semibold text-gray-900 mb-2">Technical Founders</h4>
              <p className="text-gray-600">
                Create comprehensive project blueprints with database design and architecture planning.
              </p>
            </div>
            <div>
              <h4 className="font-semibold text-gray-900 mb-2">Development Teams</h4>
              <p className="text-gray-600">
                Collaborate on project planning with detailed schemas and structured documentation.
              </p>
            </div>
            <div>
              <h4 className="font-semibold text-gray-900 mb-2">Stakeholders</h4>
              <p className="text-gray-600">
                Review project specifications with clear, structured outputs that everyone can understand.
              </p>
            </div>
          </div>
        </div>
      </main>

      <footer className="bg-gray-50 mt-16">
        <div className="max-w-7xl mx-auto px-4 py-8 text-center text-gray-600">
          <p>&copy; 2024 Project Generator V2. Built with Next.js and Supabase.</p>
        </div>
      </footer>
    </div>
  )
}