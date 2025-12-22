export default function FeaturedProjects() {
  const projects = [
    {
      name: "Petfriendly Locator",
      description: "Plateforme de géolocalisation des lieux pet-friendly avec recherche avancée et filtres intelligents",
      metrics: { performance: 97, accessibility: 98, seo: 95 },
      tech: ["Next.js", "PostgreSQL", "TailwindCSS", "Leaflet Maps"],
      link: "https://gitlab.com/Periicles/petfriendlylocator",
      gradient: "from-emerald-500 to-teal-500"
    },
    {
      name: "MY_RPG",
      description: "Jeu de rôle multijoueur avec système de combat temps réel et progression persistante",
      metrics: { performance: 94, accessibility: 96, seo: 92 },
      tech: ["React", "Node.js", "Socket.io", "MongoDB"],
      link: "https://github.com/Periicles/RPG",
      gradient: "from-purple-500 to-pink-500"
    }
  ]

  return (
    <section id="projects" className="py-32 px-4 bg-gradient-to-b from-slate-900/20 to-slate-900/60 backdrop-blur-sm">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-20">
          <h3 className="text-5xl md:text-6xl font-black mb-6 bg-gradient-to-r from-pink-400 to-purple-400 bg-clip-text text-transparent">
            Featured Projects
          </h3>
          <div className="w-24 h-1 bg-gradient-to-r from-pink-500 to-purple-500 mx-auto rounded-full" />
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {projects.map((project, index) => (
            <div key={index} className="group bg-slate-900/50 backdrop-blur-sm border border-slate-700/50 rounded-3xl p-12 hover:border-purple-500/50 hover:bg-slate-900/70 transition-all duration-500 transform hover:-translate-y-4 hover:shadow-2xl hover:shadow-purple-500/20">
              {/* Project Name */}
              <h4 className="text-3xl md:text-4xl font-black mb-6 bg-gradient-to-r from-white to-slate-300 bg-clip-text text-transparent group-hover:from-purple-400 group-hover:to-pink-400 transition-all duration-700">
                {project.name}
              </h4>
              
              {/* Description */}
              <p className="text-xl mb-12 text-slate-300 leading-relaxed max-w-lg">
                {project.description}
              </p>

              {/* Performance Metrics */}
              <div className="grid grid-cols-3 gap-4 mb-12">
                <div className="text-center p-4 bg-slate-800/50 rounded-2xl group-hover:bg-slate-700/50 transition-all duration-500">
                  <div className="text-3xl font-black text-emerald-400 mb-2">{project.metrics.performance}</div>
                  <div className="text-sm font-mono uppercase tracking-wider text-slate-400">performance</div>
                </div>
                <div className="text-center p-4 bg-slate-800/50 rounded-2xl group-hover:bg-slate-700/50 transition-all duration-500">
                  <div className="text-3xl font-black text-cyan-400 mb-2">{project.metrics.accessibility}</div>
                  <div className="text-sm font-mono uppercase tracking-wider text-slate-400">accessibility</div>
                </div>
                <div className="text-center p-4 bg-slate-800/50 rounded-2xl group-hover:bg-slate-700/50 transition-all duration-500">
                  <div className="text-3xl font-black text-amber-400 mb-2">{project.metrics.seo}</div>
                  <div className="text-sm font-mono uppercase tracking-wider text-slate-400">seo</div>
                </div>
              </div>

              {/* Technical Implementation */}
              <div className="mb-12">
                <h5 className="text-lg font-bold mb-6 text-slate-200 flex items-center gap-2">
                  <span className="text-2xl">▹</span> Technical Implementation
                </h5>
                <div className="flex flex-wrap gap-3">
                  {project.tech.map((tech, i) => (
                    <span key={i} className="px-4 py-2 bg-gradient-to-r from-slate-700/50 to-slate-600/50 backdrop-blur-sm rounded-full text-sm font-mono border border-slate-500/30 hover:bg-purple-500/20 group-hover:translate-x-2 transition-all duration-300">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              {/* CTA Button */}
              <a
                href={project.link}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-purple-600 via-pink-600 to-purple-700 hover:from-purple-700 hover:via-pink-700 hover:to-purple-800 text-lg font-bold rounded-2xl shadow-xl hover:shadow-purple-500/25 transition-all duration-500 transform hover:-translate-y-1 group-hover:scale-105 border-2 border-transparent hover:border-purple-500/50"
              >
                View Project
                <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
