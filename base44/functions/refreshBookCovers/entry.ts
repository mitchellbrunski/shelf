import { createClientFromRequest } from 'npm:@base44/sdk@0.8.40';

export default async function(req) {
  try {
    const base44 = createClientFromRequest(req);
    const user = await base44.auth.me();
    if (!user) return Response.json({ error: 'Unauthorized' }, { status: 401 });

    const apiKey = process.env.GOOGLE_BOOKS_API_KEY;
    if (!apiKey) return Response.json({ error: 'GOOGLE_BOOKS_API_KEY secret not set' }, { status: 500 });

    const books = await base44.asServiceRole.entities.Book.list("-created_date", 500);
    const results = [];

    for (const book of books) {
      try {
        const queries = [
          'intitle:' + book.title + (book.author ? ' inauthor:' + book.author : ''),
          book.title + (book.author ? ' ' + book.author : ''),
          book.title
        ];
        let url = null;
        for (const q of queries) {
          const r = await fetch(
            `https://www.googleapis.com/books/v1/volumes?q=${encodeURIComponent(q)}&maxResults=1&key=${apiKey}`,
            { headers: { "Accept": "application/json" } }
          );
          const data = await r.json();
          const imgLinks = data.items && data.items[0] && data.items[0].volumeInfo && data.items[0].volumeInfo.imageLinks;
          url = imgLinks && (imgLinks.thumbnail || imgLinks.smallThumbnail);
          if (url) break;
        }
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

    return Response.json({ total: books.length, results });
  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
}