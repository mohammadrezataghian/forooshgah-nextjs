import {Breadcrumbs,Link,Box,Container,Typography} from "@mui/material"


const BasicBreadcrumbs = () => {
    const handleClick = (event:any) => {
      event.preventDefault();
      console.info("You clicked a breadcrumb.");
    };
    return (
      <Box
        component="section"
        className="container-fluid"
        sx={{ py: 1, bgcolor: "#DDD" }}
      >
        <Container maxWidth="xl">
          <div role="presentation" onClick={handleClick}>
            <Breadcrumbs aria-label="breadcrumb">
              <Link underline="hover" color="inherit" href="/" variant="caption">
                صفحه اصلی
              </Link>
              <Link
                underline="hover"
                color="inherit"
                href="/material-ui/getting-started/installation/"
                variant="caption"
              >
                محصولات
              </Link>
              <Typography sx={{ color: "text.primary" }} variant="caption">
               لیست محصولات
              </Typography>
            </Breadcrumbs>
          </div>
        </Container>
      </Box>
    );
  };
  export default BasicBreadcrumbs;
  