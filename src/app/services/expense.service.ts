import { Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Expense } from '../models/expense.model';

@Injectable({
  providedIn: 'root'
})
export class ExpenseService {

  private readonly apiUrl = 'http://localhost:3000/expenses';

  private readonly expensesSignal = signal<Expense[]>([]);

  readonly expenses = this.expensesSignal.asReadonly();

  constructor(private http: HttpClient) {}

  // READ
  loadExpenses(): void {
    this.http.get<Expense[]>(this.apiUrl).subscribe({
      next: (expenses) => {
        console.log('Expenses loaded:', expenses);
        this.expensesSignal.set(expenses);
      },

      error: (error) => {
        console.error('Failed to load expenses:', error);
      }
    });
  }

  // CREATE
  addExpense(expense: Omit<Expense, 'id'>): void {
    this.http.post<Expense>(this.apiUrl, expense).subscribe({
      next: (createdExpense) => {
        console.log('Expense created:', createdExpense);

        this.loadExpenses();
      },

      error: (error) => {
        console.error('Failed to add expense:', error);
      }
    });
  }

  // UPDATE
  updateExpense(
    id: string,
    expense: Omit<Expense, 'id'>
  ): void {

    this.http.put<Expense>(
      `${this.apiUrl}/${id}`,
      expense
    ).subscribe({
      next: (updatedExpense) => {
        console.log('Expense updated:', updatedExpense);

        this.loadExpenses();
      },

      error: (error) => {
        console.error('Failed to update expense:', error);
      }
    });
  }

  // DELETE
  deleteExpense(id: string): void {

    this.http.delete<void>(
      `${this.apiUrl}/${id}`
    ).subscribe({
      next: () => {
        console.log('Expense deleted:', id);

        this.loadExpenses();
      },

      error: (error) => {
        console.error('Failed to delete expense:', error);
      }
    });
  }
}