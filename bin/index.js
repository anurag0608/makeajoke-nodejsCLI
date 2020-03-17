#!/usr/bin/env node

const chalk = require("chalk"),
      boxen = require("boxen"),
      yargs = require("yargs"),
      axios = require('axios');

const greeting = chalk.white.bold("Here's A Joke My Friend!!");

const boxenOptions = {
 padding: 1,
 margin: 1,
 borderStyle: "round",
 borderColor: "green",
 backgroundColor: "#555555"
};
const msgBox = boxen( greeting, boxenOptions );


//for taking cmd line args
const options = yargs
 .usage("Usage: -n <name>")
 .option("n", { alias: "name", describe: "Your name", type: "string"})
 .option("s",{alias:"search",describe:"Joke Search",type: "String"})
 .option("c",{alias:"categories",describe:"See the available categories", type: "boolean",value:true})
 .argv;
if(options.name){
    console.log(msgBox);
    const greeting_ = `Hello, ${options.name}!`;

    console.log(greeting_);

    if(options.search){
        console.log(`Searching Random jokes for ${options.search}...`);
    }else{
        console.log("Searching Random jokes for you...");
    }
    let url;
    if(options.search!=null){
        url = `https://api.chucknorris.io/jokes/random?category=${options.search}`;
    }else{
        url = "https://api.chucknorris.io/jokes/random";
    }
    axios.get(url)
    .then(joke=>{
        console.log(joke.data.value);
    })
    .catch(err=>{
        console.log("ERROR :"+ err.response.status);
        console.log(chalk.yellow("use -c to see available categories."))
    });

}
else if(options.categories){
    console.log(`[
        "animal",
        "career",
        "celebrity",
        "dev",
        "explicit",
        "fashion",
        "food",
        "history",
        "money",
        "movie",
        "music",
        "political",
        "religion",
        "science",
        "sport",
        "travel"
      ]`);
}
else{
    console.log(chalk.red("Invalid option! Please see --help for more details"));
}

