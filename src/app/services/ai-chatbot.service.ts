import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from '../../environments/environment';

export interface ChatRequest {
  message: string;
  sessionId: string;
  expenses: unknown[];
}

export interface ChatResponse {
  reply: string;
}

@Injectable({
  providedIn: 'root'
})
export class AiChatbotService {

  private readonly http = inject(HttpClient);

  private readonly webhookUrl =
    environment.aiAgentWebhookUrl;

  sendMessage(
    request: ChatRequest
  ): Observable<ChatResponse> {

    return this.http.post<ChatResponse>(
      this.webhookUrl,
      request
    );
  }
}