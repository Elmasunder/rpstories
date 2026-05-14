export type CharacterStatus = 'alive' | 'dead' | 'disparu';

export interface MetaItem {
  key: string;
  value: string;
}

export interface CharacterCover {
  status: CharacterStatus;
  serverDomain: string;
  eyebrow: string;
  firstName: string;
  lastName: string;
  alias: string;
  subtitle: string;
  destination: string;
  meta: MetaItem[];
  ref: string;
  photos: string[];
  discordUrl?: string; // Optionnel : Lien vers le Discord du serveur
}

export interface IdentityPanelItem {
  key: string;
  value: string;
  class?: string; // CSS optionnel (ex: 'text-accent')
}

export interface Profile {
  qualités: string[];
  défauts: string[];
}

export interface SpecialInfo {
  icon: string;
  title: string;
  text: string;
}

export interface Chapter1 {
  label: string;
  titleLines: string[];
  identityPanels: IdentityPanelItem[][];
  profile: Profile;
  infoPlus?: SpecialInfo; // Optionnel
}

export interface PhotoData {
  url: string;
  alt: string;
  caption: string;
}

export interface StoryChapter {
  label: string;
  titleLines: string[];
  photo?: PhotoData;
  story1?: string[];
  story2?: string[];
  quote?: string;
  callout?: string; // Optionnel
}

export interface SkillItem {
  name: string;
  percent: number;
}

export interface SkillsGroup {
  title: string;
  skills: SkillItem[];
}

export interface Chapter4 {
  label: string;
  titleLines: string[];
  photo?: PhotoData;
  story1: string[];
  story2?: string[];
  skillsGroups: SkillsGroup[];
  callout: string;
}

export interface Objectives {
  shortTerm: string[];
  mediumTerm: string[];
  longTerm: string[];
}

export interface Chapter6 {
  label: string;
  titleLines: string[];
  objectives: Objectives;
  finaleStory: string[];
  finaleQuote: string;
}

export interface CharacterLocation {
  x: number;
  y: number;
  area: string;
}

export interface FamilyMember {
  id?: string; // ID pour faire un lien vers une autre fiche si elle existe
  name: string;
  relation: string;
  status: 'alive' | 'dead' | 'missing' | 'disparu' | 'unknown';
}

export interface Character {
  id: string;
  pageTitle: string;
  location?: CharacterLocation; // Si tu réactives la carte un jour
  cover: CharacterCover;
  chapter1: Chapter1;
  chapter2: StoryChapter;
  chapter3: StoryChapter;
  chapter4?: Chapter4;
  chapter5?: StoryChapter;
  chapter6: Chapter6; // Les objectifs et conclusion
  family?: FamilyMember[]; // Optionnel : Arbre généalogique / Proches
  footer: string;
}
