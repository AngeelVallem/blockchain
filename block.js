const sha256 = require("crypto-js/sha256");
const hex2ascii = require("hex2ascii");

class Block {
  constructor(data) {
    this.height = 0;
    this.timestamp = 0;
    this.body = Buffer.from(JSON.stringify(data).toString("hex"));
    this.previousHash = "";
    this.hash = null;
  }

  validate() {
    const self = this;

    return new Promise((resolve, reject) => {
      let currentHash = self.hash;

      self.hash = sha256(JSON.stringify({ ...self, hash: null })).toString();

      if (currentHash !== self.hash) {
        resolve(false);
      }
      resolve(true);
    });
  }

  getBlockData() {
    const self = this;

    return new Promise((resolve, reject) => {
      let encodedData = self.body;
      let decodedData = JSON.parse(hex2ascii(encodedData));

      //if is the first block
      if (decodedData === "Genesis Block") {
        return reject(new Error("Genesis Block"));
      }

      resolve(decodedData);
    });
  }

  toString() {
    const { hash, height, body, timestamp, previousHash } = this;

    return `Block -
      hash: ${hash}
      height: ${height}
      body: ${body}
      timestamp: ${timestamp}
      previousHash: ${previousHash}
      -----------------------------------------------------`;
  }
}

module.exports = Block;
