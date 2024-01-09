import * as React from "react";
import { styled } from "@mui/material/styles";
import Tooltip, { tooltipClasses } from "@mui/material/Tooltip";
import Typography from "@mui/material/Typography";

const HtmlTooltip = styled(({ className, ...props }) => (
  <Tooltip {...props} classes={{ popper: className }} />
))(({ theme }) => ({
  [`& .${tooltipClasses.tooltip}`]: {
    backgroundColor: "#f5f5f9",
    color: "rgba(0, 0, 0, 0.87)",
    maxWidth: 220,
    fontSize: theme.typography.pxToRem(12),
    border: "1px solid #dadde9",
  },
}));

const TooltipWrapper = ({ children, helpText, placement }) => {
  return (
    <div>
      <HtmlTooltip
        title={
          <React.Fragment>
            <Typography color="inherit">{helpText}</Typography>
            {/* A really good example commented out for the future reference */}
            {/* <Typography color="inherit">Tooltip with HTML</Typography>
            <em>{"And here's"}</em> <b>{"some"}</b> <u>{"amazing content"}</u>.{" "}
            {"It's very engaging. Right?"}
            <br />
            <a href="/glassmorphism">click here!</a>
            What else can we right here? */}
          </React.Fragment>
        }
        enterDelay={500}
        leaveDelay={200}
        placement={placement}
      >
        {children}
      </HtmlTooltip>
    </div>
  );
};

export default TooltipWrapper;
