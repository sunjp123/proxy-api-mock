const handler = require('serve-handler');
const httpProxy = require('http-proxy');
const http = require('http');
const querystring = require('querystring');
const conf = require('./conf');
const fs = require('fs');
const proxy = httpProxy.createProxyServer({})
const server = http.createServer((req,res)=>{
   let keys = Object.keys(conf) , url = '' , posr = '';
    
   if(req.url == '/conf/' || req.url == '/conf'){
       req.url = '/conf.html'
       req.headers.accept = "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8"
       return handler(req,res,{trailingSlash:false,cleanUrls:false})
   }
   if(req.url == '/conf/add/' || req.url == '/conf/add'){
    req.on('data',(chunk)=>{
        posr+=chunk;
    });
    req.on('end',()=>{
        //将字符串变为json的格式
        posr  =  querystring.parse(posr);
        conf[posr.url] = posr.response
        fs.writeFile('./conf.js', 'module.exports = '+JSON.stringify(conf), { 'flag': 'w' }, function(err) {
            if (err) {
                throw err;
            }
        });
        req.headers.accept = 'application/json';
        res.statusCode = 200;
        res.write('{code:0}')
        res.end();
    });
    
    return;
   }
   if(url = conf[keys.find((item)=>{return new RegExp(item).test(req.url)})]){
       req.url = url
       return handler(req,res)
   }
   proxy.web(req, res, { target: 'http://happyrecord.cn' });
})

server.listen('3005',()=>{
	console.log('listen 3005')
})
