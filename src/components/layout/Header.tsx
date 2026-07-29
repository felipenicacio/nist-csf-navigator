import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Shield, Search, Menu, X } from 'lucide-react';
import { allSubcategories } from '../../data';
import { csfFunctions } from '../../data/functions';
import { csfCategories } from '../../data/categories';

const Header: React.FC = () => {
  const [searchOpen, setSearchOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navigate = useNavigate();

  const results = query.length > 1
    ? [
        ...csfFunctions.filter(f =>
          f.name.toLowerCase().includes(query.toLowerCase()) ||
          f.nameEn.toLowerCase().includes(query.toLowerCase())
        ).slice(0, 2).map(f => ({ type: 'function' as const, id: f.id, label: `${f.code} — ${f.name}`, path: `/framework/${f.id.toLowerCase()}` })),
        ...csfCategories.filter(c =>
          c.name.toLowerCase().includes(query.toLowerCase()) ||
          c.code.toLowerCase().includes(query.toLowerCase())
        ).slice(0, 3).map(c => ({ type: 'category' as const, id: c.id, label: `${c.code} — ${c.name}`, path: `/category/${c.id}` })),
        ...allSubcategories.filter(s =>
          s.name.toLowerCase().includes(query.toLowerCase()) ||
          s.code.toLowerCase().includes(query.toLowerCase()) ||
          s.keywords.some(k => k.toLowerCase().includes(query.toLowerCase()))
        ).slice(0, 5).map(s => ({ type: 'subcategory' as const, id: s.id, label: `${s.code} — ${s.name}`, path: `/subcategory/${s.id}` })),
      ]
    : [];

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-slate-200 shadow-sm">
      <div className="max-w-screen-xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 shrink-0">
            <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ backgroundColor: '#0B1F33' }}>
              <Shield size={16} color="white" />
            </div>
            <div className="hidden sm:block">
              <span className="font-bold text-sm" style={{ color: '#0B1F33' }}>NIST CSF 2.0</span>
              <span className="text-xs text-slate-500 block -mt-0.5">Navigator</span>
            </div>
          </Link>

          {/* Nav */}
          <nav className="hidden lg:flex items-center gap-1">
            {[
              { label: 'Framework', to: '/framework' },
              { label: 'Como Implementar', to: '/implementation' },
              { label: 'Tiers', to: '/tiers' },
              { label: 'Profiles', to: '/profiles' },
              { label: 'Crosswalk', to: '/crosswalk' },
              { label: 'Frameworks', to: '/frameworks' },
              { label: 'Glossário', to: '/glossary' },
            ].map(item => (
              <Link
                key={item.to}
                to={item.to}
                className="px-3 py-2 text-sm font-medium text-slate-600 hover:text-slate-900 hover:bg-slate-50 rounded-md transition-colors"
              >
                {item.label}
              </Link>
            ))}
          </nav>

          {/* Search + Mobile */}
          <div className="flex items-center gap-2">
            <div className="relative">
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
                    placeholder="Pesquisar função, categoria, subcategoria..."
                    value={query}
                    onChange={e => setQuery(e.target.value)}
                    className="w-full px-3 py-2 text-sm border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  {results.length > 0 && (
                    <ul className="mt-2 space-y-1 max-h-64 overflow-y-auto">
                      {results.map(r => (
                        <li key={r.id}>
                          <button
                            onClick={() => { navigate(r.path); setSearchOpen(false); setQuery(''); }}
                            className="w-full text-left px-3 py-2 text-sm rounded-lg hover:bg-slate-50 flex items-center gap-2"
                          >
                            <span className={`text-xs font-mono px-1.5 py-0.5 rounded font-medium ${
                              r.type === 'function' ? 'bg-blue-100 text-blue-700'
                              : r.type === 'category' ? 'bg-teal-100 text-teal-700'
                              : 'bg-slate-100 text-slate-600'
                            }`}>
                              {r.type === 'function' ? 'FN' : r.type === 'category' ? 'CAT' : 'SUB'}
                            </span>
                            <span className="text-slate-700">{r.label}</span>
                          </button>
                        </li>
                      ))}
                    </ul>
                  )}
                  {query.length > 1 && results.length === 0 && (
                    <p className="text-sm text-slate-500 mt-2 px-3">Nenhum resultado encontrado.</p>
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
        <div className="lg:hidden border-t border-slate-100 bg-white px-4 py-3 space-y-1">
          {[
            { label: 'Framework', to: '/framework' },
            { label: 'Como Implementar', to: '/implementation' },
            { label: 'Tiers', to: '/tiers' },
            { label: 'Profiles', to: '/profiles' },
            { label: 'Crosswalk', to: '/crosswalk' },
            { label: 'Frameworks', to: '/frameworks' },
            { label: 'Glossário', to: '/glossary' },
            { label: 'Sobre', to: '/about' },
          ].map(item => (
            <Link
              key={item.to}
              to={item.to}
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50 rounded-lg"
            >
              {item.label}
            </Link>
          ))}
        </div>
      )}
    </header>
  );
};

export default Header;
