import { Component, EventEmitter, Input, Output, OnChanges, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CdkListbox, CdkOption } from '@angular/cdk/listbox';
import { Expense } from '../../models/expense.model';

@Component({
  selector: 'app-expense-form',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    CdkListbox,
    CdkOption
  ],
  templateUrl: './expense-form.html',
  styleUrl: './expense-form.css'
})

export class ExpenseForm implements OnChanges {
  @Input() expenseToEdit?: Expense | null;
  @Output() save = new EventEmitter<Omit<Expense, 'id'>>();

  categories: string[] = ['Food', 'Transport', 'Shopping', 'Bills', 'Entertainment'];
  expenseForm: FormGroup;
  isEditing = false;

  constructor(private fb: FormBuilder) {
    this.expenseForm = this.fb.group({
      amount: ['', [Validators.required, Validators.min(0.01)]],
      category: ['Food', Validators.required],
      date: [new Date().toISOString().substring(0, 10), Validators.required],
      note: ['']
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['expenseToEdit'] && this.expenseToEdit) {
      this.isEditing = true;
      this.expenseForm.patchValue(this.expenseToEdit);
    }
  }

  editExpense(expense: Expense): void {
    this.isEditing = true;
    this.expenseForm.patchValue(expense);
  }

  onSubmit(): void {
    if (this.expenseForm.valid) {
      this.save.emit(this.expenseForm.value);
      this.resetForm();
    }
  }

  resetForm(): void {
    this.isEditing = false;
    this.expenseForm.reset({
      amount: '',
      category: 'Food',
      date: new Date().toISOString().substring(0, 10),
      note: ''
    });
  }
}