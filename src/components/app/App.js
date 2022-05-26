import AppHeader from "../appHeader/AppHeader";
import RandomChar from "../randomChar/RandomChar";
import CharList from "../charList/CharList";
import CharInfo from "../charInfo/CharInfo";
import ComicsList from "../comicsList/ComicsList";
import ErrorBoundary from "../errorBoundary/errorBoundary";

import decoration from '../../resources/img/vision.png';
import { useState } from "react";

import {
    BrowserRouter as Router, Routes,
    Route
} from "react-router-dom";

const App = () => {

    const [selectedChar, setSelectedChar] = useState(null);

    const onCharSelected = (id) => {
        setSelectedChar(id);
    }

    return (
        <Router>
            <div className="app">
                <AppHeader />
                <main>
                    <Routes>
                        <Route path="/" element={<RandomChar />} />
                    </Routes>
                    <div className="char__content">
                        <CharList onCharSelected={onCharSelected} />
                        <ErrorBoundary>
                            <CharInfo charId={selectedChar} />
                        </ErrorBoundary>
                    </div>
                    <img className="bg-decoration" src={decoration} alt="vision" />
                </main>
                <ComicsList />
            </div>
        </Router>
    )

}

export default App;