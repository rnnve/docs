export async function GET() {
  try {
    const response = await fetch('https://api.rynni.cc/openapi.yaml', {
      signal: AbortSignal.timeout(10000),
      next: { revalidate: 60 },
    });

    if (!response.ok) {
      return Response.json(
        { error: `API server returned ${response.status}` },
        { status: 502 },
      );
    }

    return new Response(await response.text(), {
      headers: { 'Content-Type': 'application/yaml; charset=utf-8' },
    });
  } catch {
    return Response.json(
      { error: 'Failed to fetch the OpenAPI schema. Please try again.' },
      { status: 502 },
    );
  }
}
