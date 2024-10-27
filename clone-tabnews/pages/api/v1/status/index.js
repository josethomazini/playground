import query from "infra/database";

export default async function StatusPage(request, response) {
  const resp = await query("select 1 + 1 as sum;");
  const soma = resp.rows[0].sum;
  console.log(soma);
  response.status(200).json({
    chave: `${soma}`,
  });
}
