import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { getFnColorsByName, getFnColorsFromCode } from '../utils/fnColors';
import { CheckSquare, ChevronRight } from 'lucide-react';
import PageIntro from '../components/ui/PageIntro';

const activities = [
  {
    n: 1,
    title: 'Criar estratégia, objetivos, políticas e processos de C-SCRM',
    csf: 'GV.SC-01',
    checklist: [
      'Estabelecer estratégia de C-SCRM com objetivos claros',
      'Desenvolver plano de C-SCRM com marcos e políticas e procedimentos',
      'Implementar processos baseados na estratégia, acordados pelos stakeholders',
      'Estabelecer mecanismo multifuncional (cibersegurança, TI, jurídico, RH, engenharia)',
    ],
  },
  {
    n: 2,
    title: 'Identificar fornecedores e determinar criticidade',
    csf: 'GV.SC-04',
    checklist: [
      'Desenvolver critérios de criticidade (importância ao negócio, sensibilidade dos dados, grau de acesso)',
      'Priorizar fornecedores em níveis de criticidade com base nos critérios',
      'Manter registro de todos os fornecedores, priorizado por criticidade',
    ],
  },
  {
    n: 3,
    title: 'Estabelecer papéis, requisitos e comunicar internamente e externamente',
    csf: 'GV.SC-02 + GV.SC-05',
    checklist: [
      'Definir papéis e posições responsáveis pelo planejamento, recursos e execução do C-SCRM',
      'Documentar papéis e responsabilidades em política',
      'Criar matrizes RACI para atividades de C-SCRM',
      'Incluir responsabilidades de C-SCRM nas descrições de cargo',
      'Estabelecer requisitos de segurança para fornecedores proporcionais à criticidade',
      'Incluir todos os requisitos de segurança e cadeia de suprimentos no modelo de contrato',
      'Definir regras e protocolos de compartilhamento de informações com fornecedores',
      'Especificar nos contratos os direitos e responsabilidades sobre riscos de cibersegurança',
    ],
  },
];

const supplierRequirements = [
  { category: 'GOVERN', items: ['GV.OC-03. Requisitos legais, regulatórios e contratuais de cibersegurança', 'GV.RR-02. Papéis e responsabilidades de cibersegurança', 'GV.SC. Toda a categoria de C-SCRM'] },
  { category: 'IDENTIFY', items: ['ID.RA-09. Integridade de hardware e software verificada antes da aquisição', 'ID.RA-10. Fornecedores críticos avaliados antes da contratação', 'ID.IM-02. Melhorias identificadas em exercícios com fornecedores e terceiros'] },
  { category: 'PROTECT', items: ['PR.AA-01. Identidades e credenciais de usuários autorizados gerenciadas', 'PR.AT-02. Indivíduos em funções especializadas treinados'] },
  { category: 'DETECT', items: ['DE.CM-03. Atividades de pessoal e tecnologia monitoradas'] },
  { category: 'RESPOND', items: ['RS.MA-04. Incidentes escalados quando necessário', 'RS.CO-02. Partes internas e externas notificadas sobre incidentes'] },
  { category: 'RECOVER', items: ['RC.RP-03. Comunicação sobre atividades de recuperação', 'RC.CO-03. Progresso de recuperação comunicado a stakeholders designados'] },
];



const CSCRMPage: React.FC = () => {
  const [activeActivity, setActiveActivity] = useState<number | null>(1);
  const [activeTab, setActiveTab] = useState<'activities' | 'requirements' | 'profiles'>('activities');

  return (
    <div className="max-w-screen-xl mx-auto px-4 sm:px-6 py-10 animate-fadeIn">
      {/* Header */}
      <div className="mb-8">
        <p className="text-xs font-semibold uppercase tracking-widest mb-2" style={{ color: '#0F766E' }}>NIST CSF 2.0. NIST SP 1305</p>
        <h1 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-3">Cybersecurity Supply Chain Risk Management (C-SCRM)</h1>
        <p className="text-slate-500 max-w-2xl text-sm leading-relaxed">
          C-SCRM é o processo sistemático de gerenciar exposição a riscos de cibersegurança em toda a cadeia de suprimentos, identificando, avaliando e mitigando riscos de produtos e serviços de TI/OT adquiridos.
        </p>
      </div>

      <PageIntro
        title="O que é C-SCRM?"
        plain="C-SCRM é a gestão de riscos de cibersegurança na cadeia de suprimentos, ou seja, os riscos introduzidos por fornecedores, softwares, hardwares e serviços que sua organização compra e usa."
        detail="Um ataque pode entrar pela cadeia de suprimentos mesmo que seus sistemas internos estejam protegidos. Por isso o CSF dedica uma Categoria inteira a este tema: GV.SC."
        learnMore={{ label: 'Ver GV.SC no Framework', to: '/category/GV.SC' }}
      />
      {/* Intro card */}
      <div className="bg-white rounded-xl border border-slate-200 p-6 mb-6">
        <h2 className="text-sm font-bold text-slate-800 mb-3">O ecossistema da cadeia de suprimentos</h2>
        <p className="text-sm text-slate-600 leading-relaxed mb-4">
          A cadeia de suprimentos inclui adquirentes, fornecedores, desenvolvedores, integradores de sistemas, provedores de serviços externos e outros que interagem para pesquisar, desenvolver, fabricar, adquirir, entregar, integrar, operar e manter produtos e serviços de tecnologia.
        </p>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {['Hardware', 'Software/Firmware', 'Serviços de TI', 'Parceiros e dados'].map(cat => (
            <div key={cat} className="text-center py-2.5 px-3 bg-slate-50 rounded-lg border border-slate-200">
              <p className="text-xs font-semibold text-slate-700">{cat}</p>
              <p className="text-xs text-slate-400 mt-0.5">componentes da cadeia</p>
            </div>
          ))}
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 mb-6 flex-wrap">
        {[
          { id: 'activities', label: 'Atividades de C-SCRM' },
          { id: 'requirements', label: 'Requisitos por Função' },
          { id: 'profiles', label: 'Target Profiles por criticidade' },
        ].map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as any)}
            className={`px-4 py-2 rounded-lg text-sm font-semibold transition-colors ${activeTab === tab.id ? 'text-white' : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-50'}`}
            style={activeTab === tab.id ? { backgroundColor: '#0B1F33' } : {}}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* ACTIVITIES TAB */}
      {activeTab === 'activities' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
          {/* Activity selector */}
          <div className="space-y-3">
            {activities.map(act => {
              const fnC = getFnColorsFromCode(act.csf);
              const isActive = activeActivity === act.n;
              return (
              <button
                key={act.n}
                onClick={() => setActiveActivity(act.n)}
                className="w-full text-left rounded-xl border-2 p-4 transition-all hover:opacity-90"
                style={{
                  borderColor: isActive ? fnC.text : '#E2E8F0',
                  backgroundColor: isActive ? fnC.bg : '#fff',
                }}
              >
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-lg font-black" style={{ color: isActive ? `${fnC.text}40` : '#F1F5F9' }}>{act.n}</span>
                  <span
                    className="text-xs font-mono font-bold px-2 py-0.5 rounded"
                    style={{ backgroundColor: isActive ? `${fnC.text}20` : fnC.bg, color: isActive ? fnC.text : fnC.text }}
                  >{act.csf}</span>
                </div>
                <p className="text-sm font-semibold" style={{ color: isActive ? fnC.text : '#1E293B' }}>{act.title}</p>
              </button>
              );
            })}
          </div>

          {/* Checklist */}
          <div className="lg:col-span-2">
            {activeActivity && (() => {
              const act = activities.find(a => a.n === activeActivity)!;
              return (
                <div className="bg-white rounded-xl border border-slate-200 p-6 h-full">
                  <div className="flex items-center gap-3 mb-5">
                    <div className="w-8 h-8 rounded-lg flex items-center justify-center font-black text-sm" style={{ backgroundColor: getFnColorsFromCode(act.csf).bg, color: getFnColorsFromCode(act.csf).text }}>{act.n}</div>
                    <div>
                      <p className="text-xs font-mono font-bold px-2 py-0.5 rounded inline-block mb-1" style={{ backgroundColor: getFnColorsFromCode(act.csf).bg, color: getFnColorsFromCode(act.csf).text }}>{act.csf}</p>
                      <h3 className="text-sm font-bold text-slate-900">{act.title}</h3>
                    </div>
                  </div>
                  <p className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-4">Checklist de ações</p>
                  <ul className="space-y-3">
                    {act.checklist.map((item, i) => (
                      <li key={i} className="flex gap-3 text-sm text-slate-700">
                        <CheckSquare size={16} className="text-teal-500 shrink-0 mt-0.5" />
                        {item}
                      </li>
                    ))}
                  </ul>
                  <div className="mt-5 pt-4 border-t border-slate-100">
                    <Link to={`/category/${act.csf.split(' ')[0]}`} className="text-xs font-semibold text-blue-600 hover:underline flex items-center gap-1">
                      Ver subcategories de {act.csf.split(' ')[0]} no Navigator <ChevronRight size={12} />
                    </Link>
                  </div>
                </div>
              );
            })()}
          </div>
        </div>
      )}

      {/* REQUIREMENTS TAB */}
      {activeTab === 'requirements' && (
        <div className="space-y-4">
          <p className="text-sm text-slate-500 mb-4">
            Além da categoria GV.SC, muitas subcategorias de outras Funções geram requisitos aplicáveis a fornecedores. A tabela abaixo mostra quais outcomes do CSF devem ser incluídos nos requisitos comunicados a fornecedores.
          </p>
          {supplierRequirements.map(fn => {
            const raw = getFnColorsByName(fn.category); const colors = { color: raw.text, bg: raw.bg };
            return (
              <div key={fn.category} className="bg-white rounded-xl border border-slate-200 overflow-hidden">
                <div className="px-5 py-3 flex items-center gap-3" style={{ backgroundColor: colors.bg }}>
                  <span className="text-xs font-mono font-bold px-2 py-0.5 rounded text-white" style={{ backgroundColor: colors.color }}>{fn.category.substring(0, 2)}</span>
                  <h3 className="text-sm font-bold" style={{ color: colors.color }}>{fn.category}</h3>
                </div>
                <div className="p-5 space-y-2">
                  {fn.items.map((item, i) => {
                    const [code, ...rest] = item.split(', ');
                    return (
                      <div key={i} className="flex gap-3 text-sm">
                        <Link to={`/subcategory/${code}`} className="font-mono font-bold shrink-0 hover:underline" style={{ color: colors.color }}>
                          {code}
                        </Link>
                        <span className="text-slate-600">{rest.join(', ')}</span>
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* PROFILES TAB */}
      {activeTab === 'profiles' && (
        <div className="space-y-5">
          <p className="text-sm text-slate-500">
            Uma organização pode criar Target Profiles específicos para cada nível de criticidade de fornecedor. Quanto maior a criticidade, mais abrangente o conjunto de outcomes exigido.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
            {[
              {
                level: 'Criticidade Baixa',
                desc: 'Fornecedores com acesso limitado e baixo impacto ao negócio',
                color: '#166534', bg: '#DCFCE7',
                categories: ['GV.SC-01', 'GV.SC-04', 'GV.SC-05', 'PR.AA-01'],
              },
              {
                level: 'Criticidade Média',
                desc: 'Fornecedores com acesso a sistemas ou dados relevantes',
                color: '#92400E', bg: '#FEF3C7',
                categories: ['GV.SC-01 a GV.SC-07', 'ID.RA-09', 'ID.RA-10', 'PR.AA-01', 'PR.AT-02', 'DE.CM-03', 'RS.CO-02'],
              },
              {
                level: 'Criticidade Alta',
                desc: 'Fornecedores críticos para a missão, com acesso amplo ou dados sensíveis',
                color: '#991B1B', bg: '#FEE2E2',
                categories: ['Todos os GV.SC (01 a 10)', 'ID.RA-09', 'ID.RA-10', 'ID.IM-02', 'PR.AA-01', 'PR.AT-02', 'DE.CM-03', 'RS.MA-04', 'RS.CO-02', 'RC.RP-03', 'RC.CO-03'],
              },
            ].map(profile => (
              <div key={profile.level} className="bg-white rounded-xl border-2 p-5" style={{ borderColor: profile.color }}>
                <div className="w-full text-center py-2 rounded-lg mb-4 font-bold text-sm" style={{ backgroundColor: profile.bg, color: profile.color }}>
                  {profile.level}
                </div>
                <p className="text-xs text-slate-500 mb-4 leading-relaxed">{profile.desc}</p>
                <p className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">Outcomes CSF incluídos</p>
                <ul className="space-y-1.5">
                  {profile.categories.map((cat, i) => (
                    <li key={i} className="text-xs font-mono text-slate-700 flex gap-2">
                      <span style={{ color: profile.color }}>·</span>
                      {cat}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <div className="bg-amber-50 border border-amber-200 rounded-xl p-4">
            <p className="text-sm text-amber-800">
              <strong>Importante:</strong> Os perfis acima são orientativos. Cada organização deve definir os outcomes exigidos com base nos seus critérios de criticidade, missão e apetite a riscos.
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default CSCRMPage;
