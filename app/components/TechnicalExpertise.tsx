export default function TechnicalExpertise() {
  return (
    <section id="skills" className="py-32 px-4 bg-linear-to-b from-slate-900/50 to-slate-900/80">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-20">
          <h3 className="text-5xl md:text-6xl font-black mb-6 bg-linear-to-b from-purple-400 to-pink-400 bg-clip-text text-transparent">
            Technical Expertise
          </h3>
          <div className="w-24 h-1 bg-linear-to-b from-purple-500 to-pink-500 mx-auto rounded-full" />
        </div>

        <div className="grid md:grid-cols-3 gap-12">
          {/* Frontend */}
          <div className="text-center group">
            <h4 className="text-3xl font-black mb-8 bg-linear-to-b from-cyan-400 to-blue-400 bg-clip-text text-transparent">
              Frontend Development
            </h4>
            <div className="space-y-6">
              <div className="flex items-center justify-center gap-4 mb-4">
                <span className="text-2xl">⚛️</span>
                <span className="text-xl font-bold text-slate-300">Next.js & React</span>
              </div>
              <div className="w-full bg-slate-800 rounded-full h-3">
                <div className="bg-linear-to-b from-cyan-500 to-blue-500 h-3 rounded-full group-hover:w-[97%] transition-all duration-1000" style={{width: '95%'}} />
              </div>
              <span className="text-sm font-mono text-slate-500">95%</span>

              <div className="flex items-center justify-center gap-4">
                <span className="text-2xl">🔤</span>
                <span className="text-xl font-bold text-slate-300">TypeScript</span>
              </div>
              <div className="w-full bg-slate-800 rounded-full h-3">
                <div className="bg-linear-to-b from-indigo-500 to-purple-500 h-3 rounded-full group-hover:w-[92%] transition-all duration-1000" style={{width: '90%'}} />
              </div>
              <span className="text-sm font-mono text-slate-500">90%</span>

              <div className="flex items-center justify-center gap-4">
                <span className="text-xl">🎨</span>
                <span className="text-xl font-bold text-slate-300">TailwindCSS</span>
              </div>
              <div className="w-full bg-slate-800 rounded-full h-3">
                <div className="bg-linear-to-b from-emerald-500 to-teal-500 h-3 rounded-full group-hover:w-[93%] transition-all duration-1000" style={{width: '92%'}} />
              </div>
              <span className="text-sm font-mono text-slate-500">92%</span>
            </div>
          </div>

          {/* Backend & APIs */}
          <div className="text-center group">
            <h4 className="text-3xl font-black mb-8 bg-linear-to-b from-emerald-400 to-teal-400 bg-clip-text text-transparent">
              Backend & APIs
            </h4>
            <div className="space-y-6">
              <div className="flex items-center justify-center gap-4 mb-4">
                <span className="text-2xl">🐳</span>
                <span className="text-xl font-bold text-slate-300">Docker</span>
              </div>
              <div className="w-full bg-slate-800 rounded-full h-3">
                <div className="bg-linear-to-b from-emerald-500 to-green-500 h-3 rounded-full group-hover:w-[92%] transition-all duration-1000" style={{width: '90%'}} />
              </div>
              <span className="text-sm font-mono text-slate-500">90%</span>

              <div className="flex items-center justify-center gap-4">
                <span className="text-2xl">🐘</span>
                <span className="text-xl font-bold text-slate-300">PostgreSQL</span>
              </div>
              <div className="w-full bg-slate-800 rounded-full h-3">
                <div className="bg-linear-to-b from-blue-500 to-indigo-500 h-3 rounded-full group-hover:w-[93%] transition-all duration-1000" style={{width: '92%'}} />
              </div>
              <span className="text-sm font-mono text-slate-500">93%</span>

              <div className="flex items-center justify-center gap-4">
                <span className="text-xl">⚡</span>
                <span className="text-xl font-bold text-slate-300">FastAPI</span>
              </div>
              <div className="w-full bg-slate-800 rounded-full h-3">
                <div className="bg-linear-to-b from-orange-500 to-yellow-500 h-3 rounded-full group-hover:w-[88%] transition-all duration-1000" style={{width: '88%'}} />
              </div>
              <span className="text-sm font-mono text-slate-500">88%</span>
            </div>
          </div>

          {/* DevOps & Performance */}
          <div className="text-center group">
            <h4 className="text-3xl font-black mb-8 bg-linear-to-b from-purple-400 to-rose-400 bg-clip-text text-transparent">
              DevOps & Performance
            </h4>
            <div className="space-y-6">
              <div className="flex items-center justify-center gap-4 mb-4">
                <span className="text-2xl">🐙</span>
                <span className="text-xl font-bold text-slate-300">Microservices</span>
              </div>
              <div className="w-full bg-slate-800 rounded-full h-3">
                <div className="bg-linear-to-b from-violet-500 to-purple-500 h-3 rounded-full group-hover:w-[91%] transition-all duration-1000" style={{width: '89%'}} />
              </div>
              <span className="text-sm font-mono text-slate-500">89%</span>

              <div className="flex items-center justify-center gap-4">
                <span className="text-2xl">🌐</span>
                <span className="text-xl font-bold text-slate-300">Kubernetes</span>
              </div>
              <div className="w-full bg-slate-800 rounded-full h-3">
                <div className="bg-linear-to-b from-indigo-500 to-cyan-500 h-3 rounded-full group-hover:w-[87%] transition-all duration-1000" style={{width: '85%'}} />
              </div>
              <span className="text-sm font-mono text-slate-500">85%</span>

              <div className="flex items-center justify-center gap-4">
                <span className="text-xl">🚀</span>
                <span className="text-xl font-bold text-slate-300">CI/CD</span>
              </div>
              <div className="w-full bg-slate-800 rounded-full h-3">
                <div className="bg-linear-to-b from-amber-500 to-orange-500 h-3 rounded-full group-hover:w-[90%] transition-all duration-1000" style={{width: '88%'}} />
              </div>
              <span className="text-sm font-mono text-slate-500">88%</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
