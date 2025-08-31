// app/api/products/[id]/route.js
let products = [
  { id: 1, name: "Nasi Goreng", price: 20000 },
  { id: 2, name: "Ayam Geprek", price: 25000 },
];

// GET by ID
export async function GET(_, { params }) {
  const product = products.find((p) => p.id == params.id);
  if (!product) return new Response("Not found", { status: 404 });
  return Response.json(product);
}

// PUT update
export async function PUT(request, { params }) {
  const body = await request.json();
  const index = products.findIndex((p) => p.id == params.id);

  if (index === -1) return new Response("Not found", { status: 404 });

  products[index] = { ...products[index], ...body };
  return Response.json(products[index]);
}

// DELETE
export async function DELETE(_, { params }) {
  products = products.filter((p) => p.id != params.id);
  return new Response("Deleted", { status: 200 });
}
