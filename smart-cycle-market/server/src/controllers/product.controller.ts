import { isValidObjectId } from "mongoose";
import cloudUploader from "src/cloud";
import { Product } from "src/models/product.model";
import { User } from "src/models/users.model";
import { ApiError, ApiResponse, asyncHandler } from "src/utils/helper";

async function uploadImage(filepath: string) {
  const { secure_url: url, public_id: id } = await cloudUploader.upload(
    filepath,
    {
      width: 1280,
      height: 720,
      crop: "fill",
    }
  );

  return { url, id };
}

export const listProduct = asyncHandler(async (req, res) => {
  const { name, price, purchasingDate, category, description } = req.body;

  const newProduct = new Product({
    owner: req.user.id,
    name,
    price,
    purchasingDate,
    category,
    description,
  });

  const { images } = req.files;

  if (!images) throw new ApiError("Please Provide Image", 422);

  let imageUrls = [];

  let inavalidFileType = false;

  if (Array.isArray(images)) {
    if (images.length > 5)
      throw new ApiError("Images should not be more than 5", 422);
    for (let img of images) {
      if (!img.mimetype?.startsWith("image")) {
        inavalidFileType = true;
        break;
      }
      const { url, id } = await uploadImage(img.filepath);
      imageUrls.push({ url, id });
    }
  } else {
    if (!images.mimetype?.startsWith("image")) {
      inavalidFileType = true;
    } else {
      const { url, id } = await uploadImage(images.filepath);
      imageUrls.push({ url, id });
    }
  }

  if (inavalidFileType)
    throw new ApiError("Image file type must be image type", 422);

  newProduct.thumbnail = imageUrls[0].url;
  newProduct.images = imageUrls;

  await newProduct.save();

  return res.json(
    new ApiResponse(
      "New Product has been added",
      {
        product: {
          name,
          price,
          purchasingDate,
          category,
          description,
          thumbnail: newProduct.thumbnail,
          images: newProduct.images,
        },
      },
      201
    )
  );
});

export const updateProduct = asyncHandler(async (req, res) => {
  const id = req.params["id"];
  if (!isValidObjectId(id))
    throw new ApiError("Please Provide id of product", 422);

  const { name, price, purchasingDate, category, description, thumbnail } =
    req.body;

  const product = await Product.findOneAndUpdate(
    { _id: id, owner: req.user.id },
    {
      name,
      price,
      purchasingDate,
      category,
      description,
    },
    {
      new: true,
    }
  );

  if (!product) throw new ApiError("product not found", 404);

  if (typeof thumbnail === "string") product.thumbnail = thumbnail;

  const { images } = req.files;

  let inavalidFileType = false;

  if (Array.isArray(images)) {
    if (product.images.length + images.length > 5)
      throw new ApiError("Images should not be more than 5", 422);
    for (let img of images) {
      if (!img.mimetype?.startsWith("image")) {
        inavalidFileType = true;
        break;
      }
      const { url, id } = await uploadImage(img.filepath);
      product.images.push({ url, id });
    }
  } else {
    if (images) {
      if (!images.mimetype?.startsWith("image")) {
        inavalidFileType = true;
      } else {
        const { url, id } = await uploadImage(images.filepath);
        product.images.push({ url, id });
      }
    }
  }

  if (inavalidFileType)
    throw new ApiError("Image file type must be image type", 422);

  await product.save();

  return res.json(
    new ApiResponse(
      " Product has been updated",
      {
        product: {
          name,
          price,
          purchasingDate,
          category,
          description,
          thumbnail: product.thumbnail,
          images: product.images,
        },
      },
      201
    )
  );
});

export const deleteProduct = asyncHandler(async (req, res) => {
  const id = req.params["id"];

  if (!isValidObjectId(id))
    throw new ApiError("Please provide valid id of the product", 422);

  console.log();

  const product = await Product.findOneAndDelete({
    owner: req.user.id,
    _id: id,
  });
  if (!product) throw new ApiError("product not found", 404);

  product.images.map(async ({ id }) => {
    await cloudUploader.destroy(id);
  });

  return res.json(new ApiResponse("Product has been deleted", {}, 200));
});

export const deleteProductImage = asyncHandler(async (req, res) => {
  const { productId, imageId } = req.params;

  if (!productId || !isValidObjectId(productId))
    throw new ApiError("Please provide valid productId", 422);
  if (!imageId) throw new ApiError("Please provide valid imageId", 422);

  const product = await Product.findOne({ _id: productId, owner: req.user.id });
  if (!product) throw new ApiError("Product not found", 404);

  const updatedImages = [];

  for (const { id, url } of product.images) {
    if (id === imageId) {
      await cloudUploader.destroy(id);
      continue;
    }
    updatedImages.push({ id, url });
  }

  product.images = updatedImages;

  if (product.thumbnail.includes(imageId)) {
    product.thumbnail = product.images[0].url;
  }

  await product.save();

  return res.json(
    new ApiResponse(
      "Image has been deleted",
      {
        product: {
          name: product.name,
          price: product.price,
          purchasingDate: product.purchasingDate,
          category: product.category,
          description: product.description,
          thumbnail: product.thumbnail,
          images: product.images,
        },
      },
      200
    )
  );
});
export const getProduct = asyncHandler(async (req, res) => {});
export const getProductByCategory = asyncHandler(async (req, res) => {});
export const getLatestProduct = asyncHandler(async (req, res) => {});
export const getListedAllProduct = asyncHandler(async (req, res) => {});
