interface Props {
  symbol: string;
  onPortfolioCreate: (symbol: string) => void;
}

const AddPortfolio: React.FC<Props> = ({ symbol, onPortfolioCreate }) => {
  return (
    <button
      type="button"
      onClick={() => onPortfolioCreate(symbol)}
    >
      Add
    </button>
  );
};

export default AddPortfolio;
