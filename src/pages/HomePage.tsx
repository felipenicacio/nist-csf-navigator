import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Shield, Search, Lock, Eye, Zap, RefreshCw, BookOpen, GitBranch, BarChart3 } from 'lucide-react';
import { csfFunctions } from '../data/functions';
import { csfCategories } from '../data/categories';

const fnIcons: Record<string, React.ReactNode> = {
  GV: <Shield size={20} />, ID: <Search size={20} />, PR: <Lock size={20} />,
  DE: <Eye size={20} />, RS: <Zap size={20} />, RC: <RefreshCw size={20} />,
};

const HomePage: React.FC = () => {
  return (
    <div className="animate-fadeIn">
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
              Explore visualmente o NIST Cybersecurity Framework 2.0, compreenda suas funções, categorias e subcategorias e descubra como relacioná-las a controles e frameworks de segurança, risco e continuidade.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link
                to="/framework"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-semibold text-sm transition-all"
                style={{ backgroundColor: '#14B8A6', color: '#0B1F33' }}
              >
                Explorar NIST CSF 2.0 <ArrowRight size={16} />
              </Link>
              <Link
                to="/implementation"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-semibold text-sm border border-white/30 text-white hover:bg-white/10 transition-all"
              >
                Como Implementar
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Framework overview */}
      <section className="py-16 px-4 sm:px-6 max-w-screen-xl mx-auto">
        <div className="text-center mb-12">
          <p className="text-xs font-semibold uppercase tracking-widest text-teal-600 mb-2">Estrutura do Framework</p>
          <h2 className="text-3xl font-bold text-slate-900 mb-4">6 Functions · 17 Categories · 106 Subcategories</h2>
          <p className="text-slate-500 max-w-2xl mx-auto">
            O NIST CSF 2.0 organiza os resultados de cibersegurança em seis Functions, que cobrem o ciclo completo de gestão de riscos cibernéticos.
          </p>
        </div>

        {/* GOVERN highlight */}
        <div className="mb-6">
          <Link to="/framework/gv" className="block group">
            <div className="rounded-2xl p-6 border-2 border-slate-800 transition-all group-hover:shadow-lg" style={{ backgroundColor: '#0B1F33' }}>
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center text-white">
                  <Shield size={20} />
                </div>
                <div>
                  <span className="text-xs font-mono text-white/50 uppercase tracking-widest">GV</span>
                  <h3 className="text-xl font-bold text-white">GOVERN — Governar</h3>
                </div>
                <span className="ml-auto text-white/50 group-hover:text-white transition-colors"><ArrowRight size={20} /></span>
              </div>
              <p className="text-white/60 text-sm leading-relaxed">
                Function central que permeia todas as demais. Estabelecer e monitorar estratégia, políticas e supervisão para gerenciar riscos de cibersegurança em alinhamento com a missão organizacional.
              </p>
              <div className="mt-3 flex gap-2 flex-wrap">
                {['GV.OC', 'GV.RM', 'GV.RR', 'GV.PO', 'GV.OV', 'GV.SC'].map(c => (
                  <span key={c} className="text-xs font-mono px-2 py-1 rounded bg-white/10 text-white/60">{c}</span>
                ))}
              </div>
            </div>
          </Link>
        </div>

        {/* Other 5 functions */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
          {csfFunctions.filter(f => f.id !== 'GV').map(fn => (
            <Link key={fn.id} to={`/framework/${fn.id.toLowerCase()}`} className="group block">
              <div
                className="rounded-xl p-5 border border-slate-200 bg-white transition-all group-hover:shadow-md group-hover:-translate-y-1"
                style={{ borderTopWidth: '3px', borderTopColor: fn.color }}
              >
                <div className="flex items-center gap-2 mb-3">
                  <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ backgroundColor: fn.colorLight, color: fn.color }}>
                    {fnIcons[fn.id]}
                  </div>
                  <span className="text-xs font-mono text-slate-400">{fn.code}</span>
                </div>
                <h3 className="font-bold text-slate-800 text-sm mb-1">{fn.nameEn}</h3>
                <p className="text-xs text-slate-500">{fn.name}</p>
                <div className="mt-3 text-xs text-slate-400">
                  {csfCategories.filter(c => c.functionId === fn.id).length} categorias
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* 3 paths */}
      <section className="py-16 px-4 sm:px-6" style={{ backgroundColor: '#F8FAFC' }}>
        <div className="max-w-screen-xl mx-auto">
          <div className="text-center mb-12">
            <p className="text-xs font-semibold uppercase tracking-widest text-teal-600 mb-2">Por onde começar</p>
            <h2 className="text-3xl font-bold text-slate-900">Três formas de usar o Navigator</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                icon: <BookOpen size={24} />,
                title: 'Explorar o Framework',
                description: 'Navegue pelas Functions, Categories e Subcategories. Compreenda o propósito de cada resultado de cibersegurança.',
                cta: 'Ir para o Framework',
                to: '/framework',
                color: '#0B1F33',
                colorLight: '#E8EDF2',
              },
              {
                icon: <BarChart3 size={24} />,
                title: 'Aprender como Implementar',
                description: 'Conheça a jornada orientativa de implementação do NIST CSF, do Current Profile ao Target Profile.',
                cta: 'Ver guia de implementação',
                to: '/implementation',
                color: '#0F766E',
                colorLight: '#ECFDF5',
              },
              {
                icon: <GitBranch size={24} />,
                title: 'Explorar Crosswalks',
                description: 'Relacione o NIST CSF 2.0 com NIST SP 800-53, ISO/IEC 27002, CIS Controls e outros frameworks.',
                cta: 'Ver crosswalks',
                to: '/crosswalk',
                color: '#2563EB',
                colorLight: '#EFF6FF',
              },
            ].map(item => (
              <div key={item.to} className="bg-white rounded-2xl border border-slate-200 p-6 flex flex-col">
                <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-4" style={{ backgroundColor: item.colorLight, color: item.color }}>
                  {item.icon}
                </div>
                <h3 className="text-lg font-bold text-slate-900 mb-2">{item.title}</h3>
                <p className="text-slate-500 text-sm leading-relaxed flex-1 mb-6">{item.description}</p>
                <Link
                  to={item.to}
                  className="inline-flex items-center gap-2 text-sm font-semibold"
                  style={{ color: item.color }}
                >
                  {item.cta} <ArrowRight size={14} />
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-16 px-4 sm:px-6 max-w-screen-xl mx-auto">
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
          {[
            { value: '6', label: 'Functions', sub: 'Govern, Identify, Protect, Detect, Respond, Recover' },
            { value: '17', label: 'Categories', sub: 'Grupos de resultados relacionados' },
            { value: '106', label: 'Subcategories', sub: 'Resultados específicos de cibersegurança' },
            { value: '22+', label: 'Frameworks', sub: 'Relacionados e mapeados no Navigator' },
          ].map(stat => (
            <div key={stat.label} className="text-center">
              <div className="text-4xl font-bold mb-1" style={{ color: '#0B1F33' }}>{stat.value}</div>
              <div className="text-sm font-semibold text-slate-700 mb-1">{stat.label}</div>
              <div className="text-xs text-slate-400">{stat.sub}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Disclaimer */}
      <section className="py-8 px-4 sm:px-6 bg-slate-50 border-t border-slate-200">
        <div className="max-w-screen-xl mx-auto">
          <p className="text-xs text-slate-400 text-center max-w-3xl mx-auto leading-relaxed">
            O NIST CSF 2.0 é desenvolvido pelo National Institute of Standards and Technology (NIST). Este Navigator é uma ferramenta educacional independente e não substitui a consulta ao documento oficial do framework. 
            Os mapeamentos apresentados são orientativos e não representam equivalências absolutas entre frameworks. 
            Este projeto não é endossado pelo NIST ou por qualquer outra organização mencionada.
          </p>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
