'use strict';
const path = require('path');
const express = require('express');

const App = express();

const staticPath = path.join(__dirname, '/');

App.use(express.static(staticPath));

App.set('port', process.env.PORT || 3000);

App.listen(App.get('port'), function() {
    console.log('listening on http://localhost:'+ App.get('port'));
});
