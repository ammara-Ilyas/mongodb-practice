const { MongoClient } = require("mongodb");
const fs = require("fs");
const path = require("path");

const url = "mongodb://127.0.0.1";
const client = new MongoClient(url);

const main = async () => {
  await client.connect();
  console.log("Connected successfully to server");

  const db = client.db("shop");
  const collectionProduct = db.collection("products");
  const collectionSale = db.collection("sales");

  const filePathProduct = path.join(
    __dirname,
    "..//data",
    "products",
    "product.json"
  );
  const fileContentsProduct = fs.readFileSync(filePathProduct, "utf8");
  const products = JSON.parse(fileContentsProduct);
  const filePathSales = path.join(__dirname, "..//data", "sales", "sale.json");
  const fileContentsSales = fs.readFileSync(filePathSales, "utf8");
  const sales = JSON.parse(fileContentsSales);

  // Insert multiple documents
  const insertResult = await collectionProduct.insertMany(products);
  console.log("Inserted documents =>", insertResult.insertedCount);

  const insertResultSales = await collectionSale.insertMany(sales);
  console.log(
    "insertResultSales documents =>",
    insertResultSales.insertedCount
  );

  const data = await collectionProduct.find({ price: { $gte: 50 } }).toArray();
  console.log("data", data);
  return "done";
};

main()
  .then(console.log)
  .catch(console.error)
  .finally(() => client.close());
