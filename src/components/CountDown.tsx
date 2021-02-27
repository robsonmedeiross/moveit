import { useContext, useEffect, useState } from 'react';
import { CountDownContext } from '../contexts/CountDownContext';

import styles from '../styles/components/CountDown.module.css';


export function CountDown(){
    const { minutes, seconds, hasFinished, active, resetCountDown, startCountDown } = useContext(CountDownContext)
    const [minutesLeft, minutesRight] = String(minutes).padStart(2, '0').split('');
    const [secondsLeft, secondsRight] = String(seconds).padStart(2, '0').split('');

    

    return(
        <div>
            <div className={styles.countDownContainer}>
                <div>
                    <span>{minutesLeft}</span>
                    <span>{minutesRight}</span>
                </div>
                <span>:</span>
                <div>
                    <span>{secondsLeft}</span>
                    <span>{secondsRight}</span>
                </div>
            </div>

            {hasFinished ? (
                 <button 
                 disabled
                 type="button" 
                 className={styles.countDownButton}
             >
                 Ciclo finalizado
             </button>
            ) : (
                <>
                    {active ? (
                    <button 
                        onClick={resetCountDown}
                        type="button" 
                        className={`${styles.countDownButton} ${styles.countDownButtonActive}`}
                    >
                        Abandonar ciclo
                    </button>
            ) : (
                    <button 
                        onClick={startCountDown}
                        type="button" 
                        className={styles.countDownButton}
                    >
                        Iniciar novo ciclo
                    </button>
            ) }
                </>
            )}            
        </div>
    );
}