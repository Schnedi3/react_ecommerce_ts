import { useEffect, useState } from "react";
import { toast } from "react-toastify";

import { useAuthContext } from "../../context/useAuthContext";
import { useShopContext } from "../../context/useShopContext";
import {
  AddressModal,
  deleteAddressRequest,
  iconAddress,
  iconDelete,
  iconEdit,
} from "../../Routes";

import "./profile.css";
import "../globals.css";
import { AddressEdit } from "./AddressEdit";
import { IAddress } from "../../types/types";

export const Profile = () => {
  const [isEditAddress, setIsEditAddress] = useState<boolean>(false);
  const { user } = useAuthContext();
  const {
    getAddress,
    addressList,
    setAddressList,
    isModalAddress,
    setIsModalAddress,
  } = useShopContext();

  useEffect(() => {
    getAddress();
  }, [getAddress]);

  const [addressData, setAddressData] = useState<IAddress | undefined>(
    undefined
  );
  const handleUpdateAddress = (address: IAddress) => {
    setIsEditAddress(true);
    setAddressData(address);
  };

  const deleteAddress = async (id: number) => {
    try {
      const response = await deleteAddressRequest(id);

      if (response.data.success) {
        setAddressList(addressList.filter((address) => address.id !== id));
        toast.success(response.data.message);
      } else {
        toast.error(response.data.message);
      }
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.log(error.message);
      } else {
        console.log("An unexpected error occurred");
      }
    }
  };

  return (
    <section className="profile_container container">
      {user && (
        <article className="personal">
          <h2>Personal information</h2>
          <ul>
            <li>
              <h4>Username</h4>
              <p>{user.username}</p>
            </li>
            <li>
              <h4>Email</h4>
              <p>{user.email}</p>
            </li>
          </ul>
        </article>
      )}

      <article className="address_container">
        <h2>Your addresses</h2>

        <div className="profile_address">
          {addressList.map((address) => (
            <label key={address.first_name}>
              <input type="radio" />

              <div className="address_info">
                <h4>
                  {address.first_name} {address.last_name}
                </h4>

                <p>
                  {address.street}, {address.number}
                </p>
                <p>{address.door}</p>
                <p>{address.city}</p>
                <p>
                  {address.state}, {address.zip_code}
                </p>

                <p>
                  <span>Phone number:</span> {address.phone}
                </p>
              </div>

              <div className="address_buttons">
                <button onClick={() => handleUpdateAddress(address)}>
                  <img src={iconEdit} alt="edit address" />
                </button>
                <button onClick={() => deleteAddress(address.id)}>
                  <img src={iconDelete} alt="delete address" />
                </button>
              </div>
            </label>
          ))}
        </div>
        <button className="new_address" onClick={() => setIsModalAddress(true)}>
          <img src={iconAddress} alt="add new address" />
          Add new address
        </button>
      </article>

      {isModalAddress && <AddressModal getAddress={getAddress} />}
      {isEditAddress && (
        <AddressEdit
          isEditAddress={isEditAddress}
          setIsEditAddress={setIsEditAddress}
          getAddress={getAddress}
          addressData={addressData}
        />
      )}
    </section>
  );
};
