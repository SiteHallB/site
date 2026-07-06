/**
 * Aides à la construction de contenu riche (Lexical) pour le seed.
 * `md()` convertit un mini-markdown (**gras**, *italique*, [texte](lien))
 * en JSON Lexical ; les paragraphes sont séparés par une ligne vide.
 */

type TextNode = {
    type: "text";
    detail: number;
    format: number;
    mode: "normal";
    style: "";
    text: string;
    version: 1;
};

type LinkNode = {
    type: "link";
    children: TextNode[];
    direction: "ltr";
    format: "";
    indent: 0;
    version: 3;
    fields: { linkType: "custom"; newTab: boolean; url: string };
};

type InlineNode = TextNode | LinkNode;

type ParagraphNode = {
    type: "paragraph";
    children: InlineNode[];
    direction: "ltr";
    format: "";
    indent: 0;
    textFormat: 0;
    version: 1;
};

export type LexicalDoc = {
    root: {
        type: "root";
        children: ParagraphNode[];
        direction: "ltr";
        format: "";
        indent: 0;
        version: 1;
    };
};

function texte(text: string, format = 0): TextNode {
    return { type: "text", detail: 0, format, mode: "normal", style: "", text, version: 1 };
}

/** Découpe une ligne en nœuds : **gras**, *italique*, [label](url). */
function inline(source: string): InlineNode[] {
    const nodes: InlineNode[] = [];
    // Lien | gras | italique
    const regex = /\[([^\]]+)\]\(([^)]+)\)|\*\*([^*]+)\*\*|\*([^*]+)\*/g;
    let dernier = 0;
    let m: RegExpExecArray | null;

    while ((m = regex.exec(source)) !== null) {
        if (m.index > dernier) nodes.push(texte(source.slice(dernier, m.index)));
        if (m[1] !== undefined) {
            const url = m[2];
            nodes.push({
                type: "link",
                // Le libellé du lien peut lui-même contenir du gras/italique.
                children: inline(m[1]).filter((n): n is TextNode => n.type === "text"),
                direction: "ltr",
                format: "",
                indent: 0,
                version: 3,
                fields: { linkType: "custom", newTab: url.startsWith("http"), url },
            });
        } else if (m[3] !== undefined) {
            nodes.push(texte(m[3], 1)); // gras
        } else if (m[4] !== undefined) {
            nodes.push(texte(m[4], 2)); // italique
        }
        dernier = regex.lastIndex;
    }
    if (dernier < source.length) nodes.push(texte(source.slice(dernier)));
    return nodes;
}

/** Convertit un mini-markdown en document Lexical. */
export function md(source: string): LexicalDoc {
    const paragraphes = source
        .split(/\n\s*\n/)
        .map((par) => par.replace(/\s+/g, " ").trim())
        .filter((par) => par.length > 0);

    return {
        root: {
            type: "root",
            children: paragraphes.map((par) => ({
                type: "paragraph",
                children: inline(par),
                direction: "ltr",
                format: "",
                indent: 0,
                textFormat: 0,
                version: 1,
            })),
            direction: "ltr",
            format: "",
            indent: 0,
            version: 1,
        },
    };
}
