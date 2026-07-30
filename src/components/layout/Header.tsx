import React, { useState, useRef, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Search, Menu, X, ChevronDown } from 'lucide-react';
import { allSubcategories } from '../../data';
import { getFnColors } from '../../utils/fnColors';
import { csfFunctions } from '../../data/functions';
import { csfCategories } from '../../data/categories';

const frameworkItems = [
  { label: 'O que é o NIST CSF 2.0', desc: 'Introdução acessível ao framework', to: '/intro' },
  { label: 'Framework Map', desc: 'Visão visual de toda a estrutura', to: '/map' },
  { label: 'Funções e Categorias', desc: '6 Funções, 17 Categorias, 106 Subcategorias', to: '/framework' },
  { label: 'Tiers', desc: 'Governança e gestão por Função', to: '/tiers' },
  { label: 'Perfis Organizacionais', desc: 'Current Profile e Target Profile', to: '/profiles' },
];

const implementItems = [
  { label: 'Implementation Roadmap', desc: '10 fases orientativas de implementação', to: '/roadmap' },
  { label: 'Guia de Implementação', desc: 'Processo de 5 etapas com Perfis', to: '/implementation' },
  { label: 'Enterprise Risk Management', desc: '6 Activity Points, ERM + CSF', to: '/erm' },
  { label: 'C-SCRM', desc: 'Gestão de riscos da cadeia de suprimentos', to: '/cscrm' },
];

const assessItems = [
  { label: 'Assessment Journey', desc: 'Current Profile → Target → Gap → Ação', to: '/assessment' },
  { label: 'Assessment Navigator', desc: 'Perguntas e evidências por Subcategoria', to: '/consultant' },
];

const referenceItems = [
  { label: 'Frameworks Relacionados', desc: '22+ frameworks documentados', to: '/frameworks' },
  { label: 'Crosswalk Explorer', desc: 'CSF x NIST 800-53 x ISO 27002 x CIS', to: '/crosswalk' },
  { label: 'Glossário', desc: 'Termos e definições', to: '/glossary' },
];

const DropdownMenu: React.FC<{
  label: string;
  items: { label: string; desc: string; to: string }[];
}> = ({ label, items }) => {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

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
        className="flex items-center gap-1 px-3 py-2 text-sm font-medium text-slate-600 hover:text-slate-900 hover:bg-slate-50 rounded-md transition-colors"
      >
        {label}
        <ChevronDown size={14} className={`transition-transform ${open ? 'rotate-180' : ''}`} />
      </button>
      {open && (
        <div className="absolute top-full left-0 mt-1 w-64 bg-white rounded-xl shadow-xl border border-slate-200 py-2 z-50">
          {items.map(item => (
            <button
              key={item.to}
              onClick={() => { navigate(item.to); setOpen(false); }}
              className="w-full text-left px-4 py-2.5 hover:bg-slate-50 transition-colors"
            >
              <p className="text-sm font-semibold text-slate-800">{item.label}</p>
              <p className="text-xs text-slate-400 mt-0.5">{item.desc}</p>
            </button>
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
  const searchRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(e.target as Node)) {
        setSearchOpen(false);
        setQuery('');
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  const results = query.length > 1
    ? [
        ...csfFunctions.filter(f =>
          f.name.toLowerCase().includes(query.toLowerCase()) ||
          f.nameEn.toLowerCase().includes(query.toLowerCase())
        ).slice(0, 2).map(f => ({ type: 'function' as const, id: f.id, label: `${f.code}, ${f.name}`, path: `/framework/${f.id.toLowerCase()}`, fnId: f.id })),
        ...csfCategories.filter(c =>
          c.name.toLowerCase().includes(query.toLowerCase()) ||
          c.code.toLowerCase().includes(query.toLowerCase())
        ).slice(0, 3).map(c => ({ type: 'category' as const, id: c.id, label: `${c.code}, ${c.name}`, path: `/category/${c.id}`, fnId: c.functionId })),
        ...allSubcategories.filter(s =>
          s.name.toLowerCase().includes(query.toLowerCase()) ||
          s.code.toLowerCase().includes(query.toLowerCase()) ||
          s.keywords.some(k => k.toLowerCase().includes(query.toLowerCase()))
        ).slice(0, 5).map(s => ({ type: 'subcategory' as const, id: s.id, label: `${s.code}, ${s.name}`, path: `/subcategory/${s.id}`, fnId: s.functionId })),
      ]
    : [];

  const mobileGroups = [
    { key: 'framework',  label: 'Framework',     items: frameworkItems },
    { key: 'implement',  label: 'Implementação',  items: implementItems },
    { key: 'assess',     label: 'Assessment',     items: assessItems },
    { key: 'reference',  label: 'Referências',    items: referenceItems },
  ];

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-slate-200 shadow-sm">
      <div className="max-w-screen-xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-16">

          {/* Logo */}
          <Link to="/" className="flex items-center gap-2.5 shrink-0">
            <img src="./assets/csf-wheel.png" alt="NIST CSF 2.0" className="w-8 h-8 object-contain" />
            <div className="hidden sm:block">
              <span className="font-bold text-sm" style={{ color: '#0B1F33' }}>NIST CSF 2.0</span>
              <span className="text-xs text-slate-400 block -mt-0.5 font-medium">Navigator</span>
            </div>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden lg:flex items-center gap-0.5">
            <DropdownMenu label="Framework"    items={frameworkItems} />
            <DropdownMenu label="Implementação" items={implementItems} />
            <DropdownMenu label="Assessment"   items={assessItems} />
            <DropdownMenu label="Referências"  items={referenceItems} />
            <Link to="/about" className="px-3 py-2 text-sm font-medium text-slate-600 hover:text-slate-900 hover:bg-slate-50 rounded-md transition-colors">Sobre</Link>
          </nav>

          {/* Search + hamburger */}
          <div className="flex items-center gap-2">
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
                            <span className="text-xs font-mono font-bold px-1.5 py-0.5 rounded shrink-0" style={{ backgroundColor: getFnColors(r.fnId).bg, color: getFnColors(r.fnId).text }}>
                              {r.fnId}
                            </span>
                            <span className="text-slate-700 truncate">{r.label}</span>
                            <span className={`text-xs shrink-0 ml-auto px-1.5 py-0.5 rounded ${
                              r.type === 'function' ? 'bg-purple-100 text-purple-700' :
                              r.type === 'category' ? 'bg-blue-100 text-blue-700' :
                              'bg-slate-100 text-slate-600'
                            }`}>
                              {r.type === 'function' ? 'Função' : r.type === 'category' ? 'Categoria' : 'Subcategoria'}
                            </span>
                          </button>
                        </li>
                      ))}
                    </ul>
                  )}
                  {query.length > 1 && results.length === 0 && (
                    <p className="text-xs text-slate-400 text-center py-4">Nenhum resultado encontrado.</p>
                  )}
                </div>
              )}
            </div>

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
          {mobileGroups.map(group => (
            <div key={group.key}>
              <button
                onClick={() => setMobileSection(mobileSection === group.key ? null : group.key)}
                className="w-full flex items-center justify-between px-3 py-2 text-sm font-bold text-slate-800 hover:bg-slate-50 rounded-lg"
              >
                <span>{group.label}</span>
                <ChevronDown size={14} className={`transition-transform ${mobileSection === group.key ? 'rotate-180' : ''}`} />
              </button>
              {mobileSection === group.key && (
                <div className="pl-3 space-y-1 mt-1">
                  {group.items.map(item => (
                    <Link
                      key={item.to}
                      to={item.to}
                      onClick={() => setMobileMenuOpen(false)}
                      className="block px-3 py-2 text-sm text-slate-700 hover:bg-slate-50 rounded-lg"
                    >
                      {item.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          ))}
          <div className="pt-1 border-t border-slate-100">
            <Link to="/about" onClick={() => setMobileMenuOpen(false)} className="block px-3 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50 rounded-lg">Sobre</Link>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
