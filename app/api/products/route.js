const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL+'/products';

export async function GET(request) {
  const { searchParams } = new URL(request.url);

  const url = new URL(`${API_BASE_URL}/all`);

  searchParams.forEach((value, key) => {
    url.searchParams.set(key, value);
  });
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
  // body = {
  //       ...body,
  //       categoryName: "Makanan"
  //   };

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

export async function PUT(req) {
  const body = await req.json();

  const res = await fetch(`${API_BASE_URL}/${body.id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });

  if (!res.ok) {
    return Response.json(
      { error: "Failed to update product" },
      { status: res.status }
    );
  }

  const data = await res.json();
  return Response.json(data);
}
