import { Box, Button } from "@mui/material";
import ArrowCircleLeftIcon from "@mui/icons-material/ArrowCircleLeft";
import CustomButton from "../CustomButton/CustomButton";

const CommonBox = ({
  visible,
  children,
  handleHideBox,
  title,
  contentText,
  handleContinue,
  boxHeight = "h-full",
}) => {
  return (
    <>
      {visible && (
        <Box className={`${boxHeight} relative`}>
          <ArrowCircleLeftIcon
            onClick={handleHideBox}
            className="absolute left-0 cursor-pointer rounded-full bg-gradient-to-r from-violet-800 to-fuchsia-700 size-8 m-2"
          />
          <Box className="absolute cursor-pointer inset-center text-white">
            {title}
            {children}
            <CustomButton handleClick={handleContinue}>Continue</CustomButton>
          </Box>
        </Box>
      )}
    </>
  );
};

export default CommonBox;
