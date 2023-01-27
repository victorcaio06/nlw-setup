import { useNavigation } from "@react-navigation/native";
import { Alert, ScrollView, Text, View } from "react-native";
import { api as API } from "../libs/axios";

import { DaySize, HabitDay } from "../components/HabitDay";
import { Header } from "../components/Header";
import { generateDatesFromYearBeginning } from "../utils/generate-dates-from-year-beginning";
import { useEffect, useState } from "react";
import { Loading } from "../components/Loading";
import dayjs from "dayjs";

const WeekDays = ["D", "S", "T", "Q", "Q", "S", "S"];

const datesFromYearStart = generateDatesFromYearBeginning();

const minimumSummaryDatesSizes = 18 * 5;

const amountOfDaysFill = minimumSummaryDatesSizes - datesFromYearStart.length;

type SummaryProps = Array<{
  id: string;
  date: string;
  amount: number;
  completed: number;
}>;

export function Home() {
  const [loading, setLoading] = useState(true);
  const [summary, setSummary] = useState<SummaryProps | null>(null);
  const { navigate } = useNavigation();

  async function fetchData() {
    try {
      setLoading(true);
      const response = await API.get("/summary");
      setSummary(response.data);
    } catch (error) {
      Alert.alert(
        "Ops",
        "A aplicação não conseguiu se conectar com o servidor, por favor tente mais tarde!"
      );
      console.log(error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchData();
  }, []);

  if (loading) {
    return <Loading />;
  }

  return (
    <View className="flex-1 bg-background px-8 pt-16">
      <Header />

      <View className="flex-row mt-6 mb-2">
        {WeekDays.map((day, index) => (
          <Text
            key={index}
            className="text-zinc-400 text-xl font-bold text-center mx-1"
            style={{ width: DaySize }}
          >
            {day}
          </Text>
        ))}
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 50 }}
      >
        {summary && (
          <View className="flex-row flex-wrap">
            {datesFromYearStart.map((date) => {
              const dayWithHabits = summary.find((day) => {
                return dayjs(date).isSame(day.date, "day");
              });
              return (
                <HabitDay
                  key={date.toISOString()}
                  date={date}
                  amountOfHabits={dayWithHabits?.amount}
                  amountCompleted={dayWithHabits?.completed}
                  onPress={() =>
                    navigate("habit", { date: date.toISOString() })
                  }
                />
              );
            })}

            {amountOfDaysFill > 0 &&
              Array.from({
                length: amountOfDaysFill,
              }).map((_, index) => (
                <View
                  key={index}
                  className="bg-zinc-900 rounded-lg border-2 m-1 border-zinc-800 opacity-40"
                  style={{
                    width: DaySize,
                    height: DaySize,
                  }}
                />
              ))}
          </View>
        )}
      </ScrollView>
    </View>
  );
}
