import { useState } from 'react';
import styles from './Cube.module.css';

type CubeProps = {
  cubePosition: string;
  selectedCubsHandler: (typeOfAction: string, cubePosition: string) => void;
};

const Cube = ({ cubePosition, selectedCubsHandler }: CubeProps) => {
  const [isSelected, setSelected] = useState(false);

  const handleMouseEnter = () => {
    if (!isSelected) {
      setSelected(true);
      selectedCubsHandler('add', cubePosition);
    } else {
      setSelected(false);
      selectedCubsHandler('delete', cubePosition);
    }
  };

  return (
    <div
      className={`${styles.cube} ${isSelected && styles.selected} `}
      onMouseEnter={handleMouseEnter}
    />
  );
};

export default Cube;
