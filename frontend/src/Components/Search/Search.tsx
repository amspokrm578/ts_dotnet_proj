/*
Search Component

*/

import React, { ChangeEvent, JSX } from 'react'

interface Props {
    search: string | undefined;
    onSearchSubmit: (e: ChangeEvent<HTMLFormElement>) => void;
    handleSearchChange: (e: ChangeEvent<HTMLInputElement>) => void;
}
const Search: React.FC<Props> = ({ search, onSearchSubmit, handleSearchChange }: Props) :JSX.Element => {
  return (
    <>
    <form onSubmit={onSearchSubmit}>
      <input value={search} onChange={(e) => handleSearchChange(e)} />
    </form>
    </>
  )
}

export default Search