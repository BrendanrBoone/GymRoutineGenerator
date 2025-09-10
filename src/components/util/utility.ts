import { RoutineFormat, IExerciseDoc } from "../state/IRoutines";

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