export function titleToSlug(title) {
    title = title.toLowerCase();
    title = title.replace(/[^a-zA-Z0-9\u0600-\u06FF\s-]/g, '');
    return title.trim().replace(/\s+/g, '-');
}
