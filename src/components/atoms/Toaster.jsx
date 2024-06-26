import { useEffect, useState } from "react";
import Row from "react-bootstrap/Row";
import Toast from "react-bootstrap/Toast";
import { useAppSelector } from "@/redux/hooks";
import { useBreakpoint } from "use-breakpoint";
import { BREAKPOINTS } from "@/helpers/constants";

function Toaster() {
  const [show, setShow] = useState(false);
  const checker = useAppSelector((state) => state.checker);
  useEffect(() => {
    if (
      (checker.status === "failed" || checker.ai.aiStatus === "failed") &&
      checker.error
    )
      setShow(true);
  }, [checker]);

  const { breakpoint } = useBreakpoint(BREAKPOINTS, "mobile");
  const isBelowDesktop = breakpoint !== "desktop";
  return (
    <Row
      className={`position-absolute top-0 end-50   m-1 z-3 ${
        isBelowDesktop && "w-100"
      }`}
      style={{
        transform: "translateX(50%)",
      }}>
      <Toast
        onClose={() => setShow(false)}
        show={show}
        delay={3000}
        autohide
        onClick={() => setShow(false)}
        className={`bg-light border border-2 border-danger text-danger fs-6 ${
          isBelowDesktop ? "w-100" : "w-100"
        }`}>
        <Toast.Body>{checker.error}</Toast.Body>
      </Toast>
    </Row>
  );
}

export default Toaster;
