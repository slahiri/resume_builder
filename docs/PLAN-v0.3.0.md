# v0.3.0 Development Plan

## Overview

This release focuses on building the core resume builder functionality with AI-powered conversation interface.

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

### Phase 1: Core Builder Interface

#### 1.1 Builder Page Layout
- [ ] Create `/app/builder/page.tsx`
- [ ] Split-pane layout (chat left, resume preview right)
- [ ] Resizable panels using `react-resizable-panels`
- [ ] Mobile-responsive (stacked on small screens)

#### 1.2 Resume Preview Component
- [ ] Create `components/resume-preview.tsx`
- [ ] Render resume data as styled document
- [ ] Section components (header, experience, education, skills, projects)
- [ ] Real-time updates when data changes
- [ ] Section highlight animation on update

#### 1.3 Chat Interface
- [ ] Create `components/chat/chat-interface.tsx`
- [ ] Message list with user/assistant bubbles
- [ ] Input area with send button
- [ ] Loading state during AI response
- [ ] Auto-scroll to latest message

### Phase 2: AI Integration

#### 2.1 LLM Setup
- [ ] Add Anthropic SDK (`@anthropic-ai/sdk`)
- [ ] Create `lib/ai/anthropic.ts` client
- [ ] Server action for chat completion
- [ ] Streaming response support

#### 2.2 Resume Agent
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

#### 2.3 State Management
- [ ] Create `lib/store/resume-store.ts` (Zustand)
- [ ] Resume data state
- [ ] Chat messages state
- [ ] Updated section tracking (for animations)
- [ ] Persist to database on changes

### Phase 3: Resume CRUD

#### 3.1 Create Resume
- [ ] "New Resume" flow from dashboard/sidebar
- [ ] Initialize empty resume in database
- [ ] Redirect to builder with resume ID

#### 3.2 Save Resume
- [ ] Auto-save on changes (debounced)
- [ ] Manual save button
- [ ] Save indicator (saved/saving/error)
- [ ] Server action `lib/actions/resume.ts`

#### 3.3 Load Resume
- [ ] Fetch resume by ID on builder mount
- [ ] Handle not found / unauthorized

### Phase 4: Settings Page

#### 4.1 Settings UI
- [ ] Create `/app/settings/page.tsx`
- [ ] LLM provider selection (Anthropic/Grok)
- [ ] API key input (encrypted storage)
- [ ] Theme preference
- [ ] Save settings to database

#### 4.2 API Key Management
- [ ] Encrypt API keys before storing
- [ ] Use user's own key for AI calls
- [ ] Validate API key on save

---

## Out of Scope for v0.3.0

These will be addressed in future versions:

- `/resumes` list page (v0.4.0)
- `/history` chat history (v0.4.0)
- `/import` resume import (v0.5.0)
- PDF export (v0.5.0)
- Resume templates (v0.6.0)
- LinkedIn connector (v0.7.0)

---

## Technical Decisions

### State Management
**Zustand** - Lightweight, TypeScript-friendly, easy persistence

### AI Framework
**Anthropic SDK** - Direct integration, streaming support
- Consider LangGraph.js for complex workflows in future

### Resume Preview
**React components** - Not PDF, allows interactivity
- PDF export will render same components to PDF

### Data Flow
```
User Input → Chat Interface → AI Agent → Tool Calls → Zustand Store → Resume Preview
                                                          ↓
                                                    Database (auto-save)
```

---

## File Structure (New Files)

```
/app
├── builder/
│   └── page.tsx              # Builder page
├── builder/[id]/
│   └── page.tsx              # Builder with resume ID
└── settings/
    └── page.tsx              # Settings page

/components
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
└── builder/
    └── builder-layout.tsx    # Split pane layout

/lib
├── ai/
│   ├── anthropic.ts          # Anthropic client
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
pnpm add @anthropic-ai/sdk zustand
```

---

## Milestones

| Milestone | Features | Target |
|-----------|----------|--------|
| M1 | Builder layout + Resume preview | Day 1-2 |
| M2 | Chat interface (no AI) | Day 2-3 |
| M3 | AI integration + tools | Day 3-5 |
| M4 | Resume CRUD + auto-save | Day 5-6 |
| M5 | Settings page | Day 6-7 |
| M6 | Testing + polish | Day 7-8 |

---

## Success Criteria

- [ ] User can create a new resume via conversation
- [ ] Resume updates in real-time as AI responds
- [ ] Sections highlight when updated
- [ ] Resume persists to database
- [ ] User can configure their own API key
- [ ] Mobile-responsive layout
