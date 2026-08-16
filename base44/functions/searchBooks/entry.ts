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

    // --- Primary: Open Library Search ---
    const fields = "key,title,author_name,cover_i,first_publish_year,subject,edition_count";
    const olUrl = `https://openlibrary.org/search.json?q=${encodeURIComponent(query)}&limit=${limit}&offset=${offset}&fields=${fields}`;

    let olData = null;
    try {
      const olResp = await fetch(olUrl, {
        headers: { "Accept": "application/json", "User-Agent": "Mozilla/5.0 (compatible; Shelf-PWA/1.0)" },
        signal: AbortSignal.timeout(5000)
      });
      if (olResp.ok) olData = await olResp.json();
    } catch (_) {
      // Open Library timed out or errored — fall back below.
    }

    if (olData) {
      const books = (olData.docs || []).map((doc) => ({
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
      const total = olData.numFound || olData.num_found || 0;
      return Response.json({
        books,
        total,
        page,
        has_more: offset + books.length < total,
        source: "openlibrary"
      });
    }

    // --- Fallback: Google Books API ---
    const apiKey = process.env.GOOGLE_BOOKS_API_KEY;
    const gbUrl = `https://www.googleapis.com/books/v1/volumes?q=${encodeURIComponent(query)}&maxResults=${limit}&startIndex=${offset}${apiKey ? `&key=${apiKey}` : ""}`;
    const gbResp = await fetch(gbUrl, { headers: { "Accept": "application/json" } });
    if (!gbResp.ok) {
      return Response.json({ error: "The book search service is temporarily unavailable." }, { status: 502 });
    }
    const gbData = await gbResp.json();
    const books = (gbData.items || []).map((item) => {
      const v = item.volumeInfo || {};
      let cover = v.imageLinks && (v.imageLinks.thumbnail || v.imageLinks.smallThumbnail);
      if (cover) cover = cover.replace(/^http:/, "https:");
      return {
        work_key: item.id,
        title: v.title || "Untitled",
        author: (v.authors && v.authors[0]) || "Unknown author",
        cover_url: cover || null,
        published_year: v.publishedDate ? parseInt(String(v.publishedDate).slice(0, 4), 10) || null : null,
        subjects: (v.categories || []).slice(0, 6),
        olid: null
      };
    });
    const total = gbData.totalItems || 0;
    return Response.json({
      books,
      total,
      page,
      has_more: offset + books.length < total,
      source: "google_books"
    });
  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
});