import { useSelector, useDispatch } from "react-redux";
import Grid from "@mui/material/Unstable_Grid2";
import Card from "./Card";
import { cards } from "../../../assets/placeholder-data/ContentSections/cards";
import { categories } from "../../../assets/placeholder-data/ContentSections/cards";
import { favCardToggel } from "../../../redux/slices/contentSections/contentSectionsSlice";
import { Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

export default function CardsList() {
  const favCards = useSelector((state) => state.contentSections.favCards);
  const favMain = useSelector((state) => state.contentSections.favEn);
  const currCategory = useSelector(
    (state) => state.contentSections.currCategory
  );
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const shownCards = cards
    .filter(
      (card) =>
        (currCategory === categories[0] ||
          card.category.includes(currCategory)) &&
        (!favMain || (favMain && favCards[card.id]))
    )
    .map((card, index) => (
      <Grid xs={12} sm={6} md={4} lg={3} key={index}>
        <Card
          image={card.image_path}
          title={card.title}
          body={card.body}
          favEn={favCards[card.id]}
          onClickFav={(event) => {
            event.stopPropagation();
            dispatch(favCardToggel({ id: card.id }));
          }}
          onClick={() => {
            navigate(`/content-section/${card.id}`);
          }}
        ></Card>
      </Grid>
    ));
  return (
    <Grid container spacing={1}>
      {shownCards.length ? (
        shownCards
      ) : (
        <Typography
          variant="h6"
          sx={{
            width: "100%",
            textAlign: "center",
            opacity: "60%",
            marginTop: "6rem",
          }}
        >
          {"لا تتوفر أي خدمة لعرضها."}
        </Typography>
      )}
    </Grid>
  );
}
