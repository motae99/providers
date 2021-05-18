import React from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';

import {MARGIN} from './config';
import Tile from './tile';
import SortableList from './sortableList';

const API_KEY = '563492ad6f91700001000001d7bc6ad796bf4db4a876711a1a688b67';
const API_URL =
  'https://api.pexels.com/v1/search?query=Party&orientation=portrait&size=small&per_page=20';

const IMAGE_SIZE = 80;
const SPACING = 10;
const fetchImagesFromPexel = async () => {
  const data = await fetch(API_URL, {
    headers: {
      Authorization: API_KEY,
    },
  });
  const {photos} = await data.json();
  return photos;
};

const Chrome = () => {
  const [images, setImages] = React.useState(null);
  const [current, setCurrent] = React.useState(null);
  React.useEffect(() => {
    const fetchImages = async () => {
      const Images = await fetchImagesFromPexel();
      setImages(Images);
    };
    fetchImages();
  }, []);

  if (!images) {
    return null;
  }

  console.log('images', images.src);

  return (
    <SafeAreaView
      style={{flex: 1, backgroundColor: 'white', paddingHorizontal: MARGIN}}>
      <SortableList
        editing={true}
        onDragEnd={positions => {
          console.log(positions);
          setCurrent(positions);
          // console.log(JSON.stringify(positions, null, 2));
          // console.log(JSON.stringify(positions, null, 2));
          // console.log('Drag Ended we Can do Resort now');
        }}>
        {images.map((item, index) => (
          <Tile
            onLongPress={() => true}
            key={item.src.portrait}
            id={item.src.portrait}
            item={item}
          />
        ))}
      </SortableList>
    </SafeAreaView>
  );
};

export default Chrome;
