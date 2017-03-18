let request = require('request')
let cheerio = require('cheerio')
let mysql = require("mysql");
var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "learnVocab"
});

var words = ['eiei','a','b','c','a']
for(i in words){
	console.log(words.indexOf('g'))
	// if(words.indexOf(words[i]))
}
// addToPlaylist('fff')

function addToPlaylist(vocab){
	con.query('SELECT * from vocabs where vocab = "'+vocab+'";', function(err,res){
		if(err) throw err;
		if(res.length===0)console.log('NULL')
		else console.log('Have');
	});
}