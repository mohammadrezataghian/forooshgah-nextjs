const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL as string;

type otherOnes = {
    address : object | null;
    tokenInput : string
}


export const addressService = {
  getAllAddresses: async (EshterakNo:{EshterakNo:number}, tokenInput:string) => {
    const url = `${BASE_URL}/api/UserAddressList`
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${tokenInput}`,
      },
      body: JSON.stringify(EshterakNo),
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

  setDefaultAddress: async (address:object, tokenInput:string) => {
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

  deleteAddress: async (address:object, tokenInput:string) => { // addressId
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
