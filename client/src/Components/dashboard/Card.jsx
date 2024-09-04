import { Badge, Card, Metric, Text, Flex } from "@tremor/react";

export function CardUsageExample({ title, count, note, icon }) {
  return (
    <Card className="w-full" decoration="top" decorationColor="blue">
      <Flex justifyContent="between" alignItems="center">
        <Text>{title}</Text>
        <Badge size="xs" icon={icon}>
          {note}
        </Badge>
      </Flex>

      <Metric>
        <p className="text-xl">{count}</p>
      </Metric>
    </Card>
  );
}
