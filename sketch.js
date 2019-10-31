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
  createCanvas(420, 460);
  capture = createCapture(VIDEO);
  capture.size(420,460);
  capture.hide();
  textSize(14);
  fill(255);
  
  weather = Math.floor(Math.random() * 10)+55;
  
}

function draw() {
  background(255);
  imageCap =  image(capture,0,0,420,460);
  
  //Time
  textSize(15);
  fill(255);
  text(formatAMPM(new Date),20,20);
  topThree(newsData);
  
  //Weather
  //getWeather(weatherData);
  textSize(14);
  text(weather+" °F",20,36);
  topThree(newsData);
  
  //NewsFeed
  getArticle(newsData,newsState);
  // print(mouseX);

  
}

function mousePressed(){
  if(mouseY>=30 && mouseY<=150 && mouseX>=280 && mouseX<=400){
    if(mouseY>=30 && mouseY<=60){
      if(mouseX>=280 && mouseX<=400){
        newsState = 0;
       }
    }
    if(mouseY>=60 && mouseY<=90){
      if(mouseX>=280 && mouseX<=400){
        newsState = 1;
       }
    }
    if(mouseY>=90 && mouseY<=120){
      if(mouseX>=280 && mouseX<=400){
        newsState = 2;
       }
    }
    if(mouseY>=120 && mouseY<=150){
      if(mouseX>=280 && mouseX<=400){
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
  imageCap =  image(capture,0,0,420,460);
  textSize(15);
  fill(255);
  // text(formatAMPM(new Date),20,20);
  
  rect(40, 40, 350, 350, 20);
  
  //Title
  var title = data.articles[i].title
  fill(0);
  textStyle(BOLD);
  text(title,50, 50, 340, 390 );
  
  //Body
  textSize(12);
  textStyle(NORMAL);
  var content = data.articles[i].content
  if(content!=null){
    text(content, 55,120,330,390);
  }
  
  //Description
  textSize(12);
  textStyle(NORMAL);
  var description = data.articles[i].description
  text(description, 55,220,330,390);  
  
  //Published
  textSize(12);
  textStyle(NORMAL);
  var published = data.articles[i].publishedAt
  text("Published at:\n"+published, 55,340,340,390);
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
  textSize(15);
  text("News",290,20);
  var count = 30;
  
  for(var i = 0; i<4; i++){
    var titles = data.articles[i].title;
    
    if(titles.length>34){
      titles = titles.substring(0,33);
      titles = titles+"...";
    }
    textSize(12);
    text("-", 280,count,120,30);
    text(titles, 290,count,120,30);
    count+=30;
  }
  strokeWeight(.8);
  stroke(255);
  line(280, 150, 400, 150);
}

function gotData(data){
  var articles = data.articles;
  for(var i = 0; i<articles.length; i++){
    console.log(data.articles[i].title);
  }
}
