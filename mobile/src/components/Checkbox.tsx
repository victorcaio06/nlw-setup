import { Feather } from "@expo/vector-icons";
import {
  Text,
  TouchableOpacity,
  TouchableOpacityProps,
  View
} from "react-native";
import Animated, { ZoomIn, FlipOutEasyX } from "react-native-reanimated";
import colors from "tailwindcss/colors";

interface Props extends TouchableOpacityProps {
  title: string;
  checked?: boolean;
}

export function Checkbox({ title, checked, ...rest }: Props) {
  return (
    <TouchableOpacity
      activeOpacity={0.7}
      className="flex-row mb-2 items-center"
      {...rest}
    >
      {checked ? (
        <Animated.View
          className="h-8 w-8 bg-green-500 rounded-lg items-center justify-center"
          entering={ZoomIn.duration(500)}
          exiting={FlipOutEasyX.duration(500)}
        >
          <Feather name="check" size={20} color={colors.white} />
        </Animated.View>
      ) : (
        <View className="h-8 w-8 bg-zinc-900 rounded-lg" />
      )}
      <Text className="text-white text-base ml-3 text-semibold">{title}</Text>
    </TouchableOpacity>
  );
}
