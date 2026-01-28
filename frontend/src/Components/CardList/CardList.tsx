import React, {SyntheticEvent} from 'react'
import Card from '../Card/Card';
import { CompanySearch, StockQuoteApiResponse } from '../../Constants/company';
import {v4 as uuid} from "uuid";

type Props = {
  searchResults: StockQuoteApiResponse[];
  onPortfolioCreate: (symbol: string) => void;
}

const CardList = ({searchResults, onPortfolioCreate}: Props) => {
  return <>
    {searchResults.length > 0 ? (
      searchResults.map((result) => {
        return <Card id={result.symbol} key={uuid()} searchResult={result} onPortfolioCreate={onPortfolioCreate}/>
      })
    ): (
      <h1>No result</h1>
    )}
  </>;
}

export default CardList;