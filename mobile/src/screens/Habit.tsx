import { useRoute } from "@react-navigation/native";
import dayjs from "dayjs";
import { useEffect, useState } from "react";
import { Alert, ScrollView, Text, View } from "react-native";
import { api as API } from "../libs/axios";

import { generateProgressPercentage } from "../utils/generate-progress-percentage";

import { BackButton } from "../components/BackButton";
import { Checkbox } from "../components/Checkbox";
import { Loading } from "../components/Loading";
import { Progressbar } from "../components/Progressbar";
import { HabitsEmpty } from "../components/HabitsEmpty";
import clsx from "clsx";

interface Params {
  date: string;
}

interface DayInfoProps {
  completedHabits: string[];
  possibleHabits: {
    id: string;
    title: string;
  }[];
}

export function Habit() {
  const [loading, setLoading] = useState(true);
  const [dayInfo, setDayInfo] = useState<DayInfoProps | null>(null);
  const [completedHabits, setCompletedHabits] = useState<string[]>([]);

  const route = useRoute();

  const { date } = route.params as Params;

  const parsedDate = dayjs(date);
  const isDateInPast = parsedDate.endOf('day').isBefore(new Date()); 
  const dayOfWeek = parsedDate.format("dddd");
  const dayAndMonth = parsedDate.format("DD/MM");

  const habitsProgress = dayInfo?.possibleHabits.length
    ? generateProgressPercentage(
        dayInfo.possibleHabits.length,
        completedHabits.length
      )
    : 0;

  async function fetchHabits() {
    try {
      setLoading(true);
      const response = await API.get("/day", { params: { date } });
      setDayInfo(response.data);
      setCompletedHabits(response.data.completedHabits);
      
    } catch (error) {
      console.log(error);
      Alert.alert("Ops", "Error ao contactar o servidor!");
    } finally {
      setLoading(false);
    }
  }

  async function handleToggleHabits(habitId: string) {
    if (completedHabits.includes(habitId)) {
      setCompletedHabits((prevState) =>
        prevState.filter((habit) => habit !== habitId)
      );
    } else {
      setCompletedHabits((prevState) => [...prevState, habitId]);
    }
  }

  useEffect(() => {
    fetchHabits();
  }, []);

  if (loading) return <Loading />;

  return (
    <View className="flex-1 bg-background px-8 pt-16">
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 50 }}
      >
        <BackButton />

        <Text className="mt-6 text-zinc-400 font-semibold text-base lowercase">
          {dayOfWeek}
        </Text>

        <Text className="text-white font-extrabold text-3xl">
          {dayAndMonth}
        </Text>

        <Progressbar progress={habitsProgress} />

        <View className={clsx("mt-6 ", {
          ["opacity-50"]: isDateInPast
        })}>
          {dayInfo?.possibleHabits ? (
            dayInfo.possibleHabits.map((habit) => (
              <Checkbox
                key={habit.id}
                title={habit.title}
                disabled={isDateInPast}
                checked={completedHabits.includes(habit.id)}
                onPress={() => handleToggleHabits(habit.id)}
              />
            ))
          ) : (
            <HabitsEmpty />
          )}
        </View>

        {
          isDateInPast && (
            <Text className="font-semibold text-base text-white mt-10 text-center">
              Você não pode editar esses hábitos.
            </Text>
          )  
        }

      </ScrollView>
    </View>
  );
}
