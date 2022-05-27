import './SingleComicPage.scss';

import { useState, useEffect } from 'react';

import { useParams, Link } from 'react-router-dom';

import useMarvelService from '../services/MarvelService';
import ErrorMessage from '../components/errorMessage/ErrorMessage';
import Spinner from '../components/spinner/Spinner';

const SingleComic = () => {

    const { error, loading, clearError, getComics } = useMarvelService();

    const [singleComic, setSingleComic] = useState(null);

    const { comicId } = useParams();

    useEffect(() => {
        updateComicInfo(comicId)
    }, [comicId]);

    const onComicInfoLoaded = (comic) => {
        setSingleComic(comic);
    }

    const updateComicInfo = (id) => {
        clearError();
        getComics(id)
            .then(onComicInfoLoaded)
    }

    const errorMessage = error ? <ErrorMessage /> : null;
    const spinner = loading ? <Spinner /> : null;
    const content = !(loading || error || !singleComic) ? <View comic={singleComic} /> : null;

    return (
        <>
            {errorMessage}
            {spinner}
            {content}
        </>
    )
}

export default SingleComic;

const View = ({ comic }) => {

    const { thumbnail, language, description, title, pageCount, price } = comic;

    return (
        <div className="single-comic">
            <img src={thumbnail} alt="x-men" className="single-comic__img" />
            <div className="single-comic__info">
                <h2 className="single-comic__name">{title}</h2>
                <p className="single-comic__descr">{description}</p>
                <p className="single-comic__descr">{pageCount} pages</p>
                <p className="single-comic__descr">Language: {language}</p>
                <div className="single-comic__price">{price}</div>
            </div>
            <Link to='/comics' className="single-comic__back">Back to all</Link>
        </div>
    )
}