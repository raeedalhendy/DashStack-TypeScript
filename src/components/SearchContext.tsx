    import React, { createContext, useContext, useState, ReactNode } from 'react';

    interface SearchContextType {
    searchQuery: string;
    setSearchQuery: (query: string) => void;
    }

    const SearchContext = createContext<SearchContextType | undefined>(undefined)

    interface SearchProviderProps {
    children: ReactNode;
    }

    export const SearchProvider: React.FC<SearchProviderProps> = ({ children }) => {
    const [searchQuery, setSearchQuery] = useState<string>('');

    return (
        <SearchContext.Provider value={{ searchQuery, setSearchQuery }}>
        {children}
        </SearchContext.Provider>
    );
    };

    // دالة لاستخدام الـ Context في أي مكون
    export const useSearch = (): SearchContextType => {
    const context = useContext(SearchContext);
    if (!context) {
        throw new Error('useSearch must be used within a SearchProvider')
    }
    return context
    }
