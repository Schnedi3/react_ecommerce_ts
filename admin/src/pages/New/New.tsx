import { useState } from "react";
import { toast } from "react-toastify";

import { addProductRequest } from "../../api/product";
import imageUpload from "../../assets/images/upload.svg";
import "./new.css";

export const New = () => {
  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [category, setCategory] = useState<string>("");
  const [subcategory, setSubcategory] = useState<string>("");
  const [price, setPrice] = useState<string>("");
  const [sizes, setSizes] = useState<string[]>([]);
  const [images, setImages] = useState<File[]>([]);

  const handleImages = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setImages([...images, e.target.files[0]]);
    }
  };

  const sizesArray = ["S", "M", "L", "XL"];
  const handleSize = (size: string) => {
    setSizes(
      sizes.includes(size) ? sizes.filter((s) => s !== size) : [...sizes, size]
    );
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const formData = new FormData();

      formData.append("title", title);
      formData.append("description", description);
      formData.append("category", category);
      formData.append("subcategory", subcategory);
      formData.append("price", price);
      sizes.forEach((size) => formData.append("sizes", size));
      images.forEach((image) => formData.append("images", image));

      const response = await addProductRequest(formData);

      if (response.data.success) {
        toast.success(response.data.message);
        setTitle("");
        setDescription("");
        setCategory("");
        setSubcategory("");
        setPrice("10");
        setSizes([]);
        setImages([]);
      } else {
        toast.error(response.data.message);
      }
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      console.log(error);
      toast.error(error.message);
    }
  };

  return (
    <form className="form container" onSubmit={handleSubmit}>
      <h2>Add product</h2>
      <article className="upload">
        <p>Images</p>
        <div>
          <label htmlFor="image">
            <img src={imageUpload} />
            <input
              type="file"
              id="image"
              accept="image/*"
              onChange={handleImages}
            />
          </label>
          <ul>
            {images.map((image, index) => (
              <li key={index}>
                <img src={URL.createObjectURL(image)} />
              </li>
            ))}
          </ul>
        </div>
      </article>

      <label htmlFor="title" className="title">
        Title
        <input
          type="text"
          id="title"
          placeholder="product title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </label>

      <label htmlFor="desc" className="desc">
        Description
        <textarea
          id="desc"
          placeholder="product description"
          rows={3}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        ></textarea>
      </label>

      <article className="categories">
        <div className="category">
          <p>Category</p>
          <select onChange={(e) => setCategory(e.target.value)}>
            <option value="Men">Men</option>
            <option value="Women">Women</option>
            <option value="Kids">Kids</option>
          </select>
        </div>
        <div className="subcategory">
          <p>Sub-category</p>
          <select onChange={(e) => setSubcategory(e.target.value)}>
            <option value="Top">Top</option>
            <option value="Bottom">Bottom</option>
          </select>
        </div>
        <label className="price">
          Price
          <input
            type="number"
            placeholder="10"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />
        </label>
      </article>

      <article className="sizes">
        <p>Sizes</p>
        <div>
          {sizesArray.map((size) => (
            <button
              key={size}
              type="button"
              className={sizes.includes(size) ? "selected" : ""}
              onClick={() => handleSize(size)}
            >
              {size}
            </button>
          ))}
        </div>
      </article>

      <button type="submit">Add</button>
    </form>
  );
};
