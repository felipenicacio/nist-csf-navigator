import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Map, BookOpen, ClipboardList, TrendingUp, Search } from 'lucide-react';
import { getFnColors } from '../utils/fnColors';
import { csfFunctions } from '../data/functions';
import { csfCategories } from '../data/categories';

const HomePage: React.FC = () => {
  return (
    <div className="animate-fadeIn">

      {/* Beginner banner */}
      <div style={{ backgroundColor: '#0B1F33' }} className="px-4 py-2.5">
        <div className="max-w-screen-xl mx-auto flex items-center justify-between gap-4">
          <p className="text-white/80 text-xs sm:text-sm font-medium">
            Novo no NIST CSF 2.0? Comece por aqui.
          </p>
          <Link to="/intro" className="shrink-0 text-xs font-bold px-3 py-1.5 bg-white rounded-lg hover:bg-slate-100 transition-colors whitespace-nowrap" style={{ color: '#0B1F33' }}>
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
              Explore, compreenda e implemente o NIST Cybersecurity Framework 2.0. Uma ferramenta visual para compreender, explorar e orientar a implementação do CSF 2.0.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link to="/map" className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-semibold text-sm transition-all" style={{ backgroundColor: '#14B8A6', color: '#0B1F33' }}>
                <Map size={16} /> Ver Framework Map
              </Link>
              <Link to="/roadmap" className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-semibold text-sm border border-white/30 text-white hover:bg-white/10 transition-all">
                <TrendingUp size={16} /> Implementation Roadmap
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* GOVERN highlight */}
      <section className="py-10 px-4 sm:px-6 border-b border-slate-200" style={{ backgroundColor: getFnColors('GV').bg }}>
        <div className="max-w-screen-xl mx-auto">
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-5">
            <div className="flex items-center gap-4 shrink-0">
              <div className="w-16 h-16 rounded-2xl flex items-center justify-center font-black text-2xl" style={{ backgroundColor: '#FFF59D', color: '#C8A800' }}>
                GV
              </div>
              <div>
                <p className="text-xs font-bold uppercase tracking-widest" style={{ color: '#C8A800' }}>Nova no CSF 2.0</p>
                <h2 className="text-xl font-bold text-slate-900">Função GOVERN</h2>
              </div>
            </div>
            <div className="flex-1">
              <p className="text-sm text-slate-700 leading-relaxed">
                O CSF 2.0 introduziu o GOVERN como a Função que permeia todas as outras. Ela conecta cibersegurança com governança corporativa, gestão de riscos empresariais (ERM) e tomada de decisão estratégica. É o ponto de partida de qualquer programa baseado no CSF.
              </p>
            </div>
            <Link to="/framework/gv" className="shrink-0 inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold transition-all hover:opacity-80" style={{ backgroundColor: '#C8A800', color: '#fff' }}>
              Explorar GOVERN <ArrowRight size={14} />
            </Link>
          </div>
        </div>
      </section>

      {/* Three trails */}
      <section className="py-16 px-4 sm:px-6 max-w-screen-xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 mb-3">Três trilhas. Um framework.</h2>
          <p className="text-slate-500 max-w-xl mx-auto text-sm">Cada perfil de usuário tem um caminho diferente. Escolha o seu ponto de entrada.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

          {/* Trail 1: Beginner */}
          <div className="rounded-2xl border-2 border-slate-200 overflow-hidden flex flex-col">
            <div className="px-6 py-5 border-b border-slate-100" style={{ backgroundColor: getFnColors('ID').light }}>
              <p className="text-xs font-bold uppercase tracking-widest mb-1" style={{ color: getFnColors('ID').text }}>APRENDER</p>
              <h3 className="text-lg font-bold text-slate-900">Sou novo no NIST CSF</h3>
              <p className="text-slate-500 text-xs mt-1 leading-relaxed">Quero entender o que é, para que serve e como funciona.</p>
            </div>
            <div className="p-5 space-y-2 flex-1">
              {[
                { to: '/intro', label: 'Introdução ao NIST CSF 2.0', desc: 'O que é, por que existe, como funciona' },
                { to: '/map', label: 'Framework Map', desc: 'Visão visual de toda a estrutura' },
                { to: '/framework', label: 'Explorar Funções', desc: '6 Funções, 17 Categorias, 106 Subcategorias' },
                { to: '/glossary', label: 'Glossário', desc: 'Termos e definições em linguagem acessível' },
              ].map(item => (
                <Link key={item.to} to={item.to} className="flex items-center gap-3 p-2.5 rounded-xl hover:bg-slate-50 transition-colors group">
                  <div className="w-7 h-7 rounded-lg flex items-center justify-center shrink-0" style={{ backgroundColor: getFnColors('ID').bg }}>
                    <BookOpen size={13} style={{ color: getFnColors('ID').text }} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold text-slate-800 truncate">{item.label}</p>
                    <p className="text-xs text-slate-400">{item.desc}</p>
                  </div>
                  <ArrowRight size={12} className="text-slate-300 group-hover:text-slate-500 transition-colors shrink-0" />
                </Link>
              ))}
            </div>
          </div>

          {/* Trail 2: Professional */}
          <div className="rounded-2xl border-2 border-slate-200 overflow-hidden flex flex-col">
            <div className="px-6 py-5 border-b border-slate-100" style={{ backgroundColor: getFnColors('PR').light }}>
              <p className="text-xs font-bold uppercase tracking-widest mb-1" style={{ color: getFnColors('PR').text }}>EXPLORAR</p>
              <h3 className="text-lg font-bold text-slate-900">Já conheço o CSF</h3>
              <p className="text-slate-500 text-xs mt-1 leading-relaxed">Quero navegar pelo Core, Crosswalks e frameworks relacionados.</p>
            </div>
            <div className="p-5 space-y-2 flex-1">
              {[
                { to: '/framework', label: 'Funções e Categorias', desc: 'Navegue pelo CSF Core completo' },
                { to: '/crosswalk', label: 'Crosswalk Explorer', desc: 'CSF x NIST 800-53 x ISO 27002 x CIS' },
                { to: '/frameworks', label: 'Frameworks Relacionados', desc: '22+ frameworks documentados' },
                { to: '/tiers', label: 'Níveis (Tiers)', desc: 'Governança e gestão por Função' },
              ].map(item => (
                <Link key={item.to} to={item.to} className="flex items-center gap-3 p-2.5 rounded-xl hover:bg-slate-50 transition-colors group">
                  <div className="w-7 h-7 rounded-lg flex items-center justify-center shrink-0" style={{ backgroundColor: getFnColors('PR').bg }}>
                    <Search size={13} style={{ color: getFnColors('PR').text }} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold text-slate-800 truncate">{item.label}</p>
                    <p className="text-xs text-slate-400">{item.desc}</p>
                  </div>
                  <ArrowRight size={12} className="text-slate-300 group-hover:text-slate-500 transition-colors shrink-0" />
                </Link>
              ))}
            </div>
          </div>

          {/* Trail 3: Consultant / CISO */}
          <div className="rounded-2xl border-2 border-slate-200 overflow-hidden flex flex-col">
            <div className="px-6 py-5 border-b border-slate-100" style={{ backgroundColor: getFnColors('RC').light }}>
              <p className="text-xs font-bold uppercase tracking-widest mb-1" style={{ color: getFnColors('RC').text }}>IMPLEMENTAR</p>
              <h3 className="text-lg font-bold text-slate-900">Sou consultor ou CISO</h3>
              <p className="text-slate-500 text-xs mt-1 leading-relaxed">Quero estruturar ou avaliar um programa de cibersegurança.</p>
            </div>
            <div className="p-5 space-y-2 flex-1">
              {[
                { to: '/roadmap', label: 'Implementation Roadmap', desc: '10 fases do zero ao programa completo' },
                { to: '/profiles', label: 'Perfis Organizacionais', desc: 'Current Profile, Target Profile, Gap Analysis' },
                { to: '/consultant', label: 'Assessment Navigator', desc: 'Perguntas e evidências por Subcategoria' },
                { to: '/erm', label: 'Enterprise Risk Management', desc: '6 Activity Points do CSF no ERM' },
              ].map(item => (
                <Link key={item.to} to={item.to} className="flex items-center gap-3 p-2.5 rounded-xl hover:bg-slate-50 transition-colors group">
                  <div className="w-7 h-7 rounded-lg flex items-center justify-center shrink-0" style={{ backgroundColor: getFnColors('RC').bg }}>
                    <ClipboardList size={13} style={{ color: getFnColors('RC').text }} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold text-slate-800 truncate">{item.label}</p>
                    <p className="text-xs text-slate-400">{item.desc}</p>
                  </div>
                  <ArrowRight size={12} className="text-slate-300 group-hover:text-slate-500 transition-colors shrink-0" />
                </Link>
              ))}
            </div>
          </div>

        </div>
      </section>

      {/* "Comece aqui" guided flow */}
      <section className="py-14 px-4 sm:px-6 bg-slate-50 border-y border-slate-200">
        <div className="max-w-screen-xl mx-auto">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
            <div>
              <h2 className="text-xl font-bold text-slate-900 mb-1">Comece aqui</h2>
              <p className="text-slate-500 text-sm">Sequência orientativa para quem está iniciando um programa baseado no NIST CSF.</p>
            </div>
            <Link to="/roadmap" className="shrink-0 inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold text-white transition-colors hover:opacity-90" style={{ backgroundColor: '#0B1F33' }}>
              Ver Roadmap completo <ArrowRight size={14} />
            </Link>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
            {[
              { n: '01', label: 'Governança e contexto', to: '/roadmap', color: '#C8A800', bg: '#FFF9C4' },
              { n: '02', label: 'Perfil Atual', to: '/profiles', color: '#1A7FA8', bg: '#E0F4FB' },
              { n: '03', label: 'Avaliação de Riscos', to: '/roadmap', color: '#1A7FA8', bg: '#E0F4FB' },
              { n: '04', label: 'Perfil Alvo', to: '/profiles', color: '#C8A800', bg: '#FFF9C4' },
              { n: '05', label: 'Gap Analysis', to: '/roadmap', color: '#1A7FA8', bg: '#E0F4FB' },
              { n: '06', label: 'Priorização', to: '/roadmap', color: '#C8A800', bg: '#FFF9C4' },
              { n: '07', label: 'Plano de Ação', to: '/roadmap', color: '#5B57C0', bg: '#EEECFB' },
              { n: '08', label: 'Implementação', to: '/framework', color: '#5B57C0', bg: '#EEECFB' },
              { n: '09', label: 'Medição', to: '/roadmap', color: '#C8A800', bg: '#FFF9C4' },
              { n: '10', label: 'Melhoria Contínua', to: '/roadmap', color: '#1E9E52', bg: '#E2FAF0' },
            ].map((step) => (
              <Link key={step.n} to={step.to} className="rounded-xl p-3 text-center hover:shadow-md hover:-translate-y-0.5 transition-all border" style={{ backgroundColor: step.bg, borderColor: `${step.color}30` }}>
                <span className="text-lg font-black block" style={{ color: `${step.color}40` }}>{step.n}</span>
                <span className="text-xs font-semibold leading-tight block" style={{ color: step.color }}>{step.label}</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Functions quick nav */}
      <section className="py-12 px-4 sm:px-6">
        <div className="max-w-screen-xl mx-auto">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-bold text-slate-900">6 Funções do CSF 2.0</h2>
            <Link to="/map" className="text-sm font-semibold hover:underline flex items-center gap-1" style={{ color: '#0F766E' }}>
              Ver Framework Map <ArrowRight size={14} />
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-3">
            {csfFunctions.map(fn => (
              <Link key={fn.id} to={`/framework/${fn.id.toLowerCase()}`} className="group block">
                <div className="rounded-xl overflow-hidden border border-slate-200 hover:shadow-md transition-all hover:-translate-y-0.5">
                  <div className="px-4 py-3" style={{ backgroundColor: fn.colorHex }}>
                    <span className="text-xs font-mono font-bold opacity-40 block text-slate-900">{fn.code}</span>
                    <span className="text-sm font-bold text-slate-900">{fn.nameEn}</span>
                    {fn.id === 'GV' && (
                      <span className="text-xs font-bold block mt-0.5 opacity-60 text-slate-800">Nova no CSF 2.0</span>
                    )}
                  </div>
                  <div className="px-4 py-2 bg-white">
                    <p className="text-xs text-slate-600">{fn.name}</p>
                    <p className="text-xs text-slate-400 mt-0.5">
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
      <section className="py-12 px-4 sm:px-6 bg-slate-50 border-t border-slate-200">
        <div className="max-w-screen-xl mx-auto grid grid-cols-2 sm:grid-cols-4 gap-6 text-center">
          {[
            { value: '6', label: 'Funções' },
            { value: '17', label: 'Categorias' },
            { value: '106', label: 'Subcategorias' },
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
      <section className="py-8 px-4 sm:px-6 bg-white border-t border-slate-200">
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
