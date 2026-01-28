import React, { SyntheticEvent } from 'react'
import CardPortfolio from '../CardPortfolio/CardPortfolio';

interface Props {
    portfolioValues?: string[];
    onPortFolioDelete: (symbol: string) => void;
}

// conditional render is done
const ListPortfolio = ({portfolioValues, onPortFolioDelete}: Props) => {
  return <>
    <h3>My Portfolio</h3>
    <ul>
        {portfolioValues && portfolioValues.map((portfolioValue) => {
            return <CardPortfolio portfolioValue={portfolioValue} onPortFolioDelete={onPortFolioDelete} />
        })}
    </ul>
  </>
}

export default ListPortfolio