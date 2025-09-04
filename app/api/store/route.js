const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL+'/store';


export async function GET() {
  const url = new URL(`${API_BASE_URL}`);
  const res = await fetch(url.toString(), {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
    cache: "no-store", 
  });

  if (!res.ok) {
    return Response.json(
      { error: "Failed to fetch products" },
      { status: res.status }
    );
  }

  const data = await res.json();
  return Response.json(data);
}


export async function POST(req) {
  var body = await req.json();
  const res = await fetch(`${API_BASE_URL}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });

  if (!res.ok) {
    return Response.json(
      { error: body },
      { status: res.status }
    );
  }

  const data = await res.json();
  return Response.json(data, { status: 201 });
}
