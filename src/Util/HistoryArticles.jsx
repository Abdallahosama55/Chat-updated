import styles from "./main.module.css";
import { Spinner, Stack } from "react-bootstrap";
import PaperIcon from "@/assets/icons/Paper";
import MenuIcon from "@/assets/icons/Menu";
import { useBreakpoint } from "use-breakpoint";
import { BREAKPOINTS } from "@/helpers/constants";
import { useCallback, useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toggleShowHistory } from "@/redux/slices/createArticle/articleSlice";
import { useDispatch, useSelector } from "react-redux";
import {
  useLazyAllArticlesQuery,
  useLazyGetArticleByIdQuery,
  useLazySearchQuery,
} from "@/redux/slices/createArticle/createArticleEndpoints";
import { setContent, setTitle } from "@/redux/features/api/apiSlice";
import toast from "react-hot-toast";
import { tryCatch } from "./Create-article/helpers";

const HistoryArticles = () => {
  const [selectedId, setSelectedId] = useState();
  const { showHistory } = useSelector((state) => state.article);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const timer = useRef(null);
  const { breakpoint } = useBreakpoint(BREAKPOINTS, "mobile");
  const isBelowDesktop = breakpoint !== "desktop";
  const closePanel = () => {
    dispatch(toggleShowHistory(false));
  };
  const [searchArticleQuery, setSearchArticleQuery] = useState(undefined);
  const [
    getHistory,
    { data: allArticles, isLoading, isSuccess: allArticlessSuccess },
  ] = useLazyAllArticlesQuery();
  const [
    getSearch,
    { data: searchData, isFetching, isSuccess: searchDataSuccess },
  ] = useLazySearchQuery({});

  const [getAticleById, { isFetching: getByIdLoading }] =
    useLazyGetArticleByIdQuery();

  const getSearchFun = useCallback(getSearch, [getSearch]);
  const getHistoryFun = useCallback(getHistory, [getHistory]);

  useEffect(() => {
    if (searchArticleQuery !== undefined) {
      clearTimeout(timer.current);
      timer.current = setTimeout(() => {
        tryCatch(getSearchFun.bind(null, searchArticleQuery, true));
      }, 600);
    }
  }, [searchArticleQuery, getSearchFun]);

  useEffect(() => {
    if (showHistory) tryCatch(getHistoryFun);
  }, [showHistory, getHistoryFun]);

  let data = [];
  if (searchDataSuccess && Array.isArray(searchData?.results)) {
    data = searchData.results;
  } else if (allArticlessSuccess && Array.isArray(allArticles?.results)) {
    data = allArticles.results;
  }
  return (
    <Stack
      className={`flex-fill position-fixed h-100 top-0 bg-light py-4 border-start px-3 bg-ligh`}
      style={{
        transform: showHistory ? "translateX(0)" : "translateX(150%)",
        width: isBelowDesktop ? "100%" : "16.666666%",
        maxHeight: "100vh",
        overflowY: "auto",
        zIndex: 100,
      }}
      gap={3}
    >
      <div
        className="d-flex justify-content-between"
        style={{ fontSize: "calc(12px + 0.12vw)" }}
      >
        <div className="title text-secondary  fw-medium">سجل المقالات</div>
        <span onClick={closePanel} role="button">
          <MenuIcon />
        </span>
      </div>
      {/* <input
        type="text"
        className="form-control"
        placeholder="بحث..."
        value={searchDoc}
        onChange={(e) => setSearchDoc(e.target.value)}
      /> */}

      <div className={`${styles["search-box"]} position-relative `}>
        <label
          htmlFor="search"
          className="form-label position-absolute end-0 top-50 translate-middle-y me-2"
        >
          <span>
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g clipPath="url(#clip0_5_4933)">
                <path
                  fillRule="evenodd"
                  clipPath="evenodd"
                  d="M10.4512 2C9.1035 2.00011 7.77532 2.32252 6.57752 2.94031C5.37972 3.55811 4.34703 4.45338 3.56561 5.55143C2.7842 6.64949 2.27671 7.91848 2.0855 9.25255C1.89428 10.5866 2.02488 11.9471 2.4664 13.2204C2.90792 14.4937 3.64756 15.643 4.6236 16.5723C5.59965 17.5017 6.78379 18.1842 8.07725 18.5628C9.37071 18.9415 10.736 19.0053 12.0591 18.7491C13.3823 18.4928 14.625 17.9239 15.6835 17.0897L19.3149 20.7209C19.5024 20.902 19.7536 21.0022 20.0143 21C20.275 20.9977 20.5244 20.8931 20.7088 20.7088C20.8931 20.5244 20.9977 20.275 21 20.0143C21.0022 19.7536 20.902 19.5025 20.7209 19.3149L17.0895 15.6837C18.0719 14.4375 18.6836 12.9398 18.8546 11.3622C19.0255 9.78451 18.7489 8.1906 18.0562 6.76284C17.3636 5.33508 16.283 4.13116 14.938 3.28886C13.5931 2.44655 12.0382 1.99989 10.4512 2ZM3.98798 10.4516C3.98798 8.73754 4.66893 7.09365 5.88102 5.8816C7.09312 4.66955 8.73708 3.98862 10.4512 3.98862C12.1654 3.98862 13.8094 4.66955 15.0215 5.8816C16.2336 7.09365 16.9145 8.73754 16.9145 10.4516C16.9145 12.1657 16.2336 13.8096 15.0215 15.0217C13.8094 16.2337 12.1654 16.9147 10.4512 16.9147C8.73708 16.9147 7.09312 16.2337 5.88102 15.0217C4.66893 13.8096 3.98798 12.1657 3.98798 10.4516Z"
                  fill="#5225CE"
                />
              </g>
              <defs>
                <clipPath id="clip0_5_4933">
                  <rect width="24" height="24" fill="white" />
                </clipPath>
              </defs>
            </svg>
          </span>
        </label>
        <input
          className={`${styles["search-input"]} form-control`}
          id="exampleDataList"
          placeholder="بحث..."
          value={searchArticleQuery || ""}
          onChange={(e) => setSearchArticleQuery(e.target.value)}
        ></input>
      </div>
      <Stack
        gap={3}
        className="z-top"
        style={{ fontSize: "calc(12px + 0.13vw)" }}
      >
        {isLoading || isFetching ? (
          <Stack className="items-center justify-center">
            <Spinner variant="secondary" />
          </Stack>
        ) : data.length === 0 ? (
          <div className="text-center">لا يوجد نتائج</div>
        ) : (
          data.map((article) => {
            return (
              <Link
                title="الذهاب إلى المحرر"
                className={`${styles["link"]} position-relative ${
                  selectedId === article.id && getByIdLoading
                    ? styles["link-fade"]
                    : ""
                }`}
                to={`/editor/${article.id}`}
                key={article.id}
                onClick={async (e) => {
                  e.preventDefault();
                  try {
                    setSelectedId(article.id);
                    const data = await tryCatch(
                      getAticleById.bind(null, article.id)
                    );

                    if (data?.content) {
                      navigate("/editor", {
                        state: {
                          article: data?.content,
                          title: data?.title,
                        },
                      });
                    } else {
                      toast.error("لا يو جد محتوى يمكن عرضه في المحرر", {
                        style: { direction: "rtl" },
                      });
                    }
                  } catch (error) {
                    toast.error(
                      "تعذر جلب تفاصيل المقال، معذراً حاول مرة أخرى لاحقًا",
                      {
                        style: { direction: "rtl" },
                      }
                    );
                  }
                }}
              >
                {selectedId === article.id && getByIdLoading && (
                  <div className="position-absolute top-0 start-0 h-100 w-100 z-1 d-flex align-items-center justify-content-center">
                    <Stack className="items-center justify-center">
                      <Spinner variant="secondary" />
                    </Stack>
                  </div>
                )}
                <div
                  className="border rounded-3  position-relative"
                  style={{ fontSize: "calc(12px + 0.12vw)" }}
                >
                  <div
                    className={`${styles["paper-icon"]} text-center py-3 border-bottom px-3`}
                  >
                    <PaperIcon />
                  </div>

                  <div className="details p-2">
                    <p className={`text-primary  ${styles["title"]} mb-1 `}>
                      {article?.title
                        ? `${
                            isBelowDesktop
                              ? article.title.length > 60
                                ? article.title.slice(0, 60) + "..."
                                : article.title
                              : article.title.length > 27
                              ? article.title.slice(0, 27) + "..."
                              : article.title
                          }`
                        : "لا يوجد عنوان"}
                    </p>

                    <p
                      className={` text-text-gray  label ${styles["sub-title"]} mb-0`}
                    >
                      آخر تحديث : {article?.updated_at}
                    </p>
                  </div>
                  {/* {getByIdLoading && (
                    <div className="position-absolute top-0 start-0 translate-middle">
                      <Stack className="items-center justify-center">
                        <Spinner variant="secondary" />
                      </Stack>
                    </div>
                  )} */}
                </div>
              </Link>
            );
          })
        )}
      </Stack>
    </Stack>
  );
};

export default HistoryArticles;
