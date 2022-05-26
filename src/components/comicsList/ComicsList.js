import './comicsList.scss';

import useMarvelService from '../../services/MarvelService';
import ErrorBoundary from '../errorBoundary/errorBoundary';
import Spinner from '../spinner/Spinner';

import { useEffect, useState } from 'react';

const ComicsList = (props) => {
    const [comicsList, setComicsList] = useState([]);
    const [offset, setOffset] = useState(210);

    const { error, loading, getAllComics } = useMarvelService();

    useEffect(() => {
        getComicsList();
    }, []);

    const onComicsListLoaded = (newComicsList) => {
        setComicsList(comicsList => [...comicsList, ...newComicsList]);
        setOffset(offset => offset + 8);
    }

    const getComicsList = (offset) => {
        getAllComics(offset)
            .then(onComicsListLoaded)
    }

    function renderComicsList(comicsArr) {
        const renderComics = comicsArr.map(comics => {
            return (
                <li 
                    className="comics__item" 
                    key={comics.id}
                    onClick={() => props.onComicSelected(comics.id)}>
                    <a href="#">
                        <img src={comics.thumbnail} alt="ultimate war" className="comics__item-img" />
                        <div className="comics__item-name">{comics.title}</div>
                        <div className="comics__item-price">{comics.price}</div>
                    </a>
                </li>
            )
        });

        return (
            <ul className="comics__grid">
                {renderComics}
            </ul>
        )
    }

    const content = renderComicsList(comicsList);
    const errorContent = error ? <ErrorBoundary /> : null;
    const spinner = loading ? <Spinner /> : null;

    return (
        <div className="comics__list">
            {content}
            {errorContent}
            {spinner}
            <button 
                className="button button__main button__long"
                onClick={() => getComicsList(offset)} >
                <div className="inner">load more</div>
            </button>
        </div>
    )
}

export default ComicsList;