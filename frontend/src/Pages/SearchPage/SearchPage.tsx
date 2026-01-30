import React, { ChangeEvent, SyntheticEvent, useEffect, useState } from 'react'
import { StockQuoteApiResponse } from '../../Constants/company';
import { addPortfolio, deletePortfolio, getPortfolios, searchCompanies } from '../../api';
import Search from '../../Components/Search/Search';
import ListPortfolio from '../../Components/Portfolio/ListPortfolio/ListPortfolio';
import CardList from '../../Components/CardList/CardList';

type Props = {}

const SearchPage = (props: Props) => {
    const [search, setSearch] = React.useState<string>("");
    const [portfolioValues, setPortfolioValues] = useState<string[]>([]);
    const [searchResults, setSearchResults] = useState<StockQuoteApiResponse[]>([]);
    // If you want to show errors in the UI later, keep this state and render it somewhere.
    // For now, we only log errors, so we don't need local error state.

    // Load portfolios from backend on component mount
    // synchronize with .NET
    useEffect(() => {
        const loadPortfolios = async () => {
            try {
                const portfolios = await getPortfolios();
                setPortfolioValues(portfolios);
            } catch (error) {
                console.error("Failed to load portfolios:", error);
                // optionally set error state for UI
            }
        };
        loadPortfolios();
    }, []);

    const onPortfolioCreate = async (symbol: string) => {
        try {
            await addPortfolio(symbol);
            setPortfolioValues(prev => {
                if (prev.includes(symbol)) return prev;
                return [...prev, symbol];
            });
            // optionally clear error state for UI
        } catch (error) {
            console.error("Failed to add portfolio:", error);
            // optionally set error state for UI
        }
    };

    const onPortfolioDelete = async (symbol: string) => {
        try {
            await deletePortfolio(symbol);
            setPortfolioValues(prev =>
                prev.filter(value => value !== symbol)
            );
            // optionally clear error state for UI
        } catch (error) {
            console.error("Failed to delete portfolio:", error);
            // optionally set error state for UI
        }
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
    <>
    <Search onSearchSubmit={onSearchSubmit} search={search} handleSearchChange={handleSearchChange} />
    <ListPortfolio portfolioValues={portfolioValues} onPortFolioDelete={onPortfolioDelete}/>
    <CardList searchResults={searchResults} onPortfolioCreate={onPortfolioCreate}/>
    </>
  )
}

export default SearchPage