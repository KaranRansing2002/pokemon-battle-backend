// const fs=require('fs')
// const fetch = require('node-fetch');

// const directoryPath = '/home/karan/Desktop/vscode/trials/pokemon-battle-backend/images';

// let data=[]

// function handleImages(){
//     // console.log(data)
//     fs.readdir(directoryPath, function (err, files) {
//         //handling error
//         if (err) {
//             return console.log('Unable to scan directory: ' + err);
//         } 
//         //listing all files using forEach
//         for(let i=0;i<905;i++){
//             // console.log(files[i],data[i]);
//             fs.rename(`${directoryPath}/${files[i]}`,`${directoryPath}/${data[i]}.png`,(err)=>{
//                 if (err) throw err;
//                 console.log('File Renamed.');
//             })
//         }
//     });
// }

// function request(){
//     fetch("https://pokeapi.co/api/v2/pokemon?limit=100000&offset=0").then((resp)=>resp.json()).then((resp)=>{
//             resp=resp.results.map((data)=>data.name)
//             console.log(resp)
//             data=resp
//         }).then((resp)=>handleImages())
// }

// request();

// let pokemonmoves = {
    
// }

// const obj = {
    
//         name: "lkmf",
//         pp : "sdf"
    
// }
// let name = "karan", move = "brick";

// let cc = {}; cc[move] = obj;
// pokemonmoves.name = cc;
// move = 'brine';
// cc[move] = obj;
// pokemonmoves[name] = cc;
// console.log(pokemonmoves)