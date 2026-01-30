import React from 'react'
import Card from '../Card/Card';
import { StockQuoteApiResponse } from '../../Constants/company';

type Props = {
  searchResults: StockQuoteApiResponse[];
  onPortfolioCreate: (symbol: string) => void;
}

const CardList = ({searchResults, onPortfolioCreate}: Props) => {
  return <>
    {searchResults.length > 0 ? (
      searchResults.map((result) => {
        return <Card id={result.symbol} key={result.symbol} searchResult={result} onPortfolioCreate={onPortfolioCreate}/>
      })
    ): (
      <h1>No result</h1>
    )}
  </>;
}

export default CardList;