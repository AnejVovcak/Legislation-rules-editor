function truncateHtml (html: string, maxLength: number){
    const div = document.createElement("div");
    div.innerHTML = html;
    let text = div.textContent || div.innerText || ""; // Get raw text, without HTML

    if (text.length <= maxLength) return html; // Return original HTML if within limit
    text = text.substring(0, maxLength); // Truncate text to max length

    // Optionally add back any simple HTML like a paragraph tag or just return text
    return `<p>${text}...</p>`; // Example: wrapping truncated text in a paragraph
}

export default truncateHtml;