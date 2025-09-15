// handle image
export const handleFileChange = (e:any,setErrors:any,setFileName:any,setImage:any) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      const extension = file.name.split(".").pop()?.toLowerCase();
      const mimeMap: Record<string, string> = {
        png: "image/png",
        jpg: "image/jpeg",
        jpeg: "image/jpeg",
      };
      const mimeType = mimeMap[extension || ""] || "application/octet-stream";

      const base64 = reader.result?.toString().split(",")[1]; // remove old prefix if any
      const formattedBase64 = `data:${mimeType};base64,${base64}`;

      setImage(formattedBase64);
      setFileName(file.name);

      setErrors((prev:any) => ({ ...prev, fileName: "" }));
    };
    reader.readAsDataURL(file);
  };
  // end handle image