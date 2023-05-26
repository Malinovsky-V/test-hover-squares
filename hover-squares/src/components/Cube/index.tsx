import styles from './Cube.module.css';

type CubeProps = {
  isSelected: boolean;
  cubePosition: string;
  selectedCubsHandler: (typeOfAction: string, cubePosition: string) => void;
};

const Cube = ({ isSelected, cubePosition, selectedCubsHandler }: CubeProps) => {
  const handleMouseEnter = () => {
    if (!isSelected) {
      selectedCubsHandler('add', cubePosition);
    } else {
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
