import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { csfCategories } from '../data/categories';
import { csfFunctions } from '../data/functions';
import { allSubcategories } from '../data';

const FrameworkMapPage: React.FC = () => {
  const [expandedFn, setExpandedFn] = useState<string | null>(null);

  const cats = (fnId: string) => csfCategories.filter(c => c.functionId === fnId);
  const subCount = (fnId: string) => allSubcategories.filter(s => s.functionId === fnId).length;

  const governFn = csfFunctions.find(f => f.id === 'GV')!;
  const lifecycleFns = csfFunctions.filter(f => f.id !== 'GV');

  const governCats = csfCategories.filter(c => c.functionId === 'GV');

  return (
    <div className="min-h-screen" style={{ backgroundColor: '#F8FAFC' }}>
      <div className="max-w-screen-xl mx-auto px-4 sm:px-6 py-10">

        {/* Header */}
        <div className="mb-10">
          <p className="text-xs font-semibold uppercase tracking-widest mb-2" style={{ color: '#1A7FA8' }}>Visão Geral</p>
          <h1 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-3">Framework Map</h1>
          <p className="text-slate-500 max-w-2xl text-sm">
            Representação visual da arquitetura do NIST CSF 2.0. Clique em qualquer Função ou Category para navegar ao detalhe.
          </p>
        </div>

        {/* ── WHEEL + GOVERN SIDE BY SIDE ── */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">

          {/* Official wheel image */}
          <div className="bg-white rounded-2xl border border-slate-200 p-8 flex flex-col items-center justify-center">
            <p className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-4">Diagrama Oficial. NIST CSF 2.0</p>
            <img
              src="./assets/csf-wheel.png"
              alt="NIST CSF 2.0 Wheel, 6 Funções: Govern, Identify, Protect, Detect, Respond, Recover"
              className="w-full max-w-xs"
            />
            <p className="text-xs text-slate-400 mt-4 text-center">
              GOVERN no centro, permeando todas as demais Funções do ciclo de vida
            </p>
          </div>

          {/* GOVERN card */}
          <div
            className="rounded-2xl border-2 overflow-hidden"
            style={{ borderColor: governFn.colorHex }}
          >
            <Link
              to="/framework/gv"
              className="flex items-center justify-between px-6 py-5 group"
              style={{ backgroundColor: governFn.colorHex }}
            >
              <div className="flex items-center gap-3">
                <span className="text-3xl font-black opacity-30 font-mono">GV</span>
                <div>
                  <h3 className="text-xl font-bold text-slate-900">GOVERN</h3>
                  <p className="text-slate-700 text-sm">Governar. Camada Estratégica</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="text-right hidden sm:block">
                  <div className="text-slate-600 text-xs">6 categories · 31 subcategories</div>
                </div>
                <span className="text-slate-500 group-hover:text-slate-900 text-xl transition-colors">→</span>
              </div>
            </Link>
            <p className="px-6 py-3 text-xs text-slate-600 bg-white border-b border-slate-100">
              Permeia e fundamenta todas as outras Funções, é o ponto de partida do framework.
            </p>
            {/* GV Categories grid */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-px bg-slate-100">
              {governCats.map(gc => {
                const n = allSubcategories.filter(s => s.categoryId === gc.id).length;
                return (
                  <Link
                    key={gc.id}
                    to={`/category/${gc.id}`}
                    className="group bg-white hover:bg-slate-50 transition-colors p-4"
                  >
                    <div
                      className="text-xs font-mono font-bold mb-1"
                      style={{ color: governFn.color }}
                    >{gc.code}</div>
                    <div className="text-xs font-semibold text-slate-800 leading-tight mb-1">{gc.name}</div>
                    <div className="text-xs text-slate-400">{n} subcats</div>
                  </Link>
                );
              })}
            </div>
          </div>
        </div>

        {/* Connector */}
        <div className="flex justify-center mb-4">
          <div className="flex flex-col items-center">
            <div className="w-0.5 h-5 bg-slate-300" />
            <div className="text-slate-400 text-xs font-semibold tracking-widest px-3 py-1 border border-slate-200 rounded-full bg-white">
              GOVERN permeia todas as Funções abaixo
            </div>
            <div className="w-0.5 h-5 bg-slate-300" />
          </div>
        </div>

        {/* ── LIFECYCLE ROW ── */}
        <div className="grid grid-cols-1 sm:grid-cols-5 gap-3 mb-6">
          {lifecycleFns.map(fn => {
            const isExpanded = expandedFn === fn.id;
            const fnCats = cats(fn.id);

            return (
              <div key={fn.id} className="flex flex-col">
                <div
                  className="rounded-xl border-2 overflow-hidden transition-all"
                  style={{ borderColor: fn.colorHex }}
                >
                  {/* Header */}
                  <Link
                    to={`/framework/${fn.id.toLowerCase()}`}
                    className="block px-4 py-4 group"
                    style={{ backgroundColor: fn.colorHex }}
                  >
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <span className="text-xs font-mono font-bold text-black/40 block">{fn.id}</span>
                        <span className="text-sm font-bold text-slate-900 block">{fn.nameEn}</span>
                        <span className="text-xs text-slate-700">{fn.name}</span>
                      </div>
                      <div className="text-right shrink-0">
                        <div className="text-black/40 text-xs">{fnCats.length} cats</div>
                        <div className="text-black/40 text-xs">{subCount(fn.id)} subs</div>
                      </div>
                    </div>
                  </Link>

                  {/* Toggle */}
                  <button
                    onClick={() => setExpandedFn(isExpanded ? null : fn.id)}
                    className="w-full py-2 text-xs font-semibold text-center transition-colors border-t"
                    style={{ backgroundColor: fn.colorLight, color: fn.color, borderColor: fn.colorHex }}
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
                          <span className="text-xs font-mono font-bold shrink-0" style={{ color: fn.color }}>{cat.code}</span>
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

        {/* Flow indicator */}
        <div className="flex items-center justify-center gap-2 mb-8 flex-wrap">
          {lifecycleFns.map((fn, idx) => (
            <React.Fragment key={fn.id}>
              <div
                className="px-3 py-1.5 rounded-full text-xs font-bold text-slate-900"
                style={{ backgroundColor: fn.colorHex }}
              >
                {fn.nameEn}
              </div>
              {idx < lifecycleFns.length - 1 && (
                <span className="text-slate-300 font-bold">→</span>
              )}
            </React.Fragment>
          ))}
        </div>

        {/* Continuous improvement */}
        <div className="flex justify-center mb-8">
          <div className="flex items-center gap-2 px-4 py-2 rounded-full border border-slate-200 bg-white">
            <span className="text-slate-400">↺</span>
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-widest">Melhoria Contínua. ID.IM</span>
          </div>
        </div>

        {/* ── ECOSYSTEM ── */}
        <div className="bg-white rounded-xl border border-slate-200 p-6">
          <h3 className="text-sm font-bold text-slate-800 mb-1">Ecossistema de Frameworks</h3>
          <p className="text-xs text-slate-500 mb-5">O NIST CSF 2.0 é o centro, veja como outros frameworks se relacionam com cada Função.</p>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
            {[
              {
                group: 'Risco e Governança',
                items: ['NIST SP 800-39', 'NIST RMF', 'ISO 31000', 'COSO ERM', 'ISO/IEC 27005'],
                fns: ['GV', 'ID'],
              },
              {
                group: 'Controles e Proteção',
                items: ['NIST SP 800-53', 'ISO/IEC 27002', 'CIS Controls v8', 'NIST SP 800-171'],
                fns: ['PR', 'DE'],
              },
              {
                group: 'Resposta e Continuidade',
                items: ['NIST SP 800-61', 'ISO/IEC 27035', 'MITRE ATT&CK', 'ISO 22301'],
                fns: ['RS', 'RC'],
              },
            ].map(g => {
              const firstFn = csfFunctions.find(f => f.id === g.fns[0])!;
              return (
                <div key={g.group} className="rounded-xl border border-slate-100 p-4">
                  <div className="flex items-center gap-2 mb-3">
                    <div className="w-2 h-2 rounded-full" style={{ backgroundColor: firstFn.colorHex }} />
                    <h4 className="text-sm font-bold text-slate-700">{g.group}</h4>
                  </div>
                  <div className="flex gap-1 mb-3">
                    {g.fns.map(fid => {
                      const fn = csfFunctions.find(f => f.id === fid)!;
                      return (
                        <span
                          key={fid}
                          className="text-xs font-mono font-bold px-1.5 py-0.5 rounded text-slate-900"
                          style={{ backgroundColor: fn.colorHex }}
                        >
                          {fid}
                        </span>
                      );
                    })}
                  </div>
                  <ul className="space-y-1.5">
                    {g.items.map(item => (
                      <li key={item} className="flex items-center gap-2 text-xs text-slate-600">
                        <span className="w-1 h-1 rounded-full bg-slate-300 shrink-0" />
                        {item}
                      </li>
                    ))}
                  </ul>
                  <Link to="/frameworks" className="mt-3 inline-flex items-center gap-1 text-xs font-semibold hover:underline" style={{ color: firstFn.color }}>
                    Ver todos →
                  </Link>
                </div>
              );
            })}
          </div>

          {/* Legend */}
          <div className="mt-6 pt-5 border-t border-slate-100">
            <h4 className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-3">Navegação rápida</h4>
            <div className="flex flex-wrap gap-2">
              {csfFunctions.map(fn => (
                <Link
                  key={fn.id}
                  to={`/framework/${fn.id.toLowerCase()}`}
                  className="flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all hover:scale-105 text-slate-900"
                  style={{ backgroundColor: fn.colorHex }}
                >
                  <span className="font-mono">{fn.id}</span>
                  <span>{fn.nameEn}</span>
                  <span className="opacity-50">({subCount(fn.id)})</span>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FrameworkMapPage;
