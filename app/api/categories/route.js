const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL + '/categories';

export async function GET() {
  const res = await fetch(`${API_BASE_URL}/all`, {
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
