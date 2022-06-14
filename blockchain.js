const Block = require("./block");
const sha256 = require("crypto-js/sha256");

class Blockchain {
  constructor() {
    this.chain = [];
    this.height = -1;
    this.initializeChain();
  }

  async initializeChain() {
    const self = this;

    if (self.height === -1) {
      const block = new Block({ data: "Genesis Block" });
      await this.addBlock(block);
    }
  }

  addBlock(Block) {
    const self = this;

    return new Promise(async (resolve, reject) => {
      Block.height = self.chain.length;
      Block.timestamp = new Date().getTime().toString();

      //if is not the genesis block set the previous hash
      if (self.chain.length > 0) {
        Block.previousHash = self.chain[self.chain.length - 1].hash;
      }

      let errors = await self.validateChain();

      if (errors.length > 0) {
        reject(new Error("Invalid chain", errors));
      }
      Block.hash = sha256(JSON.stringify(Block)).toString();
      self.chain.push(Block);
      resolve(Block);
    });
  }

  validateChain() {
    const self = this;

    const errors = [];

    return new Promise(async (resolve, reject) => {
      self.chain.map(async (block) => {
        try {
          let isValid = await block.validate();

          if (!isValid) {
            errors.push(new Error(`The block ${block.height} is invalid`));
          }
        } catch (err) {
          errors.push(err);
        }
      });

      resolve(errors);
    });
  }

  print() {
    const self = this;

    for (let block of self.chain) {
      console.log(block.toString());
    }
  }
}

module.exports = Blockchain;
