const path = require('path');
const express = require('express');
const morgan = require('morgan');
const exphbs = require('express-handlebars');
const route = require('./routes');
const db = require('./config/db');
const bodyParser = require('body-parser');
const moment = require('moment');
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');
const methodOverride = require('method-override');



const app = express();
const port = 3000;

// connect to database
db.connect();

//configure static file
app.use(express.static(path.join(__dirname,'public')));

app.use(cookieParser());
//override method
app.use(methodOverride('_method'))

//configure body parser
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

//Configure handle bars
const handlebars = exphbs.create({
  extname: '.hbs',
  partialsDir: __dirname + '/resources/views/partials/',
  helpers: {
      setGender: (value, currentValue) => {
          if (value == currentValue) {
              return 'checked';
          } else {
              return '';
          }
      },
      setTime: (time) => {
          return moment(time).format("YYYY MM DD");
      },
      setStar: (star, currentStar) => {
            if (star >= currentStar) {
                return "is-active";
            } else {
                if (star == currentStar - 0.5) {
                    return "is-half";
                } else {
                    return "is-none";
                }
            }
      },
      sum: (a, b) => {
          return a + b;
      },
      setOptionTag: (type, currentType) => {
          if (type == currentType) {
              return "selected";
          } else {
              return;
          } 
      },
      setColor: (color, currentColor) => {
        if (color == currentColor) {
            return "chosen-color";
        } else {
            return color;
        }
      }

  }
});
app.engine('.hbs', handlebars.engine);
app.set('view engine', '.hbs');
app.set('views',path.join(__dirname, '/resources/views'))

// HTTP logger
app.use(morgan('combined'));

route(app);

app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`)
})