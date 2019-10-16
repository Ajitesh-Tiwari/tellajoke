#!/usr/bin/env node

const program = require("commander");
const axios = require("axios");
const cheerio = require("cheerio");
const ora = require("ora");
const spinner = ora("Loading");

program
  .version("1.0.0")
  .description("A command-line utility for telling a joke.")
  .action(() => {
    getAJoke();
  });

program.parse(process.argv);

function getAJoke() {
  spinner.start();
  axios
    .get("https://ajitesh-tiwari.github.io/Extras/Jokes.json")
    .then(function(response) {
      spinner.stop();
      console.log(
        response.data[Math.floor(Math.random() * response.data.length)].joke
      );
    })
    .catch(function(error) {
      spinner.stop();
      if (error.response.status === 404) console.log("Extension not found.");
      else console.log("Something went wrong : " + error.response.status);
    });
}
