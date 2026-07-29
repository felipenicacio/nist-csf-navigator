import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Shield, Search, Lock, Eye, Zap, RefreshCw, ArrowRight, ChevronRight } from 'lucide-react';
import { csfFunctions } from '../data/functions';
import { csfCategories } from '../data/categories';
import { allSubcategories } from '../data';
import { LayerBadge } from '../components/ui';

const fnIcons: Record<string, React.ReactNode> = {
  GV: <Shield size={22} />, ID: <Search size={22} />, PR: <Lock size={22} />,
  DE: <Eye size={22} />, RS: <Zap size={22} />, RC: <RefreshCw size={22} />,
};

const FrameworkPage: React.FC = () => {
  const [activeFilter, setActiveFilter] = useState<string>('all');

  const layers = [
    { id: 'all', label: 'Todas as Camadas' },
    { id: 'strategic', label: 'Estratégica' },
    { id: 'tactical', label: 'Tática' },
    { id: 'operational', label: 'Operacional' },
  ];

  const filteredCategories = (functionId: string) =>
    csfCategories.filter(c =>
      c.functionId === functionId &&
      (activeFilter === 'all' || c.layers.includes(activeFilter as any))
    );

  return (
    <div className="max-w-screen-xl mx-auto px-4 sm:px-6 py-10 animate-fadeIn">
      {/* Header */}
      <div className="mb-10">
        <p className="text-xs font-semibold uppercase tracking-widest text-teal-600 mb-2">NIST CSF 2.0</p>
        <h1 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-4">Framework Core</h1>
        <p className="text-slate-500 max-w-2xl leading-relaxed">
          Navegue pela estrutura completa do NIST CSF 2.0 — seis Functions, dezessete Categories e cento e seis Subcategories organizadas por resultados de cibersegurança.
        </p>
      </div>

      {/* Filter */}
      <div className="flex flex-wrap gap-2 mb-10">
        {layers.map(l => (
          <button
            key={l.id}
            onClick={() => setActiveFilter(l.id)}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              activeFilter === l.id
                ? 'text-white shadow-sm'
                : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-50'
            }`}
            style={activeFilter === l.id ? { backgroundColor: '#0B1F33' } : {}}
          >
            {l.label}
          </button>
        ))}
      </div>

      {/* Functions */}
      <div className="space-y-8">
        {csfFunctions.map(fn => {
          const cats = filteredCategories(fn.id);
          if (cats.length === 0) return null;
          return (
            <div key={fn.id} className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm">
              {/* Function header */}
              <Link to={`/framework/${fn.id.toLowerCase()}`} className="group block">
                <div className="flex items-center gap-4 p-6 border-b border-slate-100 hover:bg-slate-50 transition-colors">
                  <div className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0" style={{ backgroundColor: fn.colorLight, color: fn.color }}>
                    {fnIcons[fn.id]}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-xs font-mono font-semibold" style={{ color: fn.color }}>{fn.code}</span>
                      <span className="text-xs text-slate-400">·</span>
                      {fn.layers.map(l => <LayerBadge key={l} layer={l} />)}
                    </div>
                    <h2 className="text-xl font-bold text-slate-900">
                      {fn.nameEn} — <span className="text-slate-500 font-semibold">{fn.name}</span>
                    </h2>
                    <p className="text-sm text-slate-500 mt-1 line-clamp-1">{fn.description}</p>
                  </div>
                  <div className="flex items-center gap-3 shrink-0">
                    <div className="text-center hidden sm:block">
                      <div className="text-2xl font-bold" style={{ color: fn.color }}>{cats.length}</div>
                      <div className="text-xs text-slate-400">categorias</div>
                    </div>
                    <ChevronRight size={18} className="text-slate-300 group-hover:text-slate-500 transition-colors" />
                  </div>
                </div>
              </Link>

              {/* Categories grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-px bg-slate-100">
                {cats.map(cat => {
                  const subCount = allSubcategories.filter(s => s.categoryId === cat.id).length;
                  return (
                    <Link
                      key={cat.id}
                      to={`/category/${cat.id}`}
                      className="group bg-white p-5 hover:bg-slate-50 transition-colors"
                    >
                      <div className="flex items-start justify-between gap-3">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <span className="text-xs font-mono font-semibold px-2 py-0.5 rounded" style={{ color: fn.color, backgroundColor: fn.colorLight }}>
                              {cat.code}
                            </span>
                          </div>
                          <h3 className="text-sm font-semibold text-slate-800 mb-1">{cat.name}</h3>
                          <p className="text-xs text-slate-400 leading-relaxed line-clamp-2">{cat.description}</p>
                        </div>
                        <ArrowRight size={14} className="text-slate-300 group-hover:text-slate-500 transition-colors shrink-0 mt-1" />
                      </div>
                      <div className="mt-3 flex items-center gap-2">
                        <span className="text-xs text-slate-400">{subCount} subcategorias</span>
                        <div className="flex gap-1">
                          {cat.layers.map(l => <LayerBadge key={l} layer={l} />)}
                        </div>
                      </div>
                    </Link>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default FrameworkPage;
