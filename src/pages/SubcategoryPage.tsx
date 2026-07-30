import React from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import { ChevronRight, ChevronLeft } from 'lucide-react';
import { allSubcategories } from '../data';
import { csfCategories } from '../data/categories';
import { csfFunctions } from '../data/functions';
import { LayerBadge, MappingTypeBadge, Section } from '../components/ui';

const SubcategoryPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const sub = allSubcategories.find(s => s.id === id);
  if (!sub) return <Navigate to="/framework" replace />;

  const cat = csfCategories.find(c => c.id === sub.categoryId)!;
  const fn = csfFunctions.find(f => f.id === sub.functionId)!;
  const sameCatSubs = allSubcategories.filter(s => s.categoryId === sub.categoryId);
  const subIndex = sameCatSubs.findIndex(s => s.id === sub.id);
  const prev = subIndex > 0 ? sameCatSubs[subIndex - 1] : null;
  const next = subIndex < sameCatSubs.length - 1 ? sameCatSubs[subIndex + 1] : null;

  const hasNist = sub.mappings.nist80053.length > 0;
  const hasIso = sub.mappings.iso27002.length > 0;
  const hasCis = sub.mappings.cisControls.length > 0;

  return (
    <div className="max-w-screen-xl mx-auto px-4 sm:px-6 py-10 animate-fadeIn">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-sm text-slate-400 mb-8 flex-wrap">
        <Link to="/" className="hover:text-slate-700">Home</Link>
        <ChevronRight size={14} />
        <Link to="/framework" className="hover:text-slate-700">Framework</Link>
        <ChevronRight size={14} />
        <Link to={`/framework/${fn.id.toLowerCase()}`} className="hover:text-slate-700" style={{ color: fn.color }}>{fn.nameEn}</Link>
        <ChevronRight size={14} />
        <Link to={`/category/${cat.id}`} className="hover:text-slate-700">{cat.code}</Link>
        <ChevronRight size={14} />
        <span className="font-semibold text-slate-700">{sub.code}</span>
      </nav>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main */}
        <div className="lg:col-span-2 space-y-8">
          {/* Header */}
          <div>
            <div className="flex items-center gap-3 mb-4 flex-wrap">
              <span className="px-3 py-1.5 rounded-lg text-sm font-mono font-bold" style={{ backgroundColor: fn.colorLight, color: fn.color }}>
                {sub.code}
              </span>
              {sub.layers.map(l => <LayerBadge key={l} layer={l} />)}
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 mb-2">{sub.name}</h1>
          </div>

          <Section title="Descrição">
            <p className="text-slate-600 leading-relaxed">{sub.description}</p>
          </Section>

          <Section title="O que significa?">
            <p className="text-slate-600 leading-relaxed">{sub.whatItMeans}</p>
          </Section>

          <Section title="Como implementar">
            <ul className="space-y-2">
              {sub.howToImplement.map((h, i) => (
                <li key={i} className="flex gap-3 text-sm text-slate-600">
                  <span className="shrink-0 w-5 h-5 rounded-full flex items-center justify-center text-xs font-bold text-white mt-0.5" style={{ backgroundColor: fn.color }}>{i + 1}</span>
                  {h}
                </li>
              ))}
            </ul>
          </Section>

          <Section title="Perguntas Orientativas">
            <ul className="space-y-3">
              {sub.guidingQuestions.map((q, i) => (
                <li key={i} className="flex gap-3 text-sm">
                  <span className="text-slate-400 font-bold shrink-0">Q{i + 1}</span>
                  <span className="text-slate-600">{q}</span>
                </li>
              ))}
            </ul>
          </Section>

          <Section title="Exemplos de Práticas">
            <ul className="space-y-2">
              {sub.practiceExamples.map((p, i) => (
                <li key={i} className="flex gap-2 text-sm text-slate-600">
                  <span className="text-slate-300 shrink-0">→</span>
                  {p}
                </li>
              ))}
            </ul>
          </Section>

          <Section title="Evidências Típicas">
            <div className="flex flex-wrap gap-2">
              {sub.evidenceExamples.map((e, i) => (
                <span key={i} className="px-3 py-1.5 bg-slate-100 text-slate-700 rounded-lg text-sm">{e}</span>
              ))}
            </div>
          </Section>

          {/* Crosswalk */}
          {(hasNist || hasIso || hasCis) && (
            <Section title="Crosswalk. Mapeamentos">
              <div className="space-y-6">
                {hasNist && (
                  <div>
                    <h4 className="text-sm font-semibold text-slate-700 mb-3 flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-blue-500" />
                      NIST SP 800-53
                    </h4>
                    <div className="space-y-2">
                      {sub.mappings.nist80053.map(m => (
                        <div key={m.id} className="flex items-center gap-3 text-sm bg-slate-50 rounded-lg px-4 py-3">
                          <span className="font-mono text-xs font-bold text-blue-700 bg-blue-100 px-2 py-0.5 rounded">{m.id}</span>
                          <span className="text-slate-700 flex-1">{m.name}</span>
                          <MappingTypeBadge type={m.type} />
                        </div>
                      ))}
                    </div>
                  </div>
                )}
                {hasIso && (
                  <div>
                    <h4 className="text-sm font-semibold text-slate-700 mb-3 flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-teal-500" />
                      ISO/IEC 27002
                    </h4>
                    <div className="space-y-2">
                      {sub.mappings.iso27002.map(m => (
                        <div key={m.id} className="flex items-center gap-3 text-sm bg-slate-50 rounded-lg px-4 py-3">
                          <span className="font-mono text-xs font-bold text-teal-700 bg-teal-100 px-2 py-0.5 rounded">{m.id}</span>
                          <span className="text-slate-700 flex-1">{m.name}</span>
                          <MappingTypeBadge type={m.type} />
                        </div>
                      ))}
                    </div>
                  </div>
                )}
                {hasCis && (
                  <div>
                    <h4 className="text-sm font-semibold text-slate-700 mb-3 flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-orange-500" />
                      CIS Controls
                    </h4>
                    <div className="space-y-2">
                      {sub.mappings.cisControls.map(m => (
                        <div key={m.id} className="flex items-center gap-3 text-sm bg-slate-50 rounded-lg px-4 py-3">
                          <span className="font-mono text-xs font-bold text-orange-700 bg-orange-100 px-2 py-0.5 rounded">{m.id}</span>
                          <span className="text-slate-700 flex-1">{m.name}</span>
                          <MappingTypeBadge type={m.type} />
                        </div>
                      ))}
                    </div>
                  </div>
                )}
                <p className="text-xs text-slate-400 italic">
                  Os mapeamentos são orientativos e representam relações de complementaridade ou referência. Não indicam equivalência absoluta entre frameworks.
                </p>
              </div>
            </Section>
          )}
        </div>

        {/* Sidebar */}
        <div className="space-y-5">
          {/* Context */}
          <div className="bg-white rounded-xl border border-slate-200 p-5">
            <p className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-3">Contexto</p>
            <div className="space-y-3 text-sm">
              <div>
                <p className="text-xs text-slate-400 mb-1">Função</p>
                <Link to={`/framework/${fn.id.toLowerCase()}`} className="font-semibold hover:underline" style={{ color: fn.color }}>{fn.nameEn}</Link>
              </div>
              <div>
                <p className="text-xs text-slate-400 mb-1">Categoria</p>
                <Link to={`/category/${cat.id}`} className="font-semibold text-slate-700 hover:underline">{cat.code}, {cat.name}</Link>
              </div>
              <div>
                <p className="text-xs text-slate-400 mb-1">Camada Organizacional</p>
                <div className="flex flex-wrap gap-1">
                  {sub.layers.map(l => <LayerBadge key={l} layer={l} />)}
                </div>
              </div>
            </div>
          </div>

          {/* Keywords */}
          {sub.keywords.length > 0 && (
            <div className="bg-white rounded-xl border border-slate-200 p-5">
              <p className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-3">Palavras-chave</p>
              <div className="flex flex-wrap gap-1.5">
                {sub.keywords.map(k => (
                  <span key={k} className="px-2 py-1 bg-slate-100 text-slate-600 rounded text-xs">{k}</span>
                ))}
              </div>
            </div>
          )}

          {/* Other subcategories */}
          <div className="bg-white rounded-xl border border-slate-200 p-5">
            <p className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-3">Outras Subcategorias</p>
            <div className="space-y-2">
              {sameCatSubs.filter(s => s.id !== sub.id).slice(0, 8).map(s => (
                <Link key={s.id} to={`/subcategory/${s.id}`} className="flex items-center gap-2 text-xs text-slate-600 hover:text-slate-900 py-0.5">
                  <span className="font-mono" style={{ color: fn.color }}>{s.code}</span>
                  <span className="line-clamp-1">{s.name}</span>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Nav */}
      <div className="flex justify-between mt-10 pt-6 border-t border-slate-200">
        {prev ? (
          <Link to={`/subcategory/${prev.id}`} className="flex items-center gap-2 text-sm font-medium text-slate-500 hover:text-slate-800">
            <ChevronLeft size={16} /> {prev.code}
          </Link>
        ) : <div />}
        {next ? (
          <Link to={`/subcategory/${next.id}`} className="flex items-center gap-2 text-sm font-medium text-slate-500 hover:text-slate-800">
            {next.code} <ChevronRight size={16} />
          </Link>
        ) : <div />}
      </div>
    </div>
  );
};

export default SubcategoryPage;
