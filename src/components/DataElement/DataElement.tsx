import React from "react";
import {useSelector, useDispatch} from "react-redux";
import {Beer} from "../../types/beersTypes";
import {useParams} from "react-router-dom";
import {Link} from 'react-router-dom';
import {BeerTitle} from '../UI/BeerTitle/BeerTitle.styled';
import BeerBubbles from "../UI/BeerBubbles/BeerBubbles";
import {BeerItem, BeerItemColImg, BeerItemColText} from './DataElement.styled';
import {addToCart} from "../../actions/cartAction";

interface Props {
    beer?: Beer;
}

const DataElement: React.FC<Props> = () => {
    const {beerId} = useParams<{ beerId: string }>();
    const beer = useSelector((state: any) => state.beersReducer.beers.find((beer: Beer) => beer.id === Number(beerId)));
    const dispatch = useDispatch();

    const handleAddToCart = () => {
        if (!beer || !beer.id) {
            return;
        }
        dispatch(addToCart(beer));
    };

    if (!beer || !beer.id) {
        return <div>No beer data found</div>;
    }

    const {name, tagline, image_url, description, abv, srm} = beer;

    return (
        <>
            <BeerBubbles/>
            <BeerTitle>Crazy Beers</BeerTitle>
            <BeerItem key={beer.id}>
                <BeerItemColImg>
                    <img src={image_url} alt={name}/>
                </BeerItemColImg>
                <BeerItemColText>
                    <h2>{name}</h2>
                    <p>Tagline: {tagline}</p>
                    <p>Description: {description}</p>
                    <p>ABV: {abv}</p>
                    <p>Prize: ${srm}</p>

                    <Link to={`/cart`} key={beer.id} onClick={handleAddToCart}>
                        <button>Add to Cart</button>
                    </Link>
                </BeerItemColText>
            </BeerItem>
        </>
    );
};

export default DataElement;
