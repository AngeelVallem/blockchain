const Blockchain = require("./blockchain");
const Block = require("./block");

async function main() {
  const blockchain = new Blockchain();

  const block1 = new Block({ data: "Block 1" });
  const block2 = new Block({ data: "Block 3" });
  const block3 = new Block({ data: "Block 4" });

  await blockchain.addBlock(block1);
  await blockchain.addBlock(block2);
  await blockchain.addBlock(block3);

  blockchain.print();
}

main();
