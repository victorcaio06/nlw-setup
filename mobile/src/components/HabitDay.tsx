import { Dimensions, TouchableOpacity, TouchableOpacityProps } from "react-native";

const WeekDays = 7;

const ScreenHorizontalPadding = (32 * 2) / 5;

export const MarginBetween = 8;

export const DaySize = (Dimensions.get('screen').width / WeekDays) - (ScreenHorizontalPadding + 5);

interface Props extends TouchableOpacityProps {
  
}

export function HabitDay({...rest}: Props) {
  return (
    <TouchableOpacity 
      className="bg-zinc-900 rounded-lg border-2 m-1 border-zinc-800"
      style={
        {
          width: DaySize, height: DaySize
        }
      }
      activeOpacity={0.5}
      {...rest}
    />

      
  );
}