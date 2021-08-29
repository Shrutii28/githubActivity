let url = "https://github.com/topics";
const request = require("request");
const cheerio = require("cheerio");
// const pdfkit = require("pdfkit");
const getReposPageHtml = require("./reposPage")
request(url,cb);

function cb(err,response,html){  //yahan html agyi
    if(err){
        console.log("err");
    }else if(response.statusCode == 404){
        console.log("Page Not Found");
    }else{
        // console.log(html);
        getTopicsLinks(html);
    }
}
//html mein se data/links extract karenge
function getTopicsLinks(html){
    let $ = cheerio.load(html);
    let linkElementArr = $(".no-underline.d-flex.flex-column.flex-justify-center");
    for(let i = 0; i<linkElementArr.length; i++){
        let href = $(linkElementArr[i]).attr("href");
        let topic = href.split("/").pop();  //last element remove and same last element return.
        // console.log(href);
        let fullLink = `https://github.com/${href}`;
        getReposPageHtml(fullLink,topic);
    }
}