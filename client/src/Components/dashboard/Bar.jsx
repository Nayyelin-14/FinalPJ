import { BarList, Card } from "@tremor/react";

const Bar = ({ products }) => {
  const categorycount = {};

  products.forEach((product) => {
    const product_category = product.product_category;
    if (!categorycount[product_category]) {
      categorycount[product_category] = 0;
    }
    categorycount[product_category] += 1;
  });
  const data = Object.entries(categorycount).map(([key, val]) => ({
    name: key.toUpperCase().replaceAll("_", " "),
    value: val,
  }));

  return (
    <Card className="w-full mx-auto mt-10 ">
      <h3 className="text-tremor-title text-tremor-content-strong dark:text-dark-tremor-content-strong font-medium">
        Product sales by categories
      </h3>
      <p className="mt-4 text-tremor-default flex items-center justify-between text-tremor-content dark:text-dark-tremor-content">
        <span>Category</span>
        <span>Counts</span>
      </p>
      <BarList data={data} className="mt-2" />
    </Card>
  );
};

export default Bar;
