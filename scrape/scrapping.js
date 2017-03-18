//https://dict.meemodel.com/%E0%B9%81%E0%B8%9B%E0%B8%A5%E0%B8%A7%E0%B9%88%E0%B8%B2/time ตัวอย่างการใช้คำพร้อมคำแปล
let request = require('request')
let cheerio = require('cheerio')
let mysql = require("mysql");
var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "learnVocab"
});

con.connect(function(err){
  if(err){console.log('Error connecting to Db');return;}
  console.log('Connected.')
});
var countInsert = 0;
var countToPlaylist = 0;

var url = "https://www.vocabulary.com/lists/154151"
var playlistName = "5,000 คำที่ควรรู้ (part 5)"
var playlistDetail = "DetalNaja"

request(url,function (error, response, body) {
  if(response.statusCode == 200){
  	let $ = cheerio.load(body)
  	var words = []
  	$('.word.dynamictext').each(function(index, el) {
  		if(words.indexOf($(this).text())==-1)
	  		words.push($(this).text())
  	});
	  console.log(words)
	  for(i in words){
		insertToDB(words[i]);
	  }
	  // createPlaylist(words,playlistName,playlistDetail,url)
	  
	  // end()
  }
});

function createPlaylist(words,playlistName,playlistDetail,url){
	con.query("INSERT INTO Playlists (title,detail,url) VALUES ('"+playlistName+"','"+playlistDetail+"','"+url+"');", function(err,res){
		if(err) throw err;
		var playlist_id = res.insertId
		for(i in words)
			addToPlaylist(playlist_id,words[i])
	});
}
function insertToDB(vocab){
	//check Duplicate
	con.query('SELECT * from vocabs where vocab = "'+vocab+'";', function(err,res){
		if(err) throw err;
		if(res.length!=0)return;
		con.query('INSERT INTO Vocabs (vocab) VALUES ("'+vocab+'");', function(err,res){
			if(err) throw err;
			console.log('Last insert Vocabs:',countInsert++);
		});
	});
}
function addToPlaylist(playlist_id,vocab){
	con.query('INSERT INTO In_playlist (playlist_id,vocab) VALUES ("'+playlist_id+'","'+vocab+'");', function(err,res){
		if(err) throw err;
		console.log('Last insert In_playlist:', countToPlaylist++);
	});
}
function end(){
	con.end(function(err) {console.log('error');return;});
	console.log('Success!')
}