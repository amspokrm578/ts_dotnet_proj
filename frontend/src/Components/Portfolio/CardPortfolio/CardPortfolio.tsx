import React from 'react'
import Deleteportfolio from '../DeletePortfolio/Deleteportfolio';
import { Link } from 'react-router-dom';

interface Props {
    portfolioValue: string;
    onPortFolioDelete: (symbol: string) => void;
}

const CardPortfolio = ({portfolioValue, onPortFolioDelete}: Props) => {
  return <>
    <Link to={`/company/${portfolioValue}`} className="pt-6 text-xl font-bold">{portfolioValue}</Link>
    <Deleteportfolio onPortFolioDelete={onPortFolioDelete} portfolioValue={portfolioValue}/>
  </>
}

export default CardPortfolio