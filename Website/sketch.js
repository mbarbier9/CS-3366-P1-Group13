let capture;
let newsData;
var newsState = -1;
var weather;

function preload(){
  //URL for JSON data API's
  let urlNews = 'https://newsapi.org/v2/top-headlines?country=us&apiKey=da22bf531795458d9a190346f5d06f9a';
  let urlWeather = 'http://samples.openweathermap.org/data/2.5/weather?q=London,uk&appid=b6907d289e10d714a6e88b30761fae22';
  //Loading data
  newsData = loadJSON(urlNews);
  //weatherData = loadJSON(urlWeather);
}

function setup() {
  canvas = createCanvas(1000, 655);
  canvas.position(0,0);
  canvas.style('z-index', '-1');
  
  capture = createCapture(VIDEO);
  capture.size(420,460);
  capture.hide();
  textSize(14);
  fill(255);
  capture.hide();
  
  weather = Math.floor(Math.random() * 10)+55;
}

function draw() {
  background(255);
  imageCap =  image(capture,0,0,900,655);
  

  //NewsFeed
    topThree(newsData);
  getArticle(newsData,newsState);
  // print(mouseX);

  
}

function mousePressed(){
  if(mouseY>=30 && mouseY<=150 && mouseX>=700 && mouseX<=900){
    if(mouseY>=30 && mouseY<=60){
      if(mouseX>=700 && mouseX<=900){
        newsState = 0;
       }
    }
    if(mouseY>=60 && mouseY<=90){
      if(mouseX>=700 && mouseX<=900){
        newsState = 1;
       }
    }
    if(mouseY>=90 && mouseY<=120){
      if(mouseX>=700 && mouseX<=900){
        newsState = 2;
       }
    }
    if(mouseY>=120 && mouseY<=150){
      if(mouseX>=700 && mouseX<=900){
        newsState = 3;
       }
    }
  }
  else{
    newsState = -1;
  }
}

function getWeather(data){
  var weather = data.main.temp;
  text(weather, 40,20);
}

function getArticle(data,i){
  //imageCap.pause();
  if(i==-1){
  }
  else{
    
  textSize(15);
  fill("#838383");
  // text(formatAMPM(new Date),20,20);
    
  rect(335, 5, 350, 350, 20);
  
  //Title
  var title = data.articles[i].title
  fill(255);
  textStyle(BOLD);
  text(title,340, 15, 340, 390 );
  
  //Body
  textSize(12);
  textStyle(NORMAL);
  var content = data.articles[i].content
  if(content!=null){
    text(content, 340,90,330,390);
  }
  else{
    text("NO CONTENT TO SHOW", 340,90,330,390);
  }
  
  //Description
  textSize(12);
  textStyle(NORMAL);
  var description = data.articles[i].description
  text(description, 340,185,330,390);  
  
  //Published
  textSize(12);
  textStyle(NORMAL);
  var published = data.articles[i].publishedAt
  text("Published at:\n"+published, 340,315,340,390);
  }
  
}


function formatAMPM(date) {
  var hours = date.getHours();
  var minutes = date.getMinutes();
  var ampm = hours >= 12 ? 'pm' : 'am';
  hours = hours % 12;
  hours = hours ? hours : 12; // the hour '0' should be '12'
  minutes = minutes < 10 ? '0'+minutes : minutes;
  var strTime = hours + ':' + minutes + ' ' + ampm;
  return strTime;
}

function topThree(data){
  fill("#838383");
  rect(687, 03, 200, 150, 7);
  textSize(15);
  
  fill(255);
  text("News",700,20);
  var count = 30;
  
  for(var i = 0; i<4; i++){
    var titles = data.articles[i].title;
    
    if(titles.length>51){
      titles = titles.substring(0,50);
      titles = titles+"...";
    }
    fill(255);
    textSize(12);
    text("-", 690,count,160,30);
    text(titles, 700,count,190,30);
    count+=30;
  }

  //line(690, 150, 895, 150);
}

function gotData(data){
  var articles = data.articles;
  for(var i = 0; i<articles.length; i++){
    console.log(data.articles[i].title);
  }
}
