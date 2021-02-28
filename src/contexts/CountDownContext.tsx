import { createContext, ReactNode, useContext, useEffect, useState } from "react";
import { ChalengedContext } from './ChalengedContext';

interface CountDownContextData {
    minutes: number;
    seconds: number;
    hasFinished: boolean;
    active: boolean;
    startCountDown: () => void;
    resetCountDown: () => void;

}

interface CountDownContextProps{
    children: ReactNode;
}

export const CountDownContext = createContext({} as CountDownContextData);

export function CountDownPrivider({ children }: CountDownContextProps){
    const { startNewChalenged } = useContext(ChalengedContext);
    
    const [time, setTime] = useState(25 * 60);
    const [active, setActive] = useState(false);
    const [hasFinished, setHasFinished] = useState(false);
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    let countDownTimeout: NodeJS.Timeout;

    function startCountDown() {
        setActive(true);
    }

    function resetCountDown(){
        clearTimeout(countDownTimeout);
        setActive(false);
        setHasFinished(false);
        setTime(25 * 60)
    }

    useEffect(() => {
        if(active && time > 0){
            countDownTimeout = setTimeout(() => {
                setTime(time -1);
            }, 1000)
        }else if(active && time === 0) {
            setHasFinished(true);
            setActive(false);
            startNewChalenged();
        }
    },[active, time]);

    return (
        <CountDownContext.Provider 
            value={{
                minutes,
                seconds,
                hasFinished,
                active,
                startCountDown,
                resetCountDown,
            }}
        >
            {children}
        </CountDownContext.Provider>
    );
}