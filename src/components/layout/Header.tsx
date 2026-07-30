import React, { useState, useRef, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Search, Menu, X, ChevronDown, Map, BookOpen, GitBranch, ClipboardList, ArrowRight } from 'lucide-react';
import { allSubcategories } from '../../data';
import { csfFunctions } from '../../data/functions';
import { csfCategories } from '../../data/categories';

const fnColors: Record<string, string> = {
  GV: '#0B1F33', ID: '#164E73', PR: '#0F766E', DE: '#D97706', RS: '#DC2626', RC: '#16A34A',
};

const exploreItems = [
  { label: 'Framework Map', desc: 'Visão visual completa do CSF 2.0', to: '/map', icon: <Map size={16} /> },
  { label: 'Explorar Framework', desc: 'Functions, Categories, Subcategories', to: '/framework', icon: <BookOpen size={16} /> },
  { label: 'Crosswalk', desc: 'NIST 800-53, ISO 27002, CIS Controls', to: '/crosswalk', icon: <GitBranch size={16} /> },
  { label: 'Frameworks Relacionados', desc: '22+ frameworks documentados', to: '/frameworks', icon: <ArrowRight size={16} /> },
];

const implementItems = [
  { label: 'Guia de Implementação', desc: 'Processo de 5 etapas — Profiles', to: '/implementation', icon: <ClipboardList size={16} /> },
  { label: 'Organizational Profiles', desc: 'Current, Target e Gap Analysis', to: '/profiles', icon: <ArrowRight size={16} /> },
  { label: 'CSF Tiers', desc: 'Governance e Management por Function', to: '/tiers', icon: <ArrowRight size={16} /> },
  { label: 'Enterprise Risk Management', desc: '6 Activity Points — ERM + CSF', to: '/erm', icon: <ArrowRight size={16} /> },
  { label: 'C-SCRM', desc: 'Gestão de riscos da cadeia de suprimentos', to: '/cscrm', icon: <ArrowRight size={16} /> },
  { label: 'Consultant View', desc: 'Roteiro de assessment por subcategory', to: '/consultant', icon: <ArrowRight size={16} /> },
];

const DropdownMenu: React.FC<{
  label: string;
  items: typeof exploreItems;
  accentColor?: string;
}> = ({ label, items, accentColor = '#0B1F33' }) => {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-1.5 px-3 py-2 text-sm font-medium text-slate-600 hover:text-slate-900 hover:bg-slate-50 rounded-md transition-colors"
      >
        {label}
        <ChevronDown size={14} className={`transition-transform ${open ? 'rotate-180' : ''}`} />
      </button>
      {open && (
        <div className="absolute left-0 top-full mt-2 w-72 bg-white rounded-xl shadow-xl border border-slate-200 py-2 z-50 animate-fadeIn">
          <div className="px-3 py-1.5 mb-1">
            <p className="text-xs font-bold uppercase tracking-widest" style={{ color: accentColor }}>{label}</p>
          </div>
          {items.map(item => (
            <Link
              key={item.to}
              to={item.to}
              onClick={() => setOpen(false)}
              className="flex items-start gap-3 px-4 py-3 hover:bg-slate-50 transition-colors group"
            >
              <div className="w-7 h-7 rounded-lg flex items-center justify-center shrink-0 mt-0.5" style={{ backgroundColor: `${accentColor}15`, color: accentColor }}>
                {item.icon}
              </div>
              <div>
                <p className="text-sm font-semibold text-slate-800 group-hover:text-slate-900">{item.label}</p>
                <p className="text-xs text-slate-400 mt-0.5">{item.desc}</p>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

const Header: React.FC = () => {
  const [searchOpen, setSearchOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mobileSection, setMobileSection] = useState<string | null>(null);
  const navigate = useNavigate();
  const location = useLocation();
  const searchRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(e.target as Node)) setSearchOpen(false);
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  // Close on navigate
  useEffect(() => { setMobileMenuOpen(false); setSearchOpen(false); }, [location.pathname]);

  const results = query.length > 1
    ? [
        ...csfFunctions.filter(f =>
          f.name.toLowerCase().includes(query.toLowerCase()) ||
          f.nameEn.toLowerCase().includes(query.toLowerCase())
        ).slice(0, 2).map(f => ({ type: 'function' as const, id: f.id, label: `${f.code} — ${f.name}`, path: `/framework/${f.id.toLowerCase()}`, fnId: f.id })),
        ...csfCategories.filter(c =>
          c.name.toLowerCase().includes(query.toLowerCase()) ||
          c.code.toLowerCase().includes(query.toLowerCase())
        ).slice(0, 3).map(c => ({ type: 'category' as const, id: c.id, label: `${c.code} — ${c.name}`, path: `/category/${c.id}`, fnId: c.functionId })),
        ...allSubcategories.filter(s =>
          s.name.toLowerCase().includes(query.toLowerCase()) ||
          s.code.toLowerCase().includes(query.toLowerCase()) ||
          s.keywords.some(k => k.toLowerCase().includes(query.toLowerCase()))
        ).slice(0, 5).map(s => ({ type: 'subcategory' as const, id: s.id, label: `${s.code} — ${s.name}`, path: `/subcategory/${s.id}`, fnId: s.functionId })),
      ]
    : [];

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-slate-200 shadow-sm">
      <div className="max-w-screen-xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2.5 shrink-0">
            <img
              src="./assets/csf-wheel.png"
              alt="NIST CSF 2.0"
              className="w-8 h-8 object-contain"
            />
            <div className="hidden sm:block">
              <span className="font-bold text-sm" style={{ color: '#0B1F33' }}>NIST CSF 2.0</span>
              <span className="text-xs text-slate-400 block -mt-0.5 font-medium">Navigator</span>
            </div>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden lg:flex items-center gap-1">
            <DropdownMenu label="Explorar" items={exploreItems} accentColor="#164E73" />
            <DropdownMenu label="Implementar" items={implementItems} accentColor="#0F766E" />
            <Link to="/glossary" className="px-3 py-2 text-sm font-medium text-slate-600 hover:text-slate-900 hover:bg-slate-50 rounded-md transition-colors">Glossário</Link>
            <Link to="/about" className="px-3 py-2 text-sm font-medium text-slate-600 hover:text-slate-900 hover:bg-slate-50 rounded-md transition-colors">Sobre</Link>
          </nav>

          {/* Search + hamburger */}
          <div className="flex items-center gap-2">
            {/* Search */}
            <div className="relative" ref={searchRef}>
              <button
                onClick={() => setSearchOpen(!searchOpen)}
                className="p-2 text-slate-500 hover:text-slate-900 hover:bg-slate-100 rounded-lg transition-colors"
                aria-label="Pesquisar"
              >
                <Search size={18} />
              </button>
              {searchOpen && (
                <div className="absolute right-0 top-full mt-2 w-80 sm:w-96 bg-white rounded-xl shadow-xl border border-slate-200 p-3 z-50">
                  <input
                    autoFocus
                    type="text"
                    placeholder="Pesquisar código, nome, palavra-chave..."
                    value={query}
                    onChange={e => setQuery(e.target.value)}
                    className="w-full px-3 py-2 text-sm border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  {results.length > 0 && (
                    <ul className="mt-2 space-y-0.5 max-h-72 overflow-y-auto">
                      {results.map(r => (
                        <li key={r.id}>
                          <button
                            onClick={() => { navigate(r.path); setSearchOpen(false); setQuery(''); }}
                            className="w-full text-left px-3 py-2.5 text-sm rounded-lg hover:bg-slate-50 flex items-center gap-3"
                          >
                            <span
                              className="text-xs font-mono font-bold px-1.5 py-0.5 rounded text-white shrink-0"
                              style={{ backgroundColor: fnColors[r.fnId] || '#64748B' }}
                            >
                              {r.fnId}
                            </span>
                            <span className="text-slate-700 truncate">{r.label}</span>
                            <span className={`text-xs shrink-0 ml-auto px-1.5 py-0.5 rounded ${
                              r.type === 'function' ? 'bg-slate-100 text-slate-500'
                              : r.type === 'category' ? 'bg-teal-50 text-teal-600'
                              : 'bg-slate-50 text-slate-400'
                            }`}>
                              {r.type === 'function' ? 'FN' : r.type === 'category' ? 'CAT' : 'SUB'}
                            </span>
                          </button>
                        </li>
                      ))}
                    </ul>
                  )}
                  {query.length > 1 && results.length === 0 && (
                    <p className="text-sm text-slate-500 mt-2 px-3 py-1">Nenhum resultado encontrado.</p>
                  )}
                </div>
              )}
            </div>

            {/* Mobile hamburger */}
            <button
              className="lg:hidden p-2 text-slate-500 hover:text-slate-900 hover:bg-slate-100 rounded-lg"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Menu"
            >
              {mobileMenuOpen ? <X size={18} /> : <Menu size={18} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-slate-100 bg-white px-4 py-4 space-y-2 max-h-[80vh] overflow-y-auto">
          {/* Explorar section */}
          <button
            onClick={() => setMobileSection(mobileSection === 'explore' ? null : 'explore')}
            className="w-full flex items-center justify-between px-3 py-2 text-sm font-bold text-slate-800 hover:bg-slate-50 rounded-lg"
          >
            <span style={{ color: '#164E73' }}>EXPLORAR</span>
            <ChevronDown size={14} className={`transition-transform ${mobileSection === 'explore' ? 'rotate-180' : ''}`} />
          </button>
          {mobileSection === 'explore' && (
            <div className="pl-3 space-y-1">
              {exploreItems.map(item => (
                <Link key={item.to} to={item.to} className="flex items-center gap-2 px-3 py-2 text-sm text-slate-700 hover:bg-slate-50 rounded-lg">
                  <span className="text-slate-400">{item.icon}</span>
                  {item.label}
                </Link>
              ))}
            </div>
          )}

          {/* Implementar section */}
          <button
            onClick={() => setMobileSection(mobileSection === 'implement' ? null : 'implement')}
            className="w-full flex items-center justify-between px-3 py-2 text-sm font-bold text-slate-800 hover:bg-slate-50 rounded-lg"
          >
            <span style={{ color: '#0F766E' }}>IMPLEMENTAR</span>
            <ChevronDown size={14} className={`transition-transform ${mobileSection === 'implement' ? 'rotate-180' : ''}`} />
          </button>
          {mobileSection === 'implement' && (
            <div className="pl-3 space-y-1">
              {implementItems.map(item => (
                <Link key={item.to} to={item.to} className="flex items-center gap-2 px-3 py-2 text-sm text-slate-700 hover:bg-slate-50 rounded-lg">
                  <span className="text-slate-400">{item.icon}</span>
                  {item.label}
                </Link>
              ))}
            </div>
          )}

          <div className="pt-1 border-t border-slate-100 space-y-1">
            <Link to="/glossary" className="block px-3 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50 rounded-lg">Glossário</Link>
            <Link to="/about" className="block px-3 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50 rounded-lg">Sobre</Link>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
