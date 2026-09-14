export type ExpenseCategory =
  | 'Food'
  | 'Transport'
  | 'Shopping'
  | 'Bills'
  | 'Entertainment'
  | 'Other';

export interface Expense {
  id: string;
  amount: number;
  category: ExpenseCategory;
  date: string;
  note?: string;
}