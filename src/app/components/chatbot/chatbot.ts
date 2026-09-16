import {
  Component,
  inject,
  signal
} from '@angular/core';

import { FormsModule } from '@angular/forms';

import {
  AiChatbotService
} from '../../services/ai-chatbot.service';

import {
  ExpenseService
} from '../../services/expense.service';

interface ChatMessage {
  sender: 'user' | 'ai';
  text: string;
}

@Component({
  selector: 'app-chatbot',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './chatbot.html',
  styleUrl: './chatbot.css'
})
export class Chatbot {

  private readonly aiService =
    inject(AiChatbotService);

  private readonly expenseService =
    inject(ExpenseService);

  readonly messages =
    signal<ChatMessage[]>([]);

  readonly userMessage =
    signal('');

  readonly loading =
    signal(false);

  readonly error =
    signal('');

  private readonly sessionId =
    typeof crypto.randomUUID === 'function'
      ? crypto.randomUUID()
      : `${Date.now()}-${Math.random().toString(36).slice(2)}`;

  sendMessage(): void {

    const message =
      this.userMessage().trim();

    // Don't send empty messages
    if (!message) {
      return;
    }

    // Add user's message
    this.messages.update(
      messages => [
        ...messages,
        {
          sender: 'user',
          text: message
        }
      ]
    );

    // Clear input
    this.userMessage.set('');

    // Clear previous error
    this.error.set('');

    // Show loading
    this.loading.set(true);

    // Get current expenses
    const expenses =
      this.expenseService.expenses();

    this.aiService
      .sendMessage({
        message,
        sessionId: this.sessionId,
        expenses
      })
      .subscribe({
        next: response => {

          this.messages.update(
            messages => [
              ...messages,
              {
                sender: 'ai',
                text: response.reply
              }
            ]
          );

          this.loading.set(false);
        },

        error: error => {

          console.error(
            'AI chatbot error:',
            error
          );

          this.error.set(
            'Sorry, the AI assistant is currently unavailable.'
          );

          this.loading.set(false);
        }
      });
  }

  onInput(event: Event): void {

    const input =
      event.target as HTMLInputElement;

    this.userMessage.set(input.value);
  }

  onKeyDown(event: KeyboardEvent): void {

    if (
      event.key === 'Enter' &&
      !event.shiftKey
    ) {

      event.preventDefault();

      this.sendMessage();
    }
  }
}