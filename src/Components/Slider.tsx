import { useState } from "react";
import { PathMatch, useMatch, useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";
import { AnimatePresence } from "framer-motion";
import { modalCategoryAtom } from "../atom";
import { IGetMoviesResult } from "../api";
import { makeImagePath } from "../utils";
import * as S from "../Styles/SliderStyle";
import { ReactComponent as NextSvg } from "../Assets/next.svg";
import MovieModal from "./MovieModal";
import TvModal from "./TvModal";

interface ISlider {
  data: IGetMoviesResult | undefined;
  category: string;
  title: string;
}

function Slider({ data, category, title }: ISlider) {
  const navigate = useNavigate();
  const [index, setIndex] = useState(0);
  const [leaving, setLeaving] = useState(false);
  const offset = 6;
  const increaseIndex = () => {
    if (data) {
      if (leaving) return;
      toggleLeaving();
      const totalMovies = data.results.length - 1;
      const maxIndex = Math.floor(totalMovies / offset) - 1;
      setIndex((prev) => (prev === maxIndex ? 0 : prev + 1));
    }
  };
  const toggleLeaving = () => setLeaving((prev) => !prev);
  const [clickedCategory, setModalCategory] = useRecoilState(modalCategoryAtom);
  const onMovieBoxClicked = (movieId: number, category: string) => {
    setModalCategory(category);
    navigate(`/movies/${movieId}`);
  };
  const onTvBoxClicked = (tvId: number, category: string) => {
    setModalCategory(category);
    navigate(`/series/${tvId}`);
  };
  const bigMovieMatch: PathMatch<string> | null = useMatch("/movies/:movieId");
  const bigTvMatch: PathMatch<string> | null = useMatch("/series/:tvId");

  return (
    <>
      <S.Slider>
        <S.Title>{title}</S.Title>
        <AnimatePresence initial={false} onExitComplete={toggleLeaving}>
          <S.Row
            variants={S.rowVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            transition={{ type: "tween", duration: 1 }}
            key={index}
          >
            {data?.results
              ?.slice(1)
              .slice(offset * index, offset * (index + 1))
              .map((movie) => (
                <S.Box
                  variants={S.boxVariants}
                  initial="normal"
                  whileHover="hover"
                  transition={{ type: "tween" }}
                  key={movie.id}
                  layoutId={`${category}-${movie.id}`}
                  $bgPhoto={makeImagePath(movie.backdrop_path, "w500")}
                  onClick={() => onMovieBoxClicked(movie.id, category)}
                >
                  <S.Info variants={S.infoVariants}>
                    <h4>{movie.title}</h4>
                  </S.Info>
                </S.Box>
              ))}
          </S.Row>
        </AnimatePresence>
        <S.NextButton onClick={increaseIndex}>
          <NextSvg />
        </S.NextButton>
      </S.Slider>
      {bigMovieMatch ? (
        <AnimatePresence>
          <MovieModal
            id={bigMovieMatch.params.movieId}
            category={clickedCategory}
          />
        </AnimatePresence>
      ) : null}
      {bigTvMatch ? (
        <AnimatePresence>
          <TvModal id={bigTvMatch.params.movieId} category={clickedCategory} />
        </AnimatePresence>
      ) : null}
    </>
  );
}

export default Slider;
