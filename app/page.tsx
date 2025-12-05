export default function Home() {
  return (
    <div className="min-h-screen bg-base-100 font-sans">
      {/* Navbar */}
      <div className="navbar bg-base-100/80 backdrop-blur-md sticky top-0 z-50 px-6 py-4 shadow-sm border-b border-gray-100">
        <div className="flex-1">
          <a className="btn btn-ghost text-2xl font-black tracking-tight bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent">
            Crop_Comp_Media
          </a>
        </div>
        <div className="flex-none">
          <a href="/sign-up">
            <button className="btn bg-black hover:bg-gray-800 text-white border-none rounded-full px-6 flex items-center gap-2 transition-all shadow-lg hover:shadow-xl">
              <svg aria-label="Google logo" width="18" height="18" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                <g>
                  <path d="m0 0H512V512H0" fill="#fff"></path>
                  <path fill="#34a853" d="M153 292c30 82 118 95 171 60h62v48A192 192 0 0190 341"></path>
                  <path fill="#4285f4" d="m386 400a140 175 0 0053-179H260v74h102q-7 37-38 57"></path>
                  <path fill="#fbbc02" d="m90 341a208 200 0 010-171l63 49q-12 37 0 73"></path>
                  <path fill="#ea4335" d="m153 219c22-69 116-109 179-50l55-54c-78-75-230-72-297 55"></path>
                </g>
              </svg>
              Sign Up with Google
            </button>
          </a>
        </div>
      </div>

      {/* Hero Section */}
      <div className="flex flex-col items-center justify-center min-h-[85vh] px-4">
        <div className="max-w-4xl text-center space-y-8 animate-fade-in-up">
          
          <div className="space-y-2">
            <h1 className="text-5xl md:text-7xl font-extrabold text-gray-900 leading-tight">
              Store, Organize, & <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">
                Perfect Your Media
              </span>
            </h1>
          </div>

          <div className="space-y-1 max-w-2xl mx-auto">
            <p className="text-xl text-gray-600 leading-relaxed"> 
              Upload high-res videos and let our background <strong>auto-compression</strong> handle the rest. 
              Need a quick fix? <strong>Crop and resize</strong> images instantly without leaving your dashboard.
            </p>
          </div>

          <div className="flex justify-center gap-2 pt-4">
            <a href="/sign-up">
              <button className="btn btn-primary btn-lg rounded-full px-8 shadow-blue-200 shadow-xl">
                Get Started for Free
              </button>
            </a>
            <button className="btn btn-ghost btn-lg rounded-full px-8">
              Learn More
            </button>
          </div>

          {/* Features Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-16 text-left">
            {/* Feature 1 */}
            <div className="p-6 bg-gray-50 rounded-2xl border border-gray-100 hover:shadow-md transition-shadow">
              <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z" />
                </svg>
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">Smart Storage</h3>
              <p className="text-gray-600 text-sm">Organize your files with a powerful folder system. Keep your videos and images structured just like your desktop.</p>
            </div>

            {/* Feature 2 */}
            <div className="p-6 bg-gray-50 rounded-2xl border border-gray-100 hover:shadow-md transition-shadow">
              <div className="w-12 h-12 bg-indigo-100 rounded-xl flex items-center justify-center mb-4">
                 <svg className="w-6 h-6 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">Auto Compression</h3>
              <p className="text-gray-600 text-sm">Save space without losing quality. Our advanced algorithms automatically optimize your media uploads.</p>
            </div>

            {/* Feature 3 */}
            <div className="p-6 bg-gray-50 rounded-2xl border border-gray-100 hover:shadow-md transition-shadow">
              <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                </svg>
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">Instant Cropping</h3>
              <p className="text-gray-600 text-sm">Resize and crop your images on the fly. Get the perfect aspect ratio for any platform instantly.</p>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}