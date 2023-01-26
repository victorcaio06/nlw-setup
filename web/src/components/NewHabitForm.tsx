import * as Checkbox from "@radix-ui/react-checkbox";
import { Check } from "phosphor-react";

const availabelWeekDays = [
  "Domingo",
  "Segunda-feira",
  "Terça-feira",
  "Quarta-feira",
  "Quinta-feira",
  "Sexta-feira",
  "Sábado",
];

export function NewHabitForm() {
  return (
    <form className="w-full flex flex-col mt-6">
      <label htmlFor="title" className="font-semibold leading-tight">
        Qual seu comprometimento?
      </label>

      <input
        type="text"
        id="title"
        placeholder="Ex: Exercícios, estudar, comer..."
        className="p-4 rounded-lg mt-3 bg-zinc-800 text-white placeholder:text-zinc-400"
        autoFocus
      />

      <label htmlFor="" className="font-semibold leading-tight mt-4">
        Qual a recorrência?
      </label>

      <div className="flex flex-col gap-2 mt-3">
        {availabelWeekDays.map((weekDay, index) => {
          return (
            <Checkbox.Root key={`${weekDay}-${index}`} className="flex items-center gap-3 group">
              <div
                className=" h-8 w-8 rounded-lg flex items-center justify-center bg-zinc-900 border-2 border-zinc-800
              group-data-[state=checked]:bg-green-500 group-data-[state=checked]:border-green-500"
              >
                <Checkbox.Indicator>
                  <Check size={20} className="text-white" />
                </Checkbox.Indicator>
              </div>

              <span className="text-white leading-tight">{weekDay}</span>
            </Checkbox.Root>
          );
        })}
      </div>

      <button
        type="submit"
        className="mt-6 rounded-lg p-4 gap-3 flex items-center justify-center 
        font-semibold bg-green-600 hover:bg-green-500 text-black hover:text-white"
      >
        <Check size={20} weight="bold" />
        Confirmar
      </button>
    </form>
  );
}
