import React from 'react';

interface Props {
  onPortFolioDelete: (symbol: string) => void;
  portfolioValue: string;
}

const Deleteportfolio: React.FC<Props> = ({
  onPortFolioDelete,
  portfolioValue
}) => {
  return (
    <button
      type="button"
      onClick={() => onPortFolioDelete(portfolioValue)}
    >
      X
    </button>
  );
};

export default Deleteportfolio;
