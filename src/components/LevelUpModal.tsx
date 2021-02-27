import { useContext } from 'react';
import { ChalengedContext } from '../contexts/ChalengedContext';
import styles from '../styles/components/LevelUpModal.module.css';

export function LevelUpModal() {
    const { level, closeLevelUpModal } = useContext(ChalengedContext);

    function handleIsLevelUpModalOpen() {
        closeLevelUpModal();
    }

    return (
        <div className={styles.overlay} >
            <div className={styles.levelUpModalContainer} >
                <header> {level} </header>

                <strong>Parabéns</strong>
                <p>Você alcançou um novo level</p>
                
                <button
                    type='button'
                    onClick={handleIsLevelUpModalOpen}
                >
                    <img src="icons/close.svg" alt="Fechar modal"/>
                </button>
            </div>
        </div>
    );
}