import React, { useState } from 'react';
import { getFnColors } from '../utils/fnColors';
import { ChevronRight, ArrowRight, ArrowDown, CheckSquare, FileText, AlertTriangle, TrendingUp } from 'lucide-react';
import PageIntro from '../components/ui/PageIntro';
import { Link } from 'react-router-dom';

const steps = [
  { n: 1, phase: 'Escopo', fnId: 'GV',
    title: 'Definir o escopo do Profile',
    desc: 'Determinar quais divisões, ativos, sistemas, parceiros e tipos de ameaças serão cobertos.',
    detail: 'Cada Profile pode ter um escopo diferente — por tecnologia (IT, OT), tipo de dado (PII, PHI), usuários (internos, terceiros) ou unidade de negócio. Uma organização pode ter múltiplos Profiles simultâneos.',
    questions: ['Qual é o motivo para criar este Profile?','O Profile cobre toda a organização ou apenas parte dela?','Quais tipos de ameaças e vulnerabilidades serão incluídos?','Quem será responsável por desenvolver, revisar e operacionalizar o Profile?'],
  },
  { n: 2, phase: 'Informações', fnId: 'ID',
    title: 'Reunir informações necessárias',
    desc: 'Coletar políticas, requisitos regulatórios, prioridades de risco, Community Profiles e padrões aplicáveis.',
    detail: 'Fontes incluem: políticas organizacionais, Community Profiles setoriais, template oficial do NIST CSF, Informative References, Implementation Examples e requisitos legais/contratuais.',
    questions: ['Existe algum Community Profile relevante para o setor?','Quais requisitos legais e regulatórios se aplicam?','Quais são as prioridades estratégicas de risco da liderança?','Quais frameworks e padrões a organização já utiliza?'],
  },
  { n: 3, phase: 'Criação', fnId: 'PR',
    title: 'Criar o Organizational Profile',
    desc: 'Documentar as práticas atuais (Current Profile) e as metas desejadas (Target Profile) com campos estruturados.',
    detail: 'O Profile inclui para cada outcome do CSF: Práticas atuais, Status, Avaliação (rating), Prioridade e Metas. O Target Profile considera novos requisitos, novas tecnologias e tendências de ameaças.',
    questions: [], table: true,
  },
  { n: 4, phase: 'Gap Analysis', fnId: 'DE',
    title: 'Analisar gaps e criar Action Plan',
    desc: 'Comparar Current e Target Profile para identificar lacunas e desenvolver plano de ação priorizado.',
    detail: 'O Action Plan deve conter para cada melhoria: ação, prioridade, responsável, prazo e recursos necessários. Use Informative References e Implementation Examples do NIST como base.',
    questions: ['Quais são as maiores diferenças entre práticas atuais e metas?','Qual é o impacto de cada gap no risco organizacional?','Quais gaps são mais críticos para a missão?','Quais recursos (pessoal, orçamento, ferramentas) são necessários?'],
    actionPlan: true,
  },
  { n: 5, phase: 'Implementação', fnId: 'RC',
    title: 'Implementar e atualizar o Profile',
    desc: 'Executar o Action Plan, monitorar com KPIs/KRIs e atualizar o Profile continuamente.',
    detail: 'Controles implementados reduzem riscos que são monitorados via KPIs e KRIs. Quando riscos ultrapassam a tolerância, o Action Plan, o Profile e as declarações de tolerância são revisados.',
    questions: ['Os controles implementados estão atingindo os resultados esperados?','Os KPIs e KRIs refletem adequadamente o progresso?','Há mudanças no ambiente de ameaças que exigem ajuste no Target Profile?','O Profile está sendo atualizado para refletir o estado atual?'],
  },
];

const ImplementationPage: React.FC = () => {
  const [activeStep, setActiveStep] = useState<number | null>(null);

  return (
    <div className="max-w-screen-xl mx-auto px-4 sm:px-6 py-10 animate-fadeIn">
      {/* Header */}
      <div className="mb-8">
        <p className="text-xs font-semibold uppercase tracking-widest mb-2" style={{ color: '#0F766E' }}>Guia de Implementação — NIST SP 1301</p>
        <h1 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-3">Como Implementar o NIST CSF 2.0</h1>
        <p className="text-slate-500 max-w-2xl leading-relaxed text-sm">
          O NIST CSF 2.0 define um processo de 5 etapas para criação e uso de Organizational Profiles — o mecanismo central de implementação do framework. Esta jornada é orientativa e pode ser adaptada ao contexto de cada organização.
        </p>
      </div>

      <PageIntro
        title="Por onde começar na implementação?"
        plain="O NIST define um processo de 5 etapas para implementar o CSF por meio de Organizational Profiles — o mecanismo central do framework."
        detail="Você não precisa fazer tudo de uma vez. Comece definindo o escopo, avalie onde está (Current Profile) e onde quer chegar (Target Profile)."
        learnMore={{ label: 'Entender o que é o CSF', to: '/intro' }}
      />
      {/* Flow diagram */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 mb-8">
        <h2 className="text-sm font-bold text-slate-700 mb-5 uppercase tracking-wider">Processo de 5 Etapas — Organizational Profile</h2>
        <div className="flex flex-col sm:flex-row items-center gap-2">
          {steps.map((step, i) => (
            <React.Fragment key={step.n}>
              <button
                onClick={() => setActiveStep(activeStep === step.n ? null : step.n)}
                className="flex flex-col items-center gap-1 px-4 py-3 rounded-xl border-2 transition-all hover:scale-105 text-center min-w-[110px]"
                style={{
                  borderColor: getFnColors(step.fnId).text,
                  backgroundColor: activeStep === step.n ? getFnColors(step.fnId).bg : getFnColors(step.fnId).light,
                  color: getFnColors(step.fnId).text,
                }}
              >
                <span className="text-xl font-black opacity-40">{step.n}</span>
                <span className="text-xs font-bold uppercase tracking-wide">{step.phase}</span>
              </button>
              {i < steps.length - 1 && (
                <div className="hidden sm:block text-slate-300 shrink-0">
                  <ArrowRight size={18} />
                </div>
              )}
            </React.Fragment>
          ))}
        </div>
        <div className="flex justify-center mt-3">
          <div className="flex items-center gap-2 text-xs text-slate-400">
            <ArrowDown size={14} />
            <span className="font-medium">ciclo contínuo — o Profile é atualizado a cada iteração</span>
          </div>
        </div>
      </div>

      {/* Active step detail */}
      {activeStep && (() => {
        const step = steps.find(s => s.n === activeStep)!;
        return (
          <div className="rounded-2xl border-2 p-6 mb-8 animate-fadeIn" style={{ borderColor: getFnColors(step.fnId).text, backgroundColor: `${getFnColors(step.fnId).text}08` }}>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl flex items-center justify-center font-black text-white shrink-0" style={{ backgroundColor: getFnColors(step.fnId).bg }}>
                {step.n}
              </div>
              <div>
                <p className="text-xs font-bold uppercase tracking-widest" style={{ color: getFnColors(step.fnId).text }}>{step.phase}</p>
                <h3 className="text-lg font-bold text-slate-900">{step.title}</h3>
              </div>
            </div>
            <p className="text-sm text-slate-600 leading-relaxed mb-4">{step.detail}</p>

            {/* Questions */}
            {step.questions.length > 0 && (
              <div className="mb-4">
                <p className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-3">Perguntas orientativas</p>
                <ul className="space-y-2">
                  {step.questions.map((q, i) => (
                    <li key={i} className="flex gap-2 text-sm text-slate-700">
                      <span className="font-bold shrink-0" style={{ color: getFnColors(step.fnId).text }}>Q{i + 1}</span>
                      {q}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Profile table example (step 3) */}
            {step.table && (
              <div>
                <p className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-3">Estrutura do Organizational Profile</p>
                <div className="overflow-x-auto rounded-xl border border-slate-200">
                  <table className="w-full text-xs">
                    <thead>
                      <tr className="border-b border-slate-200">
                        <th colSpan={2} className="px-3 py-2 text-left font-bold text-slate-600 bg-slate-50">Outcome CSF</th>
                        <th colSpan={3} className="px-3 py-2 text-left font-bold bg-blue-50 text-blue-700 border-l border-slate-200">Current Profile</th>
                        <th colSpan={2} className="px-3 py-2 text-left font-bold bg-green-50 text-green-700 border-l border-slate-200">Target Profile</th>
                      </tr>
                      <tr className="border-b border-slate-200 text-slate-500">
                        <th className="px-3 py-2 text-left bg-slate-50">ID</th>
                        <th className="px-3 py-2 text-left bg-slate-50">Descrição</th>
                        <th className="px-3 py-2 text-left bg-blue-50 border-l border-slate-200">Práticas</th>
                        <th className="px-3 py-2 text-left bg-blue-50">Status</th>
                        <th className="px-3 py-2 text-left bg-blue-50">Avaliação</th>
                        <th className="px-3 py-2 text-left bg-green-50 border-l border-slate-200">Prioridade</th>
                        <th className="px-3 py-2 text-left bg-green-50">Metas</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b border-slate-100">
                        <td className="px-3 py-3 font-mono font-bold text-purple-700 bg-slate-50">PR.PS-01</td>
                        <td className="px-3 py-3 text-slate-700 bg-slate-50">Configurações de segurança estabelecidas e aplicadas</td>
                        <td className="px-3 py-3 text-slate-600 bg-blue-50/50 border-l border-slate-200">Baselines definidos pelo CIO para plataformas principais, uso não monitorado consistentemente</td>
                        <td className="px-3 py-3 bg-blue-50/50"><span className="px-2 py-0.5 bg-yellow-100 text-yellow-700 rounded font-semibold">Parcial</span></td>
                        <td className="px-3 py-3 bg-blue-50/50 text-slate-600">3/5</td>
                        <td className="px-3 py-3 bg-green-50/50 border-l border-slate-200"><span className="px-2 py-0.5 bg-red-100 text-red-700 rounded font-semibold">Alta</span></td>
                        <td className="px-3 py-3 text-slate-600 bg-green-50/50">Baselines aplicados a todos os sistemas; desvios detectados automaticamente</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* Action Plan (step 4) */}
            {step.actionPlan && (
              <div>
                <p className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-3">Estrutura do Action Plan</p>
                <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
                  {[
                    { label: 'Ação', desc: 'O que será feito', icon: <CheckSquare size={14} /> },
                    { label: 'Prioridade', desc: 'Alta / Média / Baixa', icon: <AlertTriangle size={14} /> },
                    { label: 'Responsável', desc: 'Dono da ação', icon: <FileText size={14} /> },
                    { label: 'Prazo', desc: 'Data limite', icon: <TrendingUp size={14} /> },
                    { label: 'Recursos', desc: 'Pessoal, orçamento, ferramentas', icon: <ChevronRight size={14} /> },
                  ].map(f => (
                    <div key={f.label} className="bg-white rounded-xl border border-slate-200 p-3 text-center">
                      <div className="flex justify-center mb-1" style={{ color: getFnColors(step.fnId).text }}>{f.icon}</div>
                      <p className="text-xs font-bold text-slate-800">{f.label}</p>
                      <p className="text-xs text-slate-400 mt-0.5">{f.desc}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        );
      })()}

      {/* All steps grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
        {steps.map(step => (
          <button
            key={step.n}
            onClick={() => setActiveStep(activeStep === step.n ? null : step.n)}
            className="text-left bg-white rounded-xl border border-slate-200 p-5 hover:shadow-md transition-all group"
          >
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-lg flex items-center justify-center font-black text-sm shrink-0" style={{ backgroundColor: getFnColors(step.fnId).light, color: getFnColors(step.fnId).text }}>
                {step.n}
              </div>
              <div>
                <p className="text-xs font-bold uppercase tracking-wider mb-1" style={{ color: getFnColors(step.fnId).text }}>{step.phase}</p>
                <h3 className="text-sm font-bold text-slate-800 mb-1">{step.title}</h3>
                <p className="text-xs text-slate-500 leading-relaxed">{step.desc}</p>
              </div>
            </div>
          </button>
        ))}
      </div>

      {/* Key concepts */}
      <div className="bg-white rounded-xl border border-slate-200 p-6 mb-6">
        <h2 className="text-sm font-bold uppercase tracking-wider text-slate-500 mb-4">Conceitos-chave</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {[
            { term: 'Community Profile', def: 'Profile criado para múltiplas organizações de um setor ou tecnologia. Serve como base para o Target Profile organizacional.' },
            { term: 'Informative References', def: 'Mapeamentos entre outcomes do CSF e padrões como NIST SP 800-53, ISO 27001 e CIS Controls. Disponíveis no NIST CPRT.' },
            { term: 'Implementation Examples', def: 'Exemplos concisos e orientados à ação publicados pelo NIST para cada Subcategory. Ajudam a concretizar os outcomes.' },
            { term: 'KPI / KRI', def: 'Key Performance Indicators e Key Risk Indicators usados para monitorar a eficácia dos controles e o nível de risco residual.' },
          ].map(c => (
            <div key={c.term} className="flex gap-3">
              <div className="w-1 rounded-full shrink-0 mt-1" style={{ backgroundColor: '#0B1F33', minHeight: '100%' }} />
              <div>
                <p className="text-sm font-bold text-slate-800">{c.term}</p>
                <p className="text-xs text-slate-500 mt-0.5 leading-relaxed">{c.def}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Links to related pages */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {[
          { label: 'Organizational Profiles', desc: 'Current, Target e Gap Analysis', to: '/profiles' },
          { label: 'CSF Tiers', desc: 'Nível de rigor por Function', to: '/tiers' },
          { label: 'Consultant View', desc: 'Roteiro de assessment', to: '/consultant' },
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

export default ImplementationPage;
