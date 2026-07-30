import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import PageIntro from '../components/ui/PageIntro';
import { ArrowRight, ArrowDown, CheckCircle, Info } from 'lucide-react';
import { getFnColors } from '../utils/fnColors';

const phases = [
  {
    n: '01', label: 'Governança e Contexto',
    desc: 'Entender a organização, definir patrocinadores, estabelecer estratégia e formalizar a decisão de adotar o NIST CSF.',
    activities: [
      'Obter patrocínio da alta direção',
      'Definir missão e prioridades de negócio',
      'Identificar requisitos legais e regulatórios aplicáveis',
      'Estabelecer estrutura de governança para o programa',
      'Definir apetite e tolerância a riscos de cibersegurança',
    ],
    deliverables: ['Termo de abertura do programa', 'Estrutura de governança', 'Declaração de apetite a riscos'],
    csf: ['GV.OC', 'GV.RM', 'GV.RR'],
    nistStep: '1. Scope',
    color: '#C8A800', bg: '#FFF9C4',
  },
  {
    n: '02', label: 'Perfil Atual',
    desc: 'Avaliar o estado atual da cibersegurança da organização em relação aos resultados do CSF Core.',
    activities: [
      'Definir o escopo do Perfil Organizacional',
      'Inventariar ativos, sistemas, dados e fornecedores críticos',
      'Avaliar práticas atuais por Função, Categoria e Subcategoria',
      'Documentar status, avaliação e práticas em vigor',
      'Registrar evidências existentes por resultado',
    ],
    deliverables: ['Inventário de ativos', 'Perfil Atual documentado', 'Avaliação de maturidade inicial'],
    csf: ['ID.AM', 'ID.RA', 'GV.OC'],
    nistStep: '2. Gather + 3. Create Profile',
    color: '#1A7FA8', bg: '#E0F4FB',
  },
  {
    n: '03', label: 'Avaliação de Riscos',
    desc: 'Identificar, analisar e priorizar riscos de cibersegurança relevantes para a missão e os ativos da organização.',
    activities: [
      'Identificar ameaças e vulnerabilidades por ativo',
      'Estimar probabilidade e impacto de cada risco',
      'Construir o Registro de Riscos de Cibersegurança (CSRR)',
      'Priorizar riscos conforme o apetite definido na Fase 1',
      'Validar resultados com as áreas de negócio',
    ],
    deliverables: ['Registro de riscos de cibersegurança', 'Mapa de riscos', 'Riscos priorizados'],
    csf: ['ID.RA', 'GV.RM'],
    nistStep: '2. Gather Information',
    color: '#1A7FA8', bg: '#E0F4FB',
  },
  {
    n: '04', label: 'Perfil Alvo',
    desc: 'Definir o estado de cibersegurança desejado, com base nos riscos identificados, objetivos de negócio e recursos disponíveis.',
    activities: [
      'Selecionar e priorizar resultados do CSF Core relevantes',
      'Definir metas para cada Subcategoria selecionada',
      'Considerar Community Profiles setoriais como referência',
      'Validar o Perfil Alvo com a liderança',
      'Documentar prioridades e justificativas',
    ],
    deliverables: ['Perfil Alvo documentado', 'Prioridades definidas por resultado', 'Validação da liderança'],
    csf: ['GV.OC', 'GV.RM', 'GV.PO'],
    nistStep: '3. Create Profile',
    color: '#1E9E52', bg: '#E2FAF0',
  },
  {
    n: '05', label: 'Gap Analysis',
    desc: 'Comparar o Perfil Atual com o Perfil Alvo para identificar lacunas e construir um plano de ação priorizado.',
    activities: [
      'Mapear diferenças entre práticas atuais e metas definidas',
      'Classificar gaps por criticidade e esforço de remediação',
      'Identificar dependências entre iniciativas',
      'Construir plano de ação com ação, responsável, prazo e recursos',
      'Alinhar o plano com orçamento e capacidade disponíveis',
    ],
    deliverables: ['Análise de gaps por Subcategoria', 'Plano de Ação priorizado', 'Cronograma inicial'],
    csf: ['ID.IM', 'GV.OV'],
    nistStep: '4. Analyze Gaps + Action Plan',
    color: '#C07800', bg: '#FFF3DC',
  },
  {
    n: '06', label: 'Priorização',
    desc: 'Decidir quais iniciativas serão executadas primeiro, equilibrando risco, impacto, custo e capacidade operacional.',
    activities: [
      'Aplicar critérios de priorização: risco, custo, dependências',
      'Definir ondas de implementação',
      'Alocar recursos e responsáveis por iniciativa',
      'Comunicar prioridades à liderança e às equipes',
      'Ajustar o plano conforme restrições identificadas',
    ],
    deliverables: ['Mapa de prioridades', 'Ondas de implementação', 'Alocação de recursos'],
    csf: ['GV.RM', 'GV.RR'],
    nistStep: '4. Analyze Gaps + Action Plan',
    color: '#C07800', bg: '#FFF3DC',
  },
  {
    n: '07', label: 'Plano de Ação',
    desc: 'Estruturar formalmente as iniciativas com escopo, responsáveis, marcos e critérios de sucesso.',
    activities: [
      'Detalhar cada iniciativa com escopo e entregáveis',
      'Definir marcos intermediários e critérios de aceite',
      'Estabelecer KPIs e KRIs por iniciativa',
      'Formalizar responsáveis e interdependências',
      'Obter aprovação formal do plano',
    ],
    deliverables: ['Plano de Ação formal', 'KPIs e KRIs definidos', 'Marcos e critérios de aceite'],
    csf: ['GV.PO', 'GV.RR'],
    nistStep: '4. Action Plan',
    color: '#5B57C0', bg: '#EEECFB',
  },
  {
    n: '08', label: 'Implementação',
    desc: 'Executar os controles e melhorias definidas no plano, cobrindo as Funções PROTECT, DETECT, RESPOND e RECOVER.',
    activities: [
      'Implementar controles técnicos, administrativos e físicos',
      'Documentar práticas, políticas e procedimentos',
      'Treinar equipes e conscientizar colaboradores',
      'Monitorar a execução e os desvios do plano',
      'Registrar evidências de implementação',
    ],
    deliverables: ['Controles implementados', 'Políticas e procedimentos', 'Evidências de implementação'],
    csf: ['PR', 'DE', 'RS', 'RC'],
    nistStep: '5. Implement Action Plan',
    color: '#5B57C0', bg: '#EEECFB',
  },
  {
    n: '09', label: 'Medição e Avaliação',
    desc: 'Monitorar o desempenho dos controles, avaliar a eficácia do programa e atualizar o Perfil Atual.',
    activities: [
      'Coletar e analisar KPIs e KRIs definidos',
      'Realizar avaliação periódica do programa',
      'Atualizar o Perfil Atual com os novos resultados',
      'Identificar desvios em relação ao Perfil Alvo',
      'Reportar resultados à liderança',
    ],
    deliverables: ['Relatório de desempenho', 'Perfil Atual atualizado', 'Análise de desvios'],
    csf: ['GV.OV', 'ID.IM', 'DE.CM'],
    nistStep: '5. Update Profile',
    color: '#C8A800', bg: '#FFF9C4',
  },
  {
    n: '10', label: 'Melhoria Contínua',
    desc: 'Incorporar lições aprendidas, ajustar o programa e iniciar novo ciclo de avaliação e evolução.',
    activities: [
      'Analisar lições aprendidas de incidentes e exercícios',
      'Revisar e atualizar o Perfil Alvo conforme o contexto',
      'Ajustar o apetite a riscos e estratégia de gestão',
      'Iniciar novo ciclo de Gap Analysis',
      'Evoluir o programa de forma incremental',
    ],
    deliverables: ['Plano de melhoria', 'Perfil Alvo revisado', 'Novo ciclo iniciado'],
    csf: ['ID.IM', 'GV.OV', 'GV.RM'],
    nistStep: '5. Update Profile ↺',
    color: '#1E9E52', bg: '#E2FAF0',
  },
];

const nistSteps = [
  { n: '1', label: 'Scope', desc: 'Definir o escopo do Perfil Organizacional.' },
  { n: '2', label: 'Gather Information', desc: 'Coletar políticas, requisitos, prioridades e padrões aplicáveis.' },
  { n: '3', label: 'Create Profile', desc: 'Documentar práticas atuais (Perfil Atual) e metas desejadas (Perfil Alvo).' },
  { n: '4', label: 'Analyze Gaps + Action Plan', desc: 'Comparar perfis, identificar lacunas e desenvolver plano de ação priorizado.' },
  { n: '5', label: 'Implement + Update', desc: 'Executar o plano de ação e atualizar o Perfil continuamente.' },
];

const RoadmapPage: React.FC = () => {
  const [activePhase, setActivePhase] = useState<string | null>(null);
  const [showNist, setShowNist] = useState(false);

  return (
    <div className="max-w-screen-xl mx-auto px-4 sm:px-6 py-10 animate-fadeIn">

      {/* Header */}
      <div className="mb-6">
        <p className="text-xs font-semibold uppercase tracking-widest mb-2" style={{ color: '#0F766E' }}>Metodologia do Navigator</p>
        <h1 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-3">Implementation Roadmap</h1>
        <p className="text-slate-500 max-w-2xl text-sm leading-relaxed">
          Jornada de 10 fases para estruturar um programa de cibersegurança baseado no NIST CSF 2.0, desde a governança até a melhoria contínua.
        </p>
      </div>

      {/* Ajuste 1 — Nota de metodologia (não oficial NIST) */}
      <div className="flex gap-3 bg-blue-50 border border-blue-100 rounded-xl px-5 py-4 mb-6">
        <Info size={16} className="text-blue-400 shrink-0 mt-0.5" />
        <div className="text-sm text-blue-700 leading-relaxed">
          <strong className="text-blue-800">Nota sobre esta metodologia:</strong> Este Implementation Roadmap é uma abordagem orientativa desenvolvida para facilitar a aplicação do NIST CSF 2.0 em programas corporativos. As 10 fases não constituem uma metodologia oficial ou sequência prescritiva do NIST. A estrutura foi organizada com base nos conceitos descritos pelo NIST CSF 2.0, especialmente em Perfis Organizacionais, Perfil Atual, Perfil Alvo, Gap Analysis e Planos de Ação.
        </div>
      </div>

      <PageIntro
        title="Como usar este Roadmap?"
        plain="Use as 10 fases como referência orientativa para entender a sequência lógica de um programa baseado no CSF, não como um roteiro rígido ou obrigatório."
        detail="Cada organização pode iniciar em fases diferentes e executar atividades em paralelo conforme seu contexto e maturidade."
        learnMore={{ label: 'Entender o CSF', to: '/intro' }}
      />

      {/* Horizontal stepper */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 mb-6 overflow-x-auto">
        <h2 className="text-sm font-bold uppercase tracking-wider text-slate-400 mb-5">Visão geral das 10 fases — clique para detalhar</h2>
        <div className="flex items-center gap-1 min-w-max">
          {phases.map((phase, i) => (
            <React.Fragment key={phase.n}>
              <button
                onClick={() => setActivePhase(activePhase === phase.n ? null : phase.n)}
                className="flex flex-col items-center gap-1 px-3 py-2.5 rounded-xl border-2 transition-all hover:scale-105 min-w-[80px]"
                style={{
                  borderColor: activePhase === phase.n ? phase.color : `${phase.color}40`,
                  backgroundColor: activePhase === phase.n ? phase.bg : '#fff',
                }}
              >
                <span className="text-lg font-black" style={{ color: activePhase === phase.n ? phase.color : '#CBD5E1' }}>{phase.n}</span>
                <span className="text-xs font-bold text-center leading-tight" style={{ color: phase.color }}>{phase.label.split(' ')[0]}</span>
              </button>
              {i < phases.length - 1 && (
                <span className="text-slate-200 font-bold text-lg shrink-0">›</span>
              )}
            </React.Fragment>
          ))}
        </div>
        <div className="flex justify-center mt-4">
          <span className="text-xs text-slate-400 font-medium">↺ Ciclo contínuo: a Fase 10 reinicia a Fase 02</span>
        </div>
      </div>

      {/* Active phase detail */}
      {activePhase && (() => {
        const phase = phases.find(p => p.n === activePhase)!;
        return (
          <div className="rounded-2xl border-2 p-6 mb-6 animate-fadeIn" style={{ borderColor: phase.color, backgroundColor: `${phase.color}06` }}>
            <div className="flex items-start gap-4 mb-5">
              <div className="w-12 h-12 rounded-xl flex items-center justify-center font-black text-xl shrink-0" style={{ backgroundColor: phase.bg, color: phase.color }}>
                {phase.n}
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-3 flex-wrap mb-1">
                  <h3 className="text-xl font-bold text-slate-900">{phase.label}</h3>
                  <span className="text-xs font-mono px-2 py-0.5 rounded-full border" style={{ borderColor: `${phase.color}40`, color: phase.color, backgroundColor: phase.bg }}>
                    NIST SP 1301: {phase.nistStep}
                  </span>
                </div>
                <p className="text-sm text-slate-500">{phase.desc}</p>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              <div>
                <p className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-3">Atividades principais</p>
                <ul className="space-y-2">
                  {phase.activities.map((a, i) => (
                    <li key={i} className="flex gap-2 text-sm text-slate-700">
                      <CheckCircle size={14} className="shrink-0 mt-0.5" style={{ color: phase.color }} />
                      {a}
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <p className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-3">Entregáveis esperados</p>
                <ul className="space-y-2">
                  {phase.deliverables.map((d, i) => (
                    <li key={i} className="flex gap-2 text-sm text-slate-700">
                      <span className="w-1.5 h-1.5 rounded-full shrink-0 mt-2" style={{ backgroundColor: phase.color }} />
                      {d}
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <p className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-3">Resultados do CSF relacionados</p>
                <div className="flex flex-wrap gap-2">
                  {phase.csf.map(code => {
                    const fnId = code.split('.')[0];
                    const c = getFnColors(fnId);
                    return (
                      <Link key={code} to={code.includes('.') ? `/category/${code}` : `/framework/${fnId.toLowerCase()}`}
                        className="text-sm font-mono font-bold px-3 py-1 rounded-lg hover:opacity-80"
                        style={{ backgroundColor: c.bg, color: c.text }}
                      >
                        {code}
                      </Link>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        );
      })()}

      {/* Phases grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-10">
        {phases.map(phase => (
          <button
            key={phase.n}
            onClick={() => setActivePhase(activePhase === phase.n ? null : phase.n)}
            className="text-left bg-white rounded-xl border border-slate-200 p-5 hover:shadow-md transition-all"
          >
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-xl flex items-center justify-center font-black text-sm shrink-0" style={{ backgroundColor: phase.bg, color: phase.color }}>
                {phase.n}
              </div>
              <div className="flex-1">
                <h3 className="text-sm font-bold text-slate-800 mb-1">{phase.label}</h3>
                <p className="text-xs text-slate-500 leading-relaxed">{phase.desc}</p>
                <div className="flex flex-wrap gap-1 mt-2">
                  {phase.csf.slice(0, 3).map(code => {
                    const fnId = code.split('.')[0];
                    const c = getFnColors(fnId);
                    return (
                      <span key={code} className="text-xs font-mono font-bold px-1.5 py-0.5 rounded" style={{ backgroundColor: c.bg, color: c.text }}>{code}</span>
                    );
                  })}
                </div>
              </div>
            </div>
          </button>
        ))}
      </div>

      {/* Ajuste 2 — Referência oficial NIST */}
      <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden mb-8">
        <button
          onClick={() => setShowNist(!showNist)}
          className="w-full flex items-center justify-between px-6 py-5 hover:bg-slate-50 transition-colors"
        >
          <div className="text-left">
            <p className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-1">Base Conceitual</p>
            <h2 className="text-base font-bold text-slate-900">Processo Oficial NIST: 5 Etapas do Organizational Profile</h2>
            <p className="text-xs text-slate-500 mt-0.5">NIST SP 1301 — Quick-Start Guide for Creating and Using Organizational Profiles</p>
          </div>
          <span className="text-slate-400 text-lg ml-4">{showNist ? '▲' : '▼'}</span>
        </button>

        {showNist && (
          <div className="px-6 pb-6 border-t border-slate-100">
            <p className="text-sm text-slate-600 leading-relaxed my-5">
              As 10 fases do Navigator detalham e expandem o processo de cinco etapas descrito pelo NIST para facilitar a aplicação em programas corporativos de cibersegurança. Veja abaixo a correspondência entre as duas abordagens.
            </p>

            {/* NIST 5 steps */}
            <div className="grid grid-cols-1 sm:grid-cols-5 gap-3 mb-6">
              {nistSteps.map((step, i) => (
                <div key={step.n} className="relative">
                  <div className="bg-slate-50 rounded-xl border border-slate-200 p-4 h-full">
                    <div className="w-7 h-7 rounded-lg bg-slate-900 flex items-center justify-center text-white font-black text-xs mb-2">{step.n}</div>
                    <p className="text-xs font-bold text-slate-800 mb-1">{step.label}</p>
                    <p className="text-xs text-slate-500 leading-relaxed">{step.desc}</p>
                  </div>
                  {i < nistSteps.length - 1 && (
                    <div className="hidden sm:flex absolute -right-2 top-1/2 -translate-y-1/2 z-10 w-4 h-4 items-center justify-center bg-white border border-slate-200 rounded-full text-slate-400 text-xs">›</div>
                  )}
                </div>
              ))}
            </div>
            <div className="flex justify-center mb-6">
              <span className="text-xs text-slate-400 font-medium">↺ Processo iterativo — o Profile é atualizado a cada ciclo</span>
            </div>

            {/* Alignment table */}
            <h3 className="text-sm font-bold text-slate-700 mb-3">Correspondência entre as abordagens</h3>
            <div className="overflow-x-auto rounded-xl border border-slate-200">
              <table className="w-full text-xs">
                <thead>
                  <tr className="border-b border-slate-200 bg-slate-50">
                    <th className="px-4 py-2.5 text-left font-bold text-slate-700">Fase do Navigator</th>
                    <th className="px-4 py-2.5 text-left font-bold text-slate-700 border-l border-slate-200">Etapa NIST SP 1301</th>
                    <th className="px-4 py-2.5 text-left font-bold text-slate-700 border-l border-slate-200">Relação</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    { nav: '01 — Governança e Contexto', nist: '1. Scope', rel: 'Compatível, mais amplo: inclui patrocínio e governança' },
                    { nav: '02 — Perfil Atual', nist: '2. Gather + 3. Create Profile', rel: 'Compatível' },
                    { nav: '03 — Avaliação de Riscos', nist: '2. Gather Information', rel: 'Compatível, mais detalhado' },
                    { nav: '04 — Perfil Alvo', nist: '3. Create Profile', rel: 'Compatível' },
                    { nav: '05 — Gap Analysis', nist: '4. Analyze Gaps', rel: 'Correspondência direta' },
                    { nav: '06 — Priorização', nist: '4. Action Plan', rel: 'Compatível' },
                    { nav: '07 — Plano de Ação', nist: '4. Action Plan', rel: 'Correspondência direta' },
                    { nav: '08 — Implementação', nist: '5. Implement Action Plan', rel: 'Correspondência direta' },
                    { nav: '09 — Medição e Avaliação', nist: '5. Update Profile', rel: 'Compatível' },
                    { nav: '10 — Melhoria Contínua', nist: '5. Update Profile ↺', rel: 'Compatível, ciclo iterativo' },
                  ].map((row, i) => (
                    <tr key={i} className="border-b border-slate-100 hover:bg-slate-50">
                      <td className="px-4 py-2.5 font-semibold text-slate-700">{row.nav}</td>
                      <td className="px-4 py-2.5 text-slate-500 border-l border-slate-200">{row.nist}</td>
                      <td className="px-4 py-2.5 text-slate-500 border-l border-slate-200">{row.rel}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="text-xs text-slate-400 mt-3 italic">
              Fonte de referência: NIST SP 1301, Quick-Start Guide for Creating and Using Organizational Profiles, fevereiro de 2024.
            </p>
          </div>
        )}
      </div>

      {/* Ajuste 3 — Current + Target Profile em paralelo alimentando Gap */}
      <div className="bg-white rounded-2xl border border-slate-200 p-8 mb-8">
        <h2 className="text-lg font-bold text-slate-900 mb-2">Perfil Atual e Perfil Alvo: elementos paralelos</h2>
        <p className="text-sm text-slate-500 mb-6">
          O Perfil Atual e o Perfil Alvo não são etapas estritamente sequenciais. Ambos alimentam o Gap Analysis em conjunto, como dois lados da mesma análise. O NIST disponibiliza inclusive um template onde os dois perfis são documentados lado a lado.
        </p>

        {/* Parallel flow diagram */}
        <div className="flex flex-col items-center gap-3 max-w-lg mx-auto">
          {/* Contexto */}
          <div className="w-full text-center py-2.5 px-5 rounded-xl border" style={{ backgroundColor: '#FFF9C4', borderColor: '#C8A800' + '40' }}>
            <p className="text-xs font-black" style={{ color: '#C8A800' }}>CONTEXTO + GOVERNANÇA</p>
            <p className="text-xs text-slate-500 mt-0.5">Fases 01: apetite a riscos e escopo definidos</p>
          </div>
          <ArrowDown size={16} className="text-slate-300" />

          {/* Parallel — Current and Target */}
          <div className="w-full grid grid-cols-2 gap-3">
            <div className="text-center py-2.5 px-3 rounded-xl border" style={{ backgroundColor: '#F1F5F9', borderColor: '#64748B30' }}>
              <p className="text-xs font-black text-slate-600">PERFIL ATUAL</p>
              <p className="text-xs text-slate-400 mt-0.5">Onde estamos? (Fase 02)</p>
            </div>
            <div className="text-center py-2.5 px-3 rounded-xl border" style={{ backgroundColor: '#E2FAF0', borderColor: '#1E9E5240' }}>
              <p className="text-xs font-black" style={{ color: '#1E9E52' }}>PERFIL ALVO</p>
              <p className="text-xs text-slate-400 mt-0.5">Onde queremos? (Fase 04)</p>
            </div>
          </div>
          {/* converging arrow */}
          <div className="flex items-center justify-center gap-6 w-full">
            <ArrowDown size={16} className="text-slate-300" />
            <ArrowDown size={16} className="text-slate-300" />
          </div>

          {/* Gap */}
          <div className="w-full text-center py-2.5 px-5 rounded-xl border" style={{ backgroundColor: '#FFF3DC', borderColor: '#C0780040' }}>
            <p className="text-xs font-black" style={{ color: '#C07800' }}>GAP ANALYSIS + AVALIAÇÃO DE RISCOS</p>
            <p className="text-xs text-slate-400 mt-0.5">Diferença entre os dois perfis, priorizada por risco (Fases 05 + 06)</p>
          </div>
          <ArrowDown size={16} className="text-slate-300" />

          <div className="w-full text-center py-2.5 px-5 rounded-xl border" style={{ backgroundColor: '#EEECFB', borderColor: '#5B57C040' }}>
            <p className="text-xs font-black" style={{ color: '#5B57C0' }}>PLANO DE AÇÃO + IMPLEMENTAÇÃO</p>
            <p className="text-xs text-slate-400 mt-0.5">Fases 07 e 08</p>
          </div>
          <ArrowDown size={16} className="text-slate-300" />

          <div className="w-full text-center py-2.5 px-5 rounded-xl border" style={{ backgroundColor: '#FFF9C4', borderColor: '#C8A80040' }}>
            <p className="text-xs font-black" style={{ color: '#C8A800' }}>MEDIÇÃO E AVALIAÇÃO</p>
            <p className="text-xs text-slate-400 mt-0.5">Fase 09: Perfil Atual atualizado</p>
          </div>
          <ArrowDown size={16} className="text-slate-300" />

          <div className="w-full text-center py-2.5 px-5 rounded-xl border" style={{ backgroundColor: '#E2FAF0', borderColor: '#1E9E5240' }}>
            <p className="text-xs font-black" style={{ color: '#1E9E52' }}>MELHORIA CONTÍNUA</p>
            <p className="text-xs text-slate-400 mt-0.5">Fase 10: Perfil Alvo revisado, novo ciclo ↺</p>
          </div>
        </div>
      </div>

      {/* Navigation links */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {[
          { label: 'Perfis Organizacionais', desc: 'Current e Target Profile em detalhe', to: '/profiles' },
          { label: 'Assessment Navigator', desc: 'Perguntas e evidências por Subcategoria', to: '/consultant' },
          { label: 'Crosswalk Explorer', desc: 'CSF x NIST 800-53 x ISO 27002', to: '/crosswalk' },
        ].map(l => (
          <Link key={l.to} to={l.to} className="flex items-center justify-between bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 hover:bg-white transition-colors group">
            <div>
              <p className="text-sm font-semibold text-slate-800">{l.label}</p>
              <p className="text-xs text-slate-400">{l.desc}</p>
            </div>
            <ArrowRight size={14} className="text-slate-300 group-hover:text-slate-600 transition-colors" />
          </Link>
        ))}
      </div>

    </div>
  );
};

export default RoadmapPage;
