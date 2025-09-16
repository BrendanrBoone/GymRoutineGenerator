import { RoutineFormat, IExerciseDoc } from "../state/IRoutine";

const createEmptyRoutineObject = () => ({
    routine: []
})

interface IUtility {
    createEmptyRoutineObject: () => RoutineFormat
}

const utility: IUtility = {
    createEmptyRoutineObject
}

export default utility;