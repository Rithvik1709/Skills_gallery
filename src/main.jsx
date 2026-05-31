import React, { useMemo, useState } from 'react';
import { createRoot } from 'react-dom/client';
import { AnimatePresence, motion } from 'framer-motion';
import {
  Activity,
  BadgeDollarSign,
  BarChart3,
  BookOpen,
  BriefcaseBusiness,
  Brush,
  Code2,
  Compass,
  Download,
  FileText,
  GraduationCap,
  HeartPulse,
  Megaphone,
  PenLine,
  Scale,
  Search,
  ShieldCheck,
  Sparkles,
  Users,
} from 'lucide-react';
import './styles.css';

const categories = [
  { id: 'all', label: 'All', icon: Sparkles },
  { id: 'researcher', label: 'Researcher', icon: Search },
  { id: 'teacher', label: 'Teacher', icon: GraduationCap },
  { id: 'developer', label: 'Developer', icon: Code2 },
  { id: 'creator', label: 'Creator', icon: Brush },
  { id: 'writer', label: 'Writer', icon: PenLine },
  { id: 'student', label: 'Student', icon: BookOpen },
  { id: 'business', label: 'Business', icon: BriefcaseBusiness },
  { id: 'marketing', label: 'Marketing', icon: Megaphone },
  { id: 'designer', label: 'Designer', icon: Compass },
  { id: 'data', label: 'Data', icon: BarChart3 },
  { id: 'product', label: 'Product', icon: Activity },
  { id: 'legal', label: 'Legal', icon: Scale },
  { id: 'hr', label: 'HR', icon: Users },
  { id: 'finance', label: 'Finance', icon: BadgeDollarSign },
  { id: 'healthcare', label: 'Healthcare', icon: HeartPulse },
  { id: 'security', label: 'Security', icon: ShieldCheck },
];

const skills = [
  skill('Literature Review Synthesizer', 'researcher', 'Advanced', 'Map papers into themes, evidence tables, gaps, disagreements, and next research questions.', ['papers', 'citations', 'synthesis']),
  skill('Research Question Refiner', 'researcher', 'Beginner', 'Turn broad topics into focused, testable questions with scope, variables, and constraints.', ['hypothesis', 'scope', 'methods']),
  skill('Interview Protocol Builder', 'researcher', 'Intermediate', 'Create semi-structured interview guides with probes, consent notes, and analysis anchors.', ['qualitative', 'interviews', 'uxr']),
  skill('Grant Proposal Reviewer', 'researcher', 'Advanced', 'Stress-test aims, significance, innovation, methods, risks, and reviewer objections.', ['grants', 'review', 'funding']),
  skill('Data Insight Narrator', 'researcher', 'Intermediate', 'Translate findings into concise narratives, caveats, executive summaries, and action items.', ['analytics', 'story', 'summary']),

  skill('Classroom Lesson Architect', 'teacher', 'Beginner', 'Generate objectives, warmups, guided practice, rubrics, and differentiated activities.', ['lessons', 'rubrics', 'activities']),
  skill('Assessment Designer', 'teacher', 'Intermediate', 'Create quizzes, project briefs, scoring guides, answer keys, and misconception checks.', ['assessment', 'grading', 'feedback']),
  skill('Worksheet Generator', 'teacher', 'Beginner', 'Build leveled practice sheets with examples, challenge questions, and answer explanations.', ['practice', 'examples', 'homework']),
  skill('Socratic Discussion Guide', 'teacher', 'Intermediate', 'Prepare prompts, follow-ups, discussion arcs, and evidence-based participation goals.', ['discussion', 'questions', 'seminar']),
  skill('IEP Accommodation Adapter', 'teacher', 'Advanced', 'Adapt lessons for accessibility, pacing, modalities, and documented learning supports.', ['accessibility', 'support', 'planning']),

  skill('Code Review Partner', 'developer', 'Intermediate', 'Review changes for bugs, regressions, tests, edge cases, and maintainability.', ['reviews', 'testing', 'quality']),
  skill('Bug Reproduction Assistant', 'developer', 'Intermediate', 'Convert vague bug reports into reproduction steps, hypotheses, logs, and fix plans.', ['debugging', 'triage', 'logs']),
  skill('API Contract Writer', 'developer', 'Intermediate', 'Draft endpoint specs, payload examples, errors, auth notes, and backwards compatibility risks.', ['api', 'docs', 'contracts']),
  skill('Refactor Planner', 'developer', 'Advanced', 'Break risky refactors into small milestones with safety checks and migration steps.', ['architecture', 'migration', 'tests']),
  skill('Test Case Generator', 'developer', 'Beginner', 'Create focused unit, integration, and edge-case tests from behavior requirements.', ['unit tests', 'edge cases', 'coverage']),
  skill('Release Notes Drafter', 'developer', 'Beginner', 'Summarize changes into user-facing release notes, upgrade notes, and known issues.', ['release', 'changelog', 'docs']),

  skill('Creative Brief Expander', 'creator', 'Beginner', 'Convert rough ideas into audience, tone, pillars, visual direction, and deliverables.', ['briefs', 'campaigns', 'voice']),
  skill('Content Calendar Strategist', 'creator', 'Intermediate', 'Plan themes, posts, hooks, formats, cadence, repurposing, and production status.', ['calendar', 'social', 'planning']),
  skill('Video Script Producer', 'creator', 'Intermediate', 'Draft short-form or long-form scripts with hooks, beats, shot notes, and CTAs.', ['video', 'script', 'story']),
  skill('Podcast Episode Planner', 'creator', 'Beginner', 'Shape episode angles, guest questions, segments, intros, and show notes.', ['podcast', 'questions', 'outline']),
  skill('Brand Voice Keeper', 'creator', 'Advanced', 'Turn messy copy into consistent tone while preserving intent, audience, and brand rules.', ['voice', 'copy', 'editing']),

  skill('Longform Article Editor', 'writer', 'Intermediate', 'Improve structure, argument flow, clarity, transitions, and headline options.', ['editing', 'articles', 'clarity']),
  skill('Technical Documentation Builder', 'writer', 'Intermediate', 'Create docs with prerequisites, steps, examples, troubleshooting, and changelog notes.', ['docs', 'how-to', 'reference']),
  skill('Email Sequence Writer', 'writer', 'Beginner', 'Draft onboarding, nurture, sales, or internal email flows with subject lines.', ['email', 'sequence', 'copy']),
  skill('Resume Tailoring Assistant', 'writer', 'Beginner', 'Align resumes and cover letters to job descriptions with truthful, measurable language.', ['resume', 'career', 'jobs']),

  skill('Study Coach Planner', 'student', 'Beginner', 'Build adaptive study plans with milestones, recall drills, reflection prompts, and reviews.', ['planning', 'habits', 'review']),
  skill('Exam Revision System', 'student', 'Intermediate', 'Create spaced repetition plans, practice sets, weak-area logs, and exam-day checklists.', ['exams', 'recall', 'practice']),
  skill('Note Compressor', 'student', 'Beginner', 'Condense lecture notes into summaries, flashcards, diagrams, and self-test questions.', ['notes', 'flashcards', 'summary']),

  skill('Meeting Brief Builder', 'business', 'Beginner', 'Prepare agendas, context, decisions needed, stakeholder notes, and follow-up templates.', ['meetings', 'agenda', 'decisions']),
  skill('Decision Memo Writer', 'business', 'Intermediate', 'Structure options, tradeoffs, costs, risks, recommendation, and owner-ready next steps.', ['strategy', 'memo', 'tradeoffs']),
  skill('SOP Generator', 'business', 'Intermediate', 'Convert recurring work into standard operating procedures with checklists and exceptions.', ['process', 'ops', 'checklists']),
  skill('Customer Support Macro Builder', 'business', 'Beginner', 'Create empathetic support replies, escalation rules, and troubleshooting scripts.', ['support', 'service', 'macros']),

  skill('Campaign Planner', 'marketing', 'Intermediate', 'Build positioning, audience, channels, messaging, launch calendar, and measurement plan.', ['campaigns', 'launch', 'channels']),
  skill('SEO Content Mapper', 'marketing', 'Intermediate', 'Map keywords to pages, intent, content outlines, internal links, and refresh priorities.', ['seo', 'content', 'keywords']),
  skill('Ad Copy Variant Generator', 'marketing', 'Beginner', 'Produce ad angles, headlines, body variants, CTAs, and experiment notes.', ['ads', 'copy', 'testing']),
  skill('Customer Persona Builder', 'marketing', 'Beginner', 'Synthesize audiences into personas, pains, triggers, objections, and buying moments.', ['persona', 'audience', 'research']),

  skill('UX Heuristic Reviewer', 'designer', 'Intermediate', 'Review screens for clarity, hierarchy, accessibility, states, friction, and visual polish.', ['ux', 'accessibility', 'review']),
  skill('Design System Component Spec', 'designer', 'Advanced', 'Define component anatomy, variants, props, usage rules, states, and examples.', ['components', 'tokens', 'system']),
  skill('Wireframe Prompt Builder', 'designer', 'Beginner', 'Turn product requirements into screen lists, layout intent, and interaction notes.', ['wireframes', 'screens', 'flows']),

  skill('Dashboard Analyst', 'data', 'Intermediate', 'Evaluate dashboards for metric definitions, chart fit, anomalies, and decision usefulness.', ['dashboards', 'metrics', 'charts']),
  skill('SQL Query Explainer', 'data', 'Intermediate', 'Explain SQL logic, joins, filters, performance risks, and validation checks.', ['sql', 'analysis', 'validation']),
  skill('Experiment Readout Writer', 'data', 'Advanced', 'Summarize A/B test setup, results, confidence, caveats, and recommended actions.', ['experiments', 'statistics', 'readout']),

  skill('PRD Builder', 'product', 'Intermediate', 'Write product requirements with problem, users, goals, scope, risks, and acceptance criteria.', ['prd', 'requirements', 'scope']),
  skill('Roadmap Prioritizer', 'product', 'Advanced', 'Compare opportunities by impact, confidence, effort, dependencies, and sequencing.', ['roadmap', 'priorities', 'planning']),
  skill('User Story Generator', 'product', 'Beginner', 'Create user stories, acceptance criteria, edge cases, and release notes.', ['stories', 'criteria', 'delivery']),

  skill('Contract Clause Summarizer', 'legal', 'Intermediate', 'Summarize legal clauses in plain language with obligations, dates, and risk flags.', ['contracts', 'clauses', 'risk']),
  skill('Policy Draft Assistant', 'legal', 'Advanced', 'Draft internal policies with scope, definitions, responsibilities, controls, and review cadence.', ['policy', 'compliance', 'governance']),

  skill('Job Description Builder', 'hr', 'Beginner', 'Create clear job posts with outcomes, responsibilities, requirements, and interview scorecards.', ['hiring', 'roles', 'scorecard']),
  skill('Performance Review Coach', 'hr', 'Intermediate', 'Draft fair performance feedback with examples, impact, growth areas, and goals.', ['feedback', 'reviews', 'goals']),

  skill('Budget Variance Analyst', 'finance', 'Intermediate', 'Explain budget versus actuals with drivers, risks, forecast impacts, and questions.', ['budget', 'forecast', 'variance']),
  skill('Investor Update Writer', 'finance', 'Advanced', 'Prepare concise updates with metrics, wins, risks, asks, and narrative context.', ['investors', 'metrics', 'updates']),

  skill('Clinical Note Organizer', 'healthcare', 'Advanced', 'Organize encounter notes into structured summaries for clinician review.', ['notes', 'clinical', 'summary']),
  skill('Patient Education Simplifier', 'healthcare', 'Intermediate', 'Rewrite complex health information into plain-language education with safety caveats.', ['education', 'plain language', 'care']),

  skill('Threat Model Facilitator', 'security', 'Advanced', 'Map assets, actors, attack paths, controls, assumptions, and mitigation priorities.', ['threat model', 'risk', 'controls']),
  skill('Incident Postmortem Writer', 'security', 'Advanced', 'Structure incident timelines, impact, root causes, fixes, and prevention actions.', ['incident', 'postmortem', 'security']),
];

function skill(title, useCase, level, description, tags) {
  return {
    title,
    useCase,
    level,
    description,
    tags,
    slug: title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, ''),
  };
}

function App() {
  const [activeCase, setActiveCase] = useState('all');
  const [query, setQuery] = useState('');

  const counts = useMemo(() => {
    return skills.reduce(
      (acc, item) => {
        acc[item.useCase] = (acc[item.useCase] || 0) + 1;
        acc.all += 1;
        return acc;
      },
      { all: 0 },
    );
  }, []);

  const filteredSkills = useMemo(() => {
    const needle = query.trim().toLowerCase();
    return skills.filter((item) => {
      const matchesCase = activeCase === 'all' || item.useCase === activeCase;
      const haystack = [item.title, item.description, item.useCase, item.level, ...item.tags].join(' ').toLowerCase();
      return matchesCase && (!needle || haystack.includes(needle));
    });
  }, [activeCase, query]);

  const featured = skills.slice(0, 4);

  return (
    <main>
      <section className="hero">
        <nav className="nav">
          <a href="/" className="brand" aria-label="Skills.md Gallery home">
            <span className="brandGlyph"><FileText size={19} /></span>
            <span>Skills.md Gallery</span>
          </a>
          <div className="navActions">
            <a href="#collections">Collections</a>
            <a href="#gallery">Browse</a>
          </div>
        </nav>

        <div className="heroInner">
          <motion.div
            className="heroCopy"
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, ease: 'easeOut' }}
          >
            <span className="kicker">Curated prompt workflows as downloadable Markdown</span>
            <h1>A cleaner way to find the skill file you actually need.</h1>
            <p>
              Browse a practical library of Skills.md files for research, teaching, coding, writing,
              business, design, data, product, legal, HR, finance, healthcare, and security work.
            </p>
            <div className="heroActions">
              <a className="primaryButton" href="#gallery">
                Browse {skills.length} skills <Download size={18} />
              </a>
              <a className="secondaryButton" href="#collections">View collections</a>
            </div>
          </motion.div>

          <motion.div
            className="libraryPreview"
            initial={{ opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, delay: 0.08, ease: 'easeOut' }}
            aria-label="Skills.md preview"
          >
            <div className="previewHeader">
              <span>skills.md</span>
              <span>{skills.length} files</span>
            </div>
            <div className="previewBody">
              {featured.map((item, index) => (
                <div className="previewRow" key={item.title}>
                  <span className="rowIndex">{String(index + 1).padStart(2, '0')}</span>
                  <div>
                    <strong>{item.title}</strong>
                    <small>{item.useCase} / {item.level}</small>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      <section className="collections" id="collections">
        <div className="sectionIntro">
          <span className="kicker">Collections</span>
          <h2>Organized like a real working library.</h2>
          <p>Role filters show exactly how many skills are available before you click.</p>
        </div>
        <div className="collectionGrid">
          {categories.filter((item) => item.id !== 'all').map((category) => {
            const Icon = category.icon;
            return (
              <button
                className={activeCase === category.id ? 'collectionCard active' : 'collectionCard'}
                type="button"
                key={category.id}
                onClick={() => {
                  setActiveCase(category.id);
                  document.getElementById('gallery')?.scrollIntoView({ behavior: 'smooth' });
                }}
              >
                <Icon size={19} />
                <span>{category.label}</span>
                <strong>{counts[category.id] || 0}</strong>
              </button>
            );
          })}
        </div>
      </section>

      <section className="gallerySection" id="gallery">
        <div className="sectionIntro galleryIntro">
          <div>
            <span className="kicker">Gallery</span>
            <h2>Download a ready-to-edit skill.</h2>
          </div>
          <label className="searchBox">
            <Search size={18} />
            <input
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Search by task, role, or tag"
            />
          </label>
        </div>

        <div className="filterRail" aria-label="Filter by use case">
          {categories.map((category) => {
            const Icon = category.icon;
            return (
              <button
                className={activeCase === category.id ? 'filterChip active' : 'filterChip'}
                type="button"
                key={category.id}
                onClick={() => setActiveCase(category.id)}
              >
                <Icon size={15} />
                <span>{category.label}</span>
                <strong>{counts[category.id] || 0}</strong>
              </button>
            );
          })}
        </div>

        <motion.div className="skillGrid" layout>
          <AnimatePresence mode="popLayout">
            {filteredSkills.map((item) => (
              <SkillCard skill={item} key={item.title} />
            ))}
          </AnimatePresence>
        </motion.div>

        {filteredSkills.length === 0 && (
          <div className="emptyState">
            <Search size={24} />
            <p>No skills matched that search.</p>
          </div>
        )}
      </section>
    </main>
  );
}

function SkillCard({ skill }) {
  const markdown = buildMarkdown(skill);

  return (
    <motion.article
      className="skillCard"
      layout
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 10 }}
      transition={{ duration: 0.2 }}
    >
      <div className="cardTop">
        <span className="skillType">{skill.useCase}</span>
        <span className="level">{skill.level}</span>
      </div>
      <h3>{skill.title}</h3>
      <p>{skill.description}</p>
      <div className="tagRow">
        {skill.tags.map((tag) => (
          <span key={tag}>{tag}</span>
        ))}
      </div>
      <a
        className="downloadButton"
        href={`data:text/markdown;charset=utf-8,${encodeURIComponent(markdown)}`}
        download={`${skill.slug}.md`}
      >
        <Download size={16} />
        Download
      </a>
    </motion.article>
  );
}

function buildMarkdown(item) {
  const roleName = titleCase(item.useCase);
  const tagList = item.tags.map((tag) => `- ${tag}`).join('\n');
  const inputList = getDetailedInputs(item);
  const workflow = getDetailedWorkflow(item);
  const outputFormat = getDetailedOutput(item);
  const starterPrompt = getStarterPrompt(item);
  const examples = getExampleTasks(item);

  return `---
name: ${item.slug}
title: ${item.title}
use_case: ${item.useCase}
difficulty: ${item.level}
tags:
${item.tags.map((tag) => `  - ${tag}`).join('\n')}
---

# ${item.title}

## Overview
${item.description}

Use this skill when the user needs help with ${item.tags.join(', ')} work and expects a concrete, polished deliverable rather than generic advice. The assistant should behave like a careful ${roleName.toLowerCase()} partner: structured, practical, specific, and honest about uncertainty.

## When To Use This Skill
- The user asks for help with a real ${roleName.toLowerCase()} task, document, plan, review, analysis, or draft.
- The task benefits from a repeatable workflow instead of a one-off answer.
- The user has source material, constraints, goals, examples, or a rough idea that needs to become an actionable output.
- The answer should include reasoning, tradeoffs, checks, and next steps.

## When Not To Use This Skill
- The user only needs a quick definition or tiny factual answer.
- The task requires professional judgment that must come from a licensed expert, unless the output is clearly framed as preparation, organization, or drafting support.
- The user has not provided enough context and guessing would materially change the outcome.
- The requested output would fabricate evidence, citations, legal claims, medical advice, financial promises, or security guarantees.

## Primary Outcomes
- A useful first draft or analysis that the user can immediately edit, share, or act on.
- Clear assumptions and missing information.
- Practical recommendations grounded in the supplied context.
- A quality checklist so the user can judge whether the output is complete.

## Best For
${tagList}

## Inputs To Request
${inputList}

## Operating Principles
- Start from the user's goal, audience, and constraints.
- Prefer concrete examples, tables, checklists, templates, and decision-ready language.
- Do not invent facts, sources, numbers, citations, laws, policies, or test results.
- Separate what is known, assumed, uncertain, and recommended.
- Keep the user's original intent visible while improving structure and quality.
- Ask clarifying questions only when the answer would meaningfully change the deliverable.

## Detailed Workflow
${workflow}

## Output Format
${outputFormat}

## Quality Checklist
- The output directly answers the user's stated goal.
- The structure is easy to scan and reuse.
- Important assumptions are explicit.
- The output includes enough detail to be useful without becoming padded.
- Risks, caveats, or limitations are visible.
- Recommendations include next actions or decision points.
- Tone and depth match the user's audience.
- Any source-dependent claim is clearly attributed or marked for verification.

## Starter Prompt
\`\`\`text
${starterPrompt}
\`\`\`

## Example User Requests
${examples}

## Response Style
- Be concise at the top, detailed where the work needs detail.
- Use headings, bullets, tables, or numbered steps when they improve usability.
- Avoid vague filler such as "leverage", "robust", "synergy", or "best-in-class" unless the user asks for that style.
- Prefer plain, confident language.
- End with useful next steps, not generic offers.

## Safety And Accuracy Notes
- If the work involves legal, medical, financial, hiring, security, or compliance decisions, state that the output is drafting or analysis support and should be reviewed by a qualified owner.
- For current facts, laws, prices, policies, standards, or market details, verify with reliable sources before presenting the result as current.
- For code, data, or operational recommendations, include validation steps or tests where appropriate.
- For education, accessibility, healthcare, HR, and legal use cases, preserve dignity, fairness, and privacy.
`;
}

function getDetailedInputs(item) {
  const common = [
    '- The concrete goal or decision the user wants to support',
    '- Target audience and desired tone',
    '- Source material, examples, notes, links, files, or constraints',
    '- Required length, format, deadline, and quality bar',
    '- Anything that must be included or avoided',
  ];

  const byUseCase = {
    researcher: [
      '- Research question, hypothesis, topic area, or dataset',
      '- Methodology constraints, inclusion criteria, and citation style',
      '- Papers, abstracts, notes, interviews, observations, or findings',
    ],
    teacher: [
      '- Grade level, subject, time available, and learning objective',
      '- Standards, required vocabulary, accessibility needs, and materials',
      '- Assessment style and student readiness level',
    ],
    developer: [
      '- Repository context, diff, error logs, requirements, or code snippets',
      '- Runtime, framework, language, test command, and expected behavior',
      '- Known edge cases, constraints, and compatibility requirements',
    ],
    creator: [
      '- Platform, audience, format, brand voice, and content goal',
      '- Reference examples, do-not-use list, and production constraints',
      '- Call to action, distribution channel, and success metric',
    ],
    writer: [
      '- Draft, outline, source notes, intended reader, and publication context',
      '- Voice, structure, length, examples, and editorial constraints',
      '- Claims that require evidence or citation',
    ],
    student: [
      '- Subject, exam or assignment, deadline, current level, and weak areas',
      '- Available study time, preferred learning method, and grading criteria',
      '- Notes, syllabus, readings, practice questions, or feedback',
    ],
    business: [
      '- Business context, stakeholders, decision needed, and success metric',
      '- Current process, constraints, dependencies, and risks',
      '- Required format: memo, SOP, agenda, plan, or checklist',
    ],
    marketing: [
      '- Audience, product, offer, channel, positioning, and campaign goal',
      '- Brand guidelines, competitors, proof points, and compliance limits',
      '- Metrics, testing plan, budget, and timeline',
    ],
    designer: [
      '- User goal, product context, screen or component details, and constraints',
      '- Design system rules, accessibility requirements, and interaction states',
      '- Existing screenshots, wireframes, user feedback, or acceptance criteria',
    ],
    data: [
      '- Dataset, metric definitions, query, chart, dashboard, or experiment details',
      '- Business question, audience, decision context, and known caveats',
      '- Statistical assumptions, filters, time range, and validation checks',
    ],
    product: [
      '- Product problem, user segment, business goal, and scope boundary',
      '- Research notes, customer feedback, constraints, and dependencies',
      '- Success metrics, launch timeline, and acceptance criteria',
    ],
    legal: [
      '- Jurisdiction, document type, business context, and parties involved',
      '- Clauses, policy text, obligations, dates, and risk tolerance',
      '- Required review standard and whether counsel will review',
    ],
    hr: [
      '- Role, team context, performance examples, competencies, and criteria',
      '- Hiring stage, interview format, leveling, and fairness requirements',
      '- Company policies, legal constraints, and documentation needs',
    ],
    finance: [
      '- Financial statement, budget, forecast, metric, or investor context',
      '- Time period, assumptions, variance drivers, and audience',
      '- Required decision, scenario, or recommendation',
    ],
    healthcare: [
      '- Clinical, operational, or education context and intended reviewer',
      '- Source notes, patient education goal, reading level, and safety caveats',
      '- Privacy constraints and any information that must not be included',
    ],
    security: [
      '- System context, assets, trust boundaries, logs, timeline, or threat scenario',
      '- Controls, assumptions, impact, likelihood, and owners',
      '- Required format: threat model, incident report, checklist, or remediation plan',
    ],
  };

  return [...common, ...(byUseCase[item.useCase] || [])].join('\n');
}

function getDetailedWorkflow(item) {
  const taskFocus = item.tags.join(', ');

  return `1. Restate the goal in one sentence and name the intended audience.
2. Inventory the available context: source material, constraints, examples, unknowns, and success criteria.
3. Identify the most important ${taskFocus} considerations for this request.
4. Choose the right working structure: outline, table, checklist, memo, review, plan, script, rubric, or decision matrix.
5. Produce the first complete draft or analysis with specific sections and concrete language.
6. Check the output against the user's constraints and remove vague or unsupported claims.
7. Add caveats, risks, validation steps, or review notes where the work could be misused or misread.
8. Provide a concise final version plus optional next actions, variants, or follow-up questions.`;
}

function getDetailedOutput(item) {
  const roleName = titleCase(item.useCase);

  return `Use this default structure unless the user requests another format:

### 1. Quick Summary
A short statement of what was produced and the key recommendation or result.

### 2. ${roleName} Deliverable
The main output, formatted for immediate use. This may be a plan, review, memo, draft, checklist, table, brief, script, rubric, specification, or analysis.

### 3. Assumptions
List any assumptions made because the user did not provide full context.

### 4. Risks Or Caveats
Call out accuracy concerns, missing evidence, compliance concerns, edge cases, or dependencies.

### 5. Next Actions
Provide practical follow-up steps the user can take immediately.`;
}

function getStarterPrompt(item) {
  return `You are using the "${item.title}" skill.

Goal:
[Describe what you need produced or reviewed.]

Context:
[Paste notes, source material, links, constraints, examples, or background.]

Audience:
[Who will read or use the output?]

Requirements:
- Format:
- Length:
- Tone:
- Must include:
- Must avoid:

Please produce a detailed, practical output with assumptions, caveats, and next actions.`;
}

function getExampleTasks(item) {
  const examplesByUseCase = {
    researcher: [
      `- "Turn these paper notes into a literature review map for ${item.title}."`,
      '- "Find the major themes, disagreements, limitations, and research gaps."',
      '- "Create an evidence table and a synthesis outline from these sources."',
    ],
    teacher: [
      `- "Use ${item.title} to build a 50-minute lesson for grade 8 students."`,
      '- "Create differentiated practice and an exit ticket for this topic."',
      '- "Turn this standard into objectives, activities, and assessment criteria."',
    ],
    developer: [
      `- "Apply ${item.title} to this diff and list the highest-risk issues."`,
      '- "Create test cases for this feature, including edge cases."',
      '- "Explain this bug and propose a safe fix plan."',
    ],
    creator: [
      `- "Use ${item.title} to turn this rough idea into a full content brief."`,
      '- "Draft hooks, structure, visual notes, and a CTA for this campaign."',
      '- "Create three variants for different platforms."',
    ],
    writer: [
      `- "Use ${item.title} to improve this draft for clarity and structure."`,
      '- "Create a polished outline and rewrite the introduction."',
      '- "Turn these notes into a publishable article or documentation page."',
    ],
    student: [
      `- "Use ${item.title} to make a study plan for my exam in three weeks."`,
      '- "Turn these notes into active recall questions and flashcards."',
      '- "Identify my weak areas and create a review schedule."',
    ],
    business: [
      `- "Use ${item.title} to prepare a decision memo for leadership."`,
      '- "Turn this messy process into an SOP with owners and exceptions."',
      '- "Create a meeting brief with decisions needed and follow-ups."',
    ],
    marketing: [
      `- "Use ${item.title} to plan a campaign for this product launch."`,
      '- "Create audience segments, messaging angles, and test ideas."',
      '- "Map these keywords into an SEO content plan."',
    ],
    designer: [
      `- "Use ${item.title} to review this screen for usability issues."`,
      '- "Write a component spec with variants, states, and usage rules."',
      '- "Turn these requirements into wireframe notes and flows."',
    ],
    data: [
      `- "Use ${item.title} to explain this dashboard to executives."`,
      '- "Summarize the experiment result with caveats and recommendations."',
      '- "Review this SQL query for logic and validation risks."',
    ],
    product: [
      `- "Use ${item.title} to create a PRD from these customer notes."`,
      '- "Prioritize these roadmap items with impact, confidence, and effort."',
      '- "Write user stories and acceptance criteria for this feature."',
    ],
    legal: [
      `- "Use ${item.title} to summarize this clause in plain language."`,
      '- "Draft a policy outline with scope, responsibilities, and review cadence."',
      '- "Flag obligations, dates, and review questions for counsel."',
    ],
    hr: [
      `- "Use ${item.title} to write a fair performance review from these notes."`,
      '- "Create a job description and interview scorecard for this role."',
      '- "Turn interview feedback into structured hiring signals."',
    ],
    finance: [
      `- "Use ${item.title} to explain this budget variance."`,
      '- "Draft an investor update with metrics, risks, and asks."',
      '- "Create a scenario summary from these assumptions."',
    ],
    healthcare: [
      `- "Use ${item.title} to organize these notes for clinician review."`,
      '- "Rewrite this patient education text at a plain-language reading level."',
      '- "Identify safety caveats and questions for a qualified reviewer."',
    ],
    security: [
      `- "Use ${item.title} to build a threat model for this system."`,
      '- "Write an incident postmortem from this timeline and impact summary."',
      '- "Prioritize remediation actions by impact and effort."',
    ],
  };

  return (examplesByUseCase[item.useCase] || [
    `- "Use ${item.title} to produce a detailed deliverable from this context."`,
    '- "Review this draft and improve it with assumptions and next steps."',
    '- "Create a reusable checklist for this workflow."',
  ]).join('\n');
}

function titleCase(value) {
  return value.replace(/\b\w/g, (letter) => letter.toUpperCase());
}

createRoot(document.getElementById('root')).render(<App />);
