import { message, Tabs } from "antd";
import ProductFrom from "../../Components/ProductManage/ProductForm";
import { useEffect, useState } from "react";
import { getAllproducts } from "../../apicalls/products";
import Upload from "../../Components/ProductManage/Upload";

const ManageProducts = ({ setActiveTabkey, editmode, editProductId }) => {
  const [productactiveTabkey, setProductactiveTabkey] = useState("1");
  // const [editmode, setEditmode] = useState(false);
  const [products, setProducts] = useState([]);

  // const getProducts = async () => {
  //   try {
  //     const response = await getAllproducts();
  //     if (response.isSuccess) {
  //       setProducts(response.productData);
  //     } else {
  //       throw new Error("There is no product found ");
  //     }
  //   } catch (err) {
  //     return message.error(err.message);
  //   }
  // };
  // useEffect(() => {
  //   // getProducts();
  // }, [productactiveTabkey]);
  const items = [
    {
      key: "1",
      label: "Manage Products",
      children: (
        <ProductFrom
          setActiveTabkey={setActiveTabkey}
          editmode={editmode}
          editProductId={editProductId}
        />
      ),
    },
    editmode
      ? {
          key: "2",
          label: "Product details",
          children: (
            <Upload
              editProductId={editProductId}
              setActiveTabkey={setActiveTabkey}
            />
          ),
        }
      : null,
  ];

  return <Tabs defaultActiveKey="1" items={items} />;
};
export default ManageProducts;
