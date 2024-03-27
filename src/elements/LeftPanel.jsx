import { Stack } from "react-bootstrap";
import { useBreakpoint } from "use-breakpoint";
import Card from "@/components/molecules/Card";
import CustomAccordion from "@/components/atoms/Accordion";
import { BREAKPOINTS } from "@/helpers/constants";

const LeftPanel = () => {
  const { breakpoint } = useBreakpoint(BREAKPOINTS, "mobile");
  const isBelowDesktop = breakpoint !== "desktop";
  return (
    <Stack
      direction="vertical"
      gap={4}
      className={`h-100 ${isBelowDesktop && "mt-3"}`}>
      <div>
        <Card>
          <div
            style={{ fontSize: "16px", fontWeight: "600" }}
            className="text-primary   text-center">
            مساعد مُتقِن
          </div>
        </Card>
      </div>
      <div className="flex-fill">
        <Card className="h-100 p-3 px-4">
          <CustomAccordion />
        </Card>
      </div>
    </Stack>
  );
};

export default LeftPanel;
