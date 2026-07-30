import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import { Header } from './components/layout';
import HomePage from './pages/HomePage';
import IntroPage from './pages/IntroPage';
import FrameworkPage from './pages/FrameworkPage';
import FrameworkMapPage from './pages/FrameworkMapPage';
import FunctionPage from './pages/FunctionPage';
import CategoryPage from './pages/CategoryPage';
import SubcategoryPage from './pages/SubcategoryPage';
import ImplementationPage from './pages/ImplementationPage';
import ConsultantViewPage from './pages/ConsultantViewPage';
import ERMPage from './pages/ERMPage';
import CSCRMPage from './pages/CSCRMPage';
import { TiersPage, ProfilesPage, CrosswalkPage, FrameworksPage, GlossaryPage, AboutPage } from './pages/OtherPages';

function App() {
  return (
    <Router>
      <div className="min-h-screen flex flex-col" style={{ backgroundColor: '#F8FAFC' }}>
        <Header />
        <main className="flex-1">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/intro" element={<IntroPage />} />
            <Route path="/map" element={<FrameworkMapPage />} />
            <Route path="/framework" element={<FrameworkPage />} />
            <Route path="/framework/:id" element={<FunctionPage />} />
            <Route path="/category/:id" element={<CategoryPage />} />
            <Route path="/subcategory/:id" element={<SubcategoryPage />} />
            <Route path="/implementation" element={<ImplementationPage />} />
            <Route path="/consultant" element={<ConsultantViewPage />} />
            <Route path="/erm" element={<ERMPage />} />
            <Route path="/cscrm" element={<CSCRMPage />} />
            <Route path="/tiers" element={<TiersPage />} />
            <Route path="/profiles" element={<ProfilesPage />} />
            <Route path="/crosswalk" element={<CrosswalkPage />} />
            <Route path="/frameworks" element={<FrameworksPage />} />
            <Route path="/glossary" element={<GlossaryPage />} />
            <Route path="/about" element={<AboutPage />} />
          </Routes>
        </main>
        <footer className="py-6 px-4 border-t border-slate-200 bg-white">
          <p className="text-xs text-center text-slate-400">
            NIST CSF 2.0 Navigator · Ferramenta educacional open source ·{' '}
            <a href="https://github.com/felipenicacio/nist-csf-navigator" className="text-blue-500 hover:underline" target="_blank" rel="noopener noreferrer">GitHub</a>
          </p>
        </footer>
      </div>
    </Router>
  );
}

export default App;
