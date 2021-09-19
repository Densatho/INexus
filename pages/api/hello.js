// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

export default function handler(req, res) {
  res.setHeader("Cache-Control", "s-maxage=10, stale-while-revalidate");

  res.status(200).json([
    {
      name: "John Doe",
      age: 20,
      from: "United States of America",
    },
    {
      name: "Lucas Henrique Azzi",
      age: 22,
      from: "Brazil",
    },
  ]);
}
