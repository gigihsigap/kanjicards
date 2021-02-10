import React from 'react';

interface Props {
  children?: (data: {
    count: number;
  }) => JSX.Element | null;
}

const CompleteCard: React.FC<{}> = ({children}) => {
  return (
    <div>
      <h1>KANJI</h1>
      <h2>HIRAGANA</h2>
      <h3>TRANSLATE</h3>
    </div>
  );
}

export default CompleteCard;