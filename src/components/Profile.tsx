import { useContext } from 'react';
import { ChalengedContext } from '../contexts/ChalengedContext';
import styles from '../styles/components/Profile.module.css';

export function Profile() {

    const { level } = useContext(ChalengedContext);
    return (
        <div className={styles.profileContainer}>
            <img src="https://github.com/robsonmedeiross.png" alt="Robson Medeiros" />
            <div>
                <strong>Robson Medeiros</strong>
                <p>
                    <img src="icons/level.svg" alt=""/>
                    Level {level}
                </p>
            </div>
        </div>
    );
}