import { useState, useRef, useEffect } from 'react';
import { ImagesApi } from '../../services/pixabayApi';
import ImageGalleryItem from '../ImageGalleryItem';
import ButtonLoadMore from '../Button/Button';
import Loader from '../Loader';
import { ListGallery, Text } from './ImageGallery.styled';
import PropTypes from 'prop-types';

export default function ImageGallery({ keyword }) {
  const [listImages, setListImages] = useState([]);
  const [page, setPage] = useState(1);
  const [status, setStatus] = useState('empty');
  const [loadLastPage, setLoadLastPage] = useState(false);
  const [error, setError] = useState(null);

  let keywordRef = useRef(keyword);

  const loadNextPage = () => {
    setPage(page + 1);
  };

  useEffect(() => {
    if (!keyword) {
      return;
    }

    if (keywordRef.current !== keyword) {
      setListImages([]);
      setPage(1);
      if (page !== 1) {
        // Пропустити поточнне завантаження
        return;
      }
    }

    setStatus('loading');
    const per_page = 12;
    ImagesApi(keyword, page, per_page)
      .then(result => {
        if (result.total === 0) {
          return Promise.reject(
            new Error(`The entered value "${keyword}" was not found`)
          );
        }
        setListImages(prev => [...prev, ...result.hits]);
        setLoadLastPage(Math.ceil(result.totalHits / per_page) <= page);
        setStatus('success');
      })
      .catch(error => {
        setStatus('error');
        setError(error);
      });
  }, [page, keyword]);

  // Цей useEffect має бути останнім і в ньому ми запамятовуємо останнє значення
  useEffect(() => {
    keywordRef.current = keyword;
  }, [keyword]);

  if (status === 'empty') {
    return;
  }

  if (status === 'error') {
    return <Text>{error.message}</Text>;
  }

  if (status === 'success' || status === 'loading') {
    return (
      <>
        <ListGallery>
          {listImages.length > 0 &&
            listImages.map(item => (
              <ImageGalleryItem
                key={item.id}
                imageURL={item.webformatURL}
                imageModalURL={item.largeImageURL}
                description={item.tags}
              />
            ))}
        </ListGallery>
        {status === 'loading' && <Loader />}
        {listImages.length !== 0 && status !== 'loading' && !loadLastPage && (
          <ButtonLoadMore funcLoadMore={loadNextPage} />
        )}
      </>
    );
  }
}

ImageGallery.propTypes = {
  keyword: PropTypes.string.isRequired,
};
