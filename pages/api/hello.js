// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

export default function handler(req, res) {
  res.status(200).json([
    {
      name: "John Doe",
      age: 20,
      from: "United States of America",
    },
    {
      name: "Lucas Henrique Azzi",
      age: 21,
      from: "Brazil",
    },
  ]);
}
