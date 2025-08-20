const BASE_URL = process.env.API_BASE_URL;

type getAll = {
    eshterakno : number | string;
    tokenInput : string
}
type otherOnes = {
    address : object | null;
    tokenInput : string
}


export const addressService = {
  getAllAddresses: async ({eshterakno, tokenInput} : getAll) => {
    const response = await fetch(`${BASE_URL}/api/UserAddressList`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${tokenInput}`,
      },
      body: JSON.stringify(eshterakno),
    });
    if (!response.ok) throw new Error("Failed to add address");
    return response.json();
  },

  addAddress: async (address:object, tokenInput:string) => {
    const response = await fetch(`${BASE_URL}/api/AddUserAddress`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${tokenInput}`,
      },
      body: JSON.stringify(address),
    });
    if (!response.ok) throw new Error("Failed to add address");
    return response.json();
  },

  updateAddress: async ({address, tokenInput} : otherOnes) => {
    const response = await fetch(`${BASE_URL}/api/UpdateUserAddress`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${tokenInput}`,
      },
      body: JSON.stringify(address),
    });
    if (!response.ok) throw new Error("Failed to update address");
    return response.json();
  },

  setDefaultAddress: async ({address, tokenInput} : otherOnes) => {
    const response = await fetch(`${BASE_URL}/api/SetDefaultUserAddress`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${tokenInput}`,
      },
      body: JSON.stringify(address),
    });
    if (!response.ok) throw new Error("Failed to set default address");
  },

  deleteAddress: async ({address, tokenInput} : otherOnes) => { // addressId
    const response = await fetch(`${BASE_URL}/api/DeletetUserAddress`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${tokenInput}`,
      },
      body: JSON.stringify(address), // addressId
    });
    if (!response.ok) throw new Error("Failed to delete address");
  },
};
