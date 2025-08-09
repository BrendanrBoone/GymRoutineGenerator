/**
 * AppState.tsx
 * 
 * tracks values within the app and allows updates them to the backend
 */
import {
    ReactNode,
    createContext,
    useState
} from 'react';
import utility from '../util/utility';
import { IPlayer } from './IBattleDocument';

export type IAppContext = {
    player1: IPlayer
    player2: IPlayer
    updatePlayer1: (player: IPlayer) => void,
    updatePlayer2: (player: IPlayer) => void
}

export const AppContext = createContext<IAppContext>({
    player1: utility.createEmptyPlayerObject(),
    player2: utility.createEmptyPlayerObject(),
    updatePlayer1: () => {},
    updatePlayer2: () => {}
});

interface IAppState {
    children?: ReactNode | ReactNode[]
}

export default function AppState(props: IAppState) {

    //set values for Player1
    const [player1, setPlayer1] = useState<IPlayer>(utility.createEmptyPlayerObject())

    //set values for Player2
    const [player2, setPlayer2] = useState<IPlayer>(utility.createEmptyPlayerObject())

    //exported function to update vales for player 1
    const updatePlayer1 = (player: IPlayer) => {
        setPlayer1(player);
    }

    //exported function to update vales for player 2
    const updatePlayer2 = (player: IPlayer) => {
        setPlayer2(player);
    }

    return (
        <AppContext.Provider value={{
            player1: player1,
            player2: player2,
            updatePlayer1,
            updatePlayer2
        }}>
            {props.children}
        </AppContext.Provider>
    )
}