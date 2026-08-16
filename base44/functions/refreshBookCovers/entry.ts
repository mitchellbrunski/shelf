import { createClientFromRequest } from 'npm:@base44/sdk@0.8.40';

export default async function(req) {
  try {
    const base44 = createClientFromRequest(req);
    const user = await base44.auth.me();
    if (!user) return Response.json({ error: 'Unauthorized' }, { status: 401 });

    const books = await base44.asServiceRole.entities.Book.list("-created_date", 500);
    const results = [];
    let debug = null;

    for (const book of books) {
      try {
        // Diagnostic: try Internet Archive image service via the editions API
        if (!debug && book.work_key) {
          try {
            const er = await fetch(`https://openlibrary.org${book.work_key}/editions.json?limit=5`, { headers: { "User-Agent": "Shelf-PWA/1.0" } });
            const ed = await er.json();
            const entries = (ed.entries || []);
            const ocaid = entries.map(e => e.ocaid).find(Boolean);
            const isbn = entries.flatMap(e => [...(e.isbn_13 || []), ...(e.isbn_10 || [])])[0];
            const archiveProbe = ocaid
              ? await fetch(`https://archive.org/services/img/${ocaid}`, { headers: { "User-Agent": "Shelf-PWA/1.0" } })
              : null;
            debug = {
              book: book.title,
              work_key: book.work_key,
              editionCount: ed.entry_count || entries.length,
              ocaid,
              isbn,
              archiveStatus: archiveProbe ? archiveProbe.status : null,
              archiveCt: archiveProbe ? archiveProbe.headers.get("content-type") : null,
              archiveLen: archiveProbe ? archiveProbe.headers.get("content-length") : null
            };
          } catch (e) {
            debug = { book: book.title, diagError: String(e) };
          }
        }
        const qq = 'intitle:' + book.title + (book.author ? ' inauthor:' + book.author : '');
        const r = await fetch(`https://www.googleapis.com/books/v1/volumes?q=${encodeURIComponent(qq)}&maxResults=1`, {
          headers: { "Accept": "application/json" }
        });
        const data = await r.json();
        const imgLinks = data.items && data.items[0] && data.items[0].volumeInfo && data.items[0].volumeInfo.imageLinks;
        let url = imgLinks && (imgLinks.thumbnail || imgLinks.smallThumbnail);
        if (url) {
          // upgrade to https and request a crisper, flat cover
          url = url.replace(/^http:/, 'https:').replace(/&zoom=\d+/, '&zoom=1').replace('&edge=curl', '');
          await base44.asServiceRole.entities.Book.update(book.id, { cover_url: url });
          results.push({ id: book.id, title: book.title, updated: true });
        } else {
          results.push({ id: book.id, title: book.title, updated: false });
        }
      } catch (e) {
        results.push({ id: book.id, title: book.title, error: String(e) });
      }
    }

    return Response.json({ total: books.length, results, debug });
  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
}