import React from 'react';
import type { OrganizationalLayer } from '../../types';

interface BadgeProps {
  children: React.ReactNode;
  color?: string;
  bg?: string;
  className?: string;
}

export const Badge: React.FC<BadgeProps> = ({ children, color = '#64748B', bg = '#F1F5F9', className = '' }) => (
  <span
    className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium ${className}`}
    style={{ color, backgroundColor: bg }}
  >
    {children}
  </span>
);

interface LayerBadgeProps {
  layer: OrganizationalLayer;
}

export const LayerBadge: React.FC<LayerBadgeProps> = ({ layer }) => {
  const map = {
    strategic: { label: 'Estratégica', color: '#1E40AF', bg: '#DBEAFE' },
    tactical: { label: 'Tática', color: '#065F46', bg: '#D1FAE5' },
    operational: { label: 'Operacional', color: '#92400E', bg: '#FEF3C7' },
  };
  const { label, color, bg } = map[layer];
  return <Badge color={color} bg={bg}>{label}</Badge>;
};

interface MappingTypeBadgeProps {
  type: string;
}
export const MappingTypeBadge: React.FC<MappingTypeBadgeProps> = ({ type }) => {
  const map: Record<string, { label: string; color: string; bg: string }> = {
    direct: { label: 'Direto', color: '#166534', bg: '#DCFCE7' },
    partial: { label: 'Parcial', color: '#854D0E', bg: '#FEF9C3' },
    related: { label: 'Relacionado', color: '#1E40AF', bg: '#DBEAFE' },
    complementary: { label: 'Complementar', color: '#6B21A8', bg: '#F3E8FF' },
  };
  const m = map[type] || map.related;
  return <Badge color={m.color} bg={m.bg}>{m.label}</Badge>;
};

interface SectionProps {
  title: string;
  children: React.ReactNode;
  className?: string;
}
export const Section: React.FC<SectionProps> = ({ title, children, className = '' }) => (
  <section className={`mb-8 ${className}`}>
    <h2 className="text-lg font-semibold text-slate-800 mb-4 pb-2 border-b border-slate-100">{title}</h2>
    {children}
  </section>
);

interface InfoCardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  color?: string;
}
export const InfoCard: React.FC<InfoCardProps> = ({ title, value, subtitle, color = '#0B1F33' }) => (
  <div className="bg-white rounded-xl border border-slate-200 p-5">
    <p className="text-xs font-medium text-slate-500 uppercase tracking-wider mb-1">{title}</p>
    <p className="text-3xl font-bold" style={{ color }}>{value}</p>
    {subtitle && <p className="text-sm text-slate-500 mt-1">{subtitle}</p>}
  </div>
);
