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
    isCardio: boolean;
    categories: string[];
    id: string;
}

// Nested Collection Associated with Firestore Doc
export interface IUserDoc {
    exerciseName: string;
    userId: string;
    reps: number;
    sets: number;
    time: number;
    weight: number;
}
