import { useEffect, useState } from "react";
import { toast } from "react-toastify";

import { listProductsRequest, removeProductRequest } from "../../api/product";
import { IProduct } from "../../types/types";

import iconRemove from "../../assets/images/remove.svg";
import "./list.css";

export const List = () => {
  const [list, setList] = useState<IProduct[]>([]);

  const fetchList = async () => {
    try {
      const response = await listProductsRequest();

      if (response.data.success) {
        setList(response.data.rows);
      } else {
        toast.error(response.data.message);
      }
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      console.log(error);
      toast.error(error.message);
    }
  };

  const removeProduct = async (id: number) => {
    try {
      const response = await removeProductRequest(id);

      if (response.data.success) {
        setList((prevList) => prevList.filter((item) => item.id !== id));
        toast.success(response.data.message);
      } else {
        toast.error(response.data.message);
      }
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      console.log(error);
      toast.error(error.message);
    }
  };

  useEffect(() => {
    fetchList();
  }, []);

  return (
    <section className="list container">
      <h2>All products</h2>
      <ul className="product">
        {list.map((item) => (
          <li key={item.id}>
            <div className="images">
              {item.images.map((image, index) => (
                <img key={index} src={image} />
              ))}
            </div>
            <div className="info">
              <h3>{item.title}</h3>
              <h4>{item.category}</h4>
              <p>{item.price}€</p>
              <img
                src={iconRemove}
                alt="remove product"
                onClick={() => removeProduct(item.id)}
              />
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
};
