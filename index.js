const token = process.env.TOKEN;
const { setTimeout } = require("timers/promises");
const { randomInt } = require("crypto");

const sleepRandom = async (ms, accuracy = ms / 5) => await setTimeout(randomInt(ms - accuracy, ms + accuracy));

class User {
  constructor(token) {
    this.token = "Bearer " + token;
  }

  async post(url) {
    const result = await fetch(url, {
      method: "POST",
      headers: {
        "content-type": "application/json",
        authorization: this.token,
      },
    });

    console.log(url + "  " + result.status);
  }

  async sync() {
    await this.post("https://api.hamsterkombatgame.io/clicker/sync");
  }
}

async function main() {
  try {
    const user = new User(token);
    await sleepRandom(60 * 1000, 30 * 1000);
    await user.sync();
  } catch (err) {
    console.log(err);
  }
  console.log("completed");
}

main();
