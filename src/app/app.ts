import { Component, ViewChild } from '@angular/core';

import { ExpenseForm } from './components/expense-form/expense-form';
import { ExpenseList } from './components/expense-list/expense-list';
import { Chatbot } from './components/chatbot/chatbot';

import { Expense } from './models/expense.model';
import { ExpenseService } from './services/expense.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    ExpenseForm,
    ExpenseList,
    Chatbot
  ],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {

  @ViewChild(ExpenseForm)
  expenseForm?: ExpenseForm;

  @ViewChild(Chatbot)
  chatbot?: Chatbot;

  isDarkMode = false;
  private editingExpenseId?: string;

  constructor(
    private expenseService: ExpenseService
  ) {}

  onSave(expense: Omit<Expense, 'id'>): void {
    if (this.editingExpenseId) {
      this.expenseService.updateExpense(this.editingExpenseId, expense);
      this.editingExpenseId = undefined;
      return;
    }

    this.expenseService.addExpense(expense);
  }

  editExpense(expense: Expense): void {
    this.editingExpenseId = expense.id;
    this.expenseForm?.editExpense(expense);
  }

  toggleTheme(): void {
    this.isDarkMode = !this.isDarkMode;

    if (this.isDarkMode) {
      document.body.classList.add('dark-mode');
    } else {
      document.body.classList.remove('dark-mode');
    }
  }
}