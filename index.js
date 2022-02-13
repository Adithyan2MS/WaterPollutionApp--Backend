var mongodb=require('mongodb');
var ObjectID=mongodb.ObjectID;
var express=require('express');
var bodyParser=require('body-parser');
const { response } = require('express');

var app=express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));

var MongoClient=mongodb.MongoClient;

var url='mongodb://localhost:27017'

MongoClient.connect(url,{useNewUrlParser:true},function(err,client){
    if(err)
        console.log('Unable to connect to the mongoDB server.Error',err);
    else{

        app.post('/saveinfo',(request,response,next)=>{
            var post_data=request.body;
            var location=post_data.location;
            var description=post_data.description;

            var insertJson={
                'location':location,
                'description':description
            };
            var db=client.db('wpnodejs');

            db.collection('user')
                .insertOne({insertJson},function(error,res){
                    response.json('Data added');
                    console.log('Data added');
                })

        });


        app.listen(2001,()=>{
            console.log('Connected to MongoDB Server,Listening to port 2001');
        })
    }
})