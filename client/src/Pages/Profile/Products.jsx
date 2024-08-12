// import React from "react";
// import { Form, Input, Row, Col, Select, Checkbox } from "antd";
// import TextArea from "antd/es/input/TextArea";
// import { SquaresPlusIcon } from "@heroicons/react/24/solid";
// const Products = () => {
//   const options = [
//     { value: "mobile_phones", label: "Mobile Phones" },
//     { value: "laptops_computers", label: "Laptops & Computers" },
//     { value: "tablets_accessories", label: "Tablets & Accessories" },
//     { value: "cameras_photography", label: "Cameras & Photography" },
//     { value: "audio_headphones", label: "Audio & Headphones" },
//     { value: "wearable_technology", label: "Wearable Technology" },
//     { value: "home_appliances", label: "Home Appliances" },
//     { value: "video_games_consoles", label: "Video Games & Consoles" },
//   ];

//   const checkBoxOptions = [
//     {
//       label: "Accessories",
//       value: "Accessories",
//     },
//     {
//       label: "Warranty",
//       value: "Warranty",
//     },
//     {
//       label: "Voucher",
//       value: "Voucher",
//     },
//   ];
//   return (
//     <div>
//       <h1 className="text-2xl mt-3 mb-3 font-medium">
//         What do you want to sell?
//       </h1>
//       <Form layout="vertical">
//         <Form.Item
//           name="product_name"
//           label="Product_name"
//           rules={[
//             {
//               required: true,
//               message: "Please Enter product name",
//             },
//           ]}
//           hasFeedback
//         >
//           <Input placeholder="Product name..."></Input>
//         </Form.Item>

//         <Form.Item
//           label="Product description"
//           name="product_description"
//           rules={[
//             {
//               required: true,
//               message: "Enter product's description",
//             },
//           ]}
//           hasFeedback
//         >
//           <TextArea rows={4} placeholder="description..." />
//         </Form.Item>
//         <div>
//           <Row gutter={16}>
//             <Col span={8}>
//               <Form.Item
//                 label="Price"
//                 name="price"
//                 rules={[
//                   {
//                     required: true,
//                     message: "Enter product's price",
//                   },
//                 ]}
//                 hasFeedback
//               >
//                 <Input type="number"></Input>
//               </Form.Item>
//             </Col>

//             <Col span={8}>
//               <Form.Item
//                 label="Product category"
//                 name="price"
//                 rules={[
//                   {
//                     required: true,
//                     message: "Choose a category",
//                   },
//                 ]}
//                 hasFeedback
//               >
//                 <Select defaultValue={""} options={options} />
//               </Form.Item>
//             </Col>
//             <Col span={8}>
//               <Form.Item
//                 label="Used for"
//                 name="product_used_for"
//                 rules={[
//                   {
//                     required: true,
//                     message: "Enter product's used time",
//                   },
//                 ]}
//                 hasFeedback
//               >
//                 <Input type="number" placeholder="eg. 3 months ago..." />
//               </Form.Item>
//             </Col>
//           </Row>
//           <Form.Item label="Details" name="product_details">
//             <Checkbox.Group options={checkBoxOptions} defaultValue={""} />
//           </Form.Item>
//         </div>
//         <button className="font-medium text-lg text-center my-2 bg-blue-500 p-2 rounded-lg flex items-center gap-2 w-full justify-center text-white">
//           <SquaresPlusIcon width={30} />
//           Sell
//         </button>
//       </Form>
//     </div>
//   );
// };

// export default Products;
import React from "react";

const Products = () => {
  return <div>Products</div>;
};

export default Products;
