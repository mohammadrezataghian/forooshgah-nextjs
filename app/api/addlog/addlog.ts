import axios from "axios";

export const addLog = async (
  params: any = null,
  url: string = "",
  errormessage: string = "",
  userToken: string = ""
) => {
  
  const addLogUrl = process.env.API_URL_ADDLOG;
  
  if (!addLogUrl) {
    console.error("addLogUrl is not defined in environment variables");
    return;
  }

  try {
    await axios.post(addLogUrl, {
      errorMessage: errormessage,
      sqlQuery: `apiAddress: ${url}, params: ${JSON.stringify(params)}, userToken: ${userToken}`,
    });
  } catch (err) {
    console.error("Failed to add log:", err);
  }
};
