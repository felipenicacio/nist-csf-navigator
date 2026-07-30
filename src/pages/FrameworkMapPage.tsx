import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { csfCategories } from '../data/categories';
import { allSubcategories } from '../data';

const fnColors: Record<string, { bg: string; border: string; text: string; light: string }> = {
  GV: { bg: '#0B1F33', border: '#0B1F33', text: '#fff', light: '#E8EDF2' },
  ID: { bg: '#164E73', border: '#164E73', text: '#fff', light: '#EBF4FA' },
  PR: { bg: '#0F766E', border: '#0F766E', text: '#fff', light: '#ECFDF5' },
  DE: { bg: '#D97706', border: '#D97706', text: '#fff', light: '#FFFBEB' },
  RS: { bg: '#DC2626', border: '#DC2626', text: '#fff', light: '#FEF2F2' },
  RC: { bg: '#16A34A', border: '#16A34A', text: '#fff', light: '#F0FDF4' },
};

const functions = [
  { id: 'GV', name: 'GOVERN', namePt: 'Governar', desc: 'Estratégia, políticas e supervisão', layer: 'strategic' },
  { id: 'ID', name: 'IDENTIFY', namePt: 'Identificar', desc: 'Ativos, riscos e contexto', layer: 'strategic/tactical' },
  { id: 'PR', name: 'PROTECT', namePt: 'Proteger', desc: 'Salvaguardas e controles', layer: 'tactical/operational' },
  { id: 'DE', name: 'DETECT', namePt: 'Detectar', desc: 'Monitoramento e análise', layer: 'operational' },
  { id: 'RS', name: 'RESPOND', namePt: 'Responder', desc: 'Ações em incidentes', layer: 'operational' },
  { id: 'RC', name: 'RECOVER', namePt: 'Recuperar', desc: 'Restauração e aprendizado', layer: 'tactical' },
];

const governCategories = [
  { code: 'GV.OC', name: 'Contexto Organizacional' },
  { code: 'GV.RM', name: 'Estratégia de Riscos' },
  { code: 'GV.RR', name: 'Papéis e Responsabilidades' },
  { code: 'GV.PO', name: 'Política' },
  { code: 'GV.OV', name: 'Supervisão' },
  { code: 'GV.SC', name: 'Cadeia de Suprimentos' },
];

const FrameworkMapPage: React.FC = () => {
  const [hoveredFn, setHoveredFn] = useState<string | null>(null);
  const [expandedFn, setExpandedFn] = useState<string | null>(null);

  const cats = (fnId: string) => csfCategories.filter(c => c.functionId === fnId);
  const subCount = (fnId: string) => allSubcategories.filter(s => s.functionId === fnId).length;

  return (
    <div className="min-h-screen" style={{ backgroundColor: '#F8FAFC' }}>
      <div className="max-w-screen-xl mx-auto px-4 sm:px-6 py-10">

        {/* Header */}
        <div className="mb-10">
          <p className="text-xs font-semibold uppercase tracking-widest text-teal-600 mb-2">Visão Geral</p>
          <h1 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-3">Framework Map</h1>
          <p className="text-slate-500 max-w-2xl">
            Representação visual da arquitetura do NIST CSF 2.0. Clique em qualquer Function ou Category para navegar ao detalhe.
          </p>
        </div>

        {/* ── GOVERN — central, full-width ── */}
        <div className="mb-2">
          <div className="relative rounded-2xl border-2 overflow-hidden" style={{ borderColor: fnColors.GV.border }}>
            {/* Header row */}
            <Link
              to="/framework/gv"
              className="flex items-center justify-between px-8 py-5 group"
              style={{ backgroundColor: fnColors.GV.bg }}
            >
              <div className="flex items-center gap-4">
                <span className="text-3xl font-black text-white/20 font-mono">GV</span>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-white font-bold text-xl tracking-wide">GOVERN</span>
                    <span className="text-white/50 font-medium">— Governar</span>
                  </div>
                  <p className="text-white/60 text-sm mt-0.5">Estratégia, políticas e supervisão que fundamentam todas as outras Functions</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="text-right hidden sm:block">
                  <div className="text-white/40 text-xs uppercase tracking-widest">Camada</div>
                  <div className="text-white font-semibold text-sm">Estratégica</div>
                </div>
                <div className="text-right hidden sm:block">
                  <div className="text-white/40 text-xs uppercase tracking-widest">Categories</div>
                  <div className="text-white font-semibold text-sm">6</div>
                </div>
                <div className="text-right hidden sm:block">
                  <div className="text-white/40 text-xs uppercase tracking-widest">Subcategories</div>
                  <div className="text-white font-semibold text-sm">32</div>
                </div>
                <span className="text-white/30 group-hover:text-white/80 text-xl transition-colors">→</span>
              </div>
            </Link>
            {/* GV Categories grid */}
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-px bg-slate-200">
              {governCategories.map(gc => {
                
                const n = allSubcategories.filter(s => s.categoryId === gc.code).length;
                return (
                  <Link
                    key={gc.code}
                    to={`/category/${gc.code}`}
                    className="group bg-white hover:bg-slate-50 transition-colors p-4"
                  >
                    <div className="text-xs font-mono font-bold mb-1" style={{ color: fnColors.GV.bg }}>{gc.code}</div>
                    <div className="text-xs font-semibold text-slate-800 leading-tight mb-2">{gc.name}</div>
                    <div className="text-xs text-slate-400">{n} subcats</div>
                  </Link>
                );
              })}
            </div>
          </div>

          {/* Vertical connector from GOVERN down */}
          <div className="flex justify-center">
            <div className="flex flex-col items-center">
              <div className="w-0.5 h-6 bg-slate-300" />
              <div className="text-slate-300 text-xs font-bold tracking-widest mb-1">permeia todas</div>
              <div className="w-0.5 h-4 bg-slate-300" />
            </div>
          </div>
        </div>

        {/* ── LIFECYCLE ROW: ID → PR → DE → RS → RC ── */}
        <div className="relative mb-8">
          {/* Connection line */}
          <div className="absolute top-12 left-0 right-0 flex items-center px-4 pointer-events-none" style={{ zIndex: 0 }}>
            <div className="flex-1 h-0.5 bg-slate-200" />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-5 gap-3 relative" style={{ zIndex: 1 }}>
            {functions.filter(f => f.id !== 'GV').map((fn, idx) => {
              const isHovered = hoveredFn === fn.id;
              const isExpanded = expandedFn === fn.id;
              const fnCats = cats(fn.id);
              const c = fnColors[fn.id];

              return (
                <div key={fn.id} className="flex flex-col">
                  {/* Arrow between functions (desktop) */}
                  {idx > 0 && (
                    <div className="hidden sm:flex absolute items-center" style={{
                      left: `calc(${idx * 20}% - 10px)`,
                      top: '44px',
                      zIndex: 2,
                    }}>
                    </div>
                  )}

                  {/* Function card */}
                  <div
                    className="rounded-xl border-2 overflow-hidden transition-all cursor-pointer"
                    style={{ borderColor: c.border, boxShadow: isHovered ? `0 4px 20px ${c.bg}33` : undefined }}
                    onMouseEnter={() => setHoveredFn(fn.id)}
                    onMouseLeave={() => setHoveredFn(null)}
                  >
                    {/* Header */}
                    <Link
                      to={`/framework/${fn.id.toLowerCase()}`}
                      className="block px-4 py-4 group"
                      style={{ backgroundColor: c.bg }}
                      onClick={e => { if (expandedFn === fn.id) { e.preventDefault(); setExpandedFn(null); } }}
                    >
                      <div className="flex items-start justify-between gap-2">
                        <div>
                          <span className="text-xs font-mono font-bold text-white/40 block">{fn.id}</span>
                          <span className="text-sm font-bold text-white block">{fn.name}</span>
                          <span className="text-xs text-white/60">{fn.namePt}</span>
                        </div>
                        <div className="text-right shrink-0">
                          <div className="text-white/40 text-xs">{fnCats.length} cats</div>
                          <div className="text-white/40 text-xs">{subCount(fn.id)} subs</div>
                        </div>
                      </div>
                      <p className="text-white/50 text-xs mt-2 leading-tight">{fn.desc}</p>
                    </Link>

                    {/* Toggle categories */}
                    <button
                      onClick={() => setExpandedFn(expandedFn === fn.id ? null : fn.id)}
                      className="w-full py-2 text-xs font-semibold text-center transition-colors"
                      style={{ backgroundColor: c.light, color: c.bg }}
                    >
                      {isExpanded ? '▲ fechar' : `▼ ${fnCats.length} categorias`}
                    </button>

                    {/* Expanded categories */}
                    {isExpanded && (
                      <div className="border-t border-slate-100">
                        {fnCats.map(cat => (
                          <Link
                            key={cat.id}
                            to={`/category/${cat.id}`}
                            className="flex items-center gap-2 px-3 py-2.5 border-b border-slate-50 hover:bg-slate-50 transition-colors"
                          >
                            <span className="text-xs font-mono font-bold shrink-0" style={{ color: c.bg }}>{cat.code}</span>
                            <span className="text-xs text-slate-700 leading-tight">{cat.name}</span>
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Flow arrows between lifecycle functions (visual) */}
          <div className="hidden sm:flex items-center justify-between mt-3 px-6">
            {functions.filter(f => f.id !== 'GV').map((fn, idx) => (
              <React.Fragment key={fn.id}>
                <div className="text-center">
                  <div className="text-xs font-semibold" style={{ color: fnColors[fn.id].bg }}>
                    {fn.layer}
                  </div>
                </div>
                {idx < 4 && <div className="text-slate-300 text-lg">→</div>}
              </React.Fragment>
            ))}
          </div>
        </div>

        {/* ── CONTINUOUS IMPROVEMENT ── */}
        <div className="flex justify-center mb-6">
          <div className="flex flex-col items-center">
            <div className="w-0.5 h-4 bg-slate-300" />
            <div className="flex items-center gap-2 px-4 py-2 rounded-full border border-slate-300 bg-white">
              <span className="text-slate-400 text-sm">↺</span>
              <span className="text-xs font-semibold text-slate-500 uppercase tracking-widest">Melhoria Contínua — ID.IM</span>
            </div>
            <div className="w-0.5 h-4 bg-slate-300" />
          </div>
        </div>

        {/* ── LEGEND ── */}
        <div className="bg-white rounded-xl border border-slate-200 p-6">
          <h3 className="text-sm font-bold text-slate-800 mb-4">Legenda — Camadas Organizacionais</h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {[
              { label: 'Estratégica', desc: 'Decisões de liderança e governança', color: '#1E40AF', bg: '#DBEAFE', fns: ['GV', 'ID'] },
              { label: 'Tática', desc: 'Processos e capacidades organizacionais', color: '#065F46', bg: '#D1FAE5', fns: ['ID', 'PR', 'RS', 'RC'] },
              { label: 'Operacional', desc: 'Implementação e operação diária', color: '#92400E', bg: '#FEF3C7', fns: ['PR', 'DE', 'RS'] },
            ].map(l => (
              <div key={l.label} className="flex gap-3">
                <div className="w-3 h-3 rounded-full shrink-0 mt-0.5" style={{ backgroundColor: l.color }} />
                <div>
                  <p className="text-sm font-semibold" style={{ color: l.color }}>{l.label}</p>
                  <p className="text-xs text-slate-500 mb-1">{l.desc}</p>
                  <div className="flex gap-1">
                    {l.fns.map(f => (
                      <span key={f} className="text-xs font-mono font-bold px-1.5 py-0.5 rounded" style={{ backgroundColor: fnColors[f].bg, color: fnColors[f].text }}>
                        {f}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-6 pt-4 border-t border-slate-100">
            <h3 className="text-sm font-bold text-slate-800 mb-3">Navegação rápida</h3>
            <div className="flex flex-wrap gap-2">
              {functions.map(fn => (
                <Link
                  key={fn.id}
                  to={`/framework/${fn.id.toLowerCase()}`}
                  className="flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all hover:scale-105"
                  style={{ backgroundColor: fnColors[fn.id].light, color: fnColors[fn.id].bg }}
                >
                  <span className="font-mono">{fn.id}</span>
                  <span>{fn.name}</span>
                  <span className="text-xs opacity-50">({subCount(fn.id)})</span>
                </Link>
              ))}
            </div>
          </div>
        </div>

        {/* ── FRAMEWORK RELATIONSHIPS ── */}
        <div className="mt-8 bg-white rounded-xl border border-slate-200 p-6">
          <h3 className="text-sm font-bold text-slate-800 mb-1">Ecossistema de Frameworks</h3>
          <p className="text-xs text-slate-500 mb-5">O NIST CSF 2.0 é o centro de um ecossistema — veja como outros frameworks se relacionam com cada Function.</p>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {[
              {
                group: 'Risco & Governança',
                items: ['NIST SP 800-39', 'NIST RMF', 'ISO 31000', 'COSO ERM', 'ISO/IEC 27005'],
                fns: ['GV', 'ID'],
                color: '#0B1F33',
              },
              {
                group: 'Controles & Proteção',
                items: ['NIST SP 800-53', 'ISO/IEC 27002', 'CIS Controls v8', 'NIST SP 800-171'],
                fns: ['PR', 'DE'],
                color: '#0F766E',
              },
              {
                group: 'Resposta & Continuidade',
                items: ['NIST SP 800-61', 'ISO/IEC 27035', 'MITRE ATT&CK', 'ISO 22301', 'ISO/IEC 27031'],
                fns: ['RS', 'RC'],
                color: '#DC2626',
              },
            ].map(g => (
              <div key={g.group} className="rounded-xl border border-slate-100 p-4">
                <div className="flex items-center gap-2 mb-3">
                  <div className="w-2 h-2 rounded-full" style={{ backgroundColor: g.color }} />
                  <h4 className="text-sm font-bold text-slate-700">{g.group}</h4>
                </div>
                <div className="flex gap-1 mb-3">
                  {g.fns.map(f => (
                    <span key={f} className="text-xs font-mono font-bold px-1.5 py-0.5 rounded text-white" style={{ backgroundColor: fnColors[f].bg }}>
                      {f}
                    </span>
                  ))}
                </div>
                <ul className="space-y-1.5">
                  {g.items.map(item => (
                    <li key={item} className="flex items-center gap-2 text-xs text-slate-600">
                      <span className="w-1 h-1 rounded-full bg-slate-300 shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
                <Link to="/frameworks" className="mt-3 inline-flex items-center gap-1 text-xs font-semibold hover:underline" style={{ color: g.color }}>
                  Ver todos →
                </Link>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FrameworkMapPage;
