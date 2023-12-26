import { Typography, useTheme } from "@mui/material";
const Header = ({ title, subTitle }) => {
  const theme = useTheme();
  return (
    <>
      <Typography
        varient="h2"
        color={theme.palette.secondary[100]}
        fontWeight="bold"
        sx={{ mb: "5px" }}
      >
        {title}
      </Typography>
      <Typography varient="h5" color={theme.palette.secondary[300]}>
        {subTitle}
      </Typography>
    </>
  );
};

export default Header;
