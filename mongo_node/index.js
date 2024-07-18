const { MongoClient } = require("mongodb");
const fs = require("fs");
const path = require("path");

const url = "mongodb://127.0.0.1";
const client = new MongoClient(url);

const main = async () => {
  await client.connect();
  console.log("Connected successfully to server");

  const db = client.db("shop");
  const collection = db.collection("products");

  const filePath = path.join(__dirname, "..//data", "products", "product.json");
  const fileContents = fs.readFileSync(filePath, "utf8");
  const products = JSON.parse(fileContents);

  // Insert multiple documents
  const insertResult = await collection.insertMany(products);
  console.log("Inserted documents =>", insertResult.insertedCount);

  const data = await collection.find({ price: { $gte: 50 } }).toArray();
  console.log("data", data);
  return "done";
};

main()
  .then(console.log)
  .catch(console.error)
  .finally(() => client.close());
