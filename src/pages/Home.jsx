import { Col, Row, Stack } from "react-bootstrap";
import RightPanel from "@/elements/RightPanel";
import LeftPanel from "@/elements/LeftPanel";
import { BREAKPOINTS } from "@/helpers/constants";
import { useBreakpoint } from "use-breakpoint";
import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import {
  useParams,
  useSearchParams,
  useNavigate,
  useLocation,
} from "react-router-dom";
import {
  createDocument,
  getDocument,
  setCurrentDoc,
} from "@/redux/features/api/apiSlice";
import WelcomeModal from "@/components/molecules/WelcomeModal";
import "../index.scss";

const Home = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const checker = useAppSelector((state) => state.checker);
  const user = useAppSelector((state) => state.user);
  const dispatch = useAppDispatch();

  //Create ID
  useEffect(() => {
    async function testing() {
      const newid = await dispatch(createDocument(false));
      if (checker.status === "succeeded") {
        navigate(`${checker.currentDoc}?new=true`);
      }
    }
    testing();
  }, []);

  const { breakpoint } = useBreakpoint(BREAKPOINTS, "mobile");

  const params = useParams();
  const [searchParams, setSearchParams] = useSearchParams();

  //              commented Get Document  we can get it from Post Request             //
  //                                                                                  //
  //                                                                                  //

  // comment it if server goes down
  // useEffect(() => {
  //   if (!state.checker.currentDoc || state.checker.currentDoc !== params.id)
  //     params.id && dispatch(setCurrentDoc(params.id));
  //   if (params.id && !searchParams.get("new"))
  //     dispatch(getDocument({ docId: params.id }));
  // }, [params]);
  // useEffect(() => {
  //   if (state.checker.content) {
  //     searchParams.delete("new");
  //     setSearchParams(searchParams);
  //   }
  // }, [state.checker.content]);

  //                                                                                  //
  //                                                                                  //

  const [showModal, setShowModal] = useState(
    user.subscription_plan === "Free" && localStorage.getItem("trail")
  );
  if (checker.status === "loading")
    return (
      <Stack
        direction="horizontal"
        className="justify-content-center align-items-center flex-fill">
        <div
          className="spinner-border text-primary"
          role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </Stack>
    );
  return (
    <>
      <WelcomeModal
        onClose={() => setShowModal(false)}
        show={showModal}
      />

      <Row
        dir="rtl"
        className="my-3 px-3 flex-fill">
        <Col md={breakpoint === "desktop" ? 10 : 12}>
          <RightPanel />
        </Col>
        <Col md={breakpoint === "desktop" ? 2 : 12}>
          <LeftPanel />
        </Col>
      </Row>
    </>
  );
};

export default Home;
