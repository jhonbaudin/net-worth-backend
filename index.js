const express = require("express");
const cors = require("cors");
const fetch = require("isomorphic-fetch");
const app = express();
const port = 3100;

app.use(cors());
app.use(express.json());

app.post("/calculate-net-worth", async (req, res) => {
  const { assets, liabilities, currency } = req.body;
  const calculateTotal = (items) =>
    items.reduce((total, item) => Number(total) + Number(item.amount), 0);

  if (
    undefined === assets ||
    undefined === liabilities ||
    undefined === currency
  ) {
    return res.status(400).json({ error: "Missing parameters" });
  }

  const parsedAssets = calculateTotal(assets).toFixed(2);
  const parsedLiabilities = calculateTotal(liabilities).toFixed(2);

  try {
    const exchangeRateResponse = await fetch(
      `https://v6.exchangerate-api.com/v6/1973694d4f2a467315c512de/latest/${currency}`
    );
    const exchangeRateData = await exchangeRateResponse.json();

    if ("error" === exchangeRateData.result) {
      throw new Error(exchangeRateData["error-type"]);
    }

    const exchangeRate = exchangeRateData.conversion_rates.USD;
    const netWorth = (parsedAssets - parsedLiabilities).toFixed(2);
    const conversion = (netWorth * exchangeRate).toFixed(2);

    res.json({
      assets: parsedAssets,
      liabilities: parsedLiabilities,
      netWorth,
      conversion,
      currency,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
});

if (require.main === module) {
  const server = app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
  });

  process.on("unhandledRejection", (err) => {
    console.error("Unhandled promise rejection:", err);
    server.close(() => process.exit(1));
  });

  process.on("SIGINT", () => {
    server.close(() => process.exit(0));
  });
}

module.exports = app;
