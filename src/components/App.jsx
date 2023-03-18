import { useState } from 'react';
import { Toaster } from 'react-hot-toast';
import Searchbar from './Searchbar';
import ImageGallery from './ImageGallery';
import { Container } from './App.styled';

export const App = () => {
  const [keyword, setKeyword] = useState('');

  return (
    <Container>
      <Toaster
        toastOptions={{
          position: 'top-right',
          duration: 1500,
          style: {
            background: '#363636',
            color: '#fff',
          },
        }}
      />
      <Searchbar onSubmit={setKeyword} />
      <ImageGallery keyword={keyword} />
    </Container>
  );
};
