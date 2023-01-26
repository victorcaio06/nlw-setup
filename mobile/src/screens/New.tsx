import { useState } from "react";
import { ScrollView, Text, TextInput, TouchableOpacity, View } from "react-native";
import colors from "tailwindcss/colors";
import { Feather } from '@expo/vector-icons';

import { BackButton } from "../components/BackButton";
import { Checkbox } from "../components/Checkbox";

const availableWeekDays = [
  "Domingo",
  "Segunda-feira",
  "Terça-feira",
  "Quarta-feira",
  "Quinta-feira",
  "Sexta-feira",
  "Sábado",
];

export function New() {
  const [weekDays, setWeekDays] = useState<number[]>([]);

  function handleToggleWeekDays(weekDaysIndex: number) {
    if (weekDays.includes(weekDaysIndex)) {
      setWeekDays((prevState) =>
        prevState.filter((weekDay) => weekDay !== weekDaysIndex)
      );
    } else {
      setWeekDays((prevState) => [...prevState, weekDaysIndex]);
    }
  }

  return (
    <View className="flex-1 bg-background px-8 pt-16" >
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 50 }} >
        <BackButton />

        <Text className="mt-6 text-white font-extrabold text-3xl">
          Criar novo hábito
        </Text>

        <Text className="mt-6 text-white font-semibold text-base">
          Qual seu comprometimento?
        </Text>

        <TextInput
          className="h-12 pl-4 rounded-lg mt-4 bg-zinc-800 text-white focus:border-2 focus:border-violet-500"
          cursorColor={colors.violet[400]}
          placeholder="Ex: Exercícios, estudar, comer..."
          placeholderTextColor={colors.zinc[400]}
        />

        <Text className="font-semibold mt-5 mb-3 text-white text-base">
          Qual a recorrência?
        </Text>

        {
          availableWeekDays.map((weekDay, index) => {
            return (
              <Checkbox
                key={`${weekDay}-${index}`}
                title={`${weekDay}`}
                checked={weekDays.includes(index)}
                onPress={() => handleToggleWeekDays(index)}
                className="mt-1 mb-1"
              />
            );
          })
        }

        <TouchableOpacity 
          className="w-full h-14 flex-row items-center justify-center bg-violet-500 rounded-md mt-8"
          activeOpacity={0.7}
        >
          <Feather 
            name="check"
            size={20}
            color={colors.white}
          />

          <Text className="font-semibold text-base text-white ml-2">
            Confirmar
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}
