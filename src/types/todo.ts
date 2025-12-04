export type DayOfWeek = 'Segunda' | 'Terça' | 'Quarta' | 'Quinta' | 'Sexta' | 'Sábado' | 'Domingo';

export type FilterType = 'all' | 'pending' | 'completed';

export interface Todo {
  id: string;
  text: string;
  completed: boolean;
  day: DayOfWeek;
}

export const DAYS_OF_WEEK: DayOfWeek[] = [
  'Segunda',
  'Terça',
  'Quarta',
  'Quinta',
  'Sexta',
  'Sábado',
  'Domingo'
];

export const getDayOfWeekFromDate = (date: Date): DayOfWeek => {
  const dayIndex = date.getDay();
  const mapping = [
    'Domingo',
    'Segunda',
    'Terça',
    'Quarta',
    'Quinta',
    'Sexta',
    'Sábado'
  ];
  return mapping[dayIndex] as DayOfWeek;
};
