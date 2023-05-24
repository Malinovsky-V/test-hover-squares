import Cube from '../../../components/Cube';

import styles from './CubeField.module.css';

type CubeFieldProps = {
  rowsAndColmsCount: number;
  selectedCubsHandler: (typeOfAction:string, cubeDirection: string) => void;
};

const CubeField = ({ rowsAndColmsCount, selectedCubsHandler }: CubeFieldProps) => {
  const cubeRows = [];
  for (let row = 0; row < rowsAndColmsCount; row++) {
    const cubes = [];
    for (let col = 0; col < rowsAndColmsCount; col++) {
      cubes.push(
        <Cube
          selectedCubsHandler={selectedCubsHandler}
          cubePosition={`Row ${row} - Col ${col}`}
          key={`${row}-${col}`}
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
