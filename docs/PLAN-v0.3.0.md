# v0.3.0 Development Plan

## Overview

This release focuses on building the core resume builder functionality with AI-powered conversation interface, dashboard redesign, and multi-provider LLM support.

## Current State (v0.2.0)

**Completed:**
- Authentication (login, signup, password reset)
- Database schema (profiles, resumes, user_settings, chat_history)
- Dashboard layout with sidebar
- Dark/light mode
- Password strength validation
- 55 shadcn/ui components

**Not Implemented:**
- `/builder` - Resume builder interface
- `/resumes` - My resumes list
- `/import` - Import resume
- `/history` - Chat history
- `/settings` - User settings
- AI integration
- PDF export

---

## v0.3.0 Scope

### Phase 1: Dashboard Redesign

#### 1.1 Resume List/Card View
- [ ] Refactor `/app/dashboard/page.tsx`
- [ ] Fetch user's resumes from database
- [ ] List view (table style) with columns: title, last modified, actions
- [ ] Card view (grid style) with preview thumbnail
- [ ] Toggle switch between list/card views
- [ ] Persist view preference in localStorage

#### 1.2 Empty State
- [ ] Use shadcn empty component (outline style)
- [ ] Show when user has no resumes
- [ ] CTA button to create first resume
- [ ] Friendly illustration/icon

#### 1.3 Resume Actions
- [ ] Edit button → navigate to `/builder/[id]`
- [ ] Duplicate resume
- [ ] Delete resume (with confirmation dialog)
- [ ] Rename resume (inline edit or modal)

### Phase 2: Core Builder Interface

#### 2.1 Builder Page Layout
- [ ] Create `/app/builder/page.tsx` (new resume)
- [ ] Create `/app/builder/[id]/page.tsx` (edit existing)
- [ ] Split-pane layout (chat left, resume preview right)
- [ ] Resizable panels using `react-resizable-panels`
- [ ] Mobile-responsive (stacked on small screens)

#### 2.2 Resume Preview Component
- [ ] Create `components/resume/resume-preview.tsx`
- [ ] Render resume data as styled document
- [ ] Section components (header, experience, education, skills, projects)
- [ ] Real-time updates when data changes
- [ ] Section highlight animation on update

#### 2.3 Chat Interface
- [ ] Create `components/chat/chat-interface.tsx`
- [ ] Message list with user/assistant bubbles
- [ ] Input area with send button
- [ ] Loading state during AI response
- [ ] Auto-scroll to latest message

### Phase 3: AI Integration with LiteLLM

#### 3.1 LiteLLM Proxy Setup
- [ ] Add `litellm` as LLM proxy layer
- [ ] Create `lib/ai/litellm-client.ts`
- [ ] Unified interface for all providers
- [ ] Streaming response support

#### 3.2 Supported LLM Providers
- [ ] **OpenAI** - GPT-4, GPT-4o, GPT-3.5-turbo
- [ ] **Anthropic** - Claude 3.5 Sonnet, Claude 3 Opus/Haiku
- [ ] **Ollama** - Local models (llama3, mistral, etc.)
- [ ] **LM Studio** - Local models via OpenAI-compatible API

#### 3.3 Resume Agent
- [ ] Create `lib/ai/resume-agent.ts`
- [ ] System prompt for resume assistant
- [ ] Tool definitions for resume mutations:
  - `update_personal_info`
  - `add_experience`
  - `update_experience`
  - `remove_experience`
  - `add_education`
  - `update_education`
  - `remove_education`
  - `add_skill`
  - `remove_skill`
  - `add_project`
  - `update_project`
  - `remove_project`
- [ ] Parse tool calls and apply to resume state

#### 3.4 State Management
- [ ] Create `lib/store/resume-store.ts` (Zustand)
- [ ] Resume data state
- [ ] Chat messages state
- [ ] Updated section tracking (for animations)
- [ ] Persist to database on changes

### Phase 4: Resume CRUD

#### 4.1 Create Resume
- [ ] "New Resume" flow from dashboard/sidebar
- [ ] Initialize empty resume in database
- [ ] Redirect to builder with resume ID

#### 4.2 Save Resume
- [ ] Auto-save on changes (debounced)
- [ ] Manual save button
- [ ] Save indicator (saved/saving/error)
- [ ] Server action `lib/actions/resume.ts`

#### 4.3 Load Resume
- [ ] Fetch resume by ID on builder mount
- [ ] Handle not found / unauthorized

### Phase 5: Settings Page

#### 5.1 Settings UI
- [ ] Create `/app/settings/page.tsx`
- [ ] Tabbed interface (LLM, Account, Appearance)

#### 5.2 LLM Configuration
- [ ] Provider selection dropdown:
  - OpenAI
  - Anthropic
  - Ollama (local)
  - LM Studio (local)
- [ ] Model selection (dynamic based on provider)
- [ ] API key input for cloud providers
- [ ] Base URL input for local providers (Ollama, LM Studio)
- [ ] Test connection button
- [ ] Validate and save settings

#### 5.3 Provider-Specific Settings
| Provider | Required Fields |
|----------|----------------|
| OpenAI | API Key |
| Anthropic | API Key |
| Ollama | Base URL (default: http://localhost:11434) |
| LM Studio | Base URL (default: http://localhost:1234) |

#### 5.4 API Key Management
- [ ] Encrypt API keys before storing
- [ ] Use user's own key for AI calls
- [ ] Mask API keys in UI (show last 4 chars)

---

## Out of Scope for v0.3.0

These will be addressed in future versions:

- `/history` chat history page (v0.4.0)
- `/import` resume import (v0.5.0)
- PDF export (v0.5.0)
- Resume templates (v0.6.0)
- LinkedIn connector (v0.7.0)

---

## Technical Decisions

### State Management
**Zustand** - Lightweight, TypeScript-friendly, easy persistence

### AI Framework
**LiteLLM** - Unified proxy for multiple LLM providers
- Single API interface for OpenAI, Anthropic, Ollama, LM Studio
- Easy provider switching without code changes
- Handles streaming across all providers

### Resume Preview
**React components** - Not PDF, allows interactivity
- PDF export will render same components to PDF

### Data Flow
```
User Input → Chat Interface → LiteLLM Proxy → LLM Provider
                                    ↓
                              Tool Calls
                                    ↓
                            Zustand Store → Resume Preview
                                    ↓
                              Database (auto-save)
```

---

## Database Schema Updates

### user_settings table (update)
```sql
ALTER TABLE user_settings ADD COLUMN IF NOT EXISTS llm_base_url TEXT;
-- llm_provider: 'openai' | 'anthropic' | 'ollama' | 'lmstudio'
-- llm_model: provider-specific model name
-- llm_api_key: encrypted API key (null for local providers)
-- llm_base_url: custom endpoint for Ollama/LM Studio
```

---

## File Structure (New Files)

```
/app
├── dashboard/
│   └── page.tsx              # Refactored dashboard
├── builder/
│   ├── page.tsx              # New resume builder
│   └── [id]/
│       └── page.tsx          # Edit existing resume
└── settings/
    └── page.tsx              # Settings page

/components
├── dashboard/
│   ├── resume-list.tsx       # List view component
│   ├── resume-card.tsx       # Card view component
│   ├── resume-grid.tsx       # Grid container
│   ├── empty-state.tsx       # No resumes state
│   └── view-toggle.tsx       # List/Card toggle
├── chat/
│   ├── chat-interface.tsx    # Main chat component
│   ├── chat-message.tsx      # Message bubble
│   └── chat-input.tsx        # Input area
├── resume/
│   ├── resume-preview.tsx    # Full preview
│   ├── section-header.tsx    # Personal info section
│   ├── section-experience.tsx
│   ├── section-education.tsx
│   ├── section-skills.tsx
│   └── section-projects.tsx
├── builder/
│   └── builder-layout.tsx    # Split pane layout
└── settings/
    ├── llm-settings.tsx      # LLM configuration
    └── provider-select.tsx   # Provider dropdown

/lib
├── ai/
│   ├── litellm-client.ts     # LiteLLM unified client
│   ├── providers.ts          # Provider configurations
│   └── resume-agent.ts       # Resume AI agent
├── store/
│   └── resume-store.ts       # Zustand store
└── actions/
    ├── resume.ts             # Resume CRUD actions
    └── settings.ts           # Settings actions
```

---

## Dependencies to Add

```bash
# AI & State Management
pnpm add openai zustand

# Note: LiteLLM is used server-side, we use OpenAI SDK with custom base URL
# For Anthropic: pnpm add @anthropic-ai/sdk (optional, can use OpenAI-compatible)
```

---

## LLM Provider Configuration

### OpenAI
```typescript
{
  provider: 'openai',
  baseUrl: 'https://api.openai.com/v1',
  models: ['gpt-4o', 'gpt-4-turbo', 'gpt-4', 'gpt-3.5-turbo']
}
```

### Anthropic
```typescript
{
  provider: 'anthropic',
  baseUrl: 'https://api.anthropic.com/v1',
  models: ['claude-3-5-sonnet-20241022', 'claude-3-opus-20240229', 'claude-3-haiku-20240307']
}
```

### Ollama (Local)
```typescript
{
  provider: 'ollama',
  baseUrl: 'http://localhost:11434/v1', // OpenAI-compatible endpoint
  models: [] // Fetched dynamically from Ollama API
}
```

### LM Studio (Local)
```typescript
{
  provider: 'lmstudio',
  baseUrl: 'http://localhost:1234/v1', // OpenAI-compatible endpoint
  models: [] // Fetched dynamically or user-specified
}
```

---

## Milestones

| Milestone | Features | Target |
|-----------|----------|--------|
| M1 | Dashboard redesign + empty state | Day 1-2 |
| M2 | Resume list/card views + CRUD | Day 2-3 |
| M3 | Builder layout + Resume preview | Day 3-4 |
| M4 | Chat interface (no AI) | Day 4-5 |
| M5 | LiteLLM integration + providers | Day 5-6 |
| M6 | Resume agent + tools | Day 6-7 |
| M7 | Settings page | Day 7-8 |
| M8 | Testing + polish | Day 8-9 |

---

## Success Criteria

- [ ] Dashboard shows resumes in list or card view (user's choice)
- [ ] Empty state displayed when no resumes exist
- [ ] User can create, edit, duplicate, delete resumes
- [ ] User can create a new resume via conversation
- [ ] Resume updates in real-time as AI responds
- [ ] Sections highlight when updated
- [ ] Resume persists to database with auto-save
- [ ] User can configure LLM provider (OpenAI/Anthropic/Ollama/LM Studio)
- [ ] User can use local LLMs without cloud API keys
- [ ] Mobile-responsive layout
