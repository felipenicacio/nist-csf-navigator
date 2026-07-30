import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { csfFunctions } from '../data/functions';
import { csfCategories } from '../data/categories';

const HomePage: React.FC = () => (
  <div className="animate-fadeIn">

    {/* Hero */}
    <section className="relative overflow-hidden" style={{ background: 'linear-gradient(135deg, #0B1F33 0%, #164E73 60%, #0F766E 100%)' }}>
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-10 left-10 w-64 h-64 rounded-full bg-white blur-3xl" />
        <div className="absolute bottom-10 right-10 w-96 h-96 rounded-full bg-teal-300 blur-3xl" />
      </div>
      <div className="relative max-w-screen-xl mx-auto px-4 sm:px-6 py-24 sm:py-32 text-center">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold mb-6 border border-white/20 text-white/80">
          <span className="w-2 h-2 rounded-full bg-teal-400 animate-pulse" />
          NIST Cybersecurity Framework 2.0
        </div>
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-tight mb-5">
          NIST CSF 2.0<br />
          <span style={{ color: '#14B8A6' }}>Navigator</span>
        </h1>
        <p className="text-lg text-white/70 max-w-xl mx-auto leading-relaxed mb-8">
          Explore, compreenda e aplique o NIST Cybersecurity Framework 2.0.
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          <Link to="/intro" className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-semibold text-sm text-slate-900 transition-all hover:opacity-90"
            style={{ backgroundColor: '#14B8A6' }}>
            Conheça o framework <ArrowRight size={16} />
          </Link>
          <Link to="/implementation" className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-semibold text-sm border border-white/30 text-white hover:bg-white/10 transition-all">
            Iniciar implementação <ArrowRight size={16} />
          </Link>
        </div>
      </div>
    </section>

    {/* 3 colunas: Conhecimento | Consulta | Implementação */}
    <section className="max-w-screen-xl mx-auto px-4 sm:px-6 py-16">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

        {/* Conhecimento */}
        <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden">
          <div className="px-6 py-5 border-b border-slate-100" style={{ backgroundColor: '#E0F4FB' }}>
            <p className="text-xs font-bold uppercase tracking-widest mb-1" style={{ color: '#1A7FA8' }}>Conhecimento</p>
            <h3 className="text-lg font-bold text-slate-900">Introdução</h3>
            <p className="text-slate-500 text-xs mt-1">Conheça o framework antes de começar.</p>
          </div>
          <div className="p-5 space-y-2">
            {[
              { to: '/intro', label: 'O que é o NIST CSF 2.0', desc: 'Conceitos, estrutura e usos' },
              { to: '/intro#functions', label: 'As 6 Funções', desc: 'Governar, Identificar, Proteger...' },
              { to: '/glossary', label: 'Glossário', desc: 'Termos e definições' },
            ].map(item => (
              <Link key={item.to} to={item.to} className="flex items-center gap-3 p-2.5 rounded-xl hover:bg-slate-50 transition-colors group">
                <div className="flex-1">
                  <p className="text-sm font-semibold text-slate-800">{item.label}</p>
                  <p className="text-xs text-slate-400">{item.desc}</p>
                </div>
                <ArrowRight size={12} className="text-slate-300 group-hover:text-slate-500 transition-colors shrink-0" />
              </Link>
            ))}
          </div>
        </div>

        {/* Consulta */}
        <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden">
          <div className="px-6 py-5 border-b border-slate-100" style={{ backgroundColor: '#EEECFB' }}>
            <p className="text-xs font-bold uppercase tracking-widest mb-1" style={{ color: '#5B57C0' }}>Consulta</p>
            <h3 className="text-lg font-bold text-slate-900">Framework</h3>
            <p className="text-slate-500 text-xs mt-1">Navegue pelo Core do CSF 2.0.</p>
          </div>
          <div className="p-5 space-y-2">
            {[
              { to: '/map', label: 'Framework Map', desc: 'Visão visual completa' },
              { to: '/framework', label: 'Funções e Categorias', desc: '6 Funções, 106 Subcategorias' },
              { to: '/crosswalk', label: 'Crosswalk', desc: 'CSF x NIST 800-53 x ISO 27002' },
              { to: '/frameworks', label: 'Frameworks Relacionados', desc: '22+ frameworks documentados' },
            ].map(item => (
              <Link key={item.to} to={item.to} className="flex items-center gap-3 p-2.5 rounded-xl hover:bg-slate-50 transition-colors group">
                <div className="flex-1">
                  <p className="text-sm font-semibold text-slate-800">{item.label}</p>
                  <p className="text-xs text-slate-400">{item.desc}</p>
                </div>
                <ArrowRight size={12} className="text-slate-300 group-hover:text-slate-500 transition-colors shrink-0" />
              </Link>
            ))}
          </div>
        </div>

        {/* Implementação */}
        <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden">
          <div className="px-6 py-5 border-b border-slate-100" style={{ backgroundColor: '#E2FAF0' }}>
            <p className="text-xs font-bold uppercase tracking-widest mb-1" style={{ color: '#1E9E52' }}>Implementação</p>
            <h3 className="text-lg font-bold text-slate-900">5 Etapas</h3>
            <p className="text-slate-500 text-xs mt-1">Processo oficial do NIST.</p>
          </div>
          <div className="p-5 space-y-2">
            {[
              { to: '/implementation#escopo', label: '01. Escopo', desc: 'Contexto e definição do escopo' },
              { to: '/implementation#informacoes', label: '02. Reunir Informações', desc: 'Riscos e requisitos' },
              { to: '/implementation#perfil', label: '03. Criar Perfil', desc: 'Perfil Atual e Perfil Alvo' },
              { to: '/implementation#lacunas', label: '04. Lacunas + Plano de Ação', desc: 'Gap Analysis' },
              { to: '/implementation#implementar', label: '05. Implementar + Atualizar', desc: 'Executar e melhorar' },
            ].map(item => (
              <Link key={item.to} to={item.to} className="flex items-center gap-3 p-2.5 rounded-xl hover:bg-slate-50 transition-colors group">
                <div className="flex-1">
                  <p className="text-sm font-semibold text-slate-800">{item.label}</p>
                  <p className="text-xs text-slate-400">{item.desc}</p>
                </div>
                <ArrowRight size={12} className="text-slate-300 group-hover:text-slate-500 transition-colors shrink-0" />
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>

    {/* Functions quick nav */}
    <section className="py-10 px-4 sm:px-6 bg-slate-50 border-t border-slate-200">
      <div className="max-w-screen-xl mx-auto">
        <div className="flex items-center justify-between mb-5">
          <h2 className="text-base font-bold text-slate-900">6 Funções do CSF 2.0</h2>
          <Link to="/framework" className="text-sm font-semibold hover:underline flex items-center gap-1" style={{ color: '#0F766E' }}>
            Explorar <ArrowRight size={13} />
          </Link>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
          {csfFunctions.map(fn => (
            <Link key={fn.id} to={`/framework/${fn.id.toLowerCase()}`} className="group block">
              <div className="rounded-xl overflow-hidden border border-slate-200 hover:shadow-md transition-all hover:-translate-y-0.5">
                <div className="px-4 py-3" style={{ backgroundColor: fn.colorHex }}>
                  <span className="text-xs font-mono font-bold opacity-40 block text-slate-900">{fn.code}</span>
                  <span className="text-sm font-bold text-slate-900">{fn.nameEn}</span>
                </div>
                <div className="px-4 py-2 bg-white">
                  <p className="text-xs text-slate-600">{fn.name}</p>
                  <p className="text-xs text-slate-400 mt-0.5">{csfCategories.filter(c => c.functionId === fn.id).length} categorias</p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>

    {/* Footer note */}
    <section className="py-8 px-4 border-t border-slate-200 bg-white">
      <p className="text-xs text-slate-400 text-center max-w-2xl mx-auto leading-relaxed">
        O NIST CSF 2.0 é desenvolvido pelo National Institute of Standards and Technology (NIST). Este Navigator é uma ferramenta educacional independente e não substitui a consulta ao documento oficial.
      </p>
    </section>

  </div>
);

export default HomePage;
