import ClearIcon from "@mui/icons-material/Clear";
import {Stack,Typography,IconButton} from "@mui/material";

const Selections = () => {
    const handleDelete = () => {
      console.info("You clicked the delete icon.");
    };
    return (
      <Stack
        direction="row"
        spacing={1 / 2}
        useFlexGap
        sx={{ flexWrap: "wrap", alignItems: "center" }}
      >
        <Typography variant="overline" gutterBottom>
          انتخاب های شما :
        </Typography>
        {Array.from({ length: 10 }).map((_, index) => {
          return (
            <Stack
              direction="row"
              spacing={1 / 4}
              useFlexGap
              sx={{
                paddingInlineStart: 1,
                paddingInlineEnd: 1 / 2,
                border: 1,
                borderColor: "lightgray",
                borderRadius: 1,
                alignItems: "center",
                cursor: "default",
              }}
            >
              <Typography variant="overline" sx={{ m: "-2px" }}>
                فیلتر
              </Typography>
              <IconButton size="small" onClick={handleDelete}>
                <ClearIcon
                  fontSize="small"
                  sx={{ cursor: "pointer", color: "dimgray" }}
                />
              </IconButton>
            </Stack>
          );
        })}
      </Stack>
    );
  };

  export default Selections;