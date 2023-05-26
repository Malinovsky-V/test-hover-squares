import Cube from '../../../components/Cube';

import styles from './CubeField.module.css';

type CubeFieldProps = {
  selectedCubes: Set<string>;
  rowsAndColmsCount: number;
  selectedCubsHandler: (typeOfAction: string, cubeDirection: string) => void;
};

const CubeField = ({
  selectedCubes,
  rowsAndColmsCount,
  selectedCubsHandler,
}: CubeFieldProps) => {
  const cubeRows = [];
  for (let row = 0; row < rowsAndColmsCount; row++) {
    const cubes = [];
    for (let col = 0; col < rowsAndColmsCount; col++) {
      const cubePosition = `Row ${row} - Col ${col}`;
      const isSelected = selectedCubes.has(cubePosition);
      cubes.push(
        <Cube
          selectedCubsHandler={selectedCubsHandler}
          cubePosition={cubePosition}
          key={cubePosition}
          isSelected={isSelected}
        />
      );
    }
    cubeRows.push(
      <div className={styles.row} key={row}>
        {cubes}
      </div>
    );
  }

  return <div className={styles.wrapper}>{cubeRows}</div>;
};

export default CubeField;
