import React, { useState } from 'react';
import { Link } from "react-router-dom";
import { ChevronRight, ClipboardList, FileCheck, GitBranch, HelpCircle } from 'lucide-react';
import { csfFunctions } from '../data/functions';
import { csfCategories } from '../data/categories';
import { allSubcategories } from '../data';
import { MappingTypeBadge } from '../components/ui';

// Derived from csfFunctions — single source of truth for colors
const getFnColor = (id: string) => {
  const f = csfFunctions.find(fn => fn.id === id);
  return { bg: f?.colorHex ?? '#E2E8F0', light: f?.colorLight ?? '#F8FAFC', text: f?.color ?? '#334155' };
};

type Step = 'function' | 'category' | 'subcategory' | 'detail';

const ConsultantViewPage: React.FC = () => {
  const [step, setStep] = useState<Step>('function');
  const [selectedFn, setSelectedFn] = useState<string | null>(null);
  const [selectedCat, setSelectedCat] = useState<string | null>(null);
  const [selectedSub, setSelectedSub] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'questions' | 'evidence' | 'crosswalk' | 'controls'>('questions');

  const fn = selectedFn ? csfFunctions.find(f => f.id === selectedFn) : null;
  const cat = selectedCat ? csfCategories.find(c => c.id === selectedCat) : null;
  const sub = selectedSub ? allSubcategories.find(s => s.id === selectedSub) : null;

  const fnCats = selectedFn ? csfCategories.filter(c => c.functionId === selectedFn) : [];
  const catSubs = selectedCat ? allSubcategories.filter(s => s.categoryId === selectedCat) : [];

  const reset = (toStep: Step) => {
    if (toStep === 'function') { setSelectedFn(null); setSelectedCat(null); setSelectedSub(null); }
    if (toStep === 'category') { setSelectedCat(null); setSelectedSub(null); }
    if (toStep === 'subcategory') { setSelectedSub(null); }
    setStep(toStep);
  };

  return (
    <div className="max-w-screen-xl mx-auto px-4 sm:px-6 py-10 animate-fadeIn">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-3">
          <div className="w-10 h-10 rounded-xl bg-slate-900 flex items-center justify-center">
            <ClipboardList size={18} color="white" />
          </div>
          <div>
            <p className="text-xs font-semibold uppercase tracking-widest text-teal-600">Modo Consultor</p>
            <h1 className="text-2xl sm:text-3xl font-bold text-slate-900">Consultant View</h1>
          </div>
        </div>
        <p className="text-slate-500 max-w-2xl text-sm leading-relaxed">
          Navegue pelo CSF como um roteiro de assessment. Selecione Function → Category → Subcategory e acesse perguntas de diagnóstico, evidências esperadas, crosswalk e controles aplicáveis — prontos para usar em reuniões com o cliente.
        </p>
      </div>

      {/* Breadcrumb navigator */}
      <div className="flex items-center gap-2 text-sm mb-8 flex-wrap">
        {[
          { label: 'Function', active: step === 'function', done: !!selectedFn, onClick: () => reset('function') },
          { label: fn ? `${fn.code} — ${fn.nameEn}` : 'Category', active: step === 'category', done: !!selectedCat, onClick: () => selectedFn && reset('category') },
          { label: cat ? cat.code : 'Subcategory', active: step === 'subcategory', done: !!selectedSub, onClick: () => selectedCat && reset('subcategory') },
          { label: sub ? sub.code : 'Diagnóstico', active: step === 'detail', done: false, onClick: () => {} },
        ].map((b, i) => (
          <React.Fragment key={i}>
            {i > 0 && <ChevronRight size={14} className="text-slate-300 shrink-0" />}
            <button
              onClick={b.onClick}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
                b.active
                  ? 'text-white shadow-sm'
                  : b.done
                  ? 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-50'
                  : 'text-slate-400 cursor-default'
              }`}
              style={b.active ? { backgroundColor: '#0B1F33' } : {}}
              disabled={!b.done && !b.active}
            >
              {b.label}
            </button>
          </React.Fragment>
        ))}
      </div>

      {/* ── STEP 1: SELECT FUNCTION ── */}
      {step === 'function' && (
        <div>
          <p className="text-xs font-semibold uppercase tracking-widest text-slate-400 mb-4">Passo 1 — Selecione a Function</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {csfFunctions.map(f => {
              const c = getFnColor(f.id);
              const catCount = csfCategories.filter(cat => cat.functionId === f.id).length;
              const subCount = allSubcategories.filter(s => s.functionId === f.id).length;
              return (
                <button
                  key={f.id}
                  onClick={() => { setSelectedFn(f.id); setStep('category'); }}
                  className="text-left rounded-xl border-2 overflow-hidden hover:shadow-lg transition-all group"
                  style={{ borderColor: c.bg }}
                >
                  <div className="px-5 py-4" style={{ backgroundColor: c.bg }}>
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-mono text-white/40">{f.code}</span>
                      <span className="text-white/30 group-hover:text-white/70 transition-colors">→</span>
                    </div>
                    <h3 className="text-lg font-bold text-white mt-1">{f.nameEn}</h3>
                    <p className="text-white/60 text-xs">{f.name}</p>
                  </div>
                  <div className="px-5 py-3 bg-white">
                    <p className="text-xs text-slate-500 leading-relaxed line-clamp-2 mb-2">{f.description}</p>
                    <div className="flex gap-3 text-xs text-slate-400">
                      <span>{catCount} categories</span>
                      <span>·</span>
                      <span>{subCount} subcategories</span>
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* ── STEP 2: SELECT CATEGORY ── */}
      {step === 'category' && fn && (
        <div>
          <p className="text-xs font-semibold uppercase tracking-widest text-slate-400 mb-4">Passo 2 — Selecione a Category</p>
          <div className="space-y-3">
            {fnCats.map(c => {
              const subCount = allSubcategories.filter(s => s.categoryId === c.id).length;
              const fc = getFnColor(fn.id);
              return (
                <button
                  key={c.id}
                  onClick={() => { setSelectedCat(c.id); setStep('subcategory'); }}
                  className="w-full text-left bg-white rounded-xl border border-slate-200 p-5 hover:shadow-md transition-all group"
                >
                  <div className="flex items-start gap-4">
                    <span className="text-xs font-mono font-bold px-2 py-1 rounded shrink-0 mt-0.5" style={{ backgroundColor: fc.bg, color: '#1a1a1a' }}>
                      {c.code}
                    </span>
                    <div className="flex-1">
                      <h3 className="text-sm font-bold text-slate-800 mb-1">{c.name}</h3>
                      <p className="text-xs text-slate-500 leading-relaxed">{c.description}</p>
                      <p className="text-xs text-slate-400 mt-2">{subCount} subcategories</p>
                    </div>
                    <ChevronRight size={16} className="text-slate-300 group-hover:text-slate-600 transition-colors shrink-0 mt-1" />
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* ── STEP 3: SELECT SUBCATEGORY ── */}
      {step === 'subcategory' && cat && fn && (
        <div>
          <p className="text-xs font-semibold uppercase tracking-widest text-slate-400 mb-4">Passo 3 — Selecione a Subcategory</p>
          <div className="space-y-2">
            {catSubs.map(s => {
              const fc = getFnColor(fn.id);
              return (
                <button
                  key={s.id}
                  onClick={() => { setSelectedSub(s.id); setStep('detail'); setActiveTab('questions'); }}
                  className="w-full text-left bg-white rounded-xl border border-slate-200 px-5 py-4 hover:shadow-md transition-all group"
                >
                  <div className="flex items-start gap-4">
                    <span className="text-xs font-mono font-bold px-2 py-1 rounded shrink-0 mt-0.5" style={{ backgroundColor: fc.bg, color: '#1a1a1a' }}>
                      {s.code}
                    </span>
                    <div className="flex-1">
                      <h4 className="text-sm font-bold text-slate-800 mb-0.5">{s.name}</h4>
                      <p className="text-xs text-slate-500 leading-relaxed">{s.description}</p>
                    </div>
                    <ChevronRight size={16} className="text-slate-300 group-hover:text-slate-600 transition-colors shrink-0 mt-1" />
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* ── STEP 4: CONSULTANT DETAIL ── */}
      {step === 'detail' && sub && fn && cat && (
        <div>
          {/* Sub header */}
          <div className="bg-white rounded-xl border border-slate-200 p-6 mb-6">
            <div className="flex items-start gap-4">
              <span className="text-sm font-mono font-bold px-3 py-1.5 rounded-lg shrink-0" style={{ backgroundColor: getFnColor(fn.id).bg, color: '#1a1a1a', border: '1px solid rgba(0,0,0,0.08)' }}>
                {sub.code}
              </span>
              <div className="flex-1">
                <h2 className="text-lg font-bold text-slate-900 mb-1">{sub.name}</h2>
                <p className="text-sm text-slate-500 leading-relaxed">{sub.description}</p>
              </div>
              <Link to={`/subcategory/${sub.id}`} className="text-xs text-blue-600 hover:underline shrink-0">
                Ver completo →
              </Link>
            </div>
          </div>

          {/* Tabs */}
          <div className="flex gap-1 bg-slate-100 p-1 rounded-xl mb-6 overflow-x-auto">
            {[
              { id: 'questions', label: 'Perguntas de Diagnóstico', icon: <HelpCircle size={14} /> },
              { id: 'evidence', label: 'Evidências Esperadas', icon: <FileCheck size={14} /> },
              { id: 'crosswalk', label: 'Crosswalk', icon: <GitBranch size={14} /> },
              { id: 'controls', label: 'Como Implementar', icon: <ClipboardList size={14} /> },
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex items-center gap-1.5 px-4 py-2 rounded-lg text-xs font-semibold whitespace-nowrap transition-colors ${
                  activeTab === tab.id
                    ? 'bg-white text-slate-900 shadow-sm'
                    : 'text-slate-500 hover:text-slate-700'
                }`}
              >
                {tab.icon}
                {tab.label}
              </button>
            ))}
          </div>

          {/* Tab content */}
          <div className="bg-white rounded-xl border border-slate-200 p-6">
            {activeTab === 'questions' && (
              <div>
                <h3 className="text-base font-bold text-slate-900 mb-1">Perguntas de Diagnóstico</h3>
                <p className="text-xs text-slate-500 mb-5">Use estas perguntas em reuniões de assessment para avaliar a maturidade do cliente nesta subcategory.</p>
                <div className="space-y-4">
                  {sub.guidingQuestions.map((q, i) => (
                    <div key={i} className="flex gap-4 p-4 bg-slate-50 rounded-xl border border-slate-100">
                      <div className="w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold text-white shrink-0 mt-0.5" style={{ backgroundColor: '#0F766E' }}>
                        {i + 1}
                      </div>
                      <div className="flex-1">
                        <p className="text-sm font-medium text-slate-800">{q}</p>
                        <div className="flex gap-2 mt-3">
                          {['Sim', 'Parcialmente', 'Não', 'N/A'].map(opt => (
                            <span key={opt} className="text-xs px-2 py-1 rounded border border-slate-200 text-slate-400 cursor-pointer hover:bg-slate-100 transition-colors">
                              {opt}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="mt-4 p-3 bg-amber-50 border border-amber-200 rounded-lg">
                  <p className="text-xs text-amber-700">
                    <strong>Nota:</strong> As respostas não são armazenadas. Use estas perguntas como roteiro de conversa com o cliente.
                  </p>
                </div>
              </div>
            )}

            {activeTab === 'evidence' && (
              <div>
                <h3 className="text-base font-bold text-slate-900 mb-1">Evidências Esperadas</h3>
                <p className="text-xs text-slate-500 mb-5">Artefatos e documentos que demonstram a implementação desta subcategory.</p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {sub.evidenceExamples.map((e, i) => (
                    <div key={i} className="flex items-start gap-3 p-4 bg-slate-50 rounded-xl border border-slate-100">
                      <FileCheck size={16} className="text-teal-500 shrink-0 mt-0.5" />
                      <p className="text-sm text-slate-700">{e}</p>
                    </div>
                  ))}
                </div>
                <div className="mt-6">
                  <h4 className="text-sm font-semibold text-slate-700 mb-3">O que significa na prática</h4>
                  <p className="text-sm text-slate-600 leading-relaxed">{sub.whatItMeans}</p>
                </div>
              </div>
            )}

            {activeTab === 'crosswalk' && (
              <div>
                <h3 className="text-base font-bold text-slate-900 mb-1">Crosswalk com outros Frameworks</h3>
                <p className="text-xs text-slate-500 mb-5">Frameworks e controles que contribuem para alcançar o resultado desta subcategory. Os mapeamentos são orientativos.</p>

                <div className="space-y-5">
                  {[
                    { key: 'nist80053', label: 'NIST SP 800-53', color: '#1E40AF', bg: '#DBEAFE', items: sub.mappings.nist80053 },
                    { key: 'iso27002', label: 'ISO/IEC 27002', color: '#065F46', bg: '#D1FAE5', items: sub.mappings.iso27002 },
                    { key: 'cisControls', label: 'CIS Controls v8', color: '#92400E', bg: '#FEF3C7', items: sub.mappings.cisControls },
                  ].filter(fw => fw.items.length > 0).map(fw => (
                    <div key={fw.key}>
                      <h4 className="text-sm font-semibold mb-3 flex items-center gap-2" style={{ color: fw.color }}>
                        <span className="w-2 h-2 rounded-full" style={{ backgroundColor: fw.color }} />
                        {fw.label}
                      </h4>
                      <div className="space-y-2">
                        {fw.items.map(item => (
                          <div key={item.id} className="flex items-center gap-3 p-3 rounded-lg border border-slate-100 bg-slate-50">
                            <span className="text-xs font-mono font-bold px-2 py-0.5 rounded shrink-0" style={{ color: fw.color, backgroundColor: fw.bg }}>{item.id}</span>
                            <span className="text-sm text-slate-700 flex-1">{item.name}</span>
                            <MappingTypeBadge type={item.type} />
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                  {sub.mappings.nist80053.length === 0 && sub.mappings.iso27002.length === 0 && sub.mappings.cisControls.length === 0 && (
                    <p className="text-sm text-slate-400 italic">Mapeamentos não disponíveis para esta subcategory nesta versão.</p>
                  )}
                </div>

                {sub.relatedFrameworks.length > 0 && (
                  <div className="mt-5 pt-5 border-t border-slate-100">
                    <h4 className="text-sm font-semibold text-slate-700 mb-3">Frameworks complementares</h4>
                    <div className="space-y-2">
                      {sub.relatedFrameworks.map(rf => (
                        <div key={rf.id} className="flex items-center gap-3 text-sm">
                          <span className="font-semibold text-slate-700">{rf.name}</span>
                          <MappingTypeBadge type={rf.type} />
                          <span className="text-slate-500 text-xs">{rf.relevance}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                <p className="mt-4 text-xs text-slate-400 italic">
                  Os mapeamentos não representam equivalências 1:1. Um controle pode contribuir parcialmente para múltiplos resultados do CSF.
                </p>
              </div>
            )}

            {activeTab === 'controls' && (
              <div>
                <h3 className="text-base font-bold text-slate-900 mb-1">Como Implementar</h3>
                <p className="text-xs text-slate-500 mb-5">Orientações práticas para alcançar o resultado desta subcategory.</p>
                <div className="space-y-3 mb-6">
                  {sub.howToImplement.map((h, i) => (
                    <div key={i} className="flex gap-3 p-4 bg-slate-50 rounded-xl border border-slate-100">
                      <span className="w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold text-white shrink-0" style={{ backgroundColor: '#0F766E' }}>{i + 1}</span>
                      <p className="text-sm text-slate-700">{h}</p>
                    </div>
                  ))}
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-slate-700 mb-3">Exemplos de Práticas</h4>
                  <ul className="space-y-2">
                    {sub.practiceExamples.map((p, i) => (
                      <li key={i} className="flex gap-2 text-sm text-slate-600">
                        <span className="text-teal-400 shrink-0">→</span>
                        {p}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            )}
          </div>

          {/* Bottom nav */}
          <div className="flex items-center justify-between mt-6">
            <button
              onClick={() => reset('subcategory')}
              className="flex items-center gap-2 text-sm text-slate-500 hover:text-slate-800 font-medium"
            >
              ← Outras subcategorias de {cat.code}
            </button>
            <Link
              to={`/subcategory/${sub.id}`}
              className="flex items-center gap-2 text-sm font-semibold px-4 py-2 rounded-lg text-white transition-colors hover:opacity-90"
              style={{ backgroundColor: '#0B1F33' }}
            >
              Ver página completa <ChevronRight size={14} />
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default ConsultantViewPage;
