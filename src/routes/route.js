const express = require("express");
const { getOngoingAnime, getFinisedAnime, getMovieAnime, getAnimeDetails, searchAnime, getEpisodeAnime, getBatchAnime, getAnimeList } = require("../controllers/anime");

const router = express.Router();

router.get("/ongoing", getOngoingAnime);
router.get("/finished", getFinisedAnime);
router.get("/movie", getMovieAnime);
router.get("/:animeCode/:animeId", getAnimeDetails);
router.get("/search", searchAnime);
router.get("/:animeCode/:animeId/:episodeId", getEpisodeAnime);
router.get("/:animeCode/:animeId/batch/:batchId", getBatchAnime);
router.get("/list", getAnimeList);

module.exports = router;

