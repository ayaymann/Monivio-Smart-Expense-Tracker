# 💰 Monivio — Smart Expense Tracker
*Your money, clearly in view.*

> **Track your spending. Understand your habits. Stay in control.**

The application provides complete expense **CRUD operations**, filtering, searching, sorting, form validation, running expense totals, custom Angular features, **Dark Mode**, and an **AI Expense Assistant** powered by **Google Gemini through n8n**.

---

## 📌 Overview

The Expense Tracker is designed to provide a simple and practical way to record and understand personal spending.

Users can:

- Add new expenses
- Edit existing expenses
- Delete expenses
- Filter expenses by category
- Search expenses by note
- Sort expenses by date or amount
- Calculate the total of currently visible expenses
- View category-specific icons
- Highlight expenses above a defined budget threshold
- Switch between Light Mode and Dark Mode
- Ask an AI assistant questions about their spending

The application uses **Angular** as the frontend framework and **json-server** as a local REST API. The AI assistant is integrated using an **n8n Webhook → AI Agent → Google Gemini → Respond to Webhook** workflow.

---

# ✨ Features

## 🧾 Expense Management

### Add Expense

Users can create an expense by entering:

- Amount
- Category
- Date
- Optional note

The form uses Angular Reactive Forms with validation.

Existing expenses can be edited directly through the same form.

### Delete Expense

Users can delete expenses after confirming the deletion.

### Persistent Data

Expenses are stored through a local REST API powered by `json-server`.

---

## 🔎 Expense Filtering & Search

### Category Filter

Users can filter expenses by:

- All
- Food
- Transport
- Shopping
- Bills
- Entertainment
- Other

### Note Search

Users can search expense notes using a text search field.

The search is case-insensitive and only considers the expense note.

---

## ↕️ Sorting

Expenses can be sorted by:

- Date
- Amount
- Category

Each field can be sorted in:

- Ascending order
- Descending order

---

## 💵 Running Total

The application calculates a **Visible Total** based on the expenses currently displayed after filtering and searching.

For example, if the user selects the `Food` category, the running total represents only the visible Food expenses.

This makes the total dynamically respond to the current filters.

---

# 🧩 Angular Features

The project demonstrates several important Angular concepts.

## Reactive Forms

The expense form uses Angular Reactive Forms for:

- Form control management
- Validation
- Form submission
- Editing existing data
- Resetting the form

### Validation Rules

- Amount is required
- Amount must be greater than `0`
- Category is required
- Date is required
- Future dates are not allowed
- Note is optional
- Note cannot exceed 200 characters

---

## Angular Signals

Signals are used to manage reactive application state.

Examples include:

- Expense data
- Selected category
- Search term
- Sorting configuration
- Chat messages
- Loading state
- Error state
- Edit state

Computed signals are also used for derived values such as:

- Filtered expenses
- Visible total

---

## Built-in Currency Pipe

Angular's built-in `CurrencyPipe` is used to display expense amounts as currency values.

Example:

```text
$250.00
```

---

## Custom Category Icon Pipe

The application includes a custom pipe called:

```text
CategoryIconPipe
```

It maps each expense category to a corresponding icon.

| Category | Icon |
|---|---|
| Food | 🍽️ |
| Transport | 🚌 |
| Shopping | 🛍️ |
| Bills | 📄 |
| Entertainment | 🎬 |
| Other | 💡 |

Example:

```text
🍽️ Food
```

---

## Custom Highlight Directive

The application includes a custom attribute directive:

```text
HighlightOverBudgetDirective
```

The directive highlights expenses whose amount exceeds the configured budget threshold.

The current threshold is:

```text
100
```

This demonstrates the use of an Angular custom attribute directive together with `ElementRef`, `Renderer2`, and input binding.

---

# 🌙 Dark Mode

The application includes a **Dark Mode toggle** as an additional usability feature.

Users can switch between:

- Light Mode
- Dark Mode

Dark Mode provides an alternative visual theme that improves readability and comfort, especially in low-light environments.

The theme can be changed directly from the application interface without affecting expense data or the application's core functionality.

---

# 🤖 AI Expense Assistant

The application includes an AI-powered chatbot that allows users to ask natural-language questions about their expenses.

The assistant analyzes the expense data currently provided by the Angular application.

## Example Questions

Users can ask questions such as:

```text
How much did I spend in total?
```

```text
How much did I spend on Food?
```

```text
What was my largest expense?
```

```text
Which category did I spend the most on?
```

```text
How much did I spend between September 1 and September 14?
```

```text
What are my most recent expenses?
```

The AI is instructed to use only the provided expense data and avoid inventing financial information.

---

# 🔗 AI Architecture

The chatbot uses the following architecture:

```text
┌─────────────────────┐
│   Angular Chatbot   │
└──────────┬──────────┘
           │
           │ HTTP POST
           ▼
┌─────────────────────┐
│    n8n Webhook      │
└──────────┬──────────┘
           │
           ▼
┌─────────────────────┐
│      AI Agent       │
└──────────┬──────────┘
           │
           │ Chat Model
           ▼
┌─────────────────────┐
│   Google Gemini     │
└──────────┬──────────┘
           │
           ▼
┌─────────────────────┐
│ Respond to Webhook  │
└──────────┬──────────┘
           │
           │ JSON response
           ▼
┌─────────────────────┐
│   Angular Chatbot   │
└─────────────────────┘
```

---

## AI Request

Angular sends the following information to the n8n Webhook:

```json
{
  "message": "How much did I spend on Food?",
  "sessionId": "unique-session-id",
  "expenses": [
    {
      "id": "1",
      "amount": 150,
      "category": "Food",
      "date": "2026-09-14",
      "note": "Lunch"
    }
  ]
}
```

### Request Data

| Property | Description |
|---|---|
| `message` | The user's question |
| `sessionId` | Unique identifier for the current chat session |
| `expenses` | Current expense data from the application |

---

## AI Response

n8n returns a JSON response to Angular:

```json
{
  "reply": "You spent $150 on Food."
}
```

Angular then displays the `reply` inside the chatbot conversation.

---

## AI Data Safety

The AI Agent is instructed to:

- Use only the supplied expense data
- Never invent expenses
- Never invent amounts
- Never invent categories
- Never claim access to unavailable data
- Perform calculations using the supplied values
- Clearly state when the requested information cannot be determined

For example, if there are no healthcare expenses in the provided data and the user asks:

```text
How much did I spend on healthcare?
```

the assistant should explain that the information cannot be determined from the provided expense data rather than creating a value.

---

# 💬 Chatbot Features

The chatbot supports:

- Message history
- User messages
- AI responses
- Text input
- Send button
- Enter-to-send
- Loading state
- Error state
- Empty-message prevention
- Independent operation from the expense form
- Current expense data sent with each request

While the AI is processing a request, the interface displays:

```text
Thinking...
```

and prevents additional messages from being sent until the request is completed.

---

# 🏗️ Project Architecture

The application follows a component/service-based Angular structure.

```text
src/
└── app/
    ├── components/
    │   ├── expense-form/
    │   │   ├── expense-form.ts
    │   │   ├── expense-form.html
    │   │   └── expense-form.css
    │   │
    │   ├── expense-list/
    │   │   ├── expense-list.ts
    │   │   ├── expense-list.html
    │   │   └── expense-list.css
    │   │
    │   └── chatbot/
    │       ├── chatbot.ts
    │       ├── chatbot.html
    │       └── chatbot.css
    │
    ├── directives/
    │   └── highlight-over-budget.directive.ts
    │
    ├── pipes/
    │   └── category-icon.pipe.ts
    │
    ├── models/
    │   └── expense.model.ts
    │
    ├── services/
    │   ├── expense.service.ts
    │   └── ai-chatbot.service.ts
    │
    └── ...
```

---

# 🛠️ Technologies Used

## Frontend

- **Angular 22**
- **TypeScript**
- **HTML5**
- **CSS3**

## Angular Concepts

- Standalone Components
- Reactive Forms
- Angular Signals
- Computed Signals
- HttpClient
- Built-in Pipes
- Custom Pipes
- Custom Attribute Directives
- Component Communication
- Form Validation
- Event Handling

## Backend / API

- **json-server**
- REST API
- HTTP GET
- HTTP POST
- HTTP PUT
- HTTP DELETE

## AI

- **n8n**
- **AI Agent**
- **Google Gemini**
- n8n Webhook
- Respond to Webhook

---

# 🔌 REST API

The application uses `json-server` as a local REST API.

## Base URL

```text
http://localhost:3000/expenses
```

## Available Operations

| Method | Endpoint | Purpose |
|---|---|---|
| GET | `/expenses` | Fetch all expenses |
| POST | `/expenses` | Create an expense |
| PUT | `/expenses/:id` | Update an expense |
| DELETE | `/expenses/:id` | Delete an expense |

---

# 📁 Database

The local database is stored in:

```text
db.json
```

Example structure:

```json
{
  "expenses": [
    {
      "id": "1",
      "amount": 250,
      "category": "Food",
      "date": "2026-09-14",
      "note": "Lunch"
    }
  ]
}
```

The project uses string IDs to remain compatible with the current `json-server` setup.

---

# ⚙️ Installation & Setup

## Prerequisites

Make sure the following are installed:

- Node.js
- npm
- Angular CLI
- json-server
- An n8n instance
- Google Gemini API access

---

## 1. Clone the Repository

```bash
git clone https://github.com/ayaymann/Expense-Tracker
```

Navigate to the project:

```bash
cd expense-tracker
```

---

## 2. Install Dependencies

```bash
npm install
```

---

# 🗄️ 3. Start json-server

Run:

```bash
json-server --watch db.json --port 3000
```

The REST API will be available at:

```text
http://localhost:3000/expenses
```

Keep this terminal running.

---

# 🤖 4. Configure the AI Webhook

Open:

```text
src/environments/environment.ts
```

Configure the n8n Webhook URL:

```ts
export const environment = {
  production: false,

  aiAgentWebhookUrl:
    'YOUR_N8N_WEBHOOK_URL'
};
```

Replace:

```text
YOUR_N8N_WEBHOOK_URL
```

with the appropriate n8n Webhook URL.

> Do not add your Gemini API key to the Angular project.

The Gemini API credential is configured securely inside n8n.

---

# 🔑 5. Configure Google Gemini in n8n

Inside n8n:

1. Create or open the Expense Tracker AI workflow.
2. Add/configure the AI Agent.
3. Add a Google Gemini Chat Model.
4. Create/select the Google Gemini credential.
5. Add the Gemini API key to the n8n credential.
6. Select the desired Gemini model.
7. Connect the Gemini Chat Model to the AI Agent.

The Gemini API key should remain inside n8n and should not be committed to GitHub.

---

# 🔗 6. Configure the n8n Workflow

The workflow should follow this structure:

```text
Webhook
   ↓
AI Agent
   ↓
Respond to Webhook
```

with the Google Gemini Chat Model connected to the AI Agent:

```text
             Google Gemini
                  │
                  ▼
Webhook ─────► AI Agent ─────► Respond to Webhook
```

The Webhook receives:

```text
message
sessionId
expenses
```

The AI Agent analyzes the supplied expense data.

The Respond to Webhook node returns:

```json
{
  "reply": "AI response"
}
```

---

# ▶️ 7. Start Angular

In a separate terminal:

```bash
ng serve
```

Open:

```text
http://localhost:4200
```

---

# 📱 8. Run in an Android Emulator

The application remains an Angular web application. You do not need to convert it to Flutter. To test it in an Android Studio emulator, use an Android Virtual Device (AVD), such as a Pixel 8 Pro running Android 14 (API 34).

## Start the emulator

Open the AVD from Android Studio, or launch it from PowerShell:

```powershell
flutter emulators --launch Pixel_8_Pro
```

If Flutter does not list the AVD, start it from Android Studio's Device Manager instead.

## Start the REST API for emulator access

The emulator cannot use your computer's `localhost` directly. Start `json-server` on all network interfaces:

```bash
json-server --watch db.json --port 3000 --host 0.0.0.0
```

## Start Angular for emulator access

In another terminal, run:

```bash
npm start -- --host 0.0.0.0
```

Open Chrome inside the Android emulator and visit:

```text
http://10.0.2.2:4200
```

Inside the Android emulator, `10.0.2.2` maps to the host computer. The application automatically uses `http://10.0.2.2:3000/expenses` for its REST API when loaded from this address.

# 🚀 Running the Full Application

You will normally need the following services running:

### Terminal 1 — REST API

```bash
json-server --watch db.json --port 3000 --host 0.0.0.0
```

### Terminal 2 — Angular

```bash
npm start -- --host 0.0.0.0
```

For desktop browser testing, open `http://localhost:4200`. For Android emulator testing, use the commands and URL in the [Run in an Android Emulator](#-8-run-in-an-android-emulator) section.

## Additional Resources

For more information on using the Angular CLI, including detailed command references, visit the [Angular CLI Overview and Command Reference](https://angular.dev/tools/cli) page.
