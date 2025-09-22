import { useState } from 'react';
import axios from 'axios';
import { addLog } from "@/app/api/addlog/addlog";

const useSupplierConfirmation = (userToken:any,url:string) => {

    const [confirmationLoading,setConfirmationLoading] = useState(false);
    const [confirmationError,setConfirmationError] = useState<string | null>(null);
    const [confirmationResponse,setConfirmationResponse] = useState<any>(null);

    const getConfirmation = async (data:any) => {

        setConfirmationLoading(true);
        setConfirmationError(null);

        try {
            const response = await axios.post(
                url,
                data,
              {
                headers: {
                  Authorization: `Bearer ${userToken}`,
                  "Content-Type": "application/json",
                },
              }
            );
    
            setConfirmationResponse(response);
          } catch (err:any) {
            setConfirmationError(err.message || "An unknown error occurred in supplier comfirmation");
            if (process.env.NODE_ENV === "production") {
              await addLog(data,url,err.message + " , An unknown error occurred in supplier comfirmation",userToken)
              }
          } finally {
            setConfirmationLoading(false);
          }

    }
    return { confirmationLoading, confirmationError, confirmationResponse, getConfirmation }
}
export default useSupplierConfirmation;