import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, ArrowDown, ChevronRight } from 'lucide-react';
import PageIntro from '../components/ui/PageIntro';

const steps = [
  {
    n: '01',
    label: 'Perfil Atual',
    question: 'Onde estamos?',
    desc: 'Documente o estado atual da cibersegurança da organização em relação aos resultados do CSF Core. Para cada Subcategoria relevante, registre as práticas em vigor, o status e uma avaliação.',
    color: '#64748B', bg: '#F1F5F9',
    actions: [
      'Definir o escopo do Perfil Organizacional',
      'Avaliar práticas atuais por Função, Categoria e Subcategoria',
      'Documentar status, avaliação e práticas em vigor',
      'Registrar evidências existentes',
    ],
    fields: ['Práticas atuais', 'Status', 'Avaliação (ex: 1 a 5)', 'Evidências'],
    links: [{ label: 'Guia de Perfis Organizacionais', to: '/profiles' }],
  },
  {
    n: '02',
    label: 'Avaliação de Riscos',
    question: 'Quais são nossos riscos?',
    desc: 'Identifique e priorize os riscos de cibersegurança relevantes para os ativos e a missão da organização. Os riscos informam e fundamentam o Perfil Alvo.',
    color: '#D93E38', bg: '#FFE8E7',
    actions: [
      'Identificar ameaças e vulnerabilidades por ativo',
      'Estimar probabilidade e impacto de cada risco',
      'Construir o Registro de Riscos de Cibersegurança',
      'Priorizar riscos conforme o apetite definido na governança',
    ],
    fields: ['Ativo', 'Ameaça', 'Probabilidade', 'Impacto', 'Nível de risco'],
    links: [{ label: 'Enterprise Risk Management', to: '/erm' }],
  },
  {
    n: '03',
    label: 'Perfil Alvo',
    question: 'Onde queremos chegar?',
    desc: 'Defina os resultados desejados de cibersegurança com base nos riscos identificados, nos objetivos de negócio e nos recursos disponíveis. O Perfil Alvo pode se basear em Community Profiles setoriais.',
    color: '#1E9E52', bg: '#E2FAF0',
    actions: [
      'Selecionar e priorizar resultados do CSF Core relevantes',
      'Definir metas para cada Subcategoria selecionada',
      'Considerar Community Profiles setoriais como referência',
      'Validar o Perfil Alvo com a liderança',
    ],
    fields: ['Resultado desejado', 'Prioridade (Alta/Média/Baixa)', 'Metas e objetivos', 'Informative References'],
    links: [{ label: 'Guia de Perfis Organizacionais', to: '/profiles' }],
  },
  {
    n: '04',
    label: 'Gap Analysis',
    question: 'O que falta?',
    desc: 'Compare o Perfil Atual com o Perfil Alvo para identificar as lacunas. Cada gap representa uma oportunidade de melhoria que deve ser avaliada e priorizada.',
    color: '#C07800', bg: '#FFF3DC',
    actions: [
      'Mapear diferenças entre práticas atuais e metas definidas',
      'Classificar gaps por criticidade e esforço de remediação',
      'Identificar dependências entre iniciativas',
      'Documentar gaps prioritários',
    ],
    fields: ['Subcategoria', 'Prática atual', 'Meta desejada', 'Gap identificado', 'Criticidade'],
    links: [{ label: 'Implementation Roadmap', to: '/roadmap' }],
  },
  {
    n: '05',
    label: 'Priorização',
    question: 'O que fazer primeiro?',
    desc: 'Ordene os gaps identificados considerando o nível de risco, o impacto potencial, o custo de remediação e a capacidade operacional disponível.',
    color: '#C8A800', bg: '#FFF9C4',
    actions: [
      'Aplicar critérios de priorização: risco, custo, dependências',
      'Definir ondas de implementação',
      'Alocar recursos e responsáveis',
      'Comunicar prioridades à liderança',
    ],
    fields: ['Gap', 'Nível de risco', 'Custo estimado', 'Prioridade', 'Onda'],
    links: [{ label: 'Implementation Roadmap', to: '/roadmap' }],
  },
  {
    n: '06',
    label: 'Plano de Ação',
    question: 'Como vamos tratar?',
    desc: 'Estruture formalmente as iniciativas para fechar os gaps prioritários, com responsáveis, prazos, recursos e critérios de sucesso claros.',
    color: '#5B57C0', bg: '#EEECFB',
    actions: [
      'Detalhar cada iniciativa com escopo e entregáveis',
      'Definir responsável, prazo e recursos necessários',
      'Estabelecer KPIs e KRIs por iniciativa',
      'Obter aprovação formal do plano',
    ],
    fields: ['Ação', 'Responsável', 'Prazo', 'Recursos', 'KPI/KRI'],
    links: [
      { label: 'Assessment Navigator', to: '/consultant' },
      { label: 'Implementation Roadmap', to: '/roadmap' },
    ],
  },
];

const AssessmentPage: React.FC = () => {
  const [activeStep, setActiveStep] = useState<string | null>(null);

  return (
    <div className="max-w-screen-xl mx-auto px-4 sm:px-6 py-10 animate-fadeIn">

      <div className="mb-6">
        <p className="text-xs font-semibold uppercase tracking-widest mb-2" style={{ color: '#0F766E' }}>Jornada de Assessment</p>
        <h1 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-3">Assessment Journey</h1>
        <p className="text-slate-500 max-w-2xl text-sm leading-relaxed">
          Processo estruturado para avaliar a postura atual de cibersegurança, definir o estado desejado e construir um plano de ação baseado nos resultados do NIST CSF 2.0.
        </p>
      </div>

      <PageIntro
        title="Como usar esta jornada?"
        plain="Cada etapa representa um passo no processo de assessment baseado em Organizational Profiles do NIST CSF 2.0."
        detail="Perfil Atual e Perfil Alvo alimentam o Gap Analysis em conjunto — eles não são necessariamente etapas sequenciais."
        learnMore={{ label: 'Entender o CSF', to: '/intro' }}
      />

      {/* Visual flow */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 mb-8">
        <h2 className="text-sm font-bold uppercase tracking-wider text-slate-400 mb-6">Visão geral da jornada</h2>

        <div className="flex flex-col items-center gap-2 max-w-xs mx-auto">
          {/* Step 1 */}
          <div className="w-full text-center py-2.5 px-4 rounded-xl border cursor-pointer hover:opacity-80 transition-opacity"
            style={{ backgroundColor: '#F1F5F9', borderColor: '#94A3B8' }}
            onClick={() => setActiveStep(activeStep === '01' ? null : '01')}
          >
            <p className="text-xs font-black text-slate-600">PERFIL ATUAL</p>
            <p className="text-xs text-slate-400 mt-0.5">Onde estamos?</p>
          </div>

          {/* Steps 2 + 3 in parallel */}
          <ArrowDown size={16} className="text-slate-300" />
          <div className="w-full grid grid-cols-2 gap-2">
            <div className="text-center py-2.5 px-2 rounded-xl border cursor-pointer hover:opacity-80 transition-opacity"
              style={{ backgroundColor: '#FFE8E7', borderColor: '#F96F67' }}
              onClick={() => setActiveStep(activeStep === '02' ? null : '02')}
            >
              <p className="text-xs font-black" style={{ color: '#D93E38' }}>AVALIAÇÃO DE RISCOS</p>
              <p className="text-xs text-slate-400 mt-0.5">Fase 02</p>
            </div>
            <div className="text-center py-2.5 px-2 rounded-xl border cursor-pointer hover:opacity-80 transition-opacity"
              style={{ backgroundColor: '#E2FAF0', borderColor: '#6EEA96' }}
              onClick={() => setActiveStep(activeStep === '03' ? null : '03')}
            >
              <p className="text-xs font-black" style={{ color: '#1E9E52' }}>PERFIL ALVO</p>
              <p className="text-xs text-slate-400 mt-0.5">Onde queremos?</p>
            </div>
          </div>

          {/* Convergence */}
          <div className="flex items-center justify-center gap-12 w-full">
            <ArrowDown size={16} className="text-slate-300" />
            <ArrowDown size={16} className="text-slate-300" />
          </div>

          {['04', '05', '06'].map((n, i) => {
            const step = steps.find(s => s.n === n)!;
            return (
              <React.Fragment key={n}>
                <div
                  className="w-full text-center py-2.5 px-4 rounded-xl border cursor-pointer hover:opacity-80 transition-opacity"
                  style={{ backgroundColor: step.bg, borderColor: `${step.color}60` }}
                  onClick={() => setActiveStep(activeStep === n ? null : n)}
                >
                  <p className="text-xs font-black" style={{ color: step.color }}>{step.label.toUpperCase()}</p>
                  <p className="text-xs text-slate-400 mt-0.5">{step.question}</p>
                </div>
                {i < 2 && <ArrowDown size={16} className="text-slate-300" />}
              </React.Fragment>
            );
          })}

          <div className="flex items-center gap-1 text-xs text-slate-400 mt-1">
            <span>↺</span>
            <span>Ciclo iterativo: atualizar Perfil Atual e repetir</span>
          </div>
        </div>
      </div>

      {/* Active step detail */}
      {activeStep && (() => {
        const step = steps.find(s => s.n === activeStep)!;
        return (
          <div className="rounded-2xl border-2 p-6 mb-8 animate-fadeIn" style={{ borderColor: step.color, backgroundColor: `${step.color}06` }}>
            <div className="flex items-center gap-4 mb-5">
              <div className="w-12 h-12 rounded-xl flex items-center justify-center font-black text-xl" style={{ backgroundColor: step.bg, color: step.color }}>
                {step.n}
              </div>
              <div>
                <h3 className="text-xl font-bold text-slate-900">{step.label}</h3>
                <p className="text-sm font-semibold" style={{ color: step.color }}>{step.question}</p>
              </div>
            </div>
            <p className="text-sm text-slate-600 leading-relaxed mb-5">{step.desc}</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div>
                <p className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-3">O que fazer</p>
                <ul className="space-y-2">
                  {step.actions.map((a, i) => (
                    <li key={i} className="flex gap-2 text-sm text-slate-700">
                      <span className="w-1.5 h-1.5 rounded-full shrink-0 mt-2" style={{ backgroundColor: step.color }} />
                      {a}
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <p className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-3">Campos do documento</p>
                <div className="flex flex-wrap gap-1.5">
                  {step.fields.map(f => (
                    <span key={f} className="text-xs px-2 py-1 rounded-lg font-semibold" style={{ backgroundColor: step.bg, color: step.color }}>{f}</span>
                  ))}
                </div>
                {step.links.length > 0 && (
                  <div className="mt-4 space-y-1.5">
                    {step.links.map(l => (
                      <Link key={l.to} to={l.to} className="flex items-center gap-1 text-xs font-semibold hover:underline" style={{ color: step.color }}>
                        <ChevronRight size={12} /> {l.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        );
      })()}

      {/* Steps grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
        {steps.map(step => (
          <button
            key={step.n}
            onClick={() => setActiveStep(activeStep === step.n ? null : step.n)}
            className="text-left bg-white rounded-xl border border-slate-200 p-5 hover:shadow-md transition-all"
          >
            <div className="flex items-center gap-3 mb-2">
              <div className="w-9 h-9 rounded-xl flex items-center justify-center font-black text-sm shrink-0" style={{ backgroundColor: step.bg, color: step.color }}>
                {step.n}
              </div>
              <div>
                <h3 className="text-sm font-bold text-slate-800">{step.label}</h3>
                <p className="text-xs font-semibold" style={{ color: step.color }}>{step.question}</p>
              </div>
            </div>
            <p className="text-xs text-slate-500 leading-relaxed">{step.desc.slice(0, 90)}...</p>
          </button>
        ))}
      </div>

      {/* Links to related pages */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {[
          { label: 'Perfis Organizacionais', desc: 'Processo oficial de 5 etapas do NIST', to: '/profiles' },
          { label: 'Assessment Navigator', desc: 'Perguntas e evidências por Subcategoria', to: '/consultant' },
          { label: 'Implementation Roadmap', desc: '10 fases do zero ao programa completo', to: '/roadmap' },
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

export default AssessmentPage;
