"use client";
import { TrendingUp } from "lucide-react";
import { Label, PolarRadiusAxis, RadialBar, RadialBarChart } from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { useTasks } from "@/context/taskContext";

export const description = "A radial chart with stacked sections";

const chartConfig = {
  desktop: {
    label: "Concluidas",
    color: "#8BCE89",
  },
  mobile: {
    label: "Pendentes",
    color: "#EB4E31",
  },
} satisfies ChartConfig;

function RadialCHart() {
  const { tasks, completedTasks, activeTasks } = useTasks();
  const tasksTotal = tasks.length;

  const chartData = [
    {
      pending: activeTasks.length,
      completed: completedTasks.length,
    },
  ];

  return (
    <Card className="flex flex-col margin-bottom: 2.9rem border-2 border-white shadow-none bg-[#EDEDED]">
      <CardHeader className="items-center pb-0">
        <CardTitle>Concluidas vs Pendentes</CardTitle>
        <CardDescription>Status das tarefas.</CardDescription>
      </CardHeader>
      <CardContent className="flex flex-1 items-center pb-2">
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square w-full max-w-[120px]"
        >
          <RadialBarChart
            data={chartData}
            endAngle={180}
            innerRadius={80}
            outerRadius={130}
          >
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <PolarRadiusAxis tick={false} tickLine={false} axisLine={false}>
              <Label
                content={({ viewBox }) => {
                  if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                    return (
                      <text x={viewBox.cx} y={viewBox.cy} textAnchor="middle">
                        <tspan
                          x={viewBox.cx}
                          y={(viewBox.cy || 0) - 16}
                          className="fill-foreground text-2xl font-bold"
                        >
                          {tasksTotal}
                        </tspan>
                        <tspan
                          x={viewBox.cx}
                          y={(viewBox.cy || 0) + 4}
                          className="fill-muted-foreground"
                        >
                          Tarefas
                        </tspan>
                      </text>
                    );
                  }
                }}
              />
            </PolarRadiusAxis>
            <RadialBar
              dataKey="completed"
              stackId="a"
              cornerRadius={5}
              fill="var(--color-desktop)"
              className="stroke-transparent stroke-2"
            />
            <RadialBar
              dataKey="pending"
              fill="var(--color-mobile)"
              stackId="a"
              cornerRadius={5}
              className="stroke-transparent stroke-2"
            />
          </RadialBarChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="mb-1.7rem flex-col gap-2 text-sm">
        <div className="flex items-center gap-2 font-medium leading-none">
          A conclusão de tarefas melhorou 12% este mês{" "}
          <TrendingUp className="h-4 w-4" />
        </div>
        <div className="leading-none text-muted-foreground">

          Análise com base nas tarefas concluídas nos últimos 30 dias.
        </div>
      </CardFooter>
    </Card>
  );
}

export default RadialCHart;
