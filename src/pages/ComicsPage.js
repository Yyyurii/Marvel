import { useState } from 'react';

import ComicsList from "../components/comicsList/ComicsList";

const ComicsPage = () => {

  const [selectedComic, setSelectedComic] = useState(null);

  const onComicSelected = (id) => {
      setSelectedComic(id);
  }

  return (
      <ComicsList onComicSelected={onComicSelected} />
  )
}

export default ComicsPage;