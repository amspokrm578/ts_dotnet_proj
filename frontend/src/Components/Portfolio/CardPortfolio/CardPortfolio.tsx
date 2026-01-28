import React, {SyntheticEvent} from 'react'
import Deleteportfolio from '../DeletePortfolio/Deleteportfolio';

interface Props {
    portfolioValue: string;
    onPortFolioDelete: (symbol: string) => void;
}

const CardPortfolio = ({portfolioValue, onPortFolioDelete}: Props) => {
  return <>
    <h4>{portfolioValue}</h4>
    <Deleteportfolio onPortFolioDelete={onPortFolioDelete} portfolioValue={portfolioValue}/>
  </>
}

export default CardPortfolio