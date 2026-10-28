import React from 'react';
import { Modal } from './Modal';
import { SCROLL_TEXT } from './modalSamples';

// Presentational helpers for Modal.mdx: panels drawn in the page flow, as in the Figma frames.

const stack: React.CSSProperties = { display: 'flex', flexDirection: 'column', gap: 16, padding: '24px 0' };
const caption: React.CSSProperties = { fontSize: 12, lineHeight: '16px', color: '#6E6E6E' };
const SUB = 'Optional subtitle can be placed under title.';
const noop = () => {};

export const BasicExample = () => (
  <div style={stack}>
    <Modal inline title="Modal title" subtitle={SUB} onClose={noop} secondaryAction={{ label: 'Cancel' }} primaryAction={{ label: 'Confirm' }}>
      Modal content appear here, you can custom it as you needs. Please make sure the content is clear for completing the relevant task.
    </Modal>
  </div>
);

export const AlertExample = () => (
  <div style={stack}>
    <Modal inline alertModal title="Alert modal" subtitle={SUB} onClose={noop} secondaryAction={{ label: 'Cancel' }} primaryAction={{ label: 'Confirm' }}>
      This will allow closing the modal only by the close buttons and not by ESC or by clicking outside.
    </Modal>
  </div>
);

export const ScrollableExample = () => (
  <div style={stack}>
    <Modal inline title="Scrollable modal" subtitle={SUB} onClose={noop} contentHeight={192} secondaryAction={{ label: 'Cancel' }} primaryAction={{ label: 'Confirm' }}>
      {SCROLL_TEXT}
    </Modal>
  </div>
);

export const WizardExample = () => (
  <div style={stack}>
    <Modal
      inline
      title="Modal with wizard"
      subtitle={SUB}
      onClose={noop}
      wizard={{ count: 3, current: 0 }}
      secondaryAction={{ label: 'Back', disabled: true }}
      primaryAction={{ label: 'Next' }}
    >
      Modal content will appear here, you can custom it however you want, according to the user needs. Please make sure that the content is clear for completing the relevant task.
    </Modal>
  </div>
);

export const SizesExample = () => (
  <div style={stack}>
    <Modal inline size="sm" title="Alert modal" subtitle={SUB} onClose={noop} secondaryAction={{ label: 'Cancel' }} primaryAction={{ label: 'Confirm' }}>
      This will allow closing the modal only by the close buttons and not by ESC or by clicking outside.
    </Modal>
    <span style={caption}>Small size alert modal · 460px</span>
    <Modal inline size="md" title="Alert modal" subtitle={SUB} onClose={noop} secondaryAction={{ label: 'Cancel' }} primaryAction={{ label: 'Confirm' }}>
      This will allow closing the modal only by the close buttons and not by ESC or by clicking outside.
    </Modal>
    <span style={caption}>Medium size alert modal · 540px</span>
  </div>
);
