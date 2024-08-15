const express = require("express");
const { getOngoingAnime, getFinisedAnime, getMovieAnime, getAnimeDetails, searchAnime, getEpisodeAnime } = require("../controllers/anime");

const router = express.Router();

router.get("/ongoing", getOngoingAnime);
router.get("/finished", getFinisedAnime);
router.get("/movie", getMovieAnime);
router.get("/:animeCode/:animeId", getAnimeDetails);
router.get("/search", searchAnime);
router.get("/:animeCode/:animeId/:episodeId", getEpisodeAnime);

module.exports = router;

