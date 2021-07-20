const chalk = require('chalk');
const clear = require('clear');
const figlet = require('figlet');
const _ = require('./libs')
var validUrl = require('valid-url');

const { Command, flags } = require('@oclif/command')

class CreepyCrawlyCommand extends Command {

  static args = [{
    name: 'url',
    description: 'url to be parsed',
    required: true,
  }]


  async run() {
    const { args } = this.parse(CreepyCrawlyCommand)
    clear();

    console.log(
      chalk.yellow(
        figlet.textSync('creepy-crawly', { horizontalLayout: 'full' })
      )
    );
    if (validUrl.isUri(args.url)) {
      _.url_parse(args.url)
    } else {
      console.log(chalk.red("Valid URI needed"))
    }
  }
}
CreepyCrawlyCommand.description = `Crawl the webpage to find the subdomains
...
Usage ./crawl amazon.com will conosle.log all the amazon.com subdomains accessible. 
`

CreepyCrawlyCommand.flags = {
  version: flags.version({ char: 'v' }),
  help: flags.help({ char: 'h' }),
  name: flags.string({ char: 'n', description: 'number of workers' }),
}

module.exports = CreepyCrawlyCommand
