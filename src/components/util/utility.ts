import { FirebaseFirestoreTypes } from "@react-native-firebase/firestore";
import { IPlayer } from "../state/IBattleDocument";

const createEmptyPlayerObject = () => ({
    uid: "",
    name: "",
    countLP: 0,
    win: 0,
    loss: 0
})

// Helper function to map Firestore document data to our internal IPlayer type
const mapDocumentDataToPlayer = (data: FirebaseFirestoreTypes.DocumentData | undefined): IPlayer => ({
    uid: data?.uid ?? "",
    name: data?.name ?? "",
    countLP: data?.countLP ?? 0,
    win: data?.win ?? 0,
    loss: data?.loss ?? 0
})

interface IUtility {
    createEmptyPlayerObject: () => IPlayer
    mapDocumentDataToPlayer: (data: FirebaseFirestoreTypes.DocumentData | undefined) => IPlayer
}

const utility: IUtility = {
    createEmptyPlayerObject,
    mapDocumentDataToPlayer
}

export default utility;