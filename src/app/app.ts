import { Component, ViewChild } from '@angular/core';

import { ExpenseForm } from './components/expense-form/expense-form';
import { ExpenseList } from './components/expense-list/expense-list';

import { Expense } from './models/expense.model';
import { Chatbot } from './components/chatbot/chatbot';

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