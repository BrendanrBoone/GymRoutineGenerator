# GymRoutineGenerator

I want my own app to generate my various routines at the gym

### Notes

- implement expo-router after finishing screens and back-end functionality
- renamed icon directory to app_icon. check this in case error pops up later

### To do

- RoutienScreenList: implement generating additional exercise and refresh exercise from db feature
- AddExerciseScreen: make filter for mistaken names to prevent bad additions to firestore
- GenerateScreen: disable bigbutton unless categories are chosen

### General Guideline

- context: routines generated
- firebase: store number of sets, weight, number of attempts, \*account/name
- basic framework:
- home screen: choose what work out day (button/drawer). big button to generate
- routine screen: ~5 items of workouts for the user. items can be selected to move to the details screen
- details screen: descriptive screen for selected video. Video, name, guide, number of sets, maybe alternatives
