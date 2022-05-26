import './singleComic.scss';

import { useState, useEffect } from 'react';

import useMarvelService from '../../services/MarvelService';
import ErrorMessage from '../errorMessage/ErrorMessage';
import Spinner from '../spinner/Spinner';
import Skeleton from '../skeleton/Skeleton';

const SingleComic = (props) => {

    const { error, loading, getComics } = useMarvelService();

    const [singleComic, setSingleComic] = useState(null);

    useEffect(() => {
        updateComicInfo(props.comicId)
    }, [props.comicId]);

    const onComicInfoLoaded = (comic) => {
        setSingleComic(comic);
    }

    const updateComicInfo = (id) => {
        if (!id) {
            return;
        }
        getComics(id)
            .then(onComicInfoLoaded)
    }

    const errorMessage = error ? <ErrorMessage /> : null;
    const spinner = loading ? <Spinner /> : null;
    const content = !(loading || error || !singleComic) ? <View comic={singleComic} /> : null;
    const skeleton = singleComic || loading || error ? null : <Skeleton />;

    return (
        <>
            {errorMessage}
            {spinner}
            {content}
            {skeleton}
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
            <a href="#" className="single-comic__back">Back to all</a>
        </div>
    )
}