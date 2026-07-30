import React from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import { ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react';
import { csfFunctions } from '../data/functions';
import { csfCategories } from '../data/categories';
import { allSubcategories } from '../data';
import { LayerBadge, Section } from '../components/ui';
import PageIntro from '../components/ui/PageIntro';

const FunctionPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const fn = csfFunctions.find(f => f.id.toLowerCase() === id?.toLowerCase());
  if (!fn) return <Navigate to="/framework" replace />;

  const cats = csfCategories.filter(c => c.functionId === fn.id);
  const fnIndex = csfFunctions.findIndex(f => f.id === fn.id);
  const prev = fnIndex > 0 ? csfFunctions[fnIndex - 1] : null;
  const next = fnIndex < csfFunctions.length - 1 ? csfFunctions[fnIndex + 1] : null;

  return (
    <div className="max-w-screen-xl mx-auto px-4 sm:px-6 py-10 animate-fadeIn">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-sm text-slate-400 mb-8">
        <Link to="/" className="hover:text-slate-700">Home</Link>
        <ChevronRight size={14} />
        <Link to="/framework" className="hover:text-slate-700">Framework</Link>
        <ChevronRight size={14} />
        <span className="font-semibold" style={{ color: fn.color }}>{fn.nameEn}</span>
      </nav>

      <PageIntro
        title="O que é uma Function?"
        plain="Uma Function é o nível mais alto do CSF, agrupa resultados de cibersegurança relacionados a um mesmo objetivo."
        detail="Cada Function se divide em Categories, que por sua vez se dividem em Subcategories com resultados específicos."
      />
      {/* Function header */}
      <div className="rounded-2xl p-8 mb-10 text-white" style={{ background: `linear-gradient(135deg, ${fn.color} 0%, ${fn.color}CC 100%)` }}>
        <div className="flex items-start gap-4">
          <div className="w-14 h-14 rounded-xl bg-white/10 flex items-center justify-center text-2xl font-bold shrink-0">
            {fn.code}
          </div>
          <div className="flex-1">
            <p className="text-white/60 text-sm font-medium uppercase tracking-widest mb-1">Function</p>
            <h1 className="text-3xl sm:text-4xl font-bold mb-2">{fn.nameEn}, {fn.name}</h1>
            <p className="text-white/80 text-base leading-relaxed max-w-3xl">{fn.description}</p>
            <div className="flex gap-2 mt-4">
              {fn.layers.map(l => (
                <span key={l} className="px-3 py-1 rounded-full text-xs font-semibold bg-white/20">
                  {l === 'strategic' ? 'Estratégica' : l === 'tactical' ? 'Tática' : 'Operacional'}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Objective */}
      <Section title="Objetivo">
        <p className="text-slate-600 leading-relaxed">{fn.objective}</p>
      </Section>

      {/* Categories */}
      <Section title={`Categories (${cats.length})`}>
        <div className="space-y-4">
          {cats.map(cat => {
            const subs = allSubcategories.filter(s => s.categoryId === cat.id);
            return (
              <Link key={cat.id} to={`/category/${cat.id}`} className="group block">
                <div className="bg-white rounded-xl border border-slate-200 p-6 hover:shadow-md transition-all hover:-translate-y-0.5">
                  <div className="flex items-start gap-4">
                    <div className="shrink-0 mt-0.5">
                      <span className="inline-block px-3 py-1 rounded-lg text-sm font-mono font-bold" style={{ backgroundColor: fn.colorLight, color: fn.color }}>
                        {cat.code}
                      </span>
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between gap-4">
                        <h3 className="text-base font-bold text-slate-800">{cat.name}</h3>
                        <ArrowRight size={16} className="text-slate-300 group-hover:text-slate-600 transition-colors shrink-0" />
                      </div>
                      <p className="text-sm text-slate-500 mt-1 leading-relaxed">{cat.description}</p>
                      <div className="flex items-center gap-3 mt-3">
                        <span className="text-xs text-slate-400">{subs.length} subcategorias</span>
                        <div className="flex gap-1.5">
                          {cat.layers.map(l => <LayerBadge key={l} layer={l} />)}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </Section>

      {/* Nav prev/next */}
      <div className="flex justify-between mt-10 pt-6 border-t border-slate-200">
        {prev ? (
          <Link to={`/framework/${prev.id.toLowerCase()}`} className="flex items-center gap-2 text-sm font-medium text-slate-500 hover:text-slate-800 transition-colors">
            <ChevronLeft size={16} /> {prev.nameEn}
          </Link>
        ) : <div />}
        {next ? (
          <Link to={`/framework/${next.id.toLowerCase()}`} className="flex items-center gap-2 text-sm font-medium text-slate-500 hover:text-slate-800 transition-colors">
            {next.nameEn} <ChevronRight size={16} />
          </Link>
        ) : <div />}
      </div>
    </div>
  );
};

export default FunctionPage;
