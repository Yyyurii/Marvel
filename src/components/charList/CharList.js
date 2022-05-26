import { useState, useEffect } from 'react';
import Spinner from '../spinner/Spinner';
import ErrorMessage from '../errorMessage/ErrorMessage';
import useMarvelService from '../../services/MarvelService';
import './charList.scss';

const CharList = (props) => {

    const [charList, setCharList] = useState([]);
    const [offset, setOffset] = useState(210);

    const { error, loading, getAllCharacters } = useMarvelService();

    useEffect(() => {
        getCharList();
    }, [])

    const onCharListLoaded = (newCharList) => {
        setCharList(charList => [...charList, ...newCharList]);
        setOffset(offset => offset + 9);
    }

    const getCharList = (offset) => {
        getAllCharacters(offset)
            .then(onCharListLoaded)
    }

    function renderCharList(arr) {
        const charListItems = arr.map(item => {
            return (
                <li
                    className="char__item"
                    key={item.id}
                    onClick={() => props.onCharSelected(item.id)}>
                    <img src={item.thumbnail} alt={item.name} />
                    <div className="char__name">{item.name}</div>
                </li>
            )
        })

        return (
            <ul className="char__grid" >
                {charListItems}
            </ul >
        )
    }

    const charListItems = renderCharList(charList);
    const spinner = loading ? <Spinner /> : null;
    const errorMessage = error ? <ErrorMessage /> : null;

    return (
        <div className="char__list" >
            {spinner}
            {errorMessage}
            {charListItems}
            <button
                className="button button__main button__long"
                onClick={() => getCharList(offset)}>
                <div className="inner">load more</div>
            </button>
        </div>
    )

}

export default CharList;