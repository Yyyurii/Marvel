import AppHeader from "../appHeader/AppHeader";

import { MainPage, ComicsPage, Page404 } from "../../pages";
import SingleComic from "../../pages/SingleComicPage";

import {
    BrowserRouter as Router, Routes,
    Route
} from "react-router-dom";

const App = () => {

    return (
        <Router>
            <div className="app">
                <AppHeader />
                <main>
                    <Routes>
                        <Route path="/" element={<MainPage />} />
                        <Route path="/comics" element={<ComicsPage />} />
                        <Route path="/comics/:comicId" element={<SingleComic />} />
                        <Route path="*" element={<Page404 />} />
                    </Routes>
                </main>
            </div>
        </Router>
    )

}

export default App;