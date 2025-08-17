/**
 * drawerArrays.tsx
 *
 * Home Screen component.
 */

import { Icons } from "../util/icons";
import DrawerScreen from "../../screens/DrawerScreen";
import defined_colors from "../util/colors";

type RoutineDayItem = {
  route: string;
  label: string;
  type: any;
  icon: string;
  component: React.ComponentType<{ route: any; navigation: any }>;
  notification: number;
};

export const RoutineDaysArray: RoutineDayItem[] = [
  {
    route: "Chest",
    label: "chest day",
    type: Icons.Feather,
    icon: "home",
    component: DrawerScreen,
    notification: 0,
  },
  {
    route: "Back",
    label: "back day",
    type: Icons.Feather,
    icon: "home",
    component: DrawerScreen,
    notification: 0,
  },
  {
    route: "Leg",
    label: "leg day",
    type: Icons.Feather,
    icon: "home",
    component: DrawerScreen,
    notification: 0,
  },
];
