import { AreaChart } from "@tremor/react";
import { format } from "date-fns";
export function AreaChartHero({ products }) {
  // get date from last 1 week
  const currentDate = new Date(); // Current date and time

  const last2Week = new Date();
  last2Week.setDate(currentDate.getDate() - 14);
  //9 => last 2 weeks
  //12 => productsell date
  //23 => currentdate
  //product_daily_sellRate[productSellDate] == {12 : 0 } nk hr m shi yin 0 htae
  // calc products in one week
  const product_daily_sellRate = {};
  products.forEach((product) => {
    const productSellDate = new Date(product.createdAt);
    const formattedSellDate = format(productSellDate, "dd/MM");
    if (productSellDate <= currentDate && productSellDate >= last2Week) {
      if (!product_daily_sellRate[formattedSellDate]) {
        product_daily_sellRate[formattedSellDate] = 0;
      }
      product_daily_sellRate[formattedSellDate] += 1;

      // -----
      // let obj = { one: 0, two: 0, three: 0 };
      // obj.one = obj['one']=0 (tuu tuu pl)
      // ----
    }
  });
  console.log(product_daily_sellRate, "sell date");

  const chartdata = Object.entries(product_daily_sellRate).map(
    ([key, val]) => ({
      date: key,
      "Products sales rate": val,
    })
  );

  // Object.entries is a method in JavaScript that returns an array of a given object's own enumerable string-keyed property [key, value] pairs. This method is useful for converting an object into an array, where each element is a [key, value] pair.

  // Example:
  // Let's say you have an object with some key-value pairs:
  // const user = {
  //   name: "John",
  //   age: 30,
  //   city: "New York"
  // };

  // const entries = Object.entries(user);

  // output
  // [
  //   ["name", "John"],
  //   ["age", 30],
  //   ["city", "New York"]
  // ]

  return (
    <>
      <h3 className="text-tremor-title text-tremor-content-strong dark:text-dark-tremor-content-strong font-medium mt-10">
        Product sales rate per daily
      </h3>
      <AreaChart
        className="h-80"
        data={chartdata}
        index="date"
        categories={["Products sales rate"]}
        colors={["indigo", "rose"]}
        yAxisWidth={60}
        onValueChange={(v) => console.log(v)}
        title=""
      />
    </>
  );
}
