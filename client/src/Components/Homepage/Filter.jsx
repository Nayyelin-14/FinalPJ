import { message } from "antd";
import React, { useEffect, useState } from "react";
import { getFiltered_products } from "../../apicalls/products";

const Filter = ({ setProducts, diplayProducts }) => {
  const [selectedCategory, setSelectedCategory] = useState(null);

  const categories = [
    { value: "mobile_phones", label: "Mobile Phones" },
    { value: "laptops_computers", label: "Laptops & Computers" },
    { value: "tablets_accessories", label: "Tablets & Accessories" },
    { value: "cameras_photography", label: "Cameras & Photography" },
    { value: "audio_headphones", label: "Audio & Headphones" },
    { value: "wearable_technology", label: "Wearable Technology" },
    { value: "home_appliances", label: "Home Appliances" },
    { value: "video_games_consoles", label: "Video Games & Consoles" },
    { value: "sports_and_fitness", label: "Sports and fitness" },
    { value: "electronics_and_gadgets", label: "Electronics and gadgets" },
    { value: "home_and_furniture", label: "Home and furniture" },
    { value: "toys_and_games", label: "Toys and games" },
    { value: "clothing_and_fashion", label: "Clothing and fashion" },

    { value: "books_and_media", label: "Books and media" },
    { value: "beauty_and_personal_care", label: "Beauty and personal care" },
    { value: "clothing_and_fashion", label: "Clothing and fashion" },
  ];
  // console.log(selectedCategory);
  const categoryHandle = async (i) => {
    try {
      setSelectedCategory(i);
      const selected_Category = categories[i].value;
      // console.log(selectedCategory);
      const response = await getFiltered_products(
        "CategoryKey",
        selected_Category
      );
      if (response.isSuccess) {
        message.success(response.message);
      } else {
        setProducts("");
        throw new Error("No products found in selected category");
      }
      console.log(response);
      setProducts(response.filtered_product);
    } catch (error) {
      message.error(error.message);
    }
  };
  const clearHandle = () => {
    setSelectedCategory(null);
    diplayProducts();
  };
  useEffect(() => {
    diplayProducts();
  }, []);
  return (
    <div className="flex gap-2 items-center mx-auto max-w-4xl my-8 flex-wrap custom-scrollbar justify-center max-h-36 overflow-scroll">
      {categories.map((cat, index) => {
        return (
          <p
            key={index}
            className={`text-base p-1 rounded-lg  text-blue-600 border-gray-500 border-2 font-semibold cursor-pointer bg-white ${
              index === selectedCategory && "border-dashed"
            }`}
            onClick={() => categoryHandle(index)}
          >
            {cat.value.toUpperCase().replaceAll("_", " ")}
          </p>
        );
      })}
      {selectedCategory && (
        <button
          className="text-base p-1 rounded-lg  text-white bg-blue-600 px-3"
          onClick={clearHandle}
        >
          clear
        </button>
      )}
    </div>
  );
};

export default Filter;
