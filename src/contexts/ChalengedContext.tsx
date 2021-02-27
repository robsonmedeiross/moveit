import { createContext, ReactNode, useEffect, useState } from 'react';
import chalenges from '../../challenges.json';
import Cookies from 'js-cookie';
import { LevelUpModal } from '../components/LevelUpModal';

interface Chalenge {
    type: 'body' | 'eye';
    description: string;
    amount: number;
}

interface ChalengedContextData {
    level: number;
    chalengedCompleted: number;
    currentExperience: number;
    activeChalenge: Chalenge;
    experienceToNextLevel: number;
    levelUp: () => void;
    startNewChalenged: () => void;
    resetChalenge: () => void;
    completeChalenge: () => void;
    closeLevelUpModal: () => void,
}

interface ChalengedProviderProps {
    children: ReactNode;
    level: number;
    currentExperience: number;
    chalengedCompleted: number;
}

export const ChalengedContext = createContext({} as ChalengedContextData);

export function ChalengedProvider({ children, ...rest}: ChalengedProviderProps){
    const [level, setLevel] = useState(rest.level ?? 1);
    const [currentExperience, setCurrentExperience] = useState(rest.currentExperience ?? 0);
    const [chalengedCompleted, setChalengedCompleted] = useState(rest.chalengedCompleted ?? 0);
    const [activeChalenge, setActiveChalenge] = useState(null);
    const [isLevelUpModalOpen, setIsLevelUpModalOpen] = useState(false);
    const experienceToNextLevel = Math.pow((level + 1) * 4 , 2)

    useEffect(() => {
        Cookies.set('level', String(level));
        Cookies.set('currentExperience', String(currentExperience));
        Cookies.set('chalengedCompleted', String(chalengedCompleted));
    }, [level, currentExperience, chalengedCompleted]);

    useEffect(() => {
        Notification.requestPermission();
    }, []);

    function startNewChalenged(){
        const randomChalengedIndex = Math.floor(Math.random() * chalenges.length)
        const chalenge = chalenges[randomChalengedIndex];
        setActiveChalenge(chalenge);

        new Audio('./notification.mp3').play();

        if(Notification.permission === 'granted'){
            new Notification('Novo desafio ⚡', {
                body: `Valendo ${chalenge.amount}xp!`
            });
        }
    }

    function levelUp() {
        setLevel(level + 1);
        setIsLevelUpModalOpen(true);
    }

    function resetChalenge(){
        setActiveChalenge(null);
    }

    function completeChalenge(){
        if(!activeChalenge){
            return;
        }
        
        const { amount } = activeChalenge;
        let finalExperience = currentExperience + amount;

        if(finalExperience >= experienceToNextLevel){
            finalExperience = finalExperience - experienceToNextLevel;
            levelUp();
        }

        setCurrentExperience(finalExperience);
        setActiveChalenge(null);
        setChalengedCompleted(chalengedCompleted + 1);

    }

    function closeLevelUpModal() {
        setIsLevelUpModalOpen(false)
    }
    return (
        <ChalengedContext.Provider 
            value={{
                level,
                chalengedCompleted,
                currentExperience,
                activeChalenge,
                experienceToNextLevel,
                closeLevelUpModal,
                levelUp,
                startNewChalenged,
                resetChalenge,
                completeChalenge,             
            }}
        >
            {children}
           {isLevelUpModalOpen && <LevelUpModal /> }
        </ChalengedContext.Provider>
    );
}