import { useParams } from "react-router-dom";
import { omdb } from "../utils";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Chip,
  Stack,
  Typography,
  IconButton,
  Rating,
} from "@mui/material";
import axios from "axios";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import useLocalStorage from "use-local-storage";

const Detail = (_) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [data, setData] = useState({});
  const [flag, setFlag] = useState(false);
  const [favourites, setFavourites] = useLocalStorage("favourites", "[]");
  const [isFavourite, setFavourite] = useState(false);

  useEffect(
    (_) => {
      const favs = JSON.parse(favourites);
      if (favs.includes(id)) {
        setFavourite(true);
      } else {
        setFavourite(false);
      }
    },
    [favourites, id]
  );

  const toggleFavourite = (_) => {
    const favs = JSON.parse(favourites);
    if (isFavourite) {
      const idx = favs.indexOf(id);
      favs.splice(idx, 1);
      setFavourite(false);
    } else {
      favs.push(id);
      setFavourite(true);
    }
    setFavourites(JSON.stringify(favs));
  };

  useEffect(
    (_) => {
      (async (_) => {
        const response = await omdb.get(`?i=${id}&plot=full`);
        if (response.data.Response === "False") {
          navigate("/404");
        } else {
          setData(response.data);
        }
      })();
    },
    [id, navigate]
  );

  useEffect(
    (_) => {
      if (data.Country?.length > 0) {
        let countryArray = data.Country.split(", ");
        (async (_) => {
          const response = await axios.get(
            `https://restcountries.com/v3.1/name/${countryArray[0]}`
          );
          setFlag(response.data[0]?.flags?.svg);
        })();
      }
    },
    [data]
  );

  return (
    <>
      <Box p={5}>
        <Stack>
          <Stack
            direction="row"
            sx={{
              flexDirection: {
                xs: "column",
                sm: "row",
                md: "row",
              },
            }}
            spacing={5}
          >
            <img
              src={
                data.Poster !== "N/A"
                  ? data.Poster
                  : "https://upload.wikimedia.org/wikipedia/commons/6/65/No-Image-Placeholder.svg"
              }
              alt="Poster"
            />
            <Box>
              <Typography variant="h4">
                {data.Title}
                &nbsp;
                <IconButton
                  size="large"
                  color="error"
                  onClick={toggleFavourite}
                >
                  {isFavourite ? <FavoriteIcon /> : <FavoriteBorderIcon />}
                </IconButton>
              </Typography>
              <Stack direction="row">
                <Typography variant="h6">
                  Released On:&nbsp; {data.Released} &nbsp;
                </Typography>

                {data.Runtime !== "N/A" ? (
                  <Typography variant="h6">
                    | &nbsp;Duration:&nbsp; {data.Runtime}
                  </Typography>
                ) : (
                  ""
                )}
              </Stack>
              <Typography variant="h5" mt={3} mb={1}>
                Crew :
              </Typography>
              <Stack
                direction="row"
                gap={1}
                sx={{ flexWrap: "wrap" }}
                justify-content="flex-start"
                align-items="flex-start"
              >
                {data.Actors?.split(", ").map((e, i) => {
                  return (
                    <a
                      key={i}
                      href={`https://www.google.com/search?q=${e}`}
                      target="_blank"
                      rel="noreferrer"
                    >
                      <Chip label={e} sx={{ cursor: "pointer" }} />
                    </a>
                  );
                })}

                {data.Writer?.split(", ").map((e, i) => {
                  return (
                    <a
                      key={i}
                      href={`https://www.google.com/search?q=${e}`}
                      target="_blank"
                      rel="noreferrer"
                    >
                      <Chip key={i} label={e} sx={{ cursor: "pointer" }} />
                    </a>
                  );
                })}
              </Stack>
              <Typography variant="h5" sx={{ marginTop: "2rem" }}>
                Director :
                <a
                  href={`https://www.google.com/search?q=${data.Director}`}
                  target="_blank"
                  rel="noreferrer"
                >
                  <Chip
                    label={data.Director}
                    sx={{ cursor: "pointer", marginLeft: "1rem" }}
                  />
                </a>
              </Typography>
              <Stack mt={4} direction="row" spacing={2} alignItems="center">
                <Typography variant="button">IMDB Rating: </Typography>
                <Rating
                  name="customized-10"
                  value={Number(data.imdbRating)}
                  max={10}
                  precision={0.1}
                  size="large"
                  readOnly
                />
              </Stack>
              <Stack mt={5} direction="row" spacing={2} alignItems="center">
                {flag ? (
                  <img
                    src={flag}
                    height={40}
                    alt="Flag"
                    style={{
                      outline: "1px solid #1976d2",
                      outlineOffset: "2px",
                    }}
                  />
                ) : (
                  false
                )}
                <Typography variant="overline">{data.Country}</Typography>
              </Stack>
            </Box>
          </Stack>
          <Typography variant="h4" mt={5} mb={2}>
            Plot:
          </Typography>
          <Typography align="justify">{data.Plot}</Typography>
        </Stack>
      </Box>
    </>
  );
};

export default Detail;
