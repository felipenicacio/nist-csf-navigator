import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const activityPoints = [
  {
    n: 1,
    title: 'Líderes definem missão, prioridades e apetite a riscos',
    desc: 'Liderança estabelece prioridades estratégicas, apetite a riscos e estratégia de gestão. Accountability é atribuída para riscos positivos e negativos.',
    csf: ['GV.OC', 'GV.RM', 'GV.SC'],
    detail: 'O ponto de partida do ERM é a definição da missão e dos objetivos estratégicos pela liderança. O apetite a riscos expressa como a organização está disposta a aceitar riscos em relação à sua missão. As categorias GV.OC, GV.RM e GV.SC do CSF suportam diretamente este passo.',
    questions: [
      'A missão e as prioridades estratégicas estão formalmente documentadas?',
      'Existe processo para definir e expressar o apetite a riscos?',
      'A accountability para gestão de riscos está atribuída?',
    ],
  },
  {
    n: 2,
    title: 'Gestores interpretam o apetite em orientações específicas',
    desc: 'Gerentes traduzem o apetite a riscos em tolerância e requisitos de segurança e privacidade para as unidades organizacionais.',
    csf: ['GV.RR', 'GV.PO', 'ID.RA'],
    detail: 'O apetite definido pela liderança é convertido em tolerância a riscos específica — limites operacionais para cada unidade. Os managers criam declarações de tolerância e métricas, definindo o estado-alvo que os controles devem alcançar.',
    questions: [
      'Como o apetite a riscos é traduzido em tolerância para as áreas operacionais?',
      'Os gestores têm orientações claras sobre os níveis de risco aceitáveis?',
      'As métricas de risco estão alinhadas aos objetivos de negócio?',
    ],
  },
  {
    n: 3,
    title: 'Estratégia orienta implementação de controles e soluções compartilhadas',
    desc: 'Prioridades e requisitos de risco são incorporados na seleção e implementação de controles técnicos, físicos e administrativos.',
    csf: ['PR', 'DE', 'RS', 'RC'],
    detail: 'A estratégia de risco e os requisitos das unidades orientam a implementação de controles nas Functions PROTECT, DETECT, RESPOND e RECOVER. Isso garante que os controles não sejam selecionados arbitrariamente, mas fundamentados nos riscos identificados.',
    questions: [
      'Os controles implementados são fundamentados na estratégia de risco?',
      'Existe alinhamento entre requisitos de negócio e controles técnicos?',
      'Soluções de segurança compartilhadas estão disponíveis para todas as unidades?',
    ],
  },
  {
    n: 4,
    title: 'Resultados são refletidos como risco residual nos registros de risco',
    desc: 'Os resultados da resposta a riscos são documentados como risco residual nos registros de risco de sistemas, com monitoramento contínuo.',
    csf: ['ID.RA', 'ID.IM', 'GV.OV'],
    detail: 'Após implementar controles, o risco residual — o risco que permanece após o tratamento — é registrado e monitorado. Avaliações de risco (ID.RA) e atividades de melhoria (ID.IM) alimentam a supervisão contínua (GV.OV).',
    questions: [
      'O risco residual está documentado nos registros de risco?',
      'Existe monitoramento contínuo do risco residual?',
      'Como as avaliações de risco informam os registros de risco do sistema?',
    ],
  },
  {
    n: 5,
    title: 'Registros de risco são normalizados e agregados no nível organizacional',
    desc: 'Riscos de sistemas individuais são consolidados e normalizados para análise e reporte no nível organizacional.',
    csf: ['ID.IM', 'GV.OV'],
    detail: 'Os Cybersecurity Risk Registers (CSRRs) de sistemas individuais são agregados e normalizados para criar uma visão organizacional dos riscos. Isso suporta análise, reporte e ajustes na estratégia organizacional.',
    questions: [
      'Os registros de risco dos sistemas são agregados em nível organizacional?',
      'Existe processo de normalização para comparar riscos entre sistemas?',
      'A liderança recebe uma visão consolidada dos riscos?',
    ],
  },
  {
    n: 6,
    title: 'Resultados combinados mantêm registro de risco empresarial e perfil de risco',
    desc: 'O Enterprise Risk Register (ERR) e o Enterprise Risk Profile (ERP) consolidam todos os riscos para suportar decisões estratégicas.',
    csf: ['GV.PO', 'GV.OV'],
    detail: 'O ciclo culmina com a manutenção do Enterprise Risk Register e Enterprise Risk Profile — visão completa de todos os riscos que informa as decisões de negócio e revisões da estratégia. O CSF ajuda a garantir que líderes tenham as informações necessárias para decisões informadas.',
    questions: [
      'Existe um Enterprise Risk Register atualizado?',
      'O Enterprise Risk Profile reflete os riscos atuais da organização?',
      'Como os resultados do CSF alimentam as decisões de negócio?',
    ],
  },
];

const ERMPage: React.FC = () => {
  const [activeAP, setActiveAP] = useState<number | null>(null);

  const fnColor = (code: string) => {
    const map: Record<string, { color: string; bg: string }> = {
      GV: { color: '#C8A800', bg: '#FFF9C4' },
      ID: { color: '#1A7FA8', bg: '#E0F4FB' },
      PR: { color: '#5B57C0', bg: '#EEECFB' },
      DE: { color: '#C07800', bg: '#FFF3DC' },
      RS: { color: '#D93E38', bg: '#FFE8E7' },
      RC: { color: '#1E9E52', bg: '#E2FAF0' },
    };
    const fn = code.split('.')[0];
    return map[fn] || { color: '#64748B', bg: '#F1F5F9' };
  };

  return (
    <div className="max-w-screen-xl mx-auto px-4 sm:px-6 py-10 animate-fadeIn">
      {/* Header */}
      <div className="mb-8">
        <p className="text-xs font-semibold uppercase tracking-widest mb-2" style={{ color: '#0F766E' }}>NIST CSF 2.0 — NIST SP 1303</p>
        <h1 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-3">Enterprise Risk Management (ERM)</h1>
        <p className="text-slate-500 max-w-2xl text-sm leading-relaxed">
          O NIST CSF 2.0 suporta a integração da gestão de riscos de cibersegurança ao programa de Enterprise Risk Management. O ERM existe no topo da hierarquia organizacional e abrange todos os riscos — missão, financeiro, reputação e tecnologia.
        </p>
      </div>

      {/* Hierarchy */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 mb-8">
        <h2 className="text-sm font-bold uppercase tracking-wider text-slate-500 mb-5">Hierarquia de Gestão de Riscos</h2>
        <div className="flex flex-col items-center gap-2">
          {[
            { label: 'Enterprise Risk Management (ERM)', sub: 'Missão, financeiro, reputação, tecnologia', color: '#0B1F33', w: 'w-full' },
            { label: 'ICT Risk Management', sub: 'TI, OT, IoT, IA, privacidade, cadeia de suprimentos', color: '#1A7FA8', w: 'w-5/6' },
            { label: 'Cybersecurity Risk Management (CSRM)', sub: 'Confidencialidade, integridade, disponibilidade — suportado pelo CSF 2.0', color: '#1E9E52', w: 'w-4/6' },
          ].map((level, i) => (
            <div key={i} className={`${level.w} rounded-xl px-5 py-3 text-center text-white`} style={{ backgroundColor: level.color }}>
              <p className="text-sm font-bold">{level.label}</p>
              <p className="text-xs opacity-70 mt-0.5">{level.sub}</p>
            </div>
          ))}
        </div>
        <p className="text-xs text-slate-400 text-center mt-3">O apetite a riscos definido no ERM informa a tolerância do CSRM. Os riscos residuais do CSRM retroalimentam o ERM.</p>
      </div>

      {/* 6 Activity Points */}
      <div className="mb-6">
        <h2 className="text-sm font-bold uppercase tracking-wider text-slate-500 mb-4">6 Activity Points — CSF 2.0 no ERM</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {activityPoints.map(ap => (
            <button
              key={ap.n}
              onClick={() => setActiveAP(activeAP === ap.n ? null : ap.n)}
              className={`text-left rounded-xl border-2 p-5 transition-all hover:shadow-md ${activeAP === ap.n ? 'border-slate-900 bg-slate-900 text-white' : 'border-slate-200 bg-white'}`}
            >
              <div className="flex items-center gap-2 mb-2">
                <span className={`text-2xl font-black ${activeAP === ap.n ? 'text-white/20' : 'text-slate-100'}`}>{ap.n}</span>
                <div className="flex flex-wrap gap-1">
                  {ap.csf.map(code => {
                    const { color, bg } = fnColor(code);
                    return (
                      <span key={code} className="text-xs font-mono font-bold px-1.5 py-0.5 rounded" style={{ backgroundColor: activeAP === ap.n ? 'rgba(255,255,255,0.2)' : bg, color: activeAP === ap.n ? '#fff' : color }}>
                        {code}
                      </span>
                    );
                  })}
                </div>
              </div>
              <h3 className={`text-sm font-bold mb-1 ${activeAP === ap.n ? 'text-white' : 'text-slate-800'}`}>{ap.title}</h3>
              <p className={`text-xs leading-relaxed ${activeAP === ap.n ? 'text-white/70' : 'text-slate-500'}`}>{ap.desc}</p>
            </button>
          ))}
        </div>
      </div>

      {/* Active AP detail */}
      {activeAP && (() => {
        const ap = activityPoints.find(a => a.n === activeAP)!;
        return (
          <div className="bg-slate-50 rounded-2xl border border-slate-200 p-6 mb-8 animate-fadeIn">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-slate-900 flex items-center justify-center text-white font-black text-lg">
                {ap.n}
              </div>
              <h3 className="text-base font-bold text-slate-900">{ap.title}</h3>
            </div>
            <p className="text-sm text-slate-600 leading-relaxed mb-5">{ap.detail}</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <p className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-3">Outcomes CSF relacionados</p>
                <div className="flex flex-wrap gap-2">
                  {ap.csf.map(code => {
                    const { color, bg } = fnColor(code);
                    return (
                      <Link key={code} to={code.includes('.') ? `/category/${code}` : `/framework/${code.toLowerCase()}`}
                        className="text-sm font-mono font-bold px-3 py-1.5 rounded-lg hover:opacity-80 transition-opacity"
                        style={{ backgroundColor: bg, color }}
                      >
                        {code}
                      </Link>
                    );
                  })}
                </div>
              </div>
              <div>
                <p className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-3">Perguntas orientativas</p>
                <ul className="space-y-1.5">
                  {ap.questions.map((q, i) => (
                    <li key={i} className="flex gap-2 text-sm text-slate-600">
                      <span className="font-bold text-slate-400 shrink-0">Q{i + 1}</span>
                      {q}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        );
      })()}

      {/* MEA Cycle */}
      <div className="bg-white rounded-xl border border-slate-200 p-6 mb-6">
        <h2 className="text-sm font-bold uppercase tracking-wider text-slate-500 mb-4">Ciclo Monitor — Evaluate — Adjust (MEA)</h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {[
            { label: 'MONITOR', color: '#0B1F33', items: ['Medir se controles estão implementados e efetivos', 'Medir se controles não prejudicam operações organizacionais'] },
            { label: 'EVALUATE', color: '#1A7FA8', items: ['Avaliar se controles alcançam os resultados de risco desejados', 'Comparar resultados atuais com o estado-alvo do Organizational Profile'] },
            { label: 'ADJUST', color: '#1E9E52', items: ['Implementar controles adicionais quando necessário', 'Implementar controles alternativos para ampliar oportunidades'] },
          ].map(phase => (
            <div key={phase.label} className="rounded-xl p-4 border" style={{ borderColor: `${phase.color}30`, backgroundColor: `${phase.color}06` }}>
              <h3 className="text-sm font-black mb-3" style={{ color: phase.color }}>{phase.label}</h3>
              <ul className="space-y-2">
                {phase.items.map((item, i) => (
                  <li key={i} className="text-xs text-slate-600 flex gap-2">
                    <span className="w-1.5 h-1.5 rounded-full shrink-0 mt-1.5" style={{ backgroundColor: phase.color }} />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Key terms */}
      <div className="bg-white rounded-xl border border-slate-200 p-6">
        <h2 className="text-sm font-bold uppercase tracking-wider text-slate-500 mb-4">Termos-chave do ERM</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {[
            { term: 'Risk Appetite', def: 'Expressão geral de como a organização define riscos que pode aceitar — definido pela liderança.' },
            { term: 'Risk Tolerance', def: 'Expressão específica dos riscos que a organização não pode aceitar — tradução operacional do apetite.' },
            { term: 'CSRR', def: 'Cybersecurity Risk Register — repositório de ameaças, vulnerabilidades e respostas a riscos de cibersegurança.' },
            { term: 'ERR / ERP', def: 'Enterprise Risk Register e Enterprise Risk Profile — visão consolidada de todos os riscos organizacionais.' },
            { term: 'Positive Risk', def: 'Oportunidades e pontos fortes — o ERM gerencia tanto riscos negativos quanto positivos.' },
            { term: 'KPI / KRI', def: 'Key Performance Indicators e Key Risk Indicators — métricas para monitorar eficácia e risco residual.' },
          ].map(t => (
            <div key={t.term} className="flex gap-3">
              <div className="w-1 rounded-full bg-slate-900 shrink-0" />
              <div>
                <p className="text-sm font-bold text-slate-800">{t.term}</p>
                <p className="text-xs text-slate-500 mt-0.5">{t.def}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ERMPage;
