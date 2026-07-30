import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

const journeys = [
  {
    key: 'framework',
    label: 'Framework',
    headline: 'Conheça o NIST CSF 2.0',
    desc: 'Explore Funções, Categorias, Subcategorias e controles relacionados.',
    cta: 'Explorar o Framework',
    to: '/framework',
    color: '#1A7FA8',
    bg: '#E0F4FB',
    border: '#4BAED6',
  },
  {
    key: 'implement',
    label: 'Implementação',
    headline: 'Aprenda como implementar',
    desc: 'Roadmap orientativo de 10 fases para estruturar um programa baseado no CSF.',
    cta: 'Ver Roadmap',
    to: '/roadmap',
    color: '#5B57C0',
    bg: '#EEECFB',
    border: '#8F8CE0',
  },
  {
    key: 'assess',
    label: 'Assessment',
    headline: 'Avalie e aprimore',
    desc: 'Current Profile, Target Profile, Gap Analysis, Priorização e Plano de Ação.',
    cta: 'Explorar Assessment',
    to: '/assessment',
    color: '#1E9E52',
    bg: '#E2FAF0',
    border: '#6EEA96',
  },
  {
    key: 'reference',
    label: 'Referências',
    headline: 'Consulte referências',
    desc: 'Frameworks, normas e controles relacionados ao NIST CSF 2.0.',
    cta: 'Consultar Referências',
    to: '/frameworks',
    color: '#C07800',
    bg: '#FFF3DC',
    border: '#FDB642',
  },
];

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
        <p className="text-lg text-white/70 max-w-xl mx-auto leading-relaxed mb-4">
          Explore, compreenda e aplique o NIST Cybersecurity Framework 2.0.
        </p>
        <p className="text-sm text-white/40 max-w-lg mx-auto">
          Baseado no NIST Cybersecurity Framework 2.0 e recursos oficiais do NIST.
        </p>
      </div>
    </section>

    {/* Journey selector */}
    <section className="max-w-screen-lg mx-auto px-4 sm:px-6 py-16">
      <div className="text-center mb-10">
        <h2 className="text-xl font-bold text-slate-900 mb-2">Escolha como deseja começar</h2>
        <p className="text-slate-500 text-sm">Cada jornada foi pensada para um objetivo diferente.</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        {journeys.map(j => (
          <Link
            key={j.key}
            to={j.to}
            className="group rounded-2xl border-2 p-7 hover:shadow-lg hover:-translate-y-0.5 transition-all bg-white"
            style={{ borderColor: j.border }}
          >
            <div className="flex items-start justify-between gap-4 mb-4">
              <div
                className="text-xs font-bold uppercase tracking-widest px-2.5 py-1 rounded-full"
                style={{ backgroundColor: j.bg, color: j.color }}
              >
                {j.label}
              </div>
              <ArrowRight size={16} className="shrink-0 mt-0.5 opacity-30 group-hover:opacity-80 transition-opacity" style={{ color: j.color }} />
            </div>
            <h3 className="text-lg font-bold text-slate-900 mb-2">{j.headline}</h3>
            <p className="text-sm text-slate-500 leading-relaxed mb-5">{j.desc}</p>
            <span
              className="inline-flex items-center gap-1.5 text-xs font-semibold"
              style={{ color: j.color }}
            >
              {j.cta} <ArrowRight size={12} />
            </span>
          </Link>
        ))}
      </div>
    </section>

    {/* Footer note */}
    <section className="py-8 px-4 border-t border-slate-200 bg-white">
      <p className="text-xs text-slate-400 text-center max-w-2xl mx-auto leading-relaxed">
        O NIST CSF 2.0 é desenvolvido pelo National Institute of Standards and Technology (NIST). Este Navigator é uma ferramenta educacional independente e não substitui a consulta ao documento oficial. Os mapeamentos são orientativos e não representam equivalências absolutas entre frameworks.
      </p>
    </section>

  </div>
);

export default HomePage;
