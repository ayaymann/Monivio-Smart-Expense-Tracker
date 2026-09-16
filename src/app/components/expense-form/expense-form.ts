import { Component, EventEmitter, Input, Output, OnChanges, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  AbstractControl,
  ReactiveFormsModule,
  FormBuilder,
  FormGroup,
  ValidationErrors,
  ValidatorFn,
  Validators
} from '@angular/forms';
import { CdkListbox, CdkOption } from '@angular/cdk/listbox';
import { Expense, ExpenseCategory } from '../../models/expense.model';

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
  readonly today = new Date().toISOString().substring(0, 10);

  private readonly notFutureDate: ValidatorFn = (
    control: AbstractControl
  ): ValidationErrors | null => {
    return control.value && control.value > this.today
      ? { futureDate: true }
      : null;
  };

  constructor(private fb: FormBuilder) {
    this.expenseForm = this.fb.group({
      amount: ['', [Validators.required, Validators.min(0.01)]],
      category: [['Food'], Validators.required],
      date: [this.today, [Validators.required, this.notFutureDate]],
      note: ['']
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['expenseToEdit'] && this.expenseToEdit) {
      this.isEditing = true;
      this.expenseForm.patchValue({
        ...this.expenseToEdit,
        category: [this.expenseToEdit.category]
      });
    }
  }

  editExpense(expense: Expense): void {
    this.isEditing = true;
    this.expenseForm.patchValue({
      ...expense,
      category: [expense.category]
    });
  }

  onSubmit(): void {
    if (this.expenseForm.valid) {
      const formValue = this.expenseForm.value;
      const category = formValue.category as ExpenseCategory[];

      this.save.emit({
        ...formValue,
        category: category[0]
      });
      this.resetForm();
    }
  }

  resetForm(): void {
    this.isEditing = false;
    this.expenseForm.reset({
      amount: '',
      category: ['Food'],
      date: this.today,
      note: ''
    });
  }
}