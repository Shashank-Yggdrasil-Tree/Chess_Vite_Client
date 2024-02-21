import React, { useEffect, useMemo, useRef, useState } from 'react';
import { Box, Input } from '@mui/material';
import { useSearchPlayersQuery } from '../../../features/players/playersApiSlice';
import PlayersList from './PlayersList';

const SearchPlayers = () => {
	const [players, setPlayers] = useState([]);
	const [query, setQuery] = useState('');
	const [skip, setSkip] = useState(true);
	const [cachedResults, setCachedResults] = useState({});

	const {
		data: searchResultsData,
		isLoading: isSearchResultLoading,
		isSuccess: isSearchResultSuccess,
		isFetching: isSearchResultFetching,
	} = useSearchPlayersQuery({ username: query, limit: 6 }, { skip });

	// Update in-memory cache when new searchResultsData is fetched
	useEffect(() => {
		// //console.log('searchResultsData:', searchResultsData);
		if (isSearchResultSuccess) {
			setCachedResults((prevCache) => ({ ...prevCache, [query]: searchResultsData }));
		}
	}, [isSearchResultSuccess, query, searchResultsData]);

	const handleCachedSearch = () => {
		if (cachedResults[query]) {
			setPlayers(cachedResults[query]);
		} else {
			setSkip(false);
		}
	};

	useEffect(() => {
		if (query.length < 3) {
			setPlayers([]);
			setCachedResults({});
		}
	}, [query]);

	const handleChange = (e) => {
		const newQuery = e.target.value;
		setQuery(newQuery);

		if (newQuery.length >= 3) {
			handleCachedSearch();
		}
	};

	return (
		<>
			<Box className="flex gap-1 justify-center mt-4">
				<span className="select-none w-8 opacity-55">
					<img src="svg_icons/search.svg" alt="hand shake" className="pointer-events-none" />
				</span>
				<p
					className="select-none pointer-events-none text-center flex align-center text-3xl text-[#5e636f] opacity-85 m-[1px]"
					style={{ fontFamily: "'NTR', sans-serif" }}
				>
					Search Players
				</p>
			</Box>
			<Box className="w-full py-2 ">
				<Input
					id="username"
					autoComplete="off"
					value={query}
					placeholder="Search by username"
					onChange={handleChange}
					type="search"
					className="text-white bg-[#3c3b39] mb-2 w-full p-2 rounded caret-white"
					pattern="/^[a-z][a-z0-9_\-]{0,34}$/"
				/>
				<Box className="overflow-y-scroll no-scrollbar h-full">
					<PlayersList
						players={players}
						isSearchResultSuccess={isSearchResultSuccess}
						isSearchResultFetching={isSearchResultFetching}
						query={query}
					/>
				</Box>
			</Box>
		</>
	);
};

export default SearchPlayers;
