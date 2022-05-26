import { useState } from 'react';

import ComicsList from "../components/comicsList/ComicsList";
import SingleComic from "../components/singleComic/SingleComic";

const ComicsPage = () => {

  const [selectedComic, setSelectedComic] = useState(null);

  const onComicSelected = (id) => {
      setSelectedComic(id);
  }

  return (
    <>
      <ComicsList onComicSelected={onComicSelected} />
      {/* <SingleComic comicId={selectedComic} /> */}
    </>
  )
}

export default ComicsPage;