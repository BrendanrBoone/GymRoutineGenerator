/**
 * IRoutineCegories.tsx
 *
 * routines formated for dependencies .
 */

// 'data' for react-native-dropdown-select-list
const data = [
  { key: "1", value: "Shoulders" },
  { key: "2", value: "Arms" },
  { key: "3", value: "Back" },
  { key: "4", value: "Chest" },
  { key: "5", value: "Core" },
  { key: "6", value: "Legs" },
];

// items for react-native-sectioned-multi-select
export const items = [
  {
    name: "Routine Days",
    id: 0,
    children: [
      { name: "Shoudlers", id: 10 },
      { name: "Arms", id: 20 },
      { name: "Back", id: 30 },
      { name: "Chest", id: 40 },
      { name: "Core", id: 50 },
      { name: "Legs", id: 60 },
    ],
  },
];

export default data;
