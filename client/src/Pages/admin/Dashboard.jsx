import React, { useEffect, useState } from "react";
import { CardUsageExample } from "../../Components/dashboard/Card";
import {
  BanknotesIcon,
  ShoppingBagIcon,
  UserGroupIcon,
} from "@heroicons/react/24/solid";
import { AreaChartHero } from "../../Components/dashboard/Chart";
import Bar from "../../Components/dashboard/Bar";

export const Dashboard = ({
  products,
  users,
  totalProducts,
  pendingProducts,
  setActiveTabKey,
}) => {
  // console.log(products);
  const [totalsale, setTotalsale] = useState(0);

  const [usercounts, setUsercounts] = useState(0);
  const calcTotal = () => {
    const totalAmount = products.reduce((a, b) => {
      return a + Number(b.product_price);
    }, 0);
    setTotalsale(totalAmount);
    // console.log(totalAmount);
  };
  useEffect(() => {
    if (products.length) {
      calcTotal();

      setUsercounts(users.length);
    }
  }, [products]);
  console.log(pendingProducts);
  return (
    <section>
      <div className="flex w-full  sm:items-center gap-6 mt-4 flex-wrap md:flex-nowrap">
        <CardUsageExample
          title={"Total sales"}
          count={`${totalsale}` + " mmk"}
          icon={BanknotesIcon}
          note={"sales"}
        />
        <div
          onClick={() => setActiveTabKey("3")}
          className="w-full cursor-pointer"
        >
          <CardUsageExample
            title={"Active users"}
            count={`${usercounts}`}
            icon={UserGroupIcon}
            note={"users"}
          />
        </div>
        <div
          onClick={() => setActiveTabKey("2")}
          className="w-full cursor-pointer"
        >
          <CardUsageExample
            title={"Total Products"}
            count={totalProducts}
            icon={ShoppingBagIcon}
            note={"items"}
          />
        </div>
        <div
          onClick={() => setActiveTabKey("2")}
          className="w-full cursor-pointer"
        >
          <CardUsageExample
            title={"Pending Products"}
            count={pendingProducts.length > 0 ? pendingProducts.length : 0}
            icon={ShoppingBagIcon}
            note={"pending"}
          />
        </div>
      </div>
      <div>
        <AreaChartHero products={products} />
        <Bar products={products} />
      </div>
    </section>
  );
};
