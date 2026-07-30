import React from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import { ChevronRight, ChevronLeft } from 'lucide-react';
import { allSubcategories } from '../data';
import { csfCategories } from '../data/categories';
import { csfFunctions } from '../data/functions';
import { LayerBadge, MappingTypeBadge, Section } from '../components/ui';
import { informativeReferences } from '../data/informativeReferences';

// Group informative references by framework
function groupRefs(refs: string[]): Record<string, string[]> {
  const groups: Record<string, string[]> = {};
  for (const ref of refs) {
    let group = 'Outros';
    if (ref.startsWith('SP 800-53')) group = 'NIST SP 800-53';
    else if (ref.startsWith('ISO/IEC 27001')) group = 'ISO/IEC 27001';
    else if (ref.startsWith('CIS Controls')) group = 'CIS Controls';
    if (!groups[group]) groups[group] = [];
    groups[group].push(ref);
  }
  return groups;
}

// Strip the framework prefix, keep only the control identifier
function stripPrefix(ref: string, group: string): string {
  if (group === 'NIST SP 800-53') {
    // "SP 800-53 Rev 5.1.1: AC-01" → "AC-01"
    return ref.replace(/^SP 800-53 Rev \d+\.\d+(\.\d+)?:\s*/, '').trim();
  }
  if (group === 'ISO/IEC 27001') {
    // "ISO/IEC 27001:2022: Mandatory Clause: 4.1" → "Mandatory Clause: 4.1"
    return ref.replace(/^ISO\/IEC 27001:\d+:\s*/, '').trim();
  }
  if (group === 'CIS Controls') {
    // "CIS Controls v8.0: 5.1" → "5.1"
    return ref.replace(/^CIS Controls v[\d.]+:\s*/, '').trim();
  }
  return ref;
}

const frameworkColors: Record<string, { text: string; bg: string; dot: string }> = {
  'NIST SP 800-53': { text: 'text-blue-700', bg: 'bg-blue-50', dot: 'bg-blue-500' },
  'ISO/IEC 27001':  { text: 'text-teal-700', bg: 'bg-teal-50', dot: 'bg-teal-500' },
  'CIS Controls':   { text: 'text-orange-700', bg: 'bg-orange-50', dot: 'bg-orange-500' },
};

const FRAMEWORK_ORDER = ['NIST SP 800-53', 'ISO/IEC 27001', 'CIS Controls'];

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

  // Informative references from spreadsheet
  const rawRefs = informativeReferences[sub.id] ?? [];
  const grouped = groupRefs(rawRefs);
  const hasRefs = rawRefs.length > 0;

  // Legacy crosswalk from data layer (kept for complementary display)
  const hasNist = sub.mappings.nist80053.length > 0;
  const hasIso = sub.mappings.iso27002.length > 0;
  const hasCis = sub.mappings.cisControls.length > 0;
  const hasLegacyCrosswalk = hasNist || hasIso || hasCis;

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
        {/* Main content */}
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

          {/* Palavras-chave */}
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

          {/* ── CONTROLES E REFERÊNCIAS RELACIONADAS (from spreadsheet) ── */}
          {hasRefs && (
            <div className="bg-white rounded-xl border border-slate-200 p-5">
              <p className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-4">Controles e Referências Relacionadas</p>
              <div className="space-y-4">
                {FRAMEWORK_ORDER.filter(fw => grouped[fw]).map(fw => {
                  const colors = frameworkColors[fw];
                  const refs = grouped[fw];

                  // For SP 800-53: deduplicate by control ID (both Rev versions)
                  let displayRefs = refs;
                  if (fw === 'NIST SP 800-53') {
                    const seen = new Set<string>();
                    displayRefs = refs.filter(r => {
                      const id = stripPrefix(r, fw);
                      if (seen.has(id)) return false;
                      seen.add(id);
                      return true;
                    });
                  }

                  return (
                    <div key={fw}>
                      <div className="flex items-center gap-2 mb-2">
                        <span className={`w-2 h-2 rounded-full shrink-0 ${colors.dot}`} />
                        <span className="text-xs font-bold text-slate-700">{fw}</span>
                        <span className="text-xs text-slate-400 ml-auto">{displayRefs.length}</span>
                      </div>
                      <div className="flex flex-wrap gap-1.5">
                        {displayRefs.map((r, i) => (
                          <span
                            key={i}
                            className={`text-xs font-mono font-semibold px-2 py-0.5 rounded ${colors.bg} ${colors.text}`}
                          >
                            {stripPrefix(r, fw)}
                          </span>
                        ))}
                      </div>
                    </div>
                  );
                })}
                <p className="text-xs text-slate-400 italic pt-1 border-t border-slate-100">
                  Fonte: NIST CSF 2.0 Reference Tool. Referências informativas são orientativas e não representam equivalência entre frameworks.
                </p>
              </div>
            </div>
          )}

          {/* Legacy crosswalk (complementary) */}
          {hasLegacyCrosswalk && (
            <div className="bg-white rounded-xl border border-slate-200 p-5">
              <p className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-3">Mapeamentos Complementares</p>
              <div className="space-y-4">
                {hasNist && (
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <span className="w-2 h-2 rounded-full bg-blue-500" />
                      <span className="text-xs font-bold text-slate-700">NIST SP 800-53</span>
                    </div>
                    <div className="space-y-1.5">
                      {sub.mappings.nist80053.map(m => (
                        <div key={m.id} className="flex items-center gap-2 text-xs">
                          <span className="font-mono font-bold text-blue-700 bg-blue-50 px-2 py-0.5 rounded shrink-0">{m.id}</span>
                          <span className="text-slate-600 line-clamp-1">{m.name}</span>
                          <MappingTypeBadge type={m.type} />
                        </div>
                      ))}
                    </div>
                  </div>
                )}
                {hasIso && (
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <span className="w-2 h-2 rounded-full bg-teal-500" />
                      <span className="text-xs font-bold text-slate-700">ISO/IEC 27002</span>
                    </div>
                    <div className="space-y-1.5">
                      {sub.mappings.iso27002.map(m => (
                        <div key={m.id} className="flex items-center gap-2 text-xs">
                          <span className="font-mono font-bold text-teal-700 bg-teal-50 px-2 py-0.5 rounded shrink-0">{m.id}</span>
                          <span className="text-slate-600 line-clamp-1">{m.name}</span>
                          <MappingTypeBadge type={m.type} />
                        </div>
                      ))}
                    </div>
                  </div>
                )}
                {hasCis && (
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <span className="w-2 h-2 rounded-full bg-orange-500" />
                      <span className="text-xs font-bold text-slate-700">CIS Controls</span>
                    </div>
                    <div className="space-y-1.5">
                      {sub.mappings.cisControls.map(m => (
                        <div key={m.id} className="flex items-center gap-2 text-xs">
                          <span className="font-mono font-bold text-orange-700 bg-orange-50 px-2 py-0.5 rounded shrink-0">{m.id}</span>
                          <span className="text-slate-600 line-clamp-1">{m.name}</span>
                          <MappingTypeBadge type={m.type} />
                        </div>
                      ))}
                    </div>
                  </div>
                )}
                <p className="text-xs text-slate-400 italic pt-1 border-t border-slate-100">
                  Mapeamentos orientativos. Não indicam equivalência absoluta entre frameworks.
                </p>
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
