import React, { CSSProperties } from 'react';

interface ProgressBarProps {
  bgcolor: string,
  completed: number
}

const ProgressBar: React.FC<ProgressBarProps> = (props: ProgressBarProps) => {
  const { bgcolor, completed } = props;

  const containerStyles:CSSProperties = {
    height: '20px',
    width: '700px',
    backgroundColor: "#e0e0de",
    borderRadius: 50,
    left: '50%',
    margin: '0 1.5em',
  }

  const fillerStyles:CSSProperties = {
    height: '100%',
    width: `${completed}%`,
    backgroundColor: bgcolor,
    borderRadius: 'inherit',
    textAlign: 'right',
    transition: 'width 1s',
  }

  return (
      <div style={containerStyles}>
        <div style={fillerStyles}>
        </div>
      </div>
  );
}

export default ProgressBar;