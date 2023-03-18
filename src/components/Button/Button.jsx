import { useState, useEffect } from 'react';
import { Button } from './Button.styled';
import PropTypes from 'prop-types';

export default function ButtonLoadMore({ funcLoadMore }) {
  const [showButton, setShowButton] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setShowButton(true);
    }, 200);
  });

  return (
    <Button
      type="button"
      style={{ display: !showButton ? 'none' : 'block' }}
      onClick={funcLoadMore}
    >
      Load more
    </Button>
  );
}

ButtonLoadMore.propTypes = {
  funcLoadMore: PropTypes.func.isRequired,
};
