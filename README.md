# GymRoutineGenerator

I want my own app to generate my various routines at the gym

### Notes

- implement expo-router after finishing screens and back-end functionality
- renamed icon directory to app_icon. in case error pops up later
- maybe change firestore docs to allow exercises to be added globaly but weight/time preferences to be stored per user (ie "dictionary" within exercise)

### To do

- RoutineScreenList
- AddExerciseScreen: make filter for mistaken names to prevent bad additions to firestore

### General Guideline

- context: routines generated
- firebase: store number of sets, weight, number of attempts, \*account/name
- basic framework:
- home screen: choose what work out day (button/drawer). big button to generate
- routine screen: ~5 items of workouts for the user. items can be selected to move to the details screen
- details screen: descriptive screen for selected video. Video, name, guide, number of sets, maybe alternatives
