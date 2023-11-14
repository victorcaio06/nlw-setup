import dayjs from 'dayjs';
import { useEffect, useState } from 'react';
import { api as API } from '../lib/axios';

import { generateDatesFromYearBeginning } from '../utils/generate-dates-from-year-beginning';
import { HabitDay } from './HabitDay';

const weekDays = ['D', 'S', 'T', 'Q', 'Q', 'S', 'S'];

let SummaryDates = generateDatesFromYearBeginning();

if (SummaryDates.length > 200) {
  let half = Math.floor(SummaryDates.length / 2);

  let auxArray = SummaryDates.slice(half);

  SummaryDates = auxArray;
  // console.log(auxArray);

  // console.log(auxArray.length);

  // let array = [1, 2, 3, 4, 5, 6, 7, 8];
  // let halfAux = Math.floor(array.length / 2);
  // let secondHalf = array.slice(halfAux);

  // console.log(array);
  // console.log(secondHalf);
}

const minimumSummaryDatesSize = 18 * 7;

const amountOfDaysToFill = minimumSummaryDatesSize - SummaryDates.length;

type Summary = {
  id: string;
  date: string;
  amount: number;
  completed: number;
}[];

export function SummaryTable() {
  const [summary, setSummary] = useState<Summary>([]);

  useEffect(() => {
    API.get('summary').then((response) => {
      setSummary(response.data);
    });
  }, []);

  return (
    <div className="w-full flex">
      <div className="grid grid-rows-7 grid-flow-row gap-3">
        {weekDays.map((weekDay, index) => {
          return (
            <div
              key={`${weekDay}-${index}`}
              className="text-zinc-400 text-xl h-10 w-10 font-bold flex items-center justify-center"
            >
              {weekDay}
            </div>
          );
        })}
      </div>
      <div className="grid grid-rows-7 grid-flow-col gap-3">
        {summary.length > 0 &&
          SummaryDates.map((date) => {
            const dayInSummary = summary.find((day) => {
              return dayjs(date).isSame(day.date, 'day');
            });
            return (
              <HabitDay
                date={date}
                amount={dayInSummary?.amount}
                defaultCompleted={dayInSummary?.completed}
                key={date.toString()}
              />
            );
          })}

        {amountOfDaysToFill > 0 &&
          Array.from({ length: 10 }).map((_, i) => {
            return (
              <div
                key={i}
                className="w-10 h-10 bg-zinc-900 border-2 border-zinc-800 rounded-lg opacity-40 cursor-not-allowed"
              />
            );
          })}
      </div>
    </div>
  );
}
