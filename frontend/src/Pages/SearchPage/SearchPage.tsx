import React, { ChangeEvent, SyntheticEvent, useEffect, useState, useRef } from 'react'
import { StockQuoteApiResponse } from '../../Constants/company';
import { addPortfolio, deletePortfolio, getPortfolios, searchCompanies } from '../../api';
import ListPortfolio from '../../Components/Portfolio/ListPortfolio/ListPortfolio';
import CardList from '../../Components/CardList/CardList';
import { COMPANY_DOMAINS } from '../../Constants/companyDomain';

type Props = {}

const SearchPage = (props: Props) => {
    const [search, setSearch] = useState<string>("");
    const [portfolioValues, setPortfolioValues] = useState<string[]>([]);
    const [searchResults, setSearchResults] = useState<StockQuoteApiResponse[]>([]);
    const [suggestions, setSuggestions] = useState<string[]>([]);
    const [showSuggestions, setShowSuggestions] = useState<boolean>(false);
    const [isSearching, setIsSearching] = useState<boolean>(false);
    const searchInputRef = useRef<HTMLInputElement>(null);
    const suggestionsRef = useRef<HTMLDivElement>(null);

    // Get all available ticker symbols from COMPANY_DOMAINS
    const allTickers = Object.keys(COMPANY_DOMAINS).filter(key => key !== 'DEFAULT');

    // Load portfolios from backend on component mount
    useEffect(() => {
        const loadPortfolios = async () => {
            try {
                const portfolios = await getPortfolios();
                setPortfolioValues(portfolios);
            } catch (error) {
                console.error("Failed to load portfolios:", error);
            }
        };
        loadPortfolios();
    }, []);

    // Handle search input change with autocomplete
    const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value.toUpperCase();
        setSearch(value);

        if (value.length > 0) {
            // Filter tickers that match the search query
            const filtered = allTickers.filter(ticker => 
                ticker.startsWith(value)
            ).slice(0, 8); // Limit to 8 suggestions
            setSuggestions(filtered);
            setShowSuggestions(filtered.length > 0);
        } else {
            setSuggestions([]);
            setShowSuggestions(false);
        }
    };

    // Handle suggestion click
    const handleSuggestionClick = (ticker: string) => {
        setSearch(ticker);
        setShowSuggestions(false);
        handleSearch(ticker);
    };

    // Handle search submission
    const handleSearch = async (query?: string) => {
        const searchQuery = query || search;
        if (!searchQuery.trim()) return;

        setIsSearching(true);
        setShowSuggestions(false);
        
        try {
            const result = await searchCompanies(searchQuery);
            if (typeof result === "string") {
                console.log("Results:", result);
                setSearchResults([]);
            } else if (Array.isArray(result)) {
                setSearchResults(result);
            } else {
                setSearchResults([result]);
            }
        } catch (error) {
            console.error("Search error:", error);
            setSearchResults([]);
        } finally {
            setIsSearching(false);
        }
    };

    const onSearchSubmit = async (e: SyntheticEvent) => {
        e.preventDefault();
        await handleSearch();
    };

    const onPortfolioCreate = async (symbol: string) => {
        try {
            await addPortfolio(symbol);
            setPortfolioValues(prev => {
                if (prev.includes(symbol)) return prev;
                return [...prev, symbol];
            });
        } catch (error) {
            console.error("Failed to add portfolio:", error);
        }
    };

    const onPortfolioDelete = async (symbol: string) => {
        try {
            await deletePortfolio(symbol);
            setPortfolioValues(prev =>
                prev.filter(value => value !== symbol)
            );
        } catch (error) {
            console.error("Failed to delete portfolio:", error);
        }
    };

    // Close suggestions when clicking outside
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (
                suggestionsRef.current &&
                !suggestionsRef.current.contains(event.target as Node) &&
                searchInputRef.current &&
                !searchInputRef.current.contains(event.target as Node)
            ) {
                setShowSuggestions(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Centered Search Section */}
            <div className="flex flex-col items-center justify-start pt-12 px-4">
                <div className="w-full max-w-2xl relative">
                    <form onSubmit={onSearchSubmit} className="relative">
                        <div className="relative">
                            <input
                                ref={searchInputRef}
                                type="text"
                                value={search}
                                onChange={handleSearchChange}
                                placeholder="Search for a stock ticker (e.g., AAPL, MSFT, GOOGL)..."
                                className="w-full px-6 py-4 text-lg border-2 border-gray-300 rounded-lg focus:outline-none focus:border-lightBlue focus:ring-2 focus:ring-lightBlue/20 transition-all duration-200 shadow-sm"
                            />
                            <button
                                type="submit"
                                disabled={isSearching}
                                className="absolute right-3 top-1/2 -translate-y-1/2 px-6 py-2 bg-lightBlue text-white rounded-md hover:bg-darkBlue focus:outline-none focus:ring-2 focus:ring-lightBlue/50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200 font-semibold"
                            >
                                {isSearching ? 'Searching...' : 'Search'}
                            </button>
                        </div>

                        {/* Autocomplete Dropdown */}
                        {showSuggestions && suggestions.length > 0 && (
                            <div
                                ref={suggestionsRef}
                                className="absolute z-50 w-full mt-2 bg-white border-2 border-gray-200 rounded-lg shadow-xl max-h-64 overflow-y-auto"
                            >
                                {suggestions.map((ticker) => (
                                    <button
                                        key={ticker}
                                        type="button"
                                        onClick={() => handleSuggestionClick(ticker)}
                                        className="w-full px-6 py-3 text-left hover:bg-lightBlue/10 hover:text-lightBlue transition-colors duration-150 border-b border-gray-100 last:border-b-0 focus:outline-none focus:bg-lightBlue/10"
                                    >
                                        <div className="flex items-center justify-between">
                                            <span className="font-semibold text-gray-800">{ticker}</span>
                                            <span className="text-sm text-gray-500">{COMPANY_DOMAINS[ticker]}</span>
                                        </div>
                                    </button>
                                ))}
                            </div>
                        )}
                    </form>
                </div>
            </div>

            {/* Portfolio Section */}
            <div className="max-w-6xl mx-auto px-4 mt-8">
                <ListPortfolio 
                    portfolioValues={portfolioValues} 
                    onPortFolioDelete={onPortfolioDelete}
                />
            </div>

            {/* Search Results Section */}
            <div className="max-w-6xl mx-auto px-4 mt-8 pb-12">
                {searchResults.length > 0 ? (
                    <div className="mb-4">
                        <h2 className="text-2xl font-bold text-gray-800 mb-4">
                            Search Results
                        </h2>
                        <CardList 
                            searchResults={searchResults} 
                            onPortfolioCreate={onPortfolioCreate}
                        />
                    </div>
                ) : search && !isSearching ? (
                    <div className="text-center py-12">
                        <p className="text-gray-500 text-lg">No results found. Try searching for a valid ticker symbol.</p>
                    </div>
                ) : null}
            </div>
        </div>
    );
}

export default SearchPage;