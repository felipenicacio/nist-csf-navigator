import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Map, BookOpen, ClipboardList, GitBranch } from 'lucide-react';
import { getFnColors } from '../utils/fnColors';
import { csfFunctions } from '../data/functions';
import { csfCategories } from '../data/categories';

const HomePage: React.FC = () => {
  return (
    <div className="animate-fadeIn">
      {/* Beginner onboarding banner */}
      <div className="bg-blue-700 px-4 py-2.5">
        <div className="max-w-screen-xl mx-auto flex items-center justify-between gap-4">
          <p className="text-white/90 text-xs sm:text-sm font-medium">
            Novo no NIST CSF 2.0? Comece por aqui.
          </p>
          <Link to="/intro" className="shrink-0 text-xs font-bold px-3 py-1.5 bg-white text-blue-700 rounded-lg hover:bg-blue-50 transition-colors whitespace-nowrap">
            Ver Introdução →
          </Link>
        </div>
      </div>

      {/* Hero */}
      <section className="relative overflow-hidden" style={{ background: 'linear-gradient(135deg, #0B1F33 0%, #164E73 60%, #0F766E 100%)' }}>
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 left-10 w-64 h-64 rounded-full bg-white blur-3xl" />
          <div className="absolute bottom-10 right-10 w-96 h-96 rounded-full bg-teal-300 blur-3xl" />
        </div>
        <div className="relative max-w-screen-xl mx-auto px-4 sm:px-6 py-20 sm:py-28">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold mb-6 border border-white/20 text-white/80">
              <span className="w-2 h-2 rounded-full bg-teal-400 animate-pulse" />
              NIST Cybersecurity Framework 2.0
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-tight mb-6">
              NIST CSF 2.0<br />
              <span style={{ color: '#14B8A6' }}>Cybersecurity</span><br />
              Framework Navigator
            </h1>
            <p className="text-lg text-white/70 mb-10 max-w-2xl leading-relaxed">
              Explore, compreenda e implemente o NIST Cybersecurity Framework 2.0. Visualize relações com NIST SP 800-53, ISO/IEC 27002, CIS Controls e outros frameworks.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link to="/map" className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-semibold text-sm transition-all" style={{ backgroundColor: '#14B8A6', color: '#0B1F33' }}>
                <Map size={16} /> Ver Framework Map
              </Link>
              <Link to="/consultant" className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-semibold text-sm border border-white/30 text-white hover:bg-white/10 transition-all">
                <ClipboardList size={16} /> Consultant View
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Two clear paths */}
      <section className="py-16 px-4 sm:px-6 max-w-screen-xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 mb-3">Dois caminhos. Um framework.</h2>
          <p className="text-slate-500 max-w-xl mx-auto">Para quem quer aprender e para quem está implementando.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* EXPLORAR */}
          <div className="rounded-2xl border-2 border-slate-200 overflow-hidden">
            <div className="px-8 py-6 border-b border-slate-100" style={{ backgroundColor: getFnColors('ID').light }}>
              <p className="text-xs font-bold uppercase tracking-widest mb-1" style={{ color: getFnColors('ID').text }}>EXPLORAR</p>
              <h3 className="text-xl font-bold text-slate-900">Entenda o NIST CSF 2.0</h3>
              <p className="text-slate-500 text-sm mt-1">Para quem quer compreender o framework, suas funções e relações com outros padrões.</p>
            </div>
            <div className="p-6 space-y-3">
              {[
                { to: '/map', icon: <Map size={15} />, label: 'Framework Map', desc: 'Visão visual de toda a estrutura' },
                { to: '/framework', icon: <BookOpen size={15} />, label: 'Explorar Framework', desc: '6 Functions · 17 Categories · 106 Subcategories' },
                { to: '/crosswalk', icon: <GitBranch size={15} />, label: 'Crosswalk', desc: 'NIST 800-53, ISO 27002, CIS Controls' },
                { to: '/frameworks', icon: <ArrowRight size={15} />, label: 'Frameworks Relacionados', desc: '22+ frameworks documentados' },
              ].map(item => (
                <Link key={item.to} to={item.to} className="flex items-center gap-3 p-3 rounded-xl hover:bg-slate-50 transition-colors group">
                  <div className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0" style={{ backgroundColor: getFnColors('ID').light, color: getFnColors('ID').text }}>
                    {item.icon}
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-semibold text-slate-800">{item.label}</p>
                    <p className="text-xs text-slate-400">{item.desc}</p>
                  </div>
                  <ArrowRight size={14} className="text-slate-300 group-hover:text-slate-500 transition-colors" />
                </Link>
              ))}
            </div>
          </div>

          {/* IMPLEMENTAR */}
          <div className="rounded-2xl border-2 border-slate-200 overflow-hidden">
            <div className="px-8 py-6 border-b border-slate-100" style={{ backgroundColor: getFnColors('PR').light }}>
              <p className="text-xs font-bold uppercase tracking-widest mb-1" style={{ color: getFnColors('PR').text }}>IMPLEMENTAR</p>
              <h3 className="text-xl font-bold text-slate-900">Coloque em prática</h3>
              <p className="text-slate-500 text-sm mt-1">Para consultores, CISOs e equipes que estão iniciando ou melhorando um programa de cibersegurança.</p>
            </div>
            <div className="p-6 space-y-3">
              {[
                { to: '/implementation', icon: <ClipboardList size={15} />, label: 'Guia de Implementação', desc: 'Current Profile → Target Profile' },
                { to: '/consultant', icon: <ArrowRight size={15} />, label: 'Consultant View', desc: 'Roteiro de assessment por subcategory' },
                { to: '/tiers', icon: <ArrowRight size={15} />, label: 'Tiers', desc: 'Avalie o nível de maturidade' },
                { to: '/profiles', icon: <ArrowRight size={15} />, label: 'Profiles', desc: 'Current e Target Profile explicados' },
              ].map(item => (
                <Link key={item.to} to={item.to} className="flex items-center gap-3 p-3 rounded-xl hover:bg-slate-50 transition-colors group">
                  <div className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0" style={{ backgroundColor: getFnColors('PR').light, color: getFnColors('PR').text }}>
                    {item.icon}
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-semibold text-slate-800">{item.label}</p>
                    <p className="text-xs text-slate-400">{item.desc}</p>
                  </div>
                  <ArrowRight size={14} className="text-slate-300 group-hover:text-slate-500 transition-colors" />
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Functions quick nav */}
      <section className="py-12 px-4 sm:px-6 bg-slate-50 border-y border-slate-200">
        <div className="max-w-screen-xl mx-auto">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-bold text-slate-900">6 Functions · Navegação Rápida</h2>
            <Link to="/map" className="text-sm font-semibold text-teal-600 hover:underline flex items-center gap-1">
              Ver Framework Map <ArrowRight size={14} />
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-3">
            {csfFunctions.map(fn => (
              <Link key={fn.id} to={`/framework/${fn.id.toLowerCase()}`} className="group block">
                <div className="rounded-xl overflow-hidden border border-slate-200 hover:shadow-md transition-all hover:-translate-y-0.5">
                  <div className="px-4 py-3" style={{ backgroundColor: fn.color }}>
                    <span className="text-xs font-mono text-white/40 block">{fn.code}</span>
                    <span className="text-sm font-bold text-white">{fn.nameEn}</span>
                  </div>
                  <div className="px-4 py-2 bg-white">
                    <p className="text-xs text-slate-500">{fn.name}</p>
                    <p className="text-xs text-slate-300 mt-1">
                      {csfCategories.filter(c => c.functionId === fn.id).length} categorias
                    </p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-14 px-4 sm:px-6 max-w-screen-xl mx-auto">
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 text-center">
          {[
            { value: '6', label: 'Functions' },
            { value: '17', label: 'Categories' },
            { value: '106', label: 'Subcategories' },
            { value: '22+', label: 'Frameworks Relacionados' },
          ].map(s => (
            <div key={s.label}>
              <div className="text-4xl font-bold mb-1" style={{ color: '#0B1F33' }}>{s.value}</div>
              <div className="text-sm text-slate-500 font-medium">{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Disclaimer */}
      <section className="py-8 px-4 sm:px-6 bg-slate-50 border-t border-slate-200">
        <div className="max-w-screen-xl mx-auto">
          <p className="text-xs text-slate-400 text-center max-w-3xl mx-auto leading-relaxed">
            O NIST CSF 2.0 é desenvolvido pelo National Institute of Standards and Technology (NIST). Este Navigator é uma ferramenta educacional independente e não substitui a consulta ao documento oficial.
            Os mapeamentos são orientativos e não representam equivalências absolutas entre frameworks.
          </p>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
