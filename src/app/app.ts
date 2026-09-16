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

  constructor(
    private expenseService: ExpenseService
  ) {}

  onSave(expense: Omit<Expense, 'id'>): void {
    this.expenseService.addExpense(expense);
  }

  editExpense(expense: Expense): void {
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