import { useNavigation } from "@react-navigation/native";
import { ScrollView, Text, View } from "react-native";


import { DaySize, HabitDay } from "../components/HabitDay";
import { Header } from "../components/Header";
import { generateDatesFromYearBeginning } from "../utils/generate-dates-from-year-beginning";

const WeekDays = ['D', 'S', 'T', 'Q', 'Q', 'S', 'S'];

const datesFromYearStart = generateDatesFromYearBeginning();

const minimumSummaryDatesSizes = 18 * 5; 

const amountOfDaysFill = minimumSummaryDatesSizes - datesFromYearStart.length;

export function Home() {
  const { navigate } = useNavigation();
  
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

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{paddingBottom: 50}}
      >
        <View className="flex-row flex-wrap">
          {
            datesFromYearStart.map((date) => (
              <HabitDay
                key={date.toISOString()}
                onPress={() => navigate('habit', {date: date.toISOString()})}
              />
            ))
          }

        {
          amountOfDaysFill > 0 && Array.from(
            {
              length: amountOfDaysFill
            }
          ).map((_, index) => (
              <View
                key={index}
                className="bg-zinc-900 rounded-lg border-2 m-1 border-zinc-800 opacity-40"
                style={
                  {
                    width: DaySize, height: DaySize
                  }
                }
              />
            ))
        }
        </View>
      </ScrollView>
    </View>
  );
}