import React from 'react';
import { ArrowDown, ArrowRight } from 'lucide-react';

const steps = [
  { n: '01', title: 'Compreender o contexto organizacional', desc: 'Identificar objetivos de negócio, missão, requisitos, partes interessadas e ambiente operacional.' },
  { n: '02', title: 'Definir objetivos de cibersegurança', desc: 'Estabelecer o que a organização pretende alcançar em relação à gestão de riscos cibernéticos.' },
  { n: '03', title: 'Estabelecer o Current Profile', desc: 'Compreender o estado atual da capacidade de cibersegurança em relação aos resultados do CSF Core.' },
  { n: '04', title: 'Definir o Target Profile', desc: 'Definir os resultados de cibersegurança desejados, considerando objetivos, riscos e recursos.' },
  { n: '05', title: 'Identificar gaps', desc: 'Comparar o estado atual (Current Profile) com o estado desejado (Target Profile) para identificar lacunas.' },
  { n: '06', title: 'Avaliar e priorizar riscos', desc: 'Priorizar gaps considerando risco, impacto potencial, contexto e objetivos de negócio.' },
  { n: '07', title: 'Definir prioridades', desc: 'Estabelecer quais resultados devem ser tratados primeiro com base na análise de riscos.' },
  { n: '08', title: 'Planejar ações', desc: 'Definir iniciativas, projetos e ações para alcançar o Target Profile.' },
  { n: '09', title: 'Implementar melhorias', desc: 'Executar ações de melhoria e implementar práticas, controles e capacidades de segurança.' },
  { n: '10', title: 'Avaliar resultados', desc: 'Verificar se os resultados desejados foram alcançados e medir a eficácia das melhorias.' },
  { n: '11', title: 'Atualizar os Profiles', desc: 'Reavaliar Current Profile e Target Profile conforme mudanças organizacionais e do ambiente de ameaças.' },
  { n: '12', title: 'Melhoria contínua', desc: 'Manter o processo contínuo de avaliação, aprendizado e evolução da postura de cibersegurança.' },
];

const ImplementationPage: React.FC = () => (
  <div className="max-w-screen-xl mx-auto px-4 sm:px-6 py-10 animate-fadeIn">
    <div className="mb-10">
      <p className="text-xs font-semibold uppercase tracking-widest text-teal-600 mb-2">Guia de Uso</p>
      <h1 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-4">Como Implementar o NIST CSF 2.0</h1>
      <p className="text-slate-500 max-w-2xl leading-relaxed">
        O NIST CSF 2.0 não é um conjunto de requisitos obrigatórios, mas um guia flexível de resultados desejados. A jornada abaixo é orientativa e pode ser adaptada ao contexto de cada organização.
      </p>
    </div>

    {/* Profile visual */}
    <div className="bg-white rounded-2xl border border-slate-200 p-8 mb-10">
      <h2 className="text-lg font-bold text-slate-900 mb-6">Da Postura Atual ao Estado Desejado</h2>
      <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-0">
        {[
          { label: 'CURRENT PROFILE', desc: 'Estado atual', color: '#64748B', bg: '#F1F5F9' },
          null,
          { label: 'GAP ANALYSIS', desc: 'Lacunas identificadas', color: '#D97706', bg: '#FEF3C7' },
          null,
          { label: 'PRIORIDADES', desc: 'Riscos priorizados', color: '#DC2626', bg: '#FEF2F2' },
          null,
          { label: 'TARGET PROFILE', desc: 'Estado desejado', color: '#16A34A', bg: '#F0FDF4' },
        ].map((item, i) =>
          item === null ? (
            <div key={i} className="text-slate-300 rotate-90 sm:rotate-0">
              <ArrowRight size={20} />
            </div>
          ) : (
            <div key={i} className="text-center px-4 py-3 rounded-xl border" style={{ backgroundColor: item.bg, borderColor: `${item.color}30` }}>
              <p className="text-xs font-mono font-bold" style={{ color: item.color }}>{item.label}</p>
              <p className="text-xs text-slate-500 mt-1">{item.desc}</p>
            </div>
          )
        )}
      </div>
      <div className="flex justify-center mt-4">
        <div className="flex flex-col items-center gap-1 text-teal-600">
          <ArrowDown size={16} />
          <span className="text-xs font-semibold">IMPLEMENTAÇÃO → AVALIAÇÃO → MELHORIA CONTÍNUA</span>
        </div>
      </div>
    </div>

    {/* Steps */}
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
      {steps.map((step, i) => (
        <div key={step.n} className="bg-white rounded-xl border border-slate-200 p-5 relative">
          <div className="flex items-start gap-3">
            <span className="text-2xl font-black text-slate-100 shrink-0 leading-none">{step.n}</span>
            <div>
              <h3 className="text-sm font-bold text-slate-800 mb-2">{step.title}</h3>
              <p className="text-sm text-slate-500 leading-relaxed">{step.desc}</p>
            </div>
          </div>
          {i < steps.length - 1 && (
            <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 z-10 hidden lg:block text-slate-200">
              {(i + 1) % 3 === 0 ? null : ''}
            </div>
          )}
        </div>
      ))}
    </div>

    <div className="mt-10 p-6 bg-slate-50 rounded-xl border border-slate-200">
      <p className="text-sm text-slate-500 leading-relaxed">
        <strong className="text-slate-700">Nota importante:</strong> Esta jornada é orientativa. O NIST CSF 2.0 é flexível — organizações podem iniciar em qualquer ponto, executar etapas em paralelo e adaptar o processo ao seu contexto. O framework não prescreve como implementar, mas descreve o que alcançar.
      </p>
    </div>
  </div>
);

export default ImplementationPage;
