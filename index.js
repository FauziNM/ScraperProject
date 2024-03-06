import cheerio from 'cheerio';
import axios from 'axios';

async function kusonimeSearch(query) {
  try {
    let { data } = await axios({
      method: 'GET',
      url: `https://kusonime.com/?s=${query}&post_type=post`
    });

    let $ = cheerio.load(data);
    let result = { data: [] };

    // Select all matching elements and iterate over them
    $("div.venz > ul").each(function() {
      $(this).find("div.content").each(function() {
        let title = $(this).find(".episodeye > a").text().trim()
        let url = $(this).find(".episodeye > a").attr("href")
        let userUpload = $(this).find("p").eq(0).text().trim()
        let uploadDate = $(this).find("p").eq(1).text().trim()
        let genre = $(this).find("p").eq(2).text().trim()
        let thumbz = $(".detpost").find(".thumbz > img").attr("src")
        result.data.push({
          title: title,
          url: url,
          uploadBy: userUpload,
          releaseTime: uploadDate,
          genre: genre,
          thumbNail: thumbz,
        });
      });
    });
    //console.log(result.data)
    //console.log($(".detpost").html())
    if (result.data.length === 0) {
      console.log("not found")
    }
  } catch (err) {
    console.log(err);
  }
}

scrapeProject();
export { kusonimeSearch }
