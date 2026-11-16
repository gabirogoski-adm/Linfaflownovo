import { NextRequest, NextResponse } from "next/server"

const REGION_TO_CITY: Record<string, string> = {
  AC: "Rio Branco - AC",
  AL: "Maceió - AL",
  AP: "Macapá - AP",
  AM: "Manaus - AM",
  BA: "Salvador - BA",
  CE: "Fortaleza - CE",
  DF: "Brasília - DF",
  ES: "Vitória - ES",
  GO: "Goiânia - GO",
  MA: "São Luís - MA",
  MT: "Cuiabá - MT",
  MS: "Campo Grande - MS",
  MG: "Belo Horizonte - MG",
  PA: "Belém - PA",
  PB: "João Pessoa - PB",
  PR: "Curitiba - PR",
  PE: "Recife - PE",
  PI: "Teresina - PI",
  RJ: "Rio de Janeiro - RJ",
  RN: "Natal - RN",
  RS: "Porto Alegre - RS",
  RO: "Porto Velho - RO",
  RR: "Boa Vista - RR",
  SC: "Florianópolis - SC",
  SP: "São Paulo - SP",
  SE: "Aracaju - SE",
  TO: "Palmas - TO",
}

export async function GET(req: NextRequest) {
  const headers = req.headers
  const country = (
    headers.get("x-vercel-ip-country") ||
    headers.get("cf-ipcountry") ||
    headers.get("x-appengine-country") ||
    ""
  )
    .trim()
    .toUpperCase()

  const region = (
    headers.get("x-vercel-ip-country-region") ||
    headers.get("cf-region-code") ||
    headers.get("x-appengine-region") ||
    ""
  )
    .trim()
    .toUpperCase()

  const rawCity = (
    headers.get("x-vercel-ip-city") ||
    headers.get("cf-ipcity") ||
    headers.get("x-appengine-city") ||
    ""
  ).trim()

  if (country === "BR") {
    if (region && REGION_TO_CITY[region]) {
      if (rawCity) {
        const decodedCity = decodeURIComponent(rawCity)
        return NextResponse.json({ city: `${decodedCity} - ${region}` })
      }
      return NextResponse.json({ city: REGION_TO_CITY[region] })
    }
  }

  return NextResponse.json({ city: "São Paulo - SP" })
}
