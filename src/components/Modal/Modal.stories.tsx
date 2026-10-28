import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-webpack5';
import { Modal } from './Modal';
import { Button } from '../Button/Button';
import { SCROLL_TEXT } from './modalSamples';

const meta: Meta<typeof Modal> = {
  title: 'Pattern/Modal',
  component: Modal,
  parameters: { layout: 'padded' },
  argTypes: {
    open: { table: { disable: true } },
    onClose: { table: { disable: true } },
    children: { table: { disable: true } },
    primaryAction: { table: { disable: true } },
    secondaryAction: { table: { disable: true } },
    inline: { table: { disable: true } },
    width: { table: { disable: true } },
    wizard: { table: { disable: true } },
    contentHeight: { table: { disable: true } },
    closeOnBackdrop: { table: { disable: true } },
    className: { table: { disable: true } },
  },
};

export default meta;

const Paragraph = () => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
    <span style={{ fontWeight: 600 }}>Content title</span>
    <span>
      Modal content will appear here, you can custom it however you want, according to the user needs. Please make sure that the
      content is clear for completing the relevant task.
    </span>
  </div>
);

interface DefaultArgs {
  title: string;
  subtitle: string;
  secondary: boolean;
  size: 'sm' | 'md';
  alertModal: boolean;
  flush: boolean;
}

export const Default: StoryObj<DefaultArgs> = {
  args: { title: 'Modal title', subtitle: 'Modal subtitle, can come with icon and link.', secondary: true, size: 'md', alertModal: false, flush: false },
  argTypes: {
    title: { control: 'text', table: { disable: false } },
    subtitle: { control: 'text', table: { disable: false } },
    secondary: { control: 'boolean', name: 'Secondary button' },
    size: { control: 'inline-radio', options: ['sm', 'md'], table: { disable: false } },
    alertModal: { control: 'boolean', table: { disable: false }, description: 'Closes only with its buttons, not with Escape or a click outside' },
    flush: { control: 'boolean', table: { disable: false }, description: 'Content slot without side padding' },
  },
  render: ({ title, subtitle, secondary, size, alertModal, flush }) => {
    const [open, setOpen] = useState(false);
    return (
      <>
        <p style={{ fontSize: 14 }}>The modal opens over the page, closes with the X, Escape or a click on the backdrop, and keeps focus inside while it is open.</p>
        <Button onClick={() => setOpen(true)}>Open modal</Button>
        <Modal
          open={open}
          onClose={() => setOpen(false)}
          title={title}
          subtitle={subtitle}
          size={size}
          alertModal={alertModal}
          flush={flush}
          primaryAction={{ label: 'Confirm', onClick: () => setOpen(false) }}
          secondaryAction={secondary ? { label: 'Cancel', onClick: () => setOpen(false) } : undefined}
        >
          <Paragraph />
        </Modal>
      </>
    );
  },
};

export const AlertModal: StoryObj = {
  parameters: { controls: { disable: true } },
  name: 'Alert modal',
  render: () => {
    const [open, setOpen] = useState(false);
    return (
      <>
        <p style={{ fontSize: 14 }}>An alert modal closes only with its buttons — Escape and a click outside do nothing.</p>
        <Button onClick={() => setOpen(true)}>Open alert modal</Button>
        <Modal
          open={open}
          alertModal
          onClose={() => setOpen(false)}
          title="Alert modal"
          subtitle="Optional subtitle can be placed under title."
          primaryAction={{ label: 'Confirm', onClick: () => setOpen(false) }}
          secondaryAction={{ label: 'Cancel', onClick: () => setOpen(false) }}
        >
          This will allow closing the modal only by the close buttons and not by ESC or by clicking outside.
        </Modal>
      </>
    );
  },
};

export const ScrollableModal: StoryObj = {
  parameters: { controls: { disable: true } },
  name: 'Scrollable modal',
  render: () => {
    const [open, setOpen] = useState(false);
    return (
      <>
        <p style={{ fontSize: 14 }}>When the content is taller than the window, it scrolls while the header and footer stay in place.</p>
        <Button onClick={() => setOpen(true)}>Open scrollable modal</Button>
        <Modal
          open={open}
          onClose={() => setOpen(false)}
          title="Scrollable modal"
          subtitle="Optional subtitle can be placed under title."
          contentHeight={192}
          primaryAction={{ label: 'Confirm', onClick: () => setOpen(false) }}
          secondaryAction={{ label: 'Cancel', onClick: () => setOpen(false) }}
        >
          {SCROLL_TEXT}
        </Modal>
      </>
    );
  },
};

export const WizardModal: StoryObj = {
  parameters: { controls: { disable: true } },
  name: 'Wizard modal',
  render: () => {
    const [open, setOpen] = useState(false);
    const [step, setStep] = useState(0);
    const count = 3;
    const close = () => { setOpen(false); setStep(0); };
    return (
      <>
        <p style={{ fontSize: 14 }}>For flows with several steps, the footer carries a stepper between Back and Next.</p>
        <Button onClick={() => setOpen(true)}>Open wizard modal</Button>
        <Modal
          open={open}
          onClose={close}
          title="Modal with wizard"
          subtitle="Optional subtitle can be placed under title."
          wizard={{ count, current: step }}
          secondaryAction={{ label: 'Back', disabled: step === 0, onClick: () => setStep(step - 1) }}
          primaryAction={{ label: step === count - 1 ? 'Done' : 'Next', onClick: () => (step === count - 1 ? close() : setStep(step + 1)) }}
        >
          <Paragraph />
        </Modal>
      </>
    );
  },
};
