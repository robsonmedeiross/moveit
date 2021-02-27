import { useContext } from 'react';
import { ChalengedContext } from '../contexts/ChalengedContext';
import styles from '../styles/components/CompletedChallenges.module.css';

export function CompletedChallenges() {
    const { chalengedCompleted } = useContext(ChalengedContext);
 

    return (
        <div className={styles.completedChallengesContainer}>
            <span>Desafios completos</span>
            <span>{chalengedCompleted}</span>
        </div>
    );
}
