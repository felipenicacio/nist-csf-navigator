import React from 'react';
import { Link } from 'react-router-dom';
import { BookOpen } from 'lucide-react';

interface PageIntroProps {
  title: string;
  plain: string;       // plain-language one-liner
  detail?: string;     // optional second sentence
  learnMore?: { label: string; to: string };
}

const PageIntro: React.FC<PageIntroProps> = ({ title, plain, detail, learnMore }) => (
  <div className="bg-blue-50 border border-blue-100 rounded-xl px-5 py-4 mb-8 flex gap-3">
    <BookOpen size={16} className="text-blue-400 shrink-0 mt-0.5" />
    <div>
      <p className="text-sm font-semibold text-blue-800 mb-0.5">{title}</p>
      <p className="text-sm text-blue-700 leading-relaxed">
        {plain}
        {detail && <span className="text-blue-600"> {detail}</span>}
        {learnMore && (
          <Link to={learnMore.to} className="ml-2 text-xs font-semibold underline text-blue-500 hover:text-blue-700">
            {learnMore.label} →
          </Link>
        )}
      </p>
    </div>
  </div>
);

export default PageIntro;
