import React, { JSX } from 'react';
import './Card.css';
import {StockQuoteApiResponse} from '../../Constants/company';
import { COMPANY_DOMAINS } from '../../Constants/companyDomain';
import AddPortfolio from '../Portfolio/AddPortfolio/AddPortfolio';
import { Link } from 'react-router-dom';


interface Props {
    id: string;
    searchResult: StockQuoteApiResponse;
    onPortfolioCreate: (symbol: string) => void;
};

const resolveCompanyDomain = (symbol: string): string => {
  return COMPANY_DOMAINS[symbol as keyof typeof COMPANY_DOMAINS]
    ?? COMPANY_DOMAINS.DEFAULT;
};

const Card : React.FC<Props> = ({id, searchResult, onPortfolioCreate}: Props) : JSX.Element => {
  //const domain = resolveCompanyDomain(searchResult.symbol)
  const domain = resolveCompanyDomain(searchResult.symbol);
  return (
    <div className="card">
      <img
        src={
          domain
            ? `https://img.logo.dev/${domain}?token=pk_QHbJkp_4ShyQUzmGJBdNKQ`
            : "/logo.svg"
        }
        alt={`${searchResult.name} logo`}
      />
      <div className="details">
        <Link to={`/company/${searchResult.symbol}`}>{searchResult.name} ({searchResult.symbol})</Link>
        <p>${searchResult.currency}</p>
      </div>
      <p className="info">{searchResult.exchange} - {searchResult.mic_code}</p>
      <AddPortfolio onPortfolioCreate={onPortfolioCreate} symbol={searchResult.symbol}/>
    </div>
  );
};

export default Card;