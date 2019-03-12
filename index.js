const handler = require('serve-handler')
const http = require('http')
const conf = require('./conf')
const server = http.createServer((req,res)=>{
   if(conf[req.url]){
       req.url = conf[req.url]
   }
   return handler(req,res)
})

server.listen('3005',()=>{
	console.log('listen 3005')
})
