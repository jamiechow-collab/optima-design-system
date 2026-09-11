import React, { useState } from 'react';
import './ExplorationsApp.css';
import { Icon } from '../components/Icon/Icon';
import { EXPLORATIONS } from './registry';
import { PROBLEMS, EVIDENCE } from './background';

const BACKGROUND_ID = 'background';

const BackgroundView = ({ onOpen }: { onOpen: (id: string) => void }) => {
  const examples = EVIDENCE.filter((item) => item.type === 'example');
  const quotes = EVIDENCE.filter((item) => item.type === 'quote');
  const problemById = (id: string) => PROBLEMS.find((problem) => problem.id === id);

  return (
    <div className="exp-background">
      <div className="exp-background__intro">
        <h1 className="exp-background__title">Explorations</h1>
        <p className="exp-background__subtitle">
          Early-stage, interactive prototypes — not production code. Every problem this app has
          ever tackled, the real evidence behind it, and each prototype's stated bet, so it's easy
          to compare angles before committing to one.
        </p>
      </div>

      <section className="exp-background__section">
        <h2 className="exp-background__section-title">User Problems</h2>
        <ul className="exp-background__problem-list">
          {PROBLEMS.map((problem) => (
            <li key={problem.id} className="exp-background__problem">
              {problem.statement}
            </li>
          ))}
        </ul>
      </section>

      <section className="exp-background__section">
        <h2 className="exp-background__section-title">Evidence</h2>
        <div className="exp-background__evidence-groups">
          <div className="exp-background__evidence-group">
            <h3 className="exp-background__evidence-title">Examples</h3>
            {examples.length === 0 ? (
              <p className="exp-background__evidence-empty">
                No real examples recorded yet — none will be invented here. Add them to
                background.ts as they show up.
              </p>
            ) : (
              <ul className="exp-background__evidence-list">
                {examples.map((item, index) => (
                  <li key={index} className="exp-background__evidence-item">
                    <p className="exp-background__evidence-text">{item.text}</p>
                    <span className="exp-background__evidence-meta">
                      {problemById(item.problemId)?.statement}
                      {item.source ? ` · ${item.source}` : ''}
                    </span>
                  </li>
                ))}
              </ul>
            )}
          </div>
          <div className="exp-background__evidence-group">
            <h3 className="exp-background__evidence-title">Quotes</h3>
            {quotes.length === 0 ? (
              <p className="exp-background__evidence-empty">No real quotes recorded yet.</p>
            ) : (
              <ul className="exp-background__evidence-list">
                {quotes.map((item, index) => (
                  <li key={index} className="exp-background__evidence-item">
                    <p className="exp-background__evidence-text">“{item.text}”</p>
                    <span className="exp-background__evidence-meta">
                      {problemById(item.problemId)?.statement}
                      {item.source ? ` · ${item.source}` : ''}
                    </span>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </section>

      <section className="exp-background__section">
        <h2 className="exp-background__section-title">Assumptions</h2>
        <div className="exp-background__list">
          {EXPLORATIONS.map((exploration) => (
            <div key={exploration.id} className="exp-background__card">
              <h3 className="exp-background__card-name">{exploration.name}</h3>
              <p className="exp-background__row">
                <span className="exp-background__label">Problem</span>
                {problemById(exploration.problemId)?.statement}
              </p>
              <p className="exp-background__row">
                <span className="exp-background__label">Assumption</span>
                {exploration.assumption}
              </p>
              <button type="button" className="exp-background__cta" onClick={() => onOpen(exploration.id)}>
                Open prototype
                <Icon name="chevron-right" size="sm" />
              </button>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export const ExplorationsApp = () => {
  const [activeId, setActiveId] = useState<string>(BACKGROUND_ID);
  const active = EXPLORATIONS.find((exploration) => exploration.id === activeId) ?? null;

  return (
    <div className="exp-shell">
      <nav className="exp-nav" aria-label="Explorations">
        <div className="exp-nav__brand">Explorations</div>
        <div className="exp-nav__items">
          <button
            type="button"
            className={['exp-nav__item', activeId === BACKGROUND_ID ? 'is-active' : ''].filter(Boolean).join(' ')}
            onClick={() => setActiveId(BACKGROUND_ID)}
          >
            Background
          </button>
          <div className="exp-nav__divider" role="separator" />
          {EXPLORATIONS.map((exploration) => (
            <button
              key={exploration.id}
              type="button"
              className={['exp-nav__item', activeId === exploration.id ? 'is-active' : ''].filter(Boolean).join(' ')}
              onClick={() => setActiveId(exploration.id)}
            >
              {exploration.name}
            </button>
          ))}
        </div>
      </nav>

      <div className="exp-content">
        {active ? (
          <div className="exp-content__body">
            <active.component />
          </div>
        ) : (
          <div className="exp-content__body exp-content__body--scroll">
            <BackgroundView onOpen={setActiveId} />
          </div>
        )}
      </div>
    </div>
  );
};

ExplorationsApp.displayName = 'ExplorationsApp';
