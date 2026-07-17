Deno.serve(async (req) => {
  try {
    const body = await req.json().catch(() => ({}));
    const workKey = (body.work_key || "").trim();

    if (!workKey) {
      return Response.json({ error: "A work_key is required." }, { status: 400 });
    }

    const url = workKey.startsWith("http")
      ? workKey
      : `https://openlibrary.org${workKey}.json`;

    const resp = await fetch(url, {
      headers: { "Accept": "application/json", "User-Agent": "Shelf-PWA/1.0" }
    });
    if (!resp.ok) {
      return Response.json({ error: "Book details could not be loaded." }, { status: 404 });
    }
    const data = await resp.json();

    let description = "";
    if (typeof data.description === "string") {
      description = data.description;
    } else if (data.description && data.description.value) {
      description = data.description.value;
    }

    const subjects = (data.subjects || [])
      .slice(0, 8)
      .map((s) => (typeof s === "string" ? s : s.name))
      .filter(Boolean);

    return Response.json({
      work_key: workKey,
      title: data.title,
      description: description.slice(0, 3000),
      subjects
    });
  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
});