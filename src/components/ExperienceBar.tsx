import { useContext, useEffect, useState } from 'react';
import { ChalengedContext } from '../contexts/ChalengedContext';
import styles from'../styles/components/ExperienceBar.module.css';

export function ExperienceBar() {
    const { currentExperience, experienceToNextLevel } = useContext(ChalengedContext);
    const percentToNextLevel = (currentExperience * 100) / experienceToNextLevel;


    return (
        <header className={styles.experienceBar}>
            <span>0 xp</span>
            <div>
                <div style={{ width: `${percentToNextLevel}%`}} />
                <span className={styles.currentExperience} style={{ left: `${percentToNextLevel}%` }}>
                    {currentExperience} xp
                </span>
            </div>
            <span>{experienceToNextLevel} xp</span>
        </header>
    );
}