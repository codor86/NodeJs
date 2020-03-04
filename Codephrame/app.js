var Twig = require("twig"),
    express = require('express'),
    app = express();

require('./models/db');
const bodyparser = require('body-parser');

const formController = require('./controllers/formController');

// This section is optional and used to configure twig.
app.use(bodyparser.urlencoded({
    extended: true
}));

app.use(bodyparser.json());


app.set("twig options", {
    allow_async: true, // Allow asynchronous compiling
    strict_variables: false
});

app.get('/', function(req, res){
  res.render('homepage.twig', {
  });
});

app.use('/form', formController);
app.use(express.static(__dirname + '/assets'));

app.listen(3000);
