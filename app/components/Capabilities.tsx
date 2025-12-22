export default function Capabilities() {
  const capabilities = [
    {
      title: "Containerization",
      icon: "🐳",
      skills: ["Docker", "Docker Compose", "Multi-stage builds"],
      gradient: "from-emerald-500 to-teal-500"
    },
    {
      title: "Microservices",
      icon: "🌐",
      skills: ["FastAPI", "NestJS", "Kubernetes", "Service Mesh"],
      gradient: "from-purple-500 to-pink-500"
    },
    {
      title: "Database Design",
      icon: "🗄️",
      skills: ["PostgreSQL", "MongoDB", "Prisma ORM", "Redis"],
      gradient: "from-blue-500 to-indigo-500"
    },
    {
      title: "Real-time Apps",
      icon: "⚡",
      skills: ["WebSockets", "Socket.io", "Server-Sent Events"],
      gradient: "from-yellow-500 to-orange-500"
    },
    {
      title: "DevOps Pipeline",
      icon: "🚀",
      skills: ["CI/CD", "GitHub Actions", "Terraform", "Monitoring"],
      gradient: "from-cyan-500 to-sky-500"
    },
    {
      title: "Modern Frontend",
      icon: "⚛️",
      skills: ["Next.js 16", "App Router", "TypeScript", "TailwindCSS"],
      gradient: "from-violet-500 to-fuchsia-500"
    }
  ]

  return (
    <section className="py-32 px-4 bg-gradient-to-b from-slate-900/40 via-purple-900/10 to-slate-900/60">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-24">
          <h3 className="text-5xl md:text-6xl font-black mb-8 bg-gradient-to-r from-white via-purple-300 to-pink-300 bg-clip-text text-transparent drop-shadow-2xl">
            Modern Web Capabilities
          </h3>
          <div className="w-32 h-1 bg-gradient-to-r from-purple-500 via-pink-500 to-purple-500 mx-auto rounded-full shadow-lg" />
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {capabilities.map((cap, index) => (
            <div 
              key={index} 
              className="group bg-slate-900/60 backdrop-blur-xl border border-slate-700/50 rounded-3xl p-10 h-full hover:border-purple-500/60 hover:bg-slate-900/80 hover:shadow-2xl hover:shadow-purple-500/20 transition-all duration-700 transform hover:-translate-y-6 hover:scale-[1.02]"
            >
              {/* Icon & Title */}
              <div className="flex items-center gap-4 mb-8">
                <div className={`text-5xl p-4 rounded-2xl bg-gradient-to-br ${cap.gradient} shadow-2xl group-hover:scale-110 transition-all duration-500`}>
                  <span>{cap.icon}</span>
                </div>
                <h4 className="text-2xl md:text-3xl font-black bg-gradient-to-r from-slate-200 to-slate-300 bg-clip-text text-transparent group-hover:from-purple-400 group-hover:to-pink-400 transition-all duration-700">
                  {cap.title}
                </h4>
              </div>

              {/* Skills List */}
              <ul className="space-y-3">
                {cap.skills.map((skill, i) => (
                  <li key={i} className="flex items-center gap-3 group-hover:translate-x-4 transition-all duration-500">
                    <span className="text-lg font-bold text-emerald-400 group-hover:text-emerald-300">▹</span>
                    <span className="text-lg font-mono text-slate-300 hover:text-white transition-colors duration-300">
                      {skill}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
