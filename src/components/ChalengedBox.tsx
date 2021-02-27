import { useContext, useState } from 'react';
import { ChalengedContext } from '../contexts/ChalengedContext';
import { CountDownContext } from '../contexts/CountDownContext';
import styles from '../styles/components/ChalengedBox.module.css';

export function ChalengedBox() {
    const { activeChalenge, resetChalenge, completeChalenge} = useContext(ChalengedContext);
    const { resetCountDown } = useContext(CountDownContext);

    function handleChalengeSuceeded(){
        completeChalenge();
        resetCountDown();
    }

    function handleChalengeFaile(){
        resetChalenge();
        resetCountDown();
    }

    return(
        <div className={styles.chalengedBoxContainer}>
            {activeChalenge ? (
                <div className={styles.chalengedBoxActive}>
                    <header>Ganhe {activeChalenge.amount} xp</header>

                    <main>
                         <img src={`icons/${activeChalenge.type}.svg`} alt="Image body"/>
                        <strong>Novo desafio</strong>
                        <p>{activeChalenge.description}</p>
                    </main>

                    <footer>
                        <button
                            type="button"
                            className={styles.chalengedBoxFaileButton}
                            onClick={handleChalengeFaile}
                        >
                            Falhei
                        </button>
                        <button
                            type="button"
                            className={styles.chalengedBoxSuceedeButton}
                            onClick={handleChalengeSuceeded}    
                        >
                            Completei
                        </button>
                    </footer>
                </div>
            ) : (
                <div className={styles.chalengedBoxNotActive}>
                    <strong>Finalize um ciclo para receber um desafio</strong>
                    <p>
                        <img src="icons/level-up.svg" alt="level up" />
                        avance de level completando desafios.
                    </p>
                </div>
            ) }
           
        </div>
    )
}