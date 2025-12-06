'use client'

import { useEffect, useState } from "react";
import { Container, Grid, Paper, Typography } from "@mui/material";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { clearProductListUpdate } from "@/store/slices/productListSlice";

function parseTextToObject(text: string, pairSeparator = "&", keyValueSeparator = "=") {
    const result: Record<string, string> = {};
    const pairs = text.split(pairSeparator);
    pairs.forEach((pair) => {
      const [key, value] = pair.split(keyValueSeparator);
      if (key) result[key.trim()] = value ? value.trim() : "";
    });
    return result;
  }

export default function VerifySadad() {

  const dispatch = useDispatch();
  const isPart = useSelector((state:RootState) => state.payfullOrPart.value)

  const router = useRouter()
  const [factorInfo, setFactorInfo] = useState<any>(null);
  const [isSucess, secSuccesPardakht] = useState(false);
  const [message, setMessage] = useState("در حال بررسی پرداخت...");

  const GetFactorAfterVrify = process.env.API_URL_GETFACTORAFTERVERIFY as string;

  const [param, setParam] = useState<Record<string, string> | null>(null);

  useEffect(() => {
      if (typeof window !== "undefined") {
        const hash = window.location.hash;
        const queryString = hash.includes("?")
          ? hash.substring(hash.indexOf("?") + 1)
          : "";
        const parsed = parseTextToObject(queryString);
        setParam(parsed);
      }
    }, []);

  function deleteShoppingCard() {
    if (!isPart) {
      localStorage.removeItem("products");
      dispatch(clearProductListUpdate())
    }
  }

  useEffect(() => {
    if (factorInfo == null) {
      const cu = GetFactorAfterVrify;
      if (param) {
        fetch(cu, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(param),
        })
          .then((res) => res.json())
          .then((data) => {
            if (data.resCode == 1) {
              secSuccesPardakht(true);
              deleteShoppingCard();
              setMessage("پرداخت با موفقیت انجام شد.");
              setFactorInfo(data.Data);
              router.push('/factorInfo')
              localStorage.setItem('FactorInfoState',JSON.stringify({ state: { factorInfo } }))
            } else {
              setMessage("پرداخت موفق");
            }
          })
          .catch(() => setMessage("خطا در بررسی پرداخت!"));
      }
    }
  }, []);

  return (
    <>
      {factorInfo ? (
        <Container>
          <Grid
            container
            justifyContent="center"
            alignItems="center"
            style={{ minHeight: "100vh" }} // وسط صفحه
          >
            <Grid>
              <Paper
                elevation={3}
                style={{ padding: "20px" }}
                className="flex flex-col items-start"
              >
                <Typography variant="h4" align="center" gutterBottom>
                  مشخصات فاکتور
                </Typography>
                <Typography variant="body1">
                  {factorInfo.Id} <strong>شماره سریال :</strong>
                </Typography>

                <Typography variant="body1">
                  {factorInfo.GhabelePardakht}
                  <strong>پرداخت شده:</strong>
                </Typography>
                <Typography variant="body1">
                  {factorInfo.DateFirstGhabz}
                  <strong>تاریخ:</strong>
                </Typography>
              </Paper>
            </Grid>
          </Grid>
        </Container>
      ) : (
        <Container>
          <Grid
            container
            justifyContent="center"
            alignItems="center"
            style={{ minHeight: "100vh" }} // وسط صفحه
          >
            <Grid>
              <Paper
                elevation={3}
                style={{ padding: "20px" }}
                className="flex flex-col items-start"
              >
                <Typography variant="h4" align="center" gutterBottom>
                  {message}
                </Typography>
              </Paper>
            </Grid>
          </Grid>
        </Container>
      )}
    </>
  );
  // return (
  //   <>
  //     {factorInfo ? (
  //       <Container>
  //         <Grid
  //           container
  //           justifyContent="center"
  //           alignItems="center"
  //           style={{ minHeight: "100vh" }} // وسط صفحه
  //         >
  //           <Grid item xs={12} md={6}>
  //             <Paper
  //               elevation={3}
  //               style={{ padding: "20px" }}
  //               className="flex flex-col items-start"
  //             >
  //               <Typography variant="h4" align="center" gutterBottom>
  //                 مشخصات فاکتور
  //               </Typography>
  //               <Typography variant="body1">
  //                 {factorInfo.Id} <strong>شماره سریال :</strong>
  //               </Typography>

  //               <Typography variant="body1">
  //                 {factorInfo.GhabelePardakht}
  //                 <strong>پرداخت شده:</strong>
  //               </Typography>
  //               <Typography variant="body1">
  //                 {factorInfo.DateFirstGhabz}
  //                 <strong>تاریخ:</strong>
  //               </Typography>
  //             </Paper>
  //           </Grid>
  //         </Grid>
  //       </Container>
  //     ) : (
  //       <Container>
  //         <Grid
  //           container
  //           justifyContent="center"
  //           alignItems="center"
  //           style={{ minHeight: "100vh" }} // وسط صفحه
  //         >
  //           <Grid item xs={12} md={6}>
  //             <Paper
  //               elevation={3}
  //               style={{ padding: "20px" }}
  //               className="flex flex-col items-start"
  //             >
  //               <Typography variant="h4" align="center" gutterBottom>
  //                 {message}
  //               </Typography>
  //             </Paper>
  //           </Grid>
  //         </Grid>
  //       </Container>
  //     )}
  //   </>
  // );
}
