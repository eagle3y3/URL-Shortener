const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const cors = require("cors")
const portNumber = process.env.PORT || '3000';
const shortUrl = require('./models/shortUrl')

app.use(bodyParser.json());
app.use(cors());
//connect to the database
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/shortUrls', { useNewUrlParser: true });

app.use(express.static(__dirname + '/public'));
//creates database entry
app.get('/new/:urlShorten(*)', (req, res, next) => {
  var {urlShorten} = req.params;
  var regex = /[-a-zA-Z0-9@:%_\+.~#?&//=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%_\+.~#?&//=]*)?/gi;
  if(regex.test(urlShorten)===true){
    var short = Math.floor(Math.random()*100000).toString()

    var data = new shortUrl(
      {
      originalUrl: urlShorten,
      shorterUrl: short
      }
    );
    data.save(err={
      if(err){
        return res.send("Error in saving database");
      }
    });

    return res.json(data)
  }
  return res.json({urlShorten: 'Failed'})
});

//Query database and forward to originalUrl
app.get('/:urlToForward', (req, res, next) => {
  var shorterUrl = req.params.urlToForward
  shortUrl.findOne({'shorterUrl' : shorterUrl }, (err,data) =>{
    if(err){ return res.send("Error reading database.");}
      else{
        var re = new RegExp("^(http|https)://", "i");
        var strTocheck = data.originalUrl
        if(re.test(strTocheck) === true){
          res.redirect(301, data.originalUrl)
          }
          else{
            res.redirect(301, "http://" + data.originalUrl);
          }
        }
        });
      });


app.listen(portNumber, (req, res) => {
  console.log(`We're live at ${portNumber}`);
});
