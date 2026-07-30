export type FunctionId = 'GV' | 'ID' | 'PR' | 'DE' | 'RS' | 'RC';
export type OrganizationalLayer = 'strategic' | 'tactical' | 'operational';
export type MappingType = 'direct' | 'partial' | 'related' | 'complementary';

export interface CSFFunction {
  id: FunctionId;
  code: string;
  name: string;
  nameEn: string;
  description: string;
  objective: string;
  layers: OrganizationalLayer[];
  color: string;       // darker shade, for text on light bg
  colorLight: string;  // light tint, for backgrounds
  colorHex: string;    // official wheel color, for bold fills
  icon: string;
  categoryIds: string[];
}

export interface CSFCategory {
  id: string;
  functionId: FunctionId;
  code: string;
  name: string;
  nameEn: string;
  description: string;
  objective: string;
  layers: OrganizationalLayer[];
  implementationGuidance: string[];
  guidingQuestions: string[];
  evidenceExamples: string[];
  relatedFrameworks: RelatedFramework[];
  subcategoryIds: string[];
}

export interface CSFSubcategory {
  id: string;
  functionId: FunctionId;
  categoryId: string;
  code: string;
  name: string;
  description: string;
  whatItMeans: string;
  howToImplement: string[];
  guidingQuestions: string[];
  practiceExamples: string[];
  evidenceExamples: string[];
  layers: OrganizationalLayer[];
  mappings: {
    nist80053: ControlMapping[];
    iso27002: ControlMapping[];
    cisControls: ControlMapping[];
  };
  relatedFrameworks: RelatedFramework[];
  keywords: string[];
}

export interface ControlMapping {
  id: string;
  name: string;
  type: MappingType;
  note?: string;
}

export interface RelatedFramework {
  id: string;
  name: string;
  relevance: string;
  type: MappingType;
}

export interface Framework {
  id: string;
  name: string;
  fullName: string;
  organization: string;
  description: string;
  objective: string;
  applicability: string;
  relationToCSF: string;
  relatedFunctions: FunctionId[];
  website?: string;
  category: 'nist' | 'iso' | 'cis' | 'risk' | 'continuity' | 'threat';
}

export interface GlossaryTerm {
  term: string;
  termEn: string;
  definition: string;
}

export interface SearchResult {
  type: 'function' | 'category' | 'subcategory' | 'framework';
  id: string;
  title: string;
  subtitle: string;
  description: string;
  functionId?: FunctionId;
  categoryId?: string;
}
