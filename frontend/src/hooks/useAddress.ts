import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "react-toastify";

import { addAddressRequest, getAddressRequest } from "../api/address";
import { addressSchema } from "../schemas/schemas";
import { IAddress } from "../types/types";

export const useAddress = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<IAddress>({
    resolver: zodResolver(addressSchema),
  });
  const [addresses, setAddresses] = useState<IAddress[]>([]);
  const [useAddress, setUseAddress] = useState<IAddress | undefined>(undefined);

  const getAddress = async () => {
    try {
      const response = await getAddressRequest();

      if (response.data.success) {
        setAddresses(response.data.result);
      } else {
        console.log(response.data.message);
      }
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.log(error.message);
      } else {
        console.log("An unexpected error occurred");
      }
    }
  };

  useEffect(() => {
    getAddress();
  }, []);

  const onSubmit = async (data: IAddress) => {
    setUseAddress(data);

    try {
      const response = await addAddressRequest(data);

      if (response.data.success) {
        toast.success(response.data.message);
        await getAddress();
      } else {
        console.log(response.data.message);
      }
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.log(error.message);
      } else {
        console.log("An unexpected error occurred");
      }
    }

    reset();
  };

  return {
    register,
    handleSubmit,
    errors,
    addresses,
    setAddresses,
    useAddress,
    setUseAddress,
    onSubmit,
  };
};
