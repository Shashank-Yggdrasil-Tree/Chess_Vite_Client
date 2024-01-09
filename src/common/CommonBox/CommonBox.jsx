import { Box, Button } from "@mui/material";
import ArrowCircleLeftIcon from "@mui/icons-material/ArrowCircleLeft";
import CustomButton from "../../components/CustomButton/CustomButton";
import TooltipWrapper from "../TooltipWrapper/TooltipWrapper";

const CommonBox = ({
  visible,
  children,
  handleHideBox,
  title,
  handleContinue,
  boxHeight = "h-full",
}) => {
  return (
    <>
      {visible && (
        <Box className={`${boxHeight} relative`}>
          <TooltipWrapper helpText="Go Back" placement="right">
            <ArrowCircleLeftIcon
              onClick={handleHideBox}
              className="absolute left-0 cursor-pointer rounded-full bg-violet-800 size-8 m-2 text-black transition ease-in-out hover:scale-110 duration-150 hover:bg-gradient-to-r from-violet-800 to-fuchsia-700"
            />
          </TooltipWrapper>
          <Box className="absolute inset-center text-white select-none">
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
