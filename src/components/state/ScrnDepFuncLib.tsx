/**
 * Screen Dependent Function Library
 * 
 * library of functions that are used across screens
 */

interface IfunctionLibrary {
    printLogScreen: (screen_name: string) => void
}

const functionLibrary: IfunctionLibrary = {
    printLogScreen
}

/**
 * prints "DUEL!" and then its screen name
 * @param screen_name 
 */
function printLogScreen(screen_name: string): void {
    console.log("DUEL! @" + screen_name + " >=)");
}

export default functionLibrary;