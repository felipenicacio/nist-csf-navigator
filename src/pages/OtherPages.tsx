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

    <div className="prose prose-slate max-w-none space-y-8">
      <div className="bg-white rounded-xl border border-slate-200 p-6">
        <h2 className="text-lg font-bold text-slate-900 mb-3">Sobre o Projeto</h2>
        <p className="text-slate-600 text-sm leading-relaxed">
          O NIST CSF 2.0 Navigator é uma ferramenta educacional open source que transforma o NIST Cybersecurity Framework 2.0 em uma experiência visual, interativa e acessível. O objetivo é facilitar a compreensão do framework, orientar sua implementação e explorar suas relações com outros frameworks de segurança, risco e continuidade.
        </p>
      </div>

      <div className="bg-white rounded-xl border border-slate-200 p-6">
        <h2 className="text-lg font-bold text-slate-900 mb-3">Propriedade Intelectual</h2>
        <ul className="space-y-2 text-sm text-slate-600">
          <li>• O <strong>NIST CSF</strong> é desenvolvido pelo National Institute of Standards and Technology (NIST), agência do governo dos Estados Unidos.</li>
          <li>• Os <strong>padrões ISO/IEC</strong> são publicados pela International Organization for Standardization (ISO) e International Electrotechnical Commission (IEC).</li>
          <li>• Os <strong>CIS Controls</strong> são mantidos pelo Center for Internet Security (CIS).</li>
          <li>• O <strong>MITRE ATT&CK</strong> é desenvolvido pela MITRE Corporation.</li>
          <li>• Este Navigator não é endossado por nenhuma dessas organizações.</li>
        </ul>
      </div>

      <div className="bg-white rounded-xl border border-slate-200 p-6">
        <h2 className="text-lg font-bold text-slate-900 mb-3">Aviso Legal</h2>
        <p className="text-slate-600 text-sm leading-relaxed">
          Este Navigator é uma ferramenta de orientação e planejamento. As descrições, orientações e mapeamentos apresentados são baseados em fontes públicas e representam interpretações para fins educacionais. Não substituem a consulta aos documentos oficiais dos frameworks mencionados, nem representam aconselhamento profissional de segurança.
        </p>
        <p className="text-slate-600 text-sm leading-relaxed mt-3">
          Os mapeamentos entre frameworks são orientativos e não representam equivalências absolutas. Um controle pode atender parcialmente a múltiplos resultados, e o contexto organizacional deve sempre ser considerado.
        </p>
      </div>

      <div className="bg-white rounded-xl border border-slate-200 p-6">
        <h2 className="text-lg font-bold text-slate-900 mb-3">Tecnologias</h2>
        <div className="flex flex-wrap gap-2">
          {['React', 'TypeScript', 'Vite', 'Tailwind CSS', 'React Router', 'Lucide Icons'].map(t => (
            <span key={t} className="px-3 py-1.5 bg-slate-100 text-slate-700 rounded-lg text-sm font-medium">{t}</span>
          ))}
        </div>
      </div>

      <div className="bg-white rounded-xl border border-slate-200 p-6">
        <h2 className="text-lg font-bold text-slate-900 mb-3">Contribuições</h2>
        <p className="text-slate-600 text-sm leading-relaxed">
          Este é um projeto open source. Contribuições são bem-vindas — seja para melhorar o conteúdo, adicionar mapeamentos, corrigir imprecisões ou melhorar a interface.
        </p>
        <a
          href="https://github.com/felipenicacio/nist-csf-navigator"
          target="_blank"
          rel="noopener noreferrer"
          className="mt-3 inline-flex items-center gap-2 text-sm font-semibold text-blue-600 hover:underline"
        >
          Ver repositório no GitHub ↗
        </a>
      </div>
    </div>
  </div>
);
