const cheerio = require("cheerio");
const baseUrl = require("../utils/constanta/url");
const extractData = require("../utils/helper/extract_data");

const getOngoingAnime = async (req, res) => {
  try {
    const order_by = req.query.order_by || "updated";
    const page = req.query.page || 1;

    // Buat URL dan ambil data dari URL
    const urlOngoing = `${baseUrl}/quick/ongoing?order_by=${order_by}&page=${page}`;
    const response = await fetch(urlOngoing);
    const data = await response.text();

    // Muat data HTML dengan cheerio
    const $ = cheerio.load(data);
    let ongoingAnime = [];

    // Parse data anime dari HTML
    $("#animeList > div > div").each((index, element) => {
      const title = $(element).find("div > h5").text().trim();
      const image = $(element).find("a > div").attr("data-setbg");
      const episode = $(element).find("a > div > div.ep > span").text().trim();
      const type = $(element)
        .find("div > ul > a")
        .map((index, element) => $(element).text().trim())
        .get();
      const animeCode = $(element).find("a").attr("href")?.split("/")[4];
      const animeId = $(element).find("a").attr("href")?.split("/")[5];

      if (title && image && episode && type && animeCode && animeId) {
        ongoingAnime.push({
          title,
          image,
          episode,
          type,
          animeCode,
          animeId,
        });
      }
    });

    // Tentukan apakah ada halaman berikutnya atau sebelumnya
    const nextPage = $("a.gray__color .fa-angle-right").length === 0;
    const prevPage = $("a.gray__color .fa-angle-left").length === 0;

    console.log(ongoingAnime);
    res.status(200).json({ ongoingAnime, nextPage, prevPage });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
};

const getFinisedAnime = async (req, res) => {
  try {
    const order_by = req.query.order_by || "updated";
    const page = req.query.page || 1;

    const urlFinished = `${baseUrl}/quick/finished?order_by=${order_by}&page=${page}`;
    const response = await fetch(urlFinished);
    const data = await response.text();

    const $ = cheerio.load(data);
    let finishedAnime = [];

    $("#animeList > div > div").each((index, element) => {
      const title = $(element).find("div > h5").text().trim();
      const image = $(element).find("a > div").attr("data-setbg");
      const score = $(element).find("a > div > div.ep > span").text().trim();
      const type = $(element)
        .find("div > ul > a")
        .map((index, element) => $(element).text().trim())
        .get();
      const animeCode = $(element).find("a").attr("href")?.split("/")[4];
      const animeId = $(element).find("a").attr("href")?.split("/")[5];

      if (title && image && score && type && animeCode && animeId) {
        finishedAnime.push({
          title,
          image,
          score,
          type,
          animeCode,
          animeId,
        });
      }
    });

    // Tentukan apakah ada halaman berikutnya atau sebelumnya
    const nextPage = $("a.gray__color .fa-angle-right").length === 0;
    const prevPage = $("a.gray__color .fa-angle-left").length === 0;

    res.status(200).json({ finishedAnime, nextPage, prevPage });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error });
  }
};

const getMovieAnime = async (req, res) => {
  try {
    const order_by = req.query.order_by || "updated";
    const page = req.query.page || 1;

    const urlMovie = `${baseUrl}/quick/movie?order_by=${order_by}&page=${page}`;
    const response = await fetch(urlMovie);
    const data = await response.text();

    const $ = cheerio.load(data);
    let movieAnime = [];

    $("#animeList > div > div").each((index, element) => {
      const title = $(element).find("div > h5").text().trim();
      const image = $(element).find("a > div").attr("data-setbg");
      const score = $(element).find("a > div > div.ep > span").text().trim();
      const type = $(element)
        .find("div > ul > a")
        .map((index, element) => $(element).text().trim())
        .get();
      const animeCode = $(element).find("a").attr("href")?.split("/")[4];
      const animeId = $(element).find("a").attr("href")?.split("/")[5];

      if (title && image && score && type && animeCode && animeId) {
        movieAnime.push({
          title,
          image,
          score,
          type,
          animeCode,
          animeId,
        });
      }
    });

    // Tentukan apakah ada halaman berikutnya atau sebelumnya
    const nextPage = $("a.gray__color .fa-angle-right").length === 0;
    const prevPage = $("a.gray__color .fa-angle-left").length === 0;

    res.status(200).json({ movieAnime, nextPage, prevPage });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error });
  }
};

const getAnimeDetails = async (req, res) => {
  try {
    const { animeCode, animeId } = req.params;

    const urlAnime = `${baseUrl}/anime/${animeCode}/${animeId}`;
    const response = await fetch(urlAnime);
    const data = await response.text();

    const $ = cheerio.load(data);
    let animeDetails = {};

    const title = $(".anime__details__title > h3").text().trim();
    const alternativeTitles = $(".anime__details__title > span").text().trim();
    const image = $(".anime__details__pic").attr("data-setbg");
    const synopsis = $("#synopsisField").text().trim();
    const type = $(
      ".anime__details__widget > div > div:nth-child(1) > ul > li:nth-child(1) > div > div:nth-child(2) > a"
    )
      .text()
      .trim();
    const episode = $(
      ".anime__details__widget > div > div:nth-child(1) > ul > li:nth-child(2) > div > div:nth-child(2)"
    )
      .text()
      .trim();
    const status = $(
      ".anime__details__widget > div > div:nth-child(1) > ul > li:nth-child(3) > div > div:nth-child(2)"
    )
      .text()
      .trim();
    const released = $(
      ".anime__details__widget > div > div:nth-child(1) > ul > li:nth-child(4) > div > div:nth-child(2)"
    )
      .text()
      .trim();
    const season = $(
      ".anime__details__widget > div > div:nth-child(1) > ul > li:nth-child(5) > div > div:nth-child(2)"
    )
      .text()
      .trim();
    const duration = $(
      ".anime__details__widget > div > div:nth-child(1) > ul > li:nth-child(6) > div > div:nth-child(2)"
    )
      .text()
      .trim();
    const quality = $(
      ".anime__details__widget > div > div:nth-child(1) > ul > li:nth-child(7) > div > div:nth-child(2)"
    )
      .text()
      .trim();
    const country = $(
      ".anime__details__widget > div > div:nth-child(1) > ul > li:nth-child(8) > div > div:nth-child(2)"
    )
      .text()
      .trim();
    const adaptation = $(
      ".anime__details__widget > div > div:nth-child(1) > ul > li:nth-child(9) > div > div:nth-child(2)"
    )
      .text()
      .trim();
    const genres = $(
      ".anime__details__widget > div > div:nth-child(2) > ul > li:nth-child(1) > div > div:nth-child(2) > a"
    )
      .map((index, element) => $(element).text().trim())
      .get();
    const explicit = $(
      ".anime__details__widget > div > div:nth-child(2) > ul > li:nth-child(2) > div > div:nth-child(2)"
    )
      .text()
      .trim();
    const demographic = $(
      ".anime__details__widget > div > div:nth-child(2) > ul > li:nth-child(3) > div > div:nth-child(2) > a"
    )
      .map((index, element) => $(element).text().trim())
      .get();
    const theme = $(
      ".anime__details__widget > div > div:nth-child(2) > ul > li:nth-child(4) > div > div:nth-child(2) > a"
    )
      .map((index, element) => $(element).text().trim())
      .get();
    const studio = $(
      ".anime__details__widget > div > div:nth-child(2) > ul > li:nth-child(5) > div > div:nth-child(2) > a"
    )
      .map((index, element) => $(element).text().trim())
      .get();
    const score = $(
      ".anime__details__widget > div > div:nth-child(2) > ul > li:nth-child(6) > div > div:nth-child(2)"
    )
      .text()
      .trim();
    const enthusiast = $(
      ".anime__details__widget > div > div:nth-child(2) > ul > li:nth-child(7) > div > div:nth-child(2)"
    )
      .text()
      .trim();
    const ratings = $(
      ".anime__details__widget > div > div:nth-child(2) > ul > li:nth-child(8) > div > div:nth-child(2)"
    )
      .text()
      .trim();
    const credit = $(
      ".anime__details__widget > div > div:nth-child(2) > ul > li:nth-child(9) > div > div:nth-child(2) > a"
    )
      .map((index, element) => $(element).text().trim())
      .get();

    const episodeListRaw = $("#episodeLists").attr("data-content");
    const episodeList$ = cheerio.load(episodeListRaw);

    const episodeList = episodeList$("a")
      .map((index, element) => {
        const episodeTitle = episodeList$(element).text().trim();
        const episodeLink = episodeList$(element).attr("href");

        return {
          title: episodeTitle,
          link: episodeLink,
        };
      })
      .get();

    animeDetails = {
      title: title,
      alternativeTitles: alternativeTitles,
      image: image,
      synopsis: synopsis,
      type: type,
      episode: episode,
      status: status,
      released: released,
      season: season,
      duration: duration,
      quality: quality,
      country: country,
      adaptation: adaptation,
      genres: genres,
      explicit: explicit,
      demographic: demographic,
      theme: theme,
      studio: studio,
      score: score,
      enthusiast: enthusiast,
      ratings: ratings,
      credit: credit,
      episodeList: episodeList,
    };

    res.status(200).json({ animeDetails });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error });
  }
};

const searchAnime = async (req, res) => {
  try {
    const query = req.query.query;
    const order_by = req.query.order_by || "oldest";
    const page = req.query.page || 1;

    const urlSearch = `${baseUrl}/anime?order_by=${order_by}&search=${query}&page=${page}`;
    const response = await fetch(urlSearch);
    const data = await response.text();

    const $ = cheerio.load(data);
    let searchResult = [];

    $("#animeList > div > div").each((index, element) => {
      const title = $(element).find("div > h5").text().trim();
      const image = $(element).find("a > div").attr("data-setbg");
      const type = $(element)
        .find("div > ul > a")
        .map((index, element) => $(element).text().trim())
        .get();
      const animeCode = $(element).find("a").attr("href")?.split("/")[4];
      const animeId = $(element).find("a").attr("href")?.split("/")[5];

      if (title && image && type && animeCode && animeId) {
        searchResult.push({
          title,
          image,
          type,
          animeCode,
          animeId,
        });
      }
    });

    const hasPagination = $(".product__pagination").length > 0;
    const prevPage =
      hasPagination && $("a.gray__color .fa-angle-left").length === 0;
    const nextPage =
      hasPagination && $("a.gray__color .fa-angle-right").length === 0;

    res.status(200).json({ searchResult, nextPage, prevPage });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error });
  }
};

const getEpisodeAnime = async (req, res) => {
  try {
    const { animeCode, animeId, episodeId } = req.params;
    const servers = ["kuramadrive", "archive", "archive-v2"];
    const urlEpisode = `${baseUrl}/anime/${animeCode}/${animeId}/episode/${episodeId}`;

    const response = await fetch(urlEpisode);
    const data = await response.text();

    const $ = cheerio.load(data);
    const kps = $("div.mt-3:nth-child(2)").attr("data-kps");

    if (!kps) {
      return res.status(500).json({
        status: false,
        message: "KPS not found.",
      });
    }

    const kpsResponse = await fetch(`${baseUrl}/assets/js/${kps}.js`);
    const kpsBody = await kpsResponse.text();

    const extractedData = extractData(kpsBody);

    if (!extractedData) {
      return res.status(500).json({
        status: false,
        message: "Failed to extract necessary data.",
      });
    }

    const authResponse = await fetch(
      `${baseUrl}/assets/${extractedData.MIX_AUTH_ROUTE_PARAM}`
    );
    const auth = await authResponse.text();

    const promises = servers.map(async (server) => {
      const videoResponse = await fetch(
        `${baseUrl}/anime/${animeCode}/${animeId}/episode/${episodeId}?${extractedData.MIX_PAGE_TOKEN_KEY}=${auth}&${extractedData.MIX_STREAM_SERVER_KEY}=${server}`
      );
      const videoData = await videoResponse.text();
      const $ = cheerio.load(videoData);

      const title = $("#episodeTitle").text().trim();
      const anime_id = $(".center__nav").attr("href")?.split("/")[5];
      const prev_episode_number = $(".before__nav.ep-button")
        .attr("href")
        ?.split("/")[7];
      const next_episode_number = $(".after__nav.ep-button")
        .attr("href")
        ?.split("/")[7];
      const videoList = $("#player > source")
        .map((i, e) => ({
          url: $(e).attr("src"),
          type: $(e).attr("type"),
          size: `${$(e).attr("size")}p (${server})`,
        }))
        .get();

      // Extract download links
      const downloadLinks = $("#animeDownloadLink h6")
        .map((i, elem) => {
          const quality = $(elem).text().trim();
          const links = $(elem)
            .nextAll("a")
            .map((j, link) => ({
              title: $(link).text().trim(),
              url: $(link).attr("href"),
            }))
            .get();
          return { quality, links };
        })
        .get();

      return {
        title,
        anime_id,
        prev_episode_number,
        next_episode_number,
        videoList,
        downloadLinks,
      };
    });

    const results = await Promise.all(promises);
    const combinedVideoList = results.flatMap((result) => result.videoList);
    const title = results[0].title;
    const anime_id = results[0].anime_id;
    const prev_episode_number = results[0].prev_episode_number;
    const next_episode_number = results[0].next_episode_number;
    const downloadLinks = results[0].downloadLinks;

    res.json({
      title,
      anime_id,
      prev_episode_number,
      next_episode_number,
      videoList: combinedVideoList,
      downloadLinks,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ status: false, message: error.message });
  }
};

const getBatchAnime = async (req, res) => {
  try {
    const { animeCode, animeId, batchId } = req.params;

    const urlBatch = `${baseUrl}/anime/${animeCode}/${animeId}/batch/${batchId}`;
    const response = await fetch(urlBatch);
    const data = await response.text();

    const $ = cheerio.load(data);

    // Check for kps data
    const kps = $("div.mt-3:nth-child(2)").attr("data-kps");
    if (!kps) {
      return res.status(500).json({
        status: false,
        message: "KPS not found.",
      });
    }

    const kpsResponse = await fetch(`${baseUrl}/assets/js/${kps}.js`);
    const kpsBody = await kpsResponse.text();

    const extractedData = extractData(kpsBody);

    if (!extractedData) {
      return res.status(500).json({
        status: false,
        message: "Failed to extract necessary data.",
      });
    }

    const authResponse = await fetch(
      `${baseUrl}/assets/${extractedData.MIX_AUTH_ROUTE_PARAM}`
    );
    const auth = await authResponse.text();

    const servers = ["kuramadrive", "archive", "archive-v2"];
    const promises = servers.map(async (server) => {
      const videoResponse = await fetch(
        `${baseUrl}/anime/${animeCode}/${animeId}/batch/${batchId}?${extractedData.MIX_PAGE_TOKEN_KEY}=${auth}&${extractedData.MIX_STREAM_SERVER_KEY}=${server}`
      );
      const videoData = await videoResponse.text();
      const $ = cheerio.load(videoData);

      // Extract download links
      const downloadLinks = $("#animeDownloadLink h6")
        .map((i, elem) => {
          const quality = $(elem).text().trim();
          const links = $(elem)
            .nextAll("a")
            .map((j, link) => ({
              title: $(link).text().trim(),
              url: $(link).attr("href"),
            }))
            .get();
          return { quality, links };
        })
        .get();

      return downloadLinks;
    });

    const results = await Promise.all(promises);
    const combinedDownloadLinks = results.flat();

    res.status(200).json({ downloadLinks: combinedDownloadLinks });
  } catch (error) {
    console.error(error.message); // Improved error logging
    res.status(500).json({ status: false, message: error.message });
  }
};

const getAnimeList = async (req, res) => {
  try {
    const page = req.query.page || 1;

    // Buat URL dan ambil data dari URL
    const urlOngoing = `${baseUrl}/anime?order_by=text&page=${page}`;
    const response = await fetch(urlOngoing);
    const data = await response.text();

    const $ = cheerio.load(data);
    let listAnime = [];

    // Parse data anime dari HTML
    $("#animeList .anime__text").each((index, element) => {
      const animeTitle = $(element).find("a.anime__list__link").text().trim();
      const animeUrl = $(element).find("a.anime__list__link").attr("href");

      if (animeTitle && animeUrl) {
        listAnime.push({
          title: animeTitle,
          url: animeUrl,
        });
      }
    });
    // Tentukan apakah ada halaman berikutnya atau sebelumnya
    const nextPage = $("a.gray__color .fa-angle-right").length === 0;
    const prevPage = $("a.gray__color .fa-angle-left").length === 0;

    res.status(200).json({ listAnime, nextPage, prevPage });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  getOngoingAnime,
  getFinisedAnime,
  getMovieAnime,
  getAnimeDetails,
  searchAnime,
  getEpisodeAnime,
  getBatchAnime,
  getAnimeList,
};
