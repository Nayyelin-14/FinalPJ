import React, { useEffect, useState } from "react";
import { TrashIcon } from "@heroicons/react/24/solid";
import {
  delete_savedImg,
  get_Product_Images,
  uploadProduct_image,
} from "../../apicalls/products";
import { setLoader } from "../../store/slices/LoaderSlice";
import { message } from "antd";
import { useDispatch, useSelector } from "react-redux";
const Upload = ({ editProductId, setActiveTabkey }) => {
  const [images, setImages] = useState([]);
  const [previewImages, setPreviewImages] = useState([]);
  const [uploading, setUploading] = useState(false);
  const [savedimages, setSavedimages] = useState([]);
  const [selectedIImagescount, setSelectedIImagescount] = useState(0);
  const { isProcessing } = useSelector((state) => state.reducer.loader);
  // console.log(isProcessing);
  const dispatch = useDispatch();
  const imagechangeshandler = (event) => {
    const selectedImages = event.target.files;
    setImages((prev) => [...prev, ...selectedImages]);

    const selectedImagesArray = Array.from(selectedImages);

    setSelectedIImagescount((prev) => prev + selectedImagesArray.length);

    const previewImagesArray = selectedImagesArray.map((img) => {
      return URL.createObjectURL(img);
    });
    setPreviewImages((prev) => prev.concat(previewImagesArray));
  };

  const deleteImagehandle = (deleteimg) => {
    const indexToRemove = previewImages.indexOf(deleteimg); // Find index of image to remove
    const newImages = images.filter((_, index) => index !== indexToRemove); // Fix: Remove image based on index
    setPreviewImages(previewImages.filter((element) => element !== deleteimg));
    setSelectedIImagescount((prev) => prev - 1);
    setImages(newImages);
    URL.revokeObjectURL(deleteimg);
  };

  //   The FormData object is a built-in JavaScript API that allows you to easily construct a set of key/value pairs representing form fields and their values, which can then be sent using XMLHttpRequest or fetch.
  // FormData is particularly useful for sending files, as it automatically handles the correct encoding of binary data.
  const imageSubmit = async (e) => {
    e.preventDefault();

    if (selectedIImagescount >= 2) {
      dispatch(setLoader(true));
      console.log(isProcessing);

      const formData = new FormData();
      for (let i = 0; i < images.length; i++) {
        formData.append(`product_images`, images[i]);
      }
      formData.append("editProductId", editProductId);
      try {
        const response = await uploadProduct_image(formData);
        if (response.isSuccess) {
          message.success(response.message);
          setActiveTabkey("1");
          setPreviewImages([]);
        } else {
          throw new Error(response.message);
        }
        dispatch(setLoader(false));
        console.log(isProcessing);
      } catch (err) {
        message.error(err.message);
      }
    } else {
      message.error("Please add at least two images");
    }
  };

  const get_images = async (product_id) => {
    try {
      const response = await get_Product_Images(product_id);
      console.log(response);
      if (response.isSuccess) {
        message.success(response.message);
        // console.log(response);

        setSavedimages(response.images_data.images);
        console.log(savedimages);
      } else {
        throw new Error(response.message);
      }
    } catch (err) {
      message.error(err.message);
    }
  };
  useEffect(() => {
    get_images(editProductId);
  }, []);

  //
  const delete_SAVED_Imagehandle = async (img) => {
    setSavedimages((prev) => prev.filter((deleteimg) => img !== deleteimg));

    try {
      const response = await delete_savedImg({
        productId: editProductId,
        deleteimgId: img,
      });
      if (response.isSuccess) {
        message.success(response.message);
      } else {
        throw new Error(response.message);
      }
    } catch (error) {
      message.error(error.message);
    }
  };
  return (
    <div>
      <h1 className="text-2xl font-semibold mb-10">Upload images.</h1>

      {savedimages.length > 0 ? (
        <div>
          <h1 className="text-2xl font-semibold ">
            Saved images in cloudinary.
          </h1>
          <p className="text-red-500">You can delete images you want.</p>
          <div className="flex gap-3 mb-10 mt-2">
            {savedimages &&
              savedimages.map((img, index) => {
                return (
                  <div key={index} className="w-36 h-36 relative ">
                    <img
                      src={img}
                      alt="hi there"
                      className="w-full h-full object-cover "
                    />
                    <TrashIcon
                      color="white"
                      width={23}
                      height={23}
                      className="absolute top-1/2 left-16 cursor-pointer"
                      onClick={() => delete_SAVED_Imagehandle(img)}
                    />
                  </div>
                );
              })}
          </div>
        </div>
      ) : (
        <p className="mb-10 font-semibold text-red-700 text-lg">
          No saved images !!!
        </p>
      )}
      <form method="post" encType="multipart/form-data" onSubmit={imageSubmit}>
        <label
          htmlFor="upload"
          className="p-4 border-2 border-dashed border-blue-700 my-3 rounded-lg cursor-pointer font-medium "
        >
          Upload from device
        </label>
        <input
          type="file"
          accept="image/png,image/jpeg,image/jpg"
          multiple
          id="upload"
          name="product_images"
          hidden
          onChange={(event) => {
            imagechangeshandler(event);
          }}
        />
        <div className="flex gap-4 mt-10 flex-wrap">
          {previewImages &&
            previewImages.map((img, index) => {
              return (
                <div key={index} className="basis-1/6 h-36  relative">
                  <img
                    src={img}
                    alt={img.name}
                    className="w-full h-full object-cover rounded-lg"
                  />
                  <TrashIcon
                    color="white"
                    width={23}
                    height={23}
                    className="absolute top-1/2 left-10 cursor-pointer"
                    onClick={() => deleteImagehandle(img)}
                  />
                </div>
              );
            })}
        </div>
        {selectedIImagescount > 1 && (
          <button
            className="block p-3 bg-blue-600 rounded-lg text-white font-medium mt-5"
            disabled={isProcessing}
          >
            {isProcessing ? "Uploading..." : "Upload"}
          </button>
        )}
      </form>
    </div>
  );
};

export default Upload;
