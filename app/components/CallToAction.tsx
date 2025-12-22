export default function CallToAction() {
  return (
    <section id="contact" className="py-32 px-4 bg-gradient-to-t from-slate-900/90 via-purple-900/20 to-slate-900/90">
      <div className="max-w-4xl mx-auto text-center">
        <div className="inline-block p-12 bg-slate-900/50 backdrop-blur-xl border border-slate-700/50 rounded-3xl shadow-2xl hover:shadow-purple-500/30 transition-all duration-700 hover:-translate-y-4 hover:scale-[1.02] group">
          {/* Main Title */}
          <h3 className="text-5xl md:text-6xl lg:text-7xl font-black mb-8 bg-gradient-to-r from-white via-purple-300 to-pink-400 bg-clip-text text-transparent drop-shadow-2xl group-hover:from-purple-400 group-hover:to-pink-500 transition-all duration-1000">
            Let&apos;s Build Something Amazing
          </h3>

          {/* Subtitle */}
          <p className="text-xl md:text-2xl mb-12 max-w-2xl mx-auto leading-relaxed text-slate-300 font-medium">
            Looking for a developer who can create high-performance microservices, containerized apps & epic web experiences?
          </p>

          {/* Location & Resume */}
          <div className="flex flex-col md:flex-row gap-8 md:gap-12 items-center justify-center mb-16 opacity-90">
            <div className="flex items-center gap-4 text-2xl">
              <span className="text-3xl">📍</span>
              <span className="text-xl font-bold bg-gradient-to-r from-emerald-400 to-teal-400 bg-clip-text text-transparent">
                Bordeaux, France
              </span>
            </div>

            <a
              href="https://www.linkedin.com/in/paul-ragueneau/"
              target="_blank"
              rel="noopener noreferrer"
              className="px-8 py-4 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-xl font-bold rounded-2xl shadow-xl hover:shadow-emerald-500/25 transition-all duration-500 transform hover:-translate-y-2 border-2 border-transparent hover:border-emerald-500/50 group/link"
            >
              View Resume
              <svg className="inline ml-2 w-6 h-6 group-hover/link:translate-x-1 transition-transform duration-300" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </a>
          </div>

          {/* Social Links Grid */}
          <div className="flex flex-wrap justify-center gap-8 pt-8 border-t border-slate-700/50">
            <a href="https://github.com/Periicles" target="_blank" className="text-3xl hover:text-purple-400 hover:scale-110 transition-all duration-300 group/social" rel="noopener noreferrer">
              <span className="sr-only">GitHub</span>🐙
            </a>
            <a href="https://www.linkedin.com/in/paul-ragueneau/" target="_blank" className="text-3xl hover:text-blue-400 hover:scale-110 transition-all duration-300 group/social" rel="noopener noreferrer">
              <span className="sr-only">LinkedIn</span>💼
            </a>
            <a href="mailto:paul@ragueneau.dev" className="text-3xl hover:text-emerald-400 hover:scale-110 transition-all duration-300 group/social">
              <span className="sr-only">Email</span>✉️
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
