/**
 * DefinedRoutines.tsx
 *
 * Defined routines for each day
 */

type RoutineDay = {
  name: string;
  number_of_exercises: number;
  exercises: string[];
};

export const defined_routines: RoutineDay[] = [
  {
    name: "Chest/triceps/Shoulder Day",
    number_of_exercises: 6,
    exercises: [
      "Bench Press",
      "Incline Dumbbell Press",
      "Chest Flyes",
      "Tricep Dips",
      "Overhead Tricep Extension",
      "Lateral Raises",
    ],
  },
  {
    name: "Back/biceps/Shoulder Day",
    number_of_exercises: 6,
    exercises: [
      "Pull-Ups",
      "Bent Over Rows",
      "Lat Pulldowns",
      "Barbell Curls",
      "Hammer Curls",
      "Front Raises",
    ],
  },
  {
    name: "Leg Day",
    number_of_exercises: 5,
    exercises: [
      "Squats",
      "Lunges",
      "Leg Press",
      "Hamstring Curls",
      "Calf Raises",
    ],
  },
  {
    name: "Chest Day",
    number_of_exercises: 4,
    exercises: [
      "Bench Press",
      "Incline Dumbbell Press",
      "Chest Flyes",
      "Push-Ups",
    ],
  },
  {
    name: "Back Day",
    number_of_exercises: 4,
    exercises: ["Pull-Ups", "Bent Over Rows", "Lat Pulldowns", "Deadlifts"],
  },
  {
    name: "Arm Day",
    number_of_exercises: 4,
    exercises: [
      "Barbell Curls",
      "Hammer Curls",
      "Tricep Dips",
      "Overhead Tricep Extension",
    ],
  },
  {
    name: "Shoulder Day",
    number_of_exercises: 4,
    exercises: ["Military Press", "Lateral Raises", "Front Raises", "Shrugs"],
  },
  {
    name: "Core Day",
    number_of_exercises: 4,
    exercises: ["Plank", "Russian Twists", "Leg Raises", "Bicycle Crunches"],
  },
];
