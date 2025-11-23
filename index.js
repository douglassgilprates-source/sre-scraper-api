import express from "express";
import fetch from "node-fetch";
import { load } from "cheerio";

const app = express();

app.get("/", async (req, res) => {
  try {
    const response = await fetch("https://srevarginha.educacao.mg.gov.br/index.php/licitacoes");
    const html = await response.text();

    const $ = load(html);

    let results = [];

    $("a").each((i, el) => {
      const link = $(el).attr("href");
      const text = $(el).text().trim();

      if (link && link.includes("licitacoes")) {
        results.push({ text, link });
      }
    });

    res.json(results);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.listen(3000, () => console.log("API rodando na Render..."));
