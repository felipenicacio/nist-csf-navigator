import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import PageIntro from '../components/ui/PageIntro';
import { ArrowRight, ArrowDown, CheckCircle } from 'lucide-react';
import { getFnColors } from '../utils/fnColors';

const phases = [
  {
    n: '01', label: 'Governança e Contexto',
    fn: 'GV',
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
    color: '#C8A800', bg: '#FFF9C4',
  },
  {
    n: '02', label: 'Perfil Atual (Current Profile)',
    fn: 'ID',
    desc: 'Avaliar o estado atual da cibersegurança da organização em relação aos resultados do CSF Core.',
    activities: [
      'Definir o escopo do Perfil Organizacional',
      'Inventariar ativos, sistemas, dados e fornecedores críticos',
      'Avaliar práticas atuais por Função, Categoria e Subcategoria',
      'Documentar status, avaliação e práticas em vigor',
      'Identificar lacunas e riscos evidentes',
    ],
    deliverables: ['Inventário de ativos', 'Perfil Atual documentado', 'Avaliação de maturidade inicial'],
    csf: ['ID.AM', 'ID.RA', 'GV.OC'],
    color: '#1A7FA8', bg: '#E0F4FB',
  },
  {
    n: '03', label: 'Avaliação de Riscos',
    fn: 'ID',
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
    color: '#1A7FA8', bg: '#E0F4FB',
  },
  {
    n: '04', label: 'Perfil Alvo (Target Profile)',
    fn: 'GV',
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
    color: '#C8A800', bg: '#FFF9C4',
  },
  {
    n: '05', label: 'Gap Analysis',
    fn: 'ID',
    desc: 'Comparar o Perfil Atual com o Perfil Alvo para identificar lacunas e construir um plano de ação priorizado.',
    activities: [
      'Mapear diferenças entre práticas atuais e metas definidas',
      'Classificar gaps por criticidade e esforço de remediação',
      'Identificar dependências entre iniciativas',
      'Construir plano de ação com ação, responsável, prazo e recursos',
      'Alinhar o plano com o orçamento e capacidade disponíveis',
    ],
    deliverables: ['Análise de gaps por Subcategoria', 'Plano de Ação priorizado', 'Cronograma inicial'],
    csf: ['ID.IM', 'GV.OV'],
    color: '#1A7FA8', bg: '#E0F4FB',
  },
  {
    n: '06', label: 'Priorização',
    fn: 'GV',
    desc: 'Decidir quais iniciativas serão executadas primeiro, equilibrando risco, impacto, custo e capacidade operacional.',
    activities: [
      'Aplicar critérios de priorização (risco, custo, dependências)',
      'Definir ondas de implementação',
      'Alocar recursos e responsáveis por iniciativa',
      'Comunicar prioridades à liderança e às equipes',
      'Ajustar o plano conforme restrições identificadas',
    ],
    deliverables: ['Mapa de prioridades', 'Ondas de implementação', 'Alocação de recursos'],
    csf: ['GV.RM', 'GV.RR'],
    color: '#C8A800', bg: '#FFF9C4',
  },
  {
    n: '07', label: 'Plano de Ação',
    fn: 'PR',
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
    color: '#5B57C0', bg: '#EEECFB',
  },
  {
    n: '08', label: 'Implementação',
    fn: 'PR',
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
    color: '#5B57C0', bg: '#EEECFB',
  },
  {
    n: '09', label: 'Medição e Avaliação',
    fn: 'GV',
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
    color: '#C8A800', bg: '#FFF9C4',
  },
  {
    n: '10', label: 'Melhoria Contínua',
    fn: 'ID',
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
    color: '#1E9E52', bg: '#E2FAF0',
  },
];

const RoadmapPage: React.FC = () => {
  const [activePhase, setActivePhase] = useState<string | null>(null);

  return (
    <div className="max-w-screen-xl mx-auto px-4 sm:px-6 py-10 animate-fadeIn">
      <div className="mb-8">
        <p className="text-xs font-semibold uppercase tracking-widest mb-2" style={{ color: '#0F766E' }}>Guia Corporativo</p>
        <h1 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-3">Implementation Roadmap</h1>
        <p className="text-slate-500 max-w-2xl text-sm leading-relaxed">
          Jornada de 10 fases para estruturar um programa de cibersegurança baseado no NIST CSF 2.0, desde a governança até a melhoria contínua. Cada fase é orientativa e pode ser adaptada ao contexto da organização.
        </p>
      </div>

      <PageIntro
        title="Como usar este Roadmap?"
        plain="Este Roadmap mostra como o NIST CSF pode ser usado dentro de um programa corporativo de cibersegurança, da decisão inicial até a melhoria contínua."
        detail="Não é um cronograma obrigatório. Use como referência para entender a sequência lógica de um programa baseado no CSF."
        learnMore={{ label: 'Entender o CSF', to: '/intro' }}
      />

      {/* Visual flow — compact horizontal stepper */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 mb-8 overflow-x-auto">
        <h2 className="text-sm font-bold uppercase tracking-wider text-slate-400 mb-5">Visão geral das 10 fases</h2>
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
          <div className="flex items-center gap-1 text-xs text-slate-400">
            <span>↺</span>
            <span className="font-medium">Ciclo contínuo: a Fase 10 reinicia a Fase 02</span>
          </div>
        </div>
      </div>

      {/* Active phase detail */}
      {activePhase && (() => {
        const phase = phases.find(p => p.n === activePhase)!;
        return (
          <div className="rounded-2xl border-2 p-6 mb-8 animate-fadeIn" style={{ borderColor: phase.color, backgroundColor: `${phase.color}06` }}>
            <div className="flex items-center gap-4 mb-5">
              <div className="w-12 h-12 rounded-xl flex items-center justify-center font-black text-xl" style={{ backgroundColor: phase.bg, color: phase.color }}>
                {phase.n}
              </div>
              <div>
                <h3 className="text-xl font-bold text-slate-900">{phase.label}</h3>
                <p className="text-sm text-slate-500 mt-0.5">{phase.desc}</p>
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
            className="text-left bg-white rounded-xl border border-slate-200 p-5 hover:shadow-md transition-all group"
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

      {/* Profile flow visual */}
      <div className="bg-white rounded-2xl border border-slate-200 p-8 mb-8">
        <h2 className="text-lg font-bold text-slate-900 mb-2">Da Postura Atual ao Estado Desejado</h2>
        <p className="text-sm text-slate-500 mb-6">O coração do programa é a transição do Perfil Atual para o Perfil Alvo, guiada pelo Gap Analysis e pelo Plano de Ação.</p>
        <div className="flex flex-col items-center gap-2">
          {[
            { label: 'PERFIL ATUAL', sub: 'Onde estamos?', color: '#64748B', bg: '#F1F5F9' },
            null,
            { label: 'GAP ANALYSIS', sub: 'O que falta?', color: '#C07800', bg: '#FFF3DC' },
            null,
            { label: 'RISCOS + PRIORIDADES', sub: 'O que tratar primeiro?', color: '#D93E38', bg: '#FFE8E7' },
            null,
            { label: 'PERFIL ALVO', sub: 'Onde queremos chegar?', color: '#1E9E52', bg: '#E2FAF0' },
            null,
            { label: 'PLANO DE AÇÃO', sub: 'Como chegar lá?', color: '#1A7FA8', bg: '#E0F4FB' },
            null,
            { label: 'MELHORIA', sub: 'Ciclo contínuo', color: '#5B57C0', bg: '#EEECFB' },
          ].map((item, i) =>
            item === null ? (
              <ArrowDown key={i} size={18} className="text-slate-300" />
            ) : (
              <div key={i} className="w-full max-w-sm text-center py-3 px-5 rounded-xl border" style={{ backgroundColor: item.bg, borderColor: `${item.color}30` }}>
                <p className="text-xs font-black" style={{ color: item.color }}>{item.label}</p>
                <p className="text-xs text-slate-500 mt-0.5">{item.sub}</p>
              </div>
            )
          )}
        </div>
      </div>

      {/* Navigation links */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {[
          { label: 'Perfis Organizacionais', desc: 'Current e Target Profile em detalhe', to: '/profiles' },
          { label: 'Consultant View', desc: 'Assessment por Subcategoria', to: '/consultant' },
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
