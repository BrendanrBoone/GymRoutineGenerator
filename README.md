# GymRoutineGenerator

I want my own app to generate my various routines at the gym

### Notes

- implement expo-router after finishing screens and back-end functionality
- renamed icon directory to app_icon. check this in case error pops up later

### To do

- DetailsScreen: dynamic text fontSize when text begin to go off screen
- RoutineScreenList: local checking off completed exercises - fixing
- AddExerciseScreen: make filter for mistaken names to prevent bad additions to firestore
- GenerateScreen: disable bigbutton unless categories are chosen
- change expo env vars to be hidden - probably not fixable
- FirebaseConfig: reactNativePersistence is not working - trying to browserLocalPersistence
- finished build's top and bottom bar are still there and some colors aren't right. investigate differences between apk builds and expo go dev builds.

### General Guideline

- context: routines generated
- firebase: store number of sets, weight, number of attempts, \*account/name
- basic framework:
- home screen: choose what work out day (button/drawer). big button to generate
- routine screen: ~5 items of workouts for the user. items can be selected to move to the details screen
- details screen: descriptive screen for selected video. Video, name, guide, number of sets, maybe alternatives
