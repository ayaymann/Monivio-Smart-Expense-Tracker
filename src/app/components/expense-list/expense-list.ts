import {
  Component,
  computed,
  inject,
  output,
  signal
} from '@angular/core';

import { CurrencyPipe } from '@angular/common';

import {
  Expense,
  ExpenseCategory
} from '../../models/expense.model';

import { ExpenseService } from '../../services/expense.service';

import { CategoryIconPipe } from '../../pipes/category-icon.pipe';
import { HighlightOverBudgetDirective } from '../../directives/highlight-over-budget.directive';

@Component({
  selector: 'app-expense-list',
  standalone: true,
  imports: [
    CurrencyPipe,
    CategoryIconPipe,
    HighlightOverBudgetDirective
  ],
  templateUrl: './expense-list.html',
  styleUrl: './expense-list.css'
})

export class ExpenseList {

  readonly expenseService = inject(ExpenseService);

  readonly edit = output<Expense>();

  // FILTER
  readonly selectedCategory =
    signal<'All' | ExpenseCategory>('All');

  // SEARCH
  readonly searchTerm = signal('');

  // SORT
  readonly sortBy =
    signal<'date' | 'amount'>('date');

  readonly sortDirection =
    signal<'asc' | 'desc'>('desc');

  // CATEGORY OPTIONS
  readonly categories: ExpenseCategory[] = [
    'Food',
    'Transport',
    'Shopping',
    'Bills',
    'Entertainment',
    'Other'
  ];

  // FILTER + SEARCH + SORT
  readonly filteredExpenses = computed(() => {

    // Start with all expenses
    let expenses = [
      ...this.expenseService.expenses()
    ];

    // 1. CATEGORY FILTER
    const category = this.selectedCategory();

    if (category !== 'All') {
      expenses = expenses.filter(
        expense => expense.category === category
      );
    }

    // 2. SEARCH BY NOTE
    const search = this.searchTerm()
      .trim()
      .toLowerCase();

    if (search) {
      expenses = expenses.filter(expense =>
        (expense.note ?? '')
          .toLowerCase()
          .includes(search)
      );
    }

    // 3. SORT
    const field = this.sortBy();
    const direction = this.sortDirection();

    expenses.sort((a, b) => {

      let comparison = 0;

      if (field === 'date') {
        comparison =
          new Date(a.date).getTime() -
          new Date(b.date).getTime();
      }

      if (field === 'amount') {
        comparison =
          a.amount - b.amount;
      }

      return direction === 'asc'
        ? comparison
        : -comparison;
    });

    return expenses;
  });

  // RUNNING TOTAL
  readonly visibleTotal = computed(() => {

    return this.filteredExpenses()
      .reduce(
        (total, expense) =>
          total + expense.amount,
        0
      );

  });

  // LOAD EXPENSES
  ngOnInit(): void {
    this.expenseService.loadExpenses();
  }

  // CATEGORY FILTER
  setCategory(
    category: 'All' | ExpenseCategory
  ): void {

    this.selectedCategory.set(category);

    console.log(
      'Selected category:',
      category
    );

  }

  // SEARCH
  onSearch(event: Event): void {

    const input =
      event.target as HTMLInputElement;

    this.searchTerm.set(input.value);

  }

  // SORT FIELD
  setSortBy(
    value: 'date' | 'amount'
  ): void {

    this.sortBy.set(value);

  }

  // SORT DIRECTION
  toggleSortDirection(): void {

    this.sortDirection.update(
      direction =>
        direction === 'asc'
          ? 'desc'
          : 'asc'
    );

  }

  // EDIT
  editExpense(
    expense: Expense
  ): void {

    this.edit.emit(expense);

  }

  // DELETE
  deleteExpense(
    id: string
  ): void {

    const confirmed = confirm(
      'Are you sure you want to delete this expense?'
    );

    if (!confirmed) {
      return;
    }

    this.expenseService.deleteExpense(id);

  }

}