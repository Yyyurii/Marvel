import './charInfo.scss';
import { useState, useEffect } from 'react';

import Spinner from '../spinner/Spinner';
import ErrorMessage from '../errorMessage/ErrorMessage';
import useMarvelService from '../../services/MarvelService';
import Skeleton from '../skeleton/Skeleton';

const CharInfo = (props) => {

    const [char, setChar] = useState(null);

    const { error, loading, getCharacter } = useMarvelService();

    useEffect(() => {
        updateCharInfo(props.charId)
    }, [props.charId]);

    const onCharInfoLoaded = (char) => {
        setChar(char);
    }

    const updateCharInfo = (id) => {
        if (!id) {
            return;
        }
        getCharacter(id)
            .then(onCharInfoLoaded)
    }

    const errorMessage = error ? <ErrorMessage /> : null;
    const spinner = loading ? <Spinner /> : null;
    const content = !(loading || error || !char) ? <View char={char} /> : null;
    const skeleton = char || loading || error ? null : <Skeleton />;

    return (
        <div className="char__info">
            {errorMessage}
            {spinner}
            {content}
            {skeleton}
        </div>
    )

}

export default CharInfo;

const View = ({ char }) => {

    const { name, description, thumbnail, homepage, wiki, comics } = char;

    return (
        <>
            <div className="char__basics">
                <img src={thumbnail} alt="abyss" />
                <div>
                    <div className="char__info-name">{name}</div>
                    <div className="char__btns">
                        <a href={homepage} className="button button__main">
                            <div className="inner">homepage</div>
                        </a>
                        <a href={wiki} className="button button__secondary">
                            <div className="inner">Wiki</div>
                        </a>
                    </div>
                </div>
            </div>
            <div className="char__descr">
                {description}
            </div>
            <div className="char__comics">Comics:</div>
            <ul className="char__comics-list">
                {
                    comics.slice(0, 10).map((item, index) => {
                        return (
                            <li className="char__comics-item" key={index}>
                                {item.name}
                            </li>
                        )
                    })
                }
            </ul>
        </>
    )
}