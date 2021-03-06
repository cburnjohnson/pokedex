import React, { useState, useEffect } from 'react';
import Pokedex from './Pokedex';
import axios from 'axios';

function App() {
    const [pokemon, setPokemon] = useState([]);
    const [currentPageUrl, setCurrentPageUrl] = useState(
        'https://pokeapi.co/api/v2/pokemon'
    );
    const [nextPageUrl, setNextPageUrl] = useState();
    const [prevPageUrl, setPrevPageUrl] = useState();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setLoading(true);
        let cancel;
        axios
            .get(currentPageUrl, {
                cancelToken: new axios.CancelToken(c => (cancel = c))
            })
            .then(res => {
                setLoading(false);
                setNextPageUrl(res.data.next);
                setPrevPageUrl(res.data.previous);
                setPokemon(res.data.results.map(p => [p.name, p.url]));
            });

        return () => {
            cancel();
        };
    }, [currentPageUrl]);

    const goToNextPage = () => {
        setCurrentPageUrl(nextPageUrl);
    };

    const goToPrevPage = () => {
        setCurrentPageUrl(prevPageUrl);
    };

    return (
        <>
            <Pokedex
                pokemon={pokemon}
                goToNextPage={nextPageUrl ? goToNextPage : null}
                goToPrevPage={prevPageUrl ? goToPrevPage : null}
                loading={loading}
            />
        </>
    );
}

export default App;
