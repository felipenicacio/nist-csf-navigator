import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';
import { frameworks } from '../data/frameworks';
import { glossaryTerms } from '../data';
import { csfCategories } from '../data/categories';
import { csfFunctions } from '../data/functions';
import { allSubcategories } from '../data';
// import { MappingTypeBadge } from '../components/ui';

// ── TIERS ────────────────────────────────────────────────────────────────────
export const TiersPage: React.FC = () => {
  const tiers = [
    {
      n: 1, name: 'PARTIAL', color: '#DC2626', bg: '#FEF2F2',
      desc: 'Gestão de riscos de cibersegurança ad hoc. A organização não possui processo formalizado e a consciência de riscos é limitada.',
      characteristics: ['Práticas não formalizadas ou inconsistentes', 'Informações de ameaças não compartilhadas', 'Conscientização de riscos limitada à organização', 'Gestão de riscos não integrada à estratégia'],
      examples: ['Sem política formal de segurança', 'Resposta a incidentes reativa e não documentada', 'Sem processo de avaliação de riscos', 'Inventário de ativos incompleto ou inexistente'],
    },
    {
      n: 2, name: 'RISK INFORMED', color: '#D97706', bg: '#FFFBEB',
      desc: 'A organização possui maior consciência sobre riscos, mas práticas ainda não estão formalizadas de forma consistente.',
      characteristics: ['Práticas de gestão de riscos parcialmente estabelecidas', 'Aprovação da liderança para gestão de riscos', 'Compartilhamento informal de inteligência de ameaças', 'Consciência de dependências da cadeia de suprimentos'],
      examples: ['Política de segurança existente mas não amplamente seguida', 'Avaliações de risco realizadas mas sem metodologia consistente', 'Algum monitoramento de ameaças externas', 'Plano de resposta a incidentes básico'],
    },
    {
      n: 3, name: 'REPEATABLE', color: '#16A34A', bg: '#F0FDF4',
      desc: 'Práticas de gestão de riscos formalmente estabelecidas, aprovadas pela liderança e expressas como política.',
      characteristics: ['Práticas formalizadas e documentadas', 'Processo definido de gestão de riscos', 'Compartilhamento regular de informações de ameaças', 'Gestão de riscos da cadeia de suprimentos estruturada'],
      examples: ['Programa de gestão de riscos estruturado', 'Avaliações de risco periódicas com metodologia definida', 'SIEM implementado com alertas monitorados', 'Plano de resposta a incidentes testado regularmente'],
    },
    {
      n: 4, name: 'ADAPTIVE', color: '#0F766E', bg: '#F0FDFA',
      desc: 'A organização adapta ativamente suas práticas de cibersegurança com base em lições aprendidas e previsão de ameaças.',
      characteristics: ['Aprendizado contínuo e adaptação ativa', 'Contribuição ativa para comunidades de segurança', 'Análise preditiva de ameaças', 'Cibersegurança integrada à cultura organizacional'],
      examples: ['Threat hunting proativo', 'Participação em ISACs e compartilhamento de CTI', 'Automação extensiva de segurança', 'Programa de segurança orientado a dados e métricas'],
    },
  ];

  return (
    <div className="max-w-screen-xl mx-auto px-4 sm:px-6 py-10 animate-fadeIn">
      <div className="mb-10">
        <p className="text-xs font-semibold uppercase tracking-widest text-teal-600 mb-2">NIST CSF 2.0</p>
        <h1 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-4">CSF Tiers</h1>
        <p className="text-slate-500 max-w-2xl leading-relaxed">
          Os Tiers descrevem o grau de sofisticação das práticas de gestão de riscos de cibersegurança de uma organização. São uma referência para autoavaliação — não um indicador de maturidade absoluto.
        </p>
        <div className="mt-4 p-4 bg-amber-50 border border-amber-200 rounded-xl">
          <p className="text-sm text-amber-700">
            <strong>Nota:</strong> Os Tiers não são etapas que precisam ser seguidas em ordem. O objetivo não é atingir o Tier 4, mas identificar o nível atual e determinar se ele é adequado ao contexto e aos riscos da organização.
          </p>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {tiers.map(tier => (
          <div key={tier.n} className="bg-white rounded-2xl border-2 p-6" style={{ borderColor: tier.color }}>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-xl flex items-center justify-center text-xl font-black" style={{ backgroundColor: tier.bg, color: tier.color }}>
                T{tier.n}
              </div>
              <div>
                <p className="text-xs text-slate-400 font-medium">Tier {tier.n}</p>
                <h2 className="text-lg font-bold" style={{ color: tier.color }}>{tier.name}</h2>
              </div>
            </div>
            <p className="text-slate-600 text-sm leading-relaxed mb-4">{tier.desc}</p>
            <div className="mb-4">
              <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">Características</p>
              <ul className="space-y-1">
                {tier.characteristics.map((c, i) => (
                  <li key={i} className="text-sm text-slate-600 flex gap-2">
                    <span style={{ color: tier.color }}>·</span>{c}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">Exemplos</p>
              <ul className="space-y-1">
                {tier.examples.map((e, i) => (
                  <li key={i} className="text-sm text-slate-500 flex gap-2">
                    <span className="text-slate-300">→</span>{e}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// ── PROFILES ─────────────────────────────────────────────────────────────────
export const ProfilesPage: React.FC = () => (
  <div className="max-w-screen-xl mx-auto px-4 sm:px-6 py-10 animate-fadeIn">
    <div className="mb-10">
      <p className="text-xs font-semibold uppercase tracking-widest text-teal-600 mb-2">NIST CSF 2.0</p>
      <h1 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-4">Organizational Profiles</h1>
      <p className="text-slate-500 max-w-2xl leading-relaxed">
        Os Profiles são mecanismos do CSF 2.0 para descrever o estado atual ou desejado da cibersegurança de uma organização, selecionando resultados do Core relevantes ao contexto organizacional.
      </p>
    </div>

    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
      {[
        { title: 'Current Profile', desc: 'Representa os resultados de cibersegurança que a organização está alcançando atualmente. Baseia-se em avaliação do estado presente.', color: '#64748B', bg: '#F8FAFC', icon: '◎' },
        { title: 'Gap Analysis', desc: 'Comparação entre Current Profile e Target Profile. Revela lacunas que precisam ser endereçadas para alcançar os resultados desejados.', color: '#D97706', bg: '#FFFBEB', icon: '△' },
        { title: 'Target Profile', desc: 'Representa os resultados de cibersegurança que a organização deseja alcançar, com base em objetivos, tolerância a riscos e necessidades.', color: '#16A34A', bg: '#F0FDF4', icon: '◉' },
      ].map(p => (
        <div key={p.title} className="bg-white rounded-2xl border border-slate-200 p-6">
          <div className="text-4xl mb-4" style={{ color: p.color }}>{p.icon}</div>
          <h3 className="text-lg font-bold text-slate-900 mb-2">{p.title}</h3>
          <p className="text-slate-500 text-sm leading-relaxed">{p.desc}</p>
        </div>
      ))}
    </div>

    <div className="bg-white rounded-2xl border border-slate-200 p-8">
      <h2 className="text-xl font-bold text-slate-900 mb-6">Como usar os Profiles</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {[
          { title: 'Autoavaliação', desc: 'Use o Current Profile para entender onde você está agora em relação aos resultados do CSF Core.' },
          { title: 'Planejamento', desc: 'Defina o Target Profile com base nos objetivos de negócio, riscos aceitos e requisitos das partes interessadas.' },
          { title: 'Priorização', desc: 'Compare os dois profiles para identificar gaps e priorizar investimentos com base no risco.' },
          { title: 'Comunicação', desc: 'Use os Profiles para comunicar o estado da cibersegurança à liderança e às partes interessadas.' },
          { title: 'Monitoramento', desc: 'Revise os Profiles periodicamente para acompanhar o progresso em direção ao estado desejado.' },
          { title: 'Colaboração', desc: 'Profiles podem ser usados para alinhar expectativas entre organizações e seus fornecedores.' },
        ].map(item => (
          <div key={item.title} className="flex gap-3">
            <ChevronRight size={16} className="text-teal-500 mt-0.5 shrink-0" />
            <div>
              <p className="text-sm font-semibold text-slate-800">{item.title}</p>
              <p className="text-sm text-slate-500">{item.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  </div>
);

// ── CROSSWALK ─────────────────────────────────────────────────────────────────
export const CrosswalkPage: React.FC = () => {
  const [selectedFn, setSelectedFn] = useState<string>('GV');
  const fnCats = csfCategories.filter(c => c.functionId === selectedFn);
  const fn = csfFunctions.find(f => f.id === selectedFn)!;

  return (
    <div className="max-w-screen-xl mx-auto px-4 sm:px-6 py-10 animate-fadeIn">
      <div className="mb-10">
        <p className="text-xs font-semibold uppercase tracking-widest text-teal-600 mb-2">Mapeamentos</p>
        <h1 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-4">Framework Crosswalk</h1>
        <p className="text-slate-500 max-w-2xl leading-relaxed">
          Explore os relacionamentos entre o NIST CSF 2.0 e outros frameworks. Os mapeamentos são orientativos e não representam equivalências absolutas.
        </p>
      </div>

      <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 mb-8">
        <p className="text-sm text-amber-700">
          <strong>Importante:</strong> Os mapeamentos abaixo são orientativos. Frameworks têm objetivos diferentes e um controle pode atender parcialmente a múltiplos resultados. O contexto organizacional deve sempre ser considerado.
        </p>
      </div>

      {/* Function selector */}
      <div className="flex flex-wrap gap-2 mb-8">
        {csfFunctions.map(f => (
          <button
            key={f.id}
            onClick={() => setSelectedFn(f.id)}
            className={`px-4 py-2 rounded-lg text-sm font-semibold transition-colors border`}
            style={selectedFn === f.id
              ? { backgroundColor: f.color, color: 'white', borderColor: f.color }
              : { backgroundColor: 'white', color: f.color, borderColor: f.color }}
          >
            {f.code} — {f.nameEn}
          </button>
        ))}
      </div>

      {/* Categories with crosswalk */}
      <div className="space-y-6">
        {fnCats.map(cat => {
          const subs = allSubcategories.filter(s => s.categoryId === cat.id);
          const allNist = subs.flatMap(s => s.mappings.nist80053).filter((v, i, arr) => arr.findIndex(x => x.id === v.id) === i);
          const allIso = subs.flatMap(s => s.mappings.iso27002).filter((v, i, arr) => arr.findIndex(x => x.id === v.id) === i);
          const allCis = subs.flatMap(s => s.mappings.cisControls).filter((v, i, arr) => arr.findIndex(x => x.id === v.id) === i);

          return (
            <div key={cat.id} className="bg-white rounded-xl border border-slate-200 overflow-hidden">
              <div className="flex items-center gap-3 p-5 border-b border-slate-100" style={{ backgroundColor: fn.colorLight }}>
                <span className="font-mono text-sm font-bold px-2 py-0.5 rounded" style={{ backgroundColor: fn.color, color: 'white' }}>{cat.code}</span>
                <h3 className="font-semibold text-slate-800">{cat.name}</h3>
                <Link to={`/category/${cat.id}`} className="ml-auto text-xs text-slate-500 hover:text-slate-700 flex items-center gap-1">
                  Ver detalhe <ChevronRight size={12} />
                </Link>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-slate-100">
                {[
                  { label: 'NIST SP 800-53', items: allNist, color: '#1E40AF', bg: '#DBEAFE' },
                  { label: 'ISO/IEC 27002', items: allIso, color: '#065F46', bg: '#D1FAE5' },
                  { label: 'CIS Controls', items: allCis, color: '#92400E', bg: '#FEF3C7' },
                ].map(fw => (
                  <div key={fw.label} className="p-4">
                    <p className="text-xs font-semibold uppercase tracking-wider mb-3" style={{ color: fw.color }}>{fw.label}</p>
                    {fw.items.length > 0 ? (
                      <div className="space-y-1.5">
                        {fw.items.slice(0, 5).map(item => (
                          <div key={item.id} className="flex items-center gap-2">
                            <span className="text-xs font-mono px-1.5 py-0.5 rounded" style={{ color: fw.color, backgroundColor: fw.bg }}>{item.id}</span>
                            <span className="text-xs text-slate-600 line-clamp-1">{item.name}</span>
                          </div>
                        ))}
                        {fw.items.length > 5 && <p className="text-xs text-slate-400">+{fw.items.length - 5} mais</p>}
                      </div>
                    ) : (
                      <p className="text-xs text-slate-400 italic">Sem mapeamento direto nesta versão</p>
                    )}
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

// ── FRAMEWORKS ────────────────────────────────────────────────────────────────
export const FrameworksPage: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const categories = [
    { id: 'all', label: 'Todos' },
    { id: 'nist', label: 'NIST' },
    { id: 'iso', label: 'ISO/IEC' },
    { id: 'cis', label: 'CIS' },
    { id: 'risk', label: 'Risco' },
    { id: 'continuity', label: 'Continuidade' },
    { id: 'threat', label: 'Ameaças' },
  ];
  const filtered = activeCategory === 'all' ? frameworks : frameworks.filter(f => f.category === activeCategory);

  const fnColors: Record<string, string> = { GV: '#0B1F33', ID: '#164E73', PR: '#0F766E', DE: '#D97706', RS: '#DC2626', RC: '#16A34A' };

  return (
    <div className="max-w-screen-xl mx-auto px-4 sm:px-6 py-10 animate-fadeIn">
      <div className="mb-10">
        <p className="text-xs font-semibold uppercase tracking-widest text-teal-600 mb-2">Referências</p>
        <h1 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-4">Frameworks Relacionados</h1>
        <p className="text-slate-500 max-w-2xl leading-relaxed">
          O NIST CSF 2.0 é complementado por diversos outros frameworks de segurança, risco e continuidade. Explore como cada um se relaciona com o CSF.
        </p>
      </div>

      <div className="flex flex-wrap gap-2 mb-8">
        {categories.map(c => (
          <button
            key={c.id}
            onClick={() => setActiveCategory(c.id)}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              activeCategory === c.id ? 'text-white shadow-sm' : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-50'
            }`}
            style={activeCategory === c.id ? { backgroundColor: '#0B1F33' } : {}}
          >
            {c.label}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {filtered.map(fw => (
          <div key={fw.id} className="bg-white rounded-xl border border-slate-200 p-6 hover:shadow-md transition-shadow">
            <div className="flex items-start justify-between gap-3 mb-3">
              <div>
                <h3 className="text-base font-bold text-slate-900">{fw.name}</h3>
                <p className="text-xs text-slate-400 mt-0.5">{fw.fullName}</p>
              </div>
              <span className="text-xs px-2 py-1 bg-slate-100 text-slate-600 rounded font-medium shrink-0">{fw.organization}</span>
            </div>
            <p className="text-sm text-slate-600 leading-relaxed mb-4">{fw.description}</p>
            <div className="mb-4">
              <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">Relação com NIST CSF</p>
              <p className="text-sm text-slate-600">{fw.relationToCSF}</p>
            </div>
            <div>
              <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">Functions Relacionadas</p>
              <div className="flex flex-wrap gap-1.5">
                {fw.relatedFunctions.map(f => (
                  <Link key={f} to={`/framework/${f.toLowerCase()}`}
                    className="text-xs font-mono font-bold px-2 py-0.5 rounded text-white"
                    style={{ backgroundColor: fnColors[f] || '#64748B' }}
                  >
                    {f}
                  </Link>
                ))}
              </div>
            </div>
            {fw.website && (
              <a href={fw.website} target="_blank" rel="noopener noreferrer" className="mt-4 inline-flex items-center gap-1 text-xs text-blue-600 hover:underline">
                Documentação oficial ↗
              </a>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

// ── GLOSSARY ─────────────────────────────────────────────────────────────────
export const GlossaryPage: React.FC = () => {
  const [query, setQuery] = useState('');
  const filtered = query
    ? glossaryTerms.filter(t =>
        t.term.toLowerCase().includes(query.toLowerCase()) ||
        t.termEn.toLowerCase().includes(query.toLowerCase()) ||
        t.definition.toLowerCase().includes(query.toLowerCase())
      )
    : glossaryTerms;

  return (
    <div className="max-w-screen-xl mx-auto px-4 sm:px-6 py-10 animate-fadeIn">
      <div className="mb-10">
        <p className="text-xs font-semibold uppercase tracking-widest text-teal-600 mb-2">Referência</p>
        <h1 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-4">Glossário</h1>
        <p className="text-slate-500 max-w-2xl leading-relaxed">
          Termos e conceitos fundamentais do NIST CSF 2.0 e da cibersegurança em geral.
        </p>
      </div>

      <div className="mb-8">
        <input
          type="text"
          placeholder="Pesquisar termos..."
          value={query}
          onChange={e => setQuery(e.target.value)}
          className="w-full sm:w-96 px-4 py-3 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div className="space-y-3">
        {filtered.map(term => (
          <div key={term.term} className="bg-white rounded-xl border border-slate-200 p-5">
            <div className="flex items-start gap-3">
              <div className="shrink-0">
                <h3 className="text-base font-bold text-slate-900">{term.term}</h3>
                <p className="text-xs text-slate-400 font-mono">{term.termEn}</p>
              </div>
              <div className="flex-1 pl-4 border-l border-slate-100">
                <p className="text-sm text-slate-600 leading-relaxed">{term.definition}</p>
              </div>
            </div>
          </div>
        ))}
        {filtered.length === 0 && (
          <p className="text-slate-400 text-center py-10">Nenhum termo encontrado para "{query}"</p>
        )}
      </div>
    </div>
  );
};

// ── ABOUT ─────────────────────────────────────────────────────────────────────
export const AboutPage: React.FC = () => (
  <div className="max-w-3xl mx-auto px-4 sm:px-6 py-10 animate-fadeIn">
    <div className="mb-10">
      <p className="text-xs font-semibold uppercase tracking-widest text-teal-600 mb-2">Sobre</p>
      <h1 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-4">NIST CSF 2.0 Navigator</h1>
    </div>

    <div className="space-y-5">

      {/* Sobre o projeto */}
      <div className="bg-white rounded-xl border border-slate-200 p-6">
        <p className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-4">Sobre o projeto</p>
        <p className="text-slate-600 text-sm leading-relaxed">
          O NIST CSF 2.0 Navigator é uma ferramenta educacional open source que transforma o NIST Cybersecurity Framework 2.0 em uma experiência visual, interativa e acessível. O objetivo é facilitar a compreensão do framework, orientar sua implementação e explorar relações com outros frameworks de segurança, risco e continuidade — como NIST SP 800-53, ISO/IEC 27002, CIS Controls e MITRE ATT&CK.
        </p>
        <a
          href="https://github.com/felipenicacio/nist-csf-navigator"
          target="_blank"
          rel="noopener noreferrer"
          className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-blue-600 hover:underline"
        >
          Ver repositório no GitHub ↗
        </a>
      </div>

      {/* Sobre o autor */}
      <div className="rounded-xl p-6" style={{ backgroundColor: '#0B1F33' }}>
        <p className="text-xs font-bold uppercase tracking-widest mb-5" style={{ color: '#14B8A6' }}>Sobre o autor</p>

        {/* Avatar + nome */}
        <div className="flex items-center gap-4 mb-5">
          <img
            src="./assets/avatar.jpg"
            alt="Felipe Nicácio"
            className="w-20 h-20 rounded-full object-cover shrink-0"
            style={{ border: '3px solid #14B8A6' }}
          />
          <div>
            <p className="text-white font-bold text-lg leading-tight">Felipe Nicácio</p>
            <p className="text-sm font-semibold mt-0.5" style={{ color: '#14B8A6' }}>
              Consultor em Segurança da Informação
            </p>
          </div>
        </div>

        {/* Bio */}
        <p className="text-sm leading-relaxed mb-6" style={{ color: 'rgba(255,255,255,0.6)' }}>
          Consultor de Segurança da Informação, Privacidade de Dados e Continuidade de Negócios.
          Especialista em implementação de SGSI, ISO 27001, LGPD e programas de conscientização corporativa.
        </p>

        {/* Links */}
        <div className="flex flex-wrap gap-3">
          <a
            href="https://www.linkedin.com/in/felipe-nicacio/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-semibold transition-opacity hover:opacity-90"
            style={{ backgroundColor: '#0A66C2', color: '#fff' }}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
              <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
            </svg>
            Conecte-se no LinkedIn
          </a>
          <a
            href="https://github.com/felipenicacio"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-semibold transition-opacity hover:opacity-90"
            style={{ backgroundColor: 'rgba(255,255,255,0.1)', color: '#fff', border: '1px solid rgba(255,255,255,0.2)' }}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
            </svg>
            GitHub
          </a>
        </div>
      </div>

      {/* Aviso legal */}
      <div className="bg-white rounded-xl border border-slate-200 p-6">
        <p className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-4">Aviso legal</p>
        <ul className="space-y-2 text-sm text-slate-600">
          <li>O <strong>NIST CSF</strong> é desenvolvido pelo National Institute of Standards and Technology (NIST).</li>
          <li>Os <strong>padrões ISO/IEC</strong> são publicados pela ISO e IEC.</li>
          <li>Os <strong>CIS Controls</strong> são mantidos pelo Center for Internet Security.</li>
          <li>O <strong>MITRE ATT&CK</strong> é desenvolvido pela MITRE Corporation.</li>
          <li>Este Navigator não é endossado por nenhuma dessas organizações.</li>
        </ul>
        <p className="text-slate-500 text-sm leading-relaxed mt-4">
          Os mapeamentos apresentados são orientativos e não representam equivalências absolutas entre frameworks. Um controle pode contribuir parcialmente para múltiplos resultados do CSF. O contexto organizacional deve sempre ser considerado.
        </p>
      </div>

    </div>
  </div>
);
