const handler = require('serve-handler');
const httpProxy = require('http-proxy');
const http = require('http');
const conf = require('./conf');
const proxy = httpProxy.createProxyServer({})
const server = http.createServer((req,res)=>{
   if(conf[req.url]){
       req.url = conf[req.url]
       return handler(req,res)
   }
   proxy.web(req, res, { target: 'http://happyrecord.cn' });
})

server.listen('3005',()=>{
	console.log('listen 3005')
})
