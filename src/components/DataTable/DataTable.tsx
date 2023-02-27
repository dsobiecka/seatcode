import {useState, useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {Dispatch} from 'redux';
import {fetchBeers} from '../../actions/beersActions';
import {Beer} from '../../types/beersTypes';
import BeerBubbles from '../UI/BeerBubbles/BeerBubbles';
import SearchBeer from '../UI/SearchBeer/SearchBeer';
import {Link} from 'react-router-dom';
import {BeerTitle} from '../UI/BeerTitle/BeerTitle.styled';
import {BeerItems, BeerItem, BeerName, BeerImg, BeerAbv, BeerTagline, ButtonsBeers} from './DataTable.styled';

const DataTable = () => {
    const dispatch: Dispatch<any> = useDispatch();
    const beers = useSelector((state: any) => state.beersReducer.beers);
    const [page, setPage] = useState(1);
    const [filteredBeers, setFilteredBeers] = useState(beers);
    const [searchTerm, setSearchTerm] = useState('');
    const perPage = 10;

    useEffect(() => {
        dispatch<any>(fetchBeers(page, perPage));
    }, [dispatch, page, perPage]);

    useEffect(() => {
        const filtered = beers.filter((beer: Beer) => {
            return (
                beer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                beer.description.toLowerCase().includes(searchTerm.toLowerCase())
            );
        });

        setFilteredBeers(filtered);
    }, [beers, searchTerm]);

    const nextPage = () => {
        setPage((page) => page + 1);
    };

    const prevPage = () => {
        setPage((page) => page - 1);
    };

    useEffect(() => {
        setFilteredBeers(beers);
        setPage(1);
    }, [beers]);

    const handleSearch = (searchTerm: string) => {
        setSearchTerm(searchTerm);
        setPage(1);
    };

    return (
        <>
            <BeerBubbles/>
            <SearchBeer onSearch={handleSearch}/>
            <BeerTitle>Crazy Beers</BeerTitle>
            <BeerItems>
                {filteredBeers.slice((page - 1) * perPage, page * perPage).map((beer: Beer) => (
                    <Link to={`/dataelement/${beer.id}`} key={beer.id}>
                        <BeerItem>
                            <BeerName>{beer.name}</BeerName>
                            <BeerImg src={beer.image_url}/>
                            <BeerAbv>
                                {beer.abv}% <span>abv</span>
                            </BeerAbv>
                            <BeerTagline>{beer.tagline}</BeerTagline>
                        </BeerItem>
                    </Link>
                ))}
            </BeerItems>
            <ButtonsBeers>
                <button onClick={prevPage} disabled={page === 1}>
                    Prev
                </button>
                <button onClick={nextPage} disabled={!filteredBeers || filteredBeers.length < perPage}>
                    Next
                </button>
            </ButtonsBeers>
        </>
    );
};

export default DataTable;
