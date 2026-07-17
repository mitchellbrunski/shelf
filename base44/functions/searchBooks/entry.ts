Deno.serve(async (req) => {
  try {
    const body = await req.json().catch(() => ({}));
    const query = (body.query || "").trim();
    const page = Math.max(1, parseInt(body.page, 10) || 1);

    if (!query) {
      return Response.json({ error: "A search query is required." }, { status: 400 });
    }

    const limit = 24;
    const offset = (page - 1) * limit;
    const fields = "key,title,author_name,cover_i,first_publish_year,subject,edition_count,language";
    const url = `https://openlibrary.org/search.json?q=${encodeURIComponent(query)}&limit=${limit}&offset=${offset}&fields=${fields}`;

    const resp = await fetch(url, {
      headers: { "Accept": "application/json", "User-Agent": "Shelf-PWA/1.0" }
    });
    if (!resp.ok) {
      return Response.json({ error: "The book search service is temporarily unavailable." }, { status: 502 });
    }
    const data = await resp.json();

    const books = (data.docs || []).map((doc) => ({
      work_key: doc.key,
      title: doc.title,
      author: (doc.author_name && doc.author_name[0]) || "Unknown author",
      cover_url: doc.cover_i
        ? `https://covers.openlibrary.org/b/id/${doc.cover_i}-M.jpg`
        : null,
      published_year: doc.first_publish_year || null,
      subjects: (doc.subject || []).slice(0, 6),
      olid: doc.cover_i ? String(doc.cover_i) : null
    }));

    return Response.json({
      books,
      total: data.numFound || 0,
      page,
      has_more: offset + books.length < (data.numFound || 0)
    });
  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
});