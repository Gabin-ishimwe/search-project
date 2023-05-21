export async function GET(request: Request) {
  return new Response("Testing route");
}

export async function POST(request: Request) {
  return "Testing Post route";
}
