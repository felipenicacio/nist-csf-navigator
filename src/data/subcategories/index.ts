import type { CSFSubcategory } from '../../types';
import { governSubcategories } from './govern';
import { identifySubcategories } from './identify';
import { protectSubcategories } from './protect';
import { detectSubcategories, respondSubcategories, recoverSubcategories } from './detect-respond-recover';

export const allSubcategories: CSFSubcategory[] = [
  ...governSubcategories,
  ...identifySubcategories,
  ...protectSubcategories,
  ...detectSubcategories,
  ...respondSubcategories,
  ...recoverSubcategories,
];

export const getSubcategoryById = (id: string): CSFSubcategory | undefined =>
  allSubcategories.find(s => s.id === id);

export const getSubcategoriesByCategory = (categoryId: string): CSFSubcategory[] =>
  allSubcategories.filter(s => s.categoryId === categoryId);

export const getSubcategoriesByFunction = (functionId: string): CSFSubcategory[] =>
  allSubcategories.filter(s => s.functionId === functionId);

export {
  governSubcategories,
  identifySubcategories,
  protectSubcategories,
  detectSubcategories,
  respondSubcategories,
  recoverSubcategories,
};
