import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { ArrowRight, ArrowDown, CheckCircle, ChevronRight } from 'lucide-react';

// ── 5 Etapas do NIST ─────────────────────────────────────────────────────────

const steps = [
  {
    id: 'escopo',
    n: '01',
    label: 'Escopo',
    headline: 'O que precisamos considerar?',
    intro: 'Antes de criar qualquer Perfil Organizacional, a organização precisa definir claramente os limites do que será avaliado e compreender o contexto no qual opera.',
    nistRef: 'NIST SP 1301 — Step 1: Scope the Organizational Profile',
    color: '#C8A800', bg: '#FFF9C4', border: '#FFF59D',
    activities: [
      'Documentar a missão, os objetivos estratégicos e as prioridades da organização',
      'Identificar quais divisões, sistemas, tecnologias e parceiros estão no escopo',
      'Determinar os tipos de ameaças e vulnerabilidades que serão considerados',
      'Definir quem será responsável por desenvolver, revisar e operacionalizar o Perfil',
      'Identificar requisitos legais, regulatórios e contratuais de cibersegurança aplicáveis',
    ],
    deliverables: ['Declaração de escopo documentada', 'Contexto organizacional mapeado', 'Partes interessadas identificadas'],
    links: [
      { label: 'ERM — Contexto organizacional (GV.OC)', to: '/erm' },
      { label: 'Explorar Função GOVERN', to: '/framework/gv' },
    ],
    tip: 'Uma organização pode ter múltiplos Perfis Organizacionais com escopos diferentes, por exemplo um para TI corporativa e outro para sistemas industriais (OT).',
  },
  {
    id: 'informacoes',
    n: '02',
    label: 'Reunir Informações',
    headline: 'Quais informações precisamos?',
    intro: 'Antes de criar os Perfis, a organização deve reunir as informações necessárias: políticas existentes, prioridades de risco, requisitos aplicáveis, Community Profiles setoriais e os resultados do CSF Core relevantes.',
    nistRef: 'NIST SP 1301 — Step 2: Gather Information',
    color: '#1A7FA8', bg: '#E0F4FB', border: '#4BAED6',
    activities: [
      'Revisar políticas, normas e procedimentos de cibersegurança existentes',
      'Verificar se existe Community Profile relevante para o setor da organização',
      'Identificar os Informative References (NIST SP 800-53, ISO 27001, CIS Controls) aplicáveis',
      'Levantar prioridades de risco com a liderança executiva',
      'Inventariar ativos, sistemas, dados e fornecedores críticos',
    ],
    deliverables: ['Lista de Informative References aplicáveis', 'Community Profile identificado (se existente)', 'Inventário preliminar de ativos'],
    links: [
      { label: 'Explorar Funções e Categorias do CSF', to: '/framework' },
      { label: 'Crosswalk: CSF x NIST 800-53 x ISO 27001', to: '/crosswalk' },
      { label: 'Frameworks Relacionados', to: '/frameworks' },
    ],
    tip: 'O NIST mantém um repositório de Community Profiles públicos em csrc.nist.gov. Verifique se existe um para o seu setor antes de começar do zero.',
  },
  {
    id: 'perfil',
    n: '03',
    label: 'Criar Perfil',
    headline: 'Como construímos nossos Perfis?',
    intro: 'Esta é a etapa central. A organização cria o Perfil Atual (onde está hoje) e o Perfil Alvo (onde quer chegar). Ambos são construídos selecionando e avaliando os resultados do CSF Core relevantes ao escopo definido.',
    nistRef: 'NIST SP 1301 — Step 3: Create the Organizational Profile',
    color: '#5B57C0', bg: '#EEECFB', border: '#8F8CE0',
    activities: [
      'Para o Perfil Atual: documentar práticas existentes, status e avaliação de cada resultado do CSF',
      'Para o Perfil Alvo: selecionar resultados desejados e definir prioridade de cada um',
      'Usar o template oficial do NIST CSF 2.0 como base (disponível em csrc.nist.gov)',
      'Considerar Community Profiles como ponto de partida para o Perfil Alvo',
      'Validar os Perfis com a liderança executiva e as áreas de negócio',
    ],
    deliverables: ['Perfil Atual documentado', 'Perfil Alvo documentado e aprovado', 'Prioridades definidas por resultado'],
    links: [
      { label: 'Perfis Organizacionais — guia completo', to: '/profiles' },
      { label: 'Assessment Navigator — perguntas por Subcategoria', to: '/consultant' },
      { label: 'Tiers — nível de rigor por Função', to: '/tiers' },
    ],
    tip: 'Perfil Atual e Perfil Alvo não são etapas sequenciais — eles podem ser desenvolvidos em paralelo. O NIST oferece um template em Excel com os dois lado a lado.',
    profileComparison: true,
  },
  {
    id: 'lacunas',
    n: '04',
    label: 'Analisar Lacunas + Plano de Ação',
    headline: 'Como identificamos e tratamos as lacunas?',
    intro: 'Com o Perfil Atual e o Perfil Alvo em mãos, a organização compara os dois para identificar lacunas. Cada lacuna representa uma oportunidade de melhoria que deve ser analisada, priorizada e incluída em um Plano de Ação.',
    nistRef: 'NIST SP 1301 — Step 4: Analyze Gaps and Create an Action Plan',
    color: '#C07800', bg: '#FFF3DC', border: '#FDB642',
    activities: [
      'Comparar práticas atuais com as metas definidas no Perfil Alvo para cada resultado',
      'Classificar lacunas por criticidade, risco associado e esforço de remediação',
      'Construir o Plano de Ação com: ação, prioridade, responsável, prazo e recursos',
      'Considerar missão, benefícios, riscos e recursos disponíveis na priorização',
      'Alinhar o plano com o orçamento e a capacidade operacional da organização',
    ],
    deliverables: ['Análise de gaps documentada', 'Plano de Ação priorizado', 'KPIs e KRIs definidos'],
    links: [
      { label: 'Assessment Navigator — diagnóstico por Subcategoria', to: '/consultant' },
    ],
    tip: 'O Plano de Ação deve ter cinco elementos por item: ação, prioridade, responsável, prazo e recursos necessários. Gaps que demandam mais tempo podem ser gerenciados como Planos de Ação e Marcos (POA&M).',
    actionPlan: true,
  },
  {
    id: 'implementar',
    n: '05',
    label: 'Implementar + Atualizar',
    headline: 'Como implementamos e mantemos o ciclo?',
    intro: 'O Plano de Ação é executado por meio de controles técnicos, administrativos e físicos. À medida que os controles são implementados, o Perfil Atual é atualizado para refletir o novo estado — e o ciclo recomeça.',
    nistRef: 'NIST SP 1301 — Step 5: Implement Action Plan and Update the Profile',
    color: '#1E9E52', bg: '#E2FAF0', border: '#6EEA96',
    activities: [
      'Implementar os controles definidos no Plano de Ação (técnicos, administrativos e físicos)',
      'Monitorar a execução com KPIs e KRIs por iniciativa',
      'Reavaliar o Perfil Atual periodicamente para refletir o novo estado de cibersegurança',
      'Ajustar o Perfil Alvo quando houver mudanças no ambiente de ameaças ou nos objetivos de negócio',
      'Recomeçar o ciclo: nova avaliação, novos gaps, novo plano de ação',
    ],
    deliverables: ['Controles implementados com evidências', 'Perfil Atual atualizado', 'Relatório de progresso'],
    links: [
      { label: 'ERM — integração com Enterprise Risk Management', to: '/erm' },
      { label: 'C-SCRM — gestão da cadeia de suprimentos', to: '/cscrm' },
    ],
    tip: 'Este processo não tem fim. O NIST recomenda repetir as 5 etapas continuamente — o Perfil Alvo evolui à medida que o ambiente de ameaças muda e a organização amadurece.',
    cycle: true,
  },
];

const ImplementationPage: React.FC = () => {
  const location = useLocation();

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const step = params.get('step');
    if (step) {
      const el = document.getElementById(step);
      if (el) {
        setTimeout(() => el.scrollIntoView({ behavior: 'smooth', block: 'start' }), 150);
      }
    }
  }, [location.search]);

  return (
    <div className="animate-fadeIn">

      {/* Header */}
      <div className="bg-white border-b border-slate-200 px-4 sm:px-6 py-10">
        <div className="max-w-screen-xl mx-auto">
          <p className="text-xs font-semibold uppercase tracking-widest mb-2" style={{ color: '#0F766E' }}>Processo Oficial do NIST</p>
          <h1 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-3">Implementação do NIST CSF 2.0</h1>
          <p className="text-slate-500 max-w-2xl text-sm leading-relaxed mb-5">
            O NIST CSF 2.0 define um processo de 5 etapas para criação e uso de Organizational Profiles, o mecanismo central de implementação do framework. Esta jornada é orientativa e pode ser adaptada ao contexto de cada organização.
          </p>
          <div className="flex items-center gap-2 text-xs text-slate-400">
            <span>Referência:</span>
            <span className="font-semibold text-slate-600">NIST SP 1301 — Quick-Start Guide for Creating and Using Organizational Profiles</span>
          </div>
        </div>
      </div>

      {/* Stepper overview */}
      <div className="bg-slate-50 border-b border-slate-200 px-4 sm:px-6 py-6 overflow-x-auto">
        <div className="max-w-screen-xl mx-auto">
          <div className="flex items-center justify-center gap-1 min-w-max mx-auto">
            {steps.map((step, i) => (
              <React.Fragment key={step.id}>
                <a
                  href={`?step=${step.id}`}
                  onClick={(e) => { e.preventDefault(); document.getElementById(step.id)?.scrollIntoView({ behavior: 'smooth', block: 'start' }); }}
                  className="flex flex-col items-center gap-1 px-4 py-2.5 rounded-xl border-2 transition-all hover:scale-105 min-w-[90px] text-center"
                  style={{ borderColor: step.color, backgroundColor: step.bg }}
                >
                  <span className="text-lg font-black opacity-40" style={{ color: step.color }}>{step.n}</span>
                  <span className="text-xs font-bold" style={{ color: step.color }}>{step.label.split(' ')[0]}</span>
                </a>
                {i < steps.length - 1 && (
                  <span className="text-slate-300 font-bold text-xl shrink-0">›</span>
                )}
              </React.Fragment>
            ))}
          </div>
          <p className="text-center text-xs text-slate-400 mt-3">↺ Processo iterativo — repete-se continuamente</p>
        </div>
      </div>

      {/* Step sections */}
      <div className="max-w-screen-xl mx-auto px-4 sm:px-6 py-10 space-y-12">
        {steps.map(step => (
          <section key={step.id} id={step.id} className="scroll-mt-20">
            {/* Step header */}
            <div className="flex items-start gap-5 mb-6">
              <div className="w-14 h-14 rounded-2xl flex items-center justify-center font-black text-xl shrink-0"
                style={{ backgroundColor: step.bg, color: step.color }}>
                {step.n}
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-3 flex-wrap mb-1">
                  <h2 className="text-2xl font-bold text-slate-900">{step.label}</h2>
                  <span className="text-xs font-mono px-2 py-0.5 rounded-full border"
                    style={{ borderColor: `${step.color}40`, color: step.color, backgroundColor: step.bg }}>
                    {step.nistRef}
                  </span>
                </div>
                <p className="text-lg font-semibold" style={{ color: step.color }}>{step.headline}</p>
              </div>
            </div>

            <div className="border-l-4 pl-6 mb-6" style={{ borderColor: step.border }}>
              <p className="text-slate-600 leading-relaxed">{step.intro}</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              {/* Activities */}
              <div className="bg-white rounded-xl border border-slate-200 p-5">
                <p className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-4">O que fazer</p>
                <ul className="space-y-2.5">
                  {step.activities.map((a, i) => (
                    <li key={i} className="flex gap-2.5 text-sm text-slate-700">
                      <CheckCircle size={15} className="shrink-0 mt-0.5" style={{ color: step.color }} />
                      {a}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Deliverables + links */}
              <div className="space-y-4">
                <div className="bg-white rounded-xl border border-slate-200 p-5">
                  <p className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-3">Entregáveis</p>
                  <ul className="space-y-2">
                    {step.deliverables.map((d, i) => (
                      <li key={i} className="flex gap-2 text-sm text-slate-700">
                        <span className="w-1.5 h-1.5 rounded-full shrink-0 mt-2" style={{ backgroundColor: step.color }} />
                        {d}
                      </li>
                    ))}
                  </ul>
                </div>

                {step.links.length > 0 && (
                  <div className="bg-white rounded-xl border border-slate-200 p-5">
                    <p className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-3">No Navigator</p>
                    <ul className="space-y-1.5">
                      {step.links.map(l => (
                        <li key={l.to}>
                          <Link to={l.to} className="flex items-center gap-1.5 text-sm font-semibold hover:underline"
                            style={{ color: step.color }}>
                            <ChevronRight size={13} /> {l.label}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </div>

            {/* Profile comparison visual (step 03) */}
            {step.profileComparison && (
              <div className="bg-white rounded-xl border border-slate-200 p-6 mb-6">
                <p className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-4">Estrutura do Perfil Organizacional</p>
                <div className="overflow-x-auto rounded-xl border border-slate-200">
                  <table className="w-full text-xs">
                    <thead>
                      <tr className="border-b border-slate-200 bg-slate-50">
                        <th className="px-4 py-3 text-left font-bold text-slate-600" colSpan={2}>Resultado do CSF</th>
                        <th className="px-4 py-3 text-left font-bold text-blue-700 border-l border-slate-200" colSpan={3}>Perfil Atual</th>
                        <th className="px-4 py-3 text-left font-bold text-green-700 border-l border-slate-200" colSpan={2}>Perfil Alvo</th>
                      </tr>
                      <tr className="border-b border-slate-200 text-slate-400 bg-slate-50">
                        <th className="px-4 py-2 text-left">ID</th>
                        <th className="px-4 py-2 text-left">Descrição</th>
                        <th className="px-4 py-2 text-left border-l border-slate-200">Práticas atuais</th>
                        <th className="px-4 py-2 text-left">Status</th>
                        <th className="px-4 py-2 text-left">Avaliação</th>
                        <th className="px-4 py-2 text-left border-l border-slate-200">Prioridade</th>
                        <th className="px-4 py-2 text-left">Metas</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b border-slate-100 text-xs">
                        <td className="px-4 py-3 font-mono font-bold text-purple-700">PR.PS-01</td>
                        <td className="px-4 py-3 text-slate-600">Configurações de segurança estabelecidas</td>
                        <td className="px-4 py-3 text-slate-500 border-l border-slate-200">Baselines definidos para sistemas principais; monitoramento inconsistente</td>
                        <td className="px-4 py-3"><span className="px-2 py-0.5 bg-yellow-100 text-yellow-700 rounded font-semibold">Parcial</span></td>
                        <td className="px-4 py-3 text-slate-600">3/5</td>
                        <td className="px-4 py-3 border-l border-slate-200"><span className="px-2 py-0.5 bg-red-100 text-red-700 rounded font-semibold">Alta</span></td>
                        <td className="px-4 py-3 text-slate-500">Baselines aplicados a todos os sistemas; desvios detectados automaticamente</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <p className="text-xs text-slate-400 mt-3 italic">Exemplo ilustrativo baseado no template oficial NIST SP 1301.</p>
              </div>
            )}

            {/* Action plan visual (step 04) */}
            {step.actionPlan && (
              <div className="bg-white rounded-xl border border-slate-200 p-6 mb-6">
                <p className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-4">Estrutura do Plano de Ação</p>
                <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
                  {[
                    { label: 'Gap', desc: 'Lacuna identificada' },
                    { label: 'Prioridade', desc: 'Alta / Média / Baixa' },
                    { label: 'Ação', desc: 'O que será feito' },
                    { label: 'Responsável', desc: 'Dono da iniciativa' },
                    { label: 'Prazo', desc: 'Data limite' },
                  ].map(f => (
                    <div key={f.label} className="rounded-xl p-3 text-center" style={{ backgroundColor: step.bg }}>
                      <p className="text-xs font-bold" style={{ color: step.color }}>{f.label}</p>
                      <p className="text-xs text-slate-400 mt-0.5">{f.desc}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Continuous cycle (step 05) */}
            {step.cycle && (
              <div className="bg-white rounded-xl border border-slate-200 p-6 mb-6">
                <p className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-4">Ciclo de melhoria contínua</p>
                <div className="flex items-center justify-center gap-2 flex-wrap">
                  {['Implementar', 'Avaliar', 'Atualizar', 'Melhorar'].map((phase, i) => (
                    <React.Fragment key={phase}>
                      <div className="px-4 py-2 rounded-xl text-xs font-bold text-slate-900"
                        style={{ backgroundColor: step.bg }}>
                        {phase}
                      </div>
                      {i < 3 && <ArrowRight size={16} className="text-slate-300" />}
                    </React.Fragment>
                  ))}
                  <span className="text-slate-400 font-bold ml-1">↺</span>
                </div>
              </div>
            )}

            {/* Tip */}
            <div className="rounded-xl px-5 py-4 border" style={{ backgroundColor: `${step.color}08`, borderColor: `${step.color}30` }}>
              <p className="text-xs font-bold uppercase tracking-wider mb-1.5" style={{ color: step.color }}>Nota orientativa</p>
              <p className="text-sm text-slate-600 leading-relaxed">{step.tip}</p>
            </div>

            {/* Divider */}
            {step.id !== 'implementar' && (
              <div className="flex justify-center mt-10">
                <div className="flex flex-col items-center gap-1 text-slate-300">
                  <ArrowDown size={20} />
                </div>
              </div>
            )}
          </section>
        ))}

        {/* Bottom links */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-6 border-t border-slate-200">
          {[
            { label: 'Perfis Organizacionais', desc: 'Current, Target e Gap Analysis', to: '/profiles' },
            { label: 'Assessment Navigator', desc: 'Diagnóstico por Subcategoria', to: '/consultant' },
            { label: 'Tiers', desc: 'Nível de rigor por Função', to: '/tiers' },
          ].map(l => (
            <Link key={l.to} to={l.to} className="flex items-center justify-between bg-white border border-slate-200 rounded-xl px-4 py-3 hover:bg-slate-50 transition-colors group">
              <div>
                <p className="text-sm font-semibold text-slate-800">{l.label}</p>
                <p className="text-xs text-slate-400">{l.desc}</p>
              </div>
              <ArrowRight size={14} className="text-slate-300 group-hover:text-slate-600 transition-colors" />
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ImplementationPage;
