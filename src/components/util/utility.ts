import { FirebaseFirestoreTypes } from "@react-native-firebase/firestore";
import { RoutineFormat } from "../state/IRoutines";

const createEmptyRoutineObject = () => ({
    routines: [""]
})

interface IUtility {
    createEmptyRoutineObject: () => RoutineFormat
}

const utility: IUtility = {
    createEmptyRoutineObject
}

export default utility;