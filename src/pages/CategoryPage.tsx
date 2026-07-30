import React from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import { ChevronRight, ChevronLeft } from 'lucide-react';
import { csfCategories } from '../data/categories';
import { csfFunctions } from '../data/functions';
import { allSubcategories } from '../data';
import { LayerBadge, MappingTypeBadge, Section } from '../components/ui';

const CategoryPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const cat = csfCategories.find(c => c.id === id);
  if (!cat) return <Navigate to="/framework" replace />;

  const fn = csfFunctions.find(f => f.id === cat.functionId)!;
  const subs = allSubcategories.filter(s => s.categoryId === cat.id);
  const catIndex = csfCategories.filter(c => c.functionId === cat.functionId).findIndex(c => c.id === cat.id);
  const sameFnCats = csfCategories.filter(c => c.functionId === cat.functionId);
  const prev = catIndex > 0 ? sameFnCats[catIndex - 1] : null;
  const next = catIndex < sameFnCats.length - 1 ? sameFnCats[catIndex + 1] : null;

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
        <span className="font-semibold text-slate-700">{cat.code}</span>
      </nav>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main */}
        <div className="lg:col-span-2 space-y-8">
          {/* Header */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <span className="px-3 py-1.5 rounded-lg text-sm font-mono font-bold" style={{ backgroundColor: fn.colorLight, color: fn.color }}>
                {cat.code}
              </span>
              <div className="flex gap-1.5">
                {cat.layers.map(l => <LayerBadge key={l} layer={l} />)}
              </div>
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 mb-3">{cat.name}</h1>
            <p className="text-slate-500 text-sm leading-relaxed">{cat.nameEn}</p>
          </div>

          <Section title="Descrição">
            <p className="text-slate-600 leading-relaxed">{cat.description}</p>
          </Section>

          <Section title="Objetivo de Implementação">
            <p className="text-slate-600 leading-relaxed">{cat.objective}</p>
          </Section>

          <Section title="Orientações Práticas">
            <ul className="space-y-2">
              {cat.implementationGuidance.map((g, i) => (
                <li key={i} className="flex gap-3 text-sm text-slate-600">
                  <span className="shrink-0 w-5 h-5 rounded-full flex items-center justify-center text-xs font-bold text-white mt-0.5" style={{ backgroundColor: fn.color }}>{i + 1}</span>
                  {g}
                </li>
              ))}
            </ul>
          </Section>

          <Section title="Perguntas Orientativas">
            <ul className="space-y-3">
              {cat.guidingQuestions.map((q, i) => (
                <li key={i} className="flex gap-3 text-sm">
                  <span className="text-slate-400 font-bold shrink-0">Q{i + 1}</span>
                  <span className="text-slate-600">{q}</span>
                </li>
              ))}
            </ul>
          </Section>

          <Section title="Evidências Típicas">
            <div className="flex flex-wrap gap-2">
              {cat.evidenceExamples.map((e, i) => (
                <span key={i} className="px-3 py-1.5 bg-slate-100 text-slate-700 rounded-lg text-sm">{e}</span>
              ))}
            </div>
          </Section>

          {/* Subcategories */}
          <Section title={`Subcategories (${subs.length})`}>
            <div className="space-y-3">
              {subs.map(sub => (
                <Link key={sub.id} to={`/subcategory/${sub.id}`} className="group block">
                  <div className="bg-white rounded-xl border border-slate-200 p-5 hover:shadow-md transition-all hover:-translate-y-0.5">
                    <div className="flex items-start gap-3">
                      <span className="text-xs font-mono font-bold px-2 py-1 rounded shrink-0 mt-0.5" style={{ backgroundColor: fn.colorLight, color: fn.color }}>
                        {sub.code}
                      </span>
                      <div className="flex-1">
                        <h4 className="text-sm font-semibold text-slate-800 mb-1">{sub.name}</h4>
                        <p className="text-xs text-slate-500 leading-relaxed">{sub.description}</p>
                      </div>
                      <ChevronRight size={14} className="text-slate-300 group-hover:text-slate-500 transition-colors shrink-0 mt-1" />
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </Section>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Function card */}
          <div className="bg-white rounded-xl border border-slate-200 p-5">
            <p className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-3">Function</p>
            <Link to={`/framework/${fn.id.toLowerCase()}`} className="flex items-center gap-3 group">
              <div className="w-10 h-10 rounded-lg flex items-center justify-center shrink-0" style={{ backgroundColor: fn.colorLight, color: fn.color }}>
                <span className="text-sm font-bold">{fn.code}</span>
              </div>
              <div>
                <p className="text-sm font-bold text-slate-800">{fn.nameEn}</p>
                <p className="text-xs text-slate-400">{fn.name}</p>
              </div>
            </Link>
          </div>

          {/* Frameworks */}
          {cat.relatedFrameworks.length > 0 && (
            <div className="bg-white rounded-xl border border-slate-200 p-5">
              <p className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-3">Frameworks Relacionados</p>
              <div className="space-y-3">
                {cat.relatedFrameworks.map(rf => {
                  return (
                    <div key={rf.id} className="text-sm">
                      <div className="flex items-center justify-between gap-2 mb-1">
                        <span className="font-semibold text-slate-800">{rf.name}</span>
                        <MappingTypeBadge type={rf.type} />
                      </div>
                      <p className="text-xs text-slate-500">{rf.relevance}</p>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Other categories */}
          <div className="bg-white rounded-xl border border-slate-200 p-5">
            <p className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-3">
              Outras Categories de {fn.nameEn}
            </p>
            <div className="space-y-2">
              {sameFnCats.filter(c => c.id !== cat.id).map(c => (
                <Link
                  key={c.id}
                  to={`/category/${c.id}`}
                  className="flex items-center gap-2 text-sm text-slate-600 hover:text-slate-900 py-1"
                >
                  <span className="text-xs font-mono" style={{ color: fn.color }}>{c.code}</span>
                  <span>{c.name}</span>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Nav */}
      <div className="flex justify-between mt-10 pt-6 border-t border-slate-200">
        {prev ? (
          <Link to={`/category/${prev.id}`} className="flex items-center gap-2 text-sm font-medium text-slate-500 hover:text-slate-800">
            <ChevronLeft size={16} /> {prev.code}, {prev.name}
          </Link>
        ) : <div />}
        {next ? (
          <Link to={`/category/${next.id}`} className="flex items-center gap-2 text-sm font-medium text-slate-500 hover:text-slate-800">
            {next.code}, {next.name} <ChevronRight size={16} />
          </Link>
        ) : <div />}
      </div>
    </div>
  );
};

export default CategoryPage;
