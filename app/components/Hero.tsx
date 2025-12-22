export default function Hero() {
  return (
    <section className="min-h-screen flex items-center justify-center px-4 py-20 text-center bg-linear-to-r from-slate-900/80 to-purple-900/20">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-6xl md:text-7xl font-black mb-6 bg-linear-to-r from-white to-purple-200 bg-clip-text text-transparent drop-shadow-2xl">
          Paul Ragueneau
        </h1>
        <h2 className="text-2xl md:text-3xl font-bold mb-8 text-slate-300">Web Developer</h2>
        <p className="text-xl md:text-2xl mb-12 max-w-2xl mx-auto leading-relaxed text-slate-400">
          Crafting scalable microservices & epic motorcycle adventures with modern web technologies
        </p>

        <div className="flex flex-wrap gap-4 justify-center mb-12">
          <span className="px-4 py-2 bg-purple-500/20 backdrop-blur-sm border border-purple-500/30 rounded-full text-sm font-medium text-purple-200">
            Next.js
          </span>
          <span className="px-4 py-2 bg-blue-500/20 backdrop-blur-sm border border-blue-500/30 rounded-full text-sm font-medium text-blue-200">
            React
          </span>
          <span className="px-4 py-2 bg-cyan-500/20 backdrop-blur-sm border border-cyan-500/30 rounded-full text-sm font-medium text-cyan-200">
            TypeScript
          </span>
          <span className="px-4 py-2 bg-teal-500/20 backdrop-blur-sm border border-teal-500/30 rounded-full text-sm font-medium text-teal-200">
            Docker
          </span>
          <span className="px-4 py-2 bg-indigo-500/20 backdrop-blur-sm border border-indigo-500/30 rounded-full text-sm font-medium text-indigo-200">
            PostgreSQL
          </span>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a
            href="#projects"
            className="px-8 py-4 bg-linear-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 text-lg font-bold rounded-full shadow-2xl hover:shadow-purple-500/25 transition-all duration-300 transform hover:-translate-y-1 border-2 border-transparent hover:border-purple-500/50"
          >
            View My Work
          </a>
          <a
            href="#contact"
            className="px-8 py-4 bg-white/10 backdrop-blur-sm hover:bg-white/20 text-lg font-bold rounded-full border-2 border-white/30 hover:border-white/50 transition-all duration-300"
          >
            Get in Touch
          </a>
        </div>

        <div className="flex justify-center gap-6 mt-16 opacity-75">
          <a href="https://github.com/Periicles" className="text-2xl hover:text-purple-400 transition-colors">🐙</a>
          <a href="https://www.linkedin.com/in/paul-ragueneau/" className="text-2xl hover:text-blue-400 transition-colors">💼</a>
          <a href="#" className="text-2xl hover:text-sky-400 transition-colors">🐦</a>
          <a href="#" className="text-2xl hover:text-slate-400 transition-colors">✍️</a>
        </div>
      </div>
    </section>
  )
}
