const koa = require('koa');
const Router= require('koa-router');
const fs=require('fs');
const zlib= require('zlib');

const {Transform}=require('stream');

const app= new koa();
const router=new Router();

const PORT=1234;

router.get("/", async(ctx)=>{
    const chunks=[];

        const stream = fs.createReadStream("./input.txt",'utf-8');

        for await(const chunk of stream)
        chunks.push(chunk);

        const data=chunks.join('');
        ctx.body=data;
        
        
        // ctx.response.body='text/plain';
        // ctx.body=stream;
      
    
        // stream.on('data',(chunk)=>{
            
        //     chunks.push(chunk);
        //     // console.log(chunks, " ", chunk);
        // })
    
        // stream.on('end',()=>{
        //     console.log("hello1");
        //     const data = chunks.join('');
        //     // console.log(data);
           
        //     ctx.body = data.toString();
        // })
    
        // console.log("test");

        // stream.on('error', (err) => {
        //     console.error('Error reading file:', err);
        //     ctx.status = 500; // Internal Server Error
        //     ctx.body = 'Error reading file';
        // });
    
})




// router.get("/" , (ctx) =>{

//     const chunks=[];

//     const stream = fs.createReadStream("./input.txt",'utf-8');
  

//     stream.on('data',(chunk)=>{
//         chunks.push(chunk);
//         // console.log(chunks, " ", chunk);
//     })

//     stream.on('end',()=>{
//         console.log("hello1");
//         const data = chunks.join('');
//         // console.log(data);
       
//         ctx.body = data.toString();
//     })

//     console.log("test");
// })       


// const chunks = [];

// readStream.on("data", function (chunk) {
//   chunks.push(chunk);
// });

// // Send the buffer or you can put it into a var
// readStream.on("end", function () {
//   res.send(Buffer.concat(chunks));
// });


router.get("/test", (ctx)=>{
    const stream = fs.createReadStream('./input.txt','utf-8');
    ctx.response.body='text/plain';                              // Content Type setting as file is automatically downloading 
    ctx.body= stream;
})

router.get("/transform", (ctx)=>{

    
const stream= fs.createReadStream('./input.txt','utf-8');
    const upperCase = new Transform ({
        transform(chunk,encoding,callback){
            this.push(chunk.toString().toUpperCase());
            callback();
        }
     
    });
    
    stream.pipe(upperCase);
    ctx.response.body='text/plain';
    ctx.body=upperCase;
})

router.get("/show",(ctx) => {

    const stream = fs.createReadStream("./input.txt",'utf-8');
    ctx.body= "Result.txt has been made" ;
 
    const upper= new Transform({
        transform(chunk,encoding,callback){
            this.push(chunk.toString().toUpperCase());
            callback();
        }
    })

    stream.pipe(upper).pipe(fs.createWriteStream('RESULT.txt'));

})



app.use(router.routes());
app.use(router.allowedMethods());


app.listen(PORT ,() => console.log(`Server running on http://localhost:${PORT}`));
