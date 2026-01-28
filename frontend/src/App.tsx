import React, { ChangeEvent, SyntheticEvent, useState } from 'react';
import logo from './logo.svg';
import './App.css';
import CardList from './Components/CardList/CardList';
import Search from './Components/Search/Search';
import { CompanySearch, StockQuoteApiResponse } from './Constants/company';
import { searchCompanies } from './api';
import ListPortfolio from './Components/Portfolio/ListPortfolio/ListPortfolio';
import './tailwind.css';



function App() {
    // utlize state to manage the input value and expects a string type
    // string is a primitive type in TypeScript representing textual data
    const [search, setSearch] = React.useState<string>("");
    const [portfolioValues, setPortfolioValues] = useState<string[]>([]);
    const [searchResults, setSearchResults] = useState<StockQuoteApiResponse[]>([]);
    const [serverError, setServerError] = useState<string>("");

    const onPortfolioCreate = (symbol: string) => {
      setPortfolioValues(prev => {
        if (prev.includes(symbol)) return prev;
        return [...prev, symbol];
      });
    };

    const onPortfolioDelete = (symbol: string) => {
      setPortfolioValues(prev =>
        prev.filter(value => value !== symbol)
      );
    };


    const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
        e.preventDefault();
        setSearch(e.target.value);
        console.log(e);
    };
    // handles all events as well as type checking
    // with the SyntehticEvent type from React
    const onSearchSubmit = async (e: SyntheticEvent) => {
      e.preventDefault();
        const result = await searchCompanies(search);
        if(typeof result === "string"){
            console.log("Results:", result);
        } else if(Array.isArray(result)){
          setSearchResults(result);
          console.log("Searching for:", e);
        }
        else {
          setSearchResults([result]);
          console.log(result);
        }
}
return (
        <div className="App">
        <Search onSearchSubmit={onSearchSubmit} search={search} handleSearchChange={handleSearchChange} />
        <ListPortfolio portfolioValues={portfolioValues} onPortFolioDelete={onPortfolioDelete}/>
        <CardList searchResults={searchResults} onPortfolioCreate={onPortfolioCreate}/>
      
      </div>
    );
}

export default App;
