import { Text, View } from "react-native";

const WeekDays = ['D', 'S', 'T', 'Q', 'Q', 'S', 'S'];

import { HabitDay, DaySize, MarginBetween } from "../components/HabitDay";
import { Header } from "../components/Header";

export function Home() {
  return (
    <View className="flex-1 bg-background px-8 pt-16">
      <Header />

      <View
        className="flex-row mt-6 mb-2"
      >
        {
          WeekDays.map((day, index) => (
            <Text 
              key={index}
              className="text-zinc-400 text-xl font-bold text-center mx-1"
              style={{width: DaySize}}
            >
              {day}
            </Text>
          ))
        }
      </View>

      <HabitDay/>
    </View>
  );
}