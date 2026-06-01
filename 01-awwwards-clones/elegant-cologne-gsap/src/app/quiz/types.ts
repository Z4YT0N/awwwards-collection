export type FragranceType = 'Terra' | 'Ignis' | 'Aqua';

export type AnswerOption = {
  text: string;
  value: FragranceType;
};

export type Vote = {
  Terra: number;
  Ignis: number;
  Aqua: number;
};

export type Votes = Vote[];

export type Winner = {
  fragranceType: FragranceType;
  title: string;
  uid?: string;
};
