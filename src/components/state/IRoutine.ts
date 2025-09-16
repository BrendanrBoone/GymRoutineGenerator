/**
 * IRoutine.ts
 * 
 * Defines routine list to be generated
 */
export interface RoutineFormat {
    routine: IExerciseDoc[];
}

export interface IExerciseDoc {
    exerciseName: string;
    userId: string;
    isCardio: boolean;
    reps: number;
    sets: number;
    time: number;
    weight: number;
    categories: string[];
    id: string;
}
