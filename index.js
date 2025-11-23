import express from "express";
import fetch from "node-fetch";
import cheerio from "cheerio";

const app = express();

app.get("/licitacoes", async (req, res) => {
  try {
    const url = "https://srevarrinha.educacao.mg.gov.br/index.php/licitacoes";

    const response = await fetch(url);
    const html = await response.text();

    const $ = cheerio.load(html);
    const cards = [];

    $("a[href*='/licitacoes/']").each((i, el) => {
      const link = $(el).attr("href");
      const title = $(el).text().trim();
      cards.push({ title, link });
    });

    res.json(cards);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.listen(3000, () => console.log("API rodando na porta 3000"));
