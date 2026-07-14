import React from 'react';
import shadow from '../tokens/shadow';
import { fontFamily } from '../tokens/typography';

const meta = {
  title: 'Tokens/Shadow',
  parameters: {
    layout: 'padded',
  },
};

export default meta;

const Card = ({ name }) => (
  <div
    style={{
      width: 200,
      height: 180,
      background: '#fff',
      borderRadius: 24,
      boxShadow: shadow[name],
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontSize: 16,
      fontWeight: 500,
      color: '#1F2937',
    }}
  >
    shadow-{name}
  </div>
);

export const AllShadows = () => (
  <div
    style={{
      padding: 48,
      background: '#f3f4f6',
      minHeight: '100vh',
      display: 'flex',
      flexWrap: 'wrap',
      gap: 32,
      fontFamily,
    }}
  >
    {Object.keys(shadow).map((name) => (
      <Card key={name} name={name} />
    ))}
  </div>
);
