import { useEffect, useState, useMemo } from 'react';

import { getModes } from '../../api';

import CubeField from './CubeFiled';

import DefaultImage from '../../assets/img/default-image.svg';
import { GameModeProps, TitleContentProps } from '../../assets/types';

import styles from './SquaresGame.module.css';

const TITLE_CONTENT: TitleContentProps = {
  1: 'Hello! Please select the level of difficulty',
  2: 'Lets Started! Click on Start Button',
  3: 'Hover On Cubes',
};

export default function SquaresGame() {
  const [selectedCubes, setSelectedCubes] = useState<Set<string>>(new Set());
  const [availableModes, setAvailableModes] = useState<GameModeProps[]>([
    {
      id: 0,
      name: 'Pick Mode',
      field: 0,
    },
  ]);
  const [gameStatus, setGameStatus] = useState(1);
  const [numberOfCubes, setNumberOfCubes] = useState(0);

  useEffect(() => {
    getModes().then((data) => {
      setAvailableModes((defaultData) => [...defaultData, ...data]);
    });
  }, []);

  const renderTitle = useMemo(() => TITLE_CONTENT[gameStatus], [gameStatus]);

  const selectedCubsHandler = (typeAction: string, cubeDirection: string) => {
    if (typeAction === 'add')
      setSelectedCubes(
        (selectedCubes) => new Set([...selectedCubes, cubeDirection])
      );
    if (typeAction === 'delete') {
      const updatedSelectedCubes = new Set(selectedCubes);
      updatedSelectedCubes.delete(cubeDirection);
      setSelectedCubes(updatedSelectedCubes);
    }
  };

  const selectTheLevelHandler = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedIndex = e.target.selectedIndex;
    const selectedOption = e.target[selectedIndex] as HTMLOptionElement;
    const fields = selectedOption.dataset.fields;
    if (fields) {
      setNumberOfCubes(+fields);
    }
  };
  const clearAreaHandler = () => {
    setSelectedCubes(new Set());
  };

  const startTheGameHandler = () => {
    if (numberOfCubes) setGameStatus(3);
    if (gameStatus === 3) clearAreaHandler();
  };

  return (
    <div className={styles.wrapper}>
      <h1>{renderTitle}</h1>
      <div className={styles.gameBlock}>
        <div className={styles.header}>
          <select onChange={selectTheLevelHandler} defaultValue={'Pick Mode'}>
            {availableModes.map(({ id, name, field }) =>
              name === 'Pick Mode' ? (
                <option disabled key={id + name}>
                  {name}
                </option>
              ) : (
                <option
                  key={id + name}
                  data-fields={field}
                >{`${name} (${field} squares)`}</option>
              )
            )}
          </select>
          <button onClick={startTheGameHandler}>
            {gameStatus !== 3 ? 'Start' : 'Clear'}
          </button>
        </div>
        <div className={styles.squaresArea}>
          {numberOfCubes && gameStatus === 3 ? (
            <CubeField
              selectedCubes={selectedCubes}
              selectedCubsHandler={selectedCubsHandler}
              rowsAndColmsCount={numberOfCubes}
            />
          ) : (
            <img src={DefaultImage} alt={'DefaultImage'} />
          )}
        </div>
        <div className={styles.squaresTracker}>
          <h2 className={styles.trackedSquresPosition}>Hover Squares</h2>
          <div className={styles.trackedSquresPositionContainer}>
            {Array.from(selectedCubes).map((cubeDirection) => (
              <p key={cubeDirection}>{cubeDirection}</p>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
