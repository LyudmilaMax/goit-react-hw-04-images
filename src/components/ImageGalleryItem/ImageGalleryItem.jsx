import { useState } from 'react';
import Modal from '../Modal/Modal';
import { ItemGallery, Img } from './ImageGalleryItem.styled';
import PropTypes from 'prop-types';

export default function ImageGalleryItem({
  imageURL,
  imageModalURL,
  description,
}) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <ItemGallery onClick={openModal}>
        <Img src={imageURL} alt={description} />
      </ItemGallery>
      {isModalOpen && (
        <Modal onClose={closeModal}>
          <Img src={imageModalURL} alt={description} />
        </Modal>
      )}
    </>
  );
}

ImageGalleryItem.propTypes = {
  imageURL: PropTypes.string.isRequired,
  imageModalURL: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
};
