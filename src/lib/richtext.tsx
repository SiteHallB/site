/**
 * Rendu du texte riche (éditeur Lexical du CMS) avec les styles du site :
 * - le gras apparaît en doré (styles globaux sur <strong>),
 * - les liens sont dorés et soulignés au survol.
 */
import Link from "next/link";
import {
    RichText as LexicalRichText,
    type JSXConvertersFunction,
} from "@payloadcms/richtext-lexical/react";
import type { DefaultNodeTypes } from "@payloadcms/richtext-lexical";
import type {
    SerializedEditorState,
    SerializedLexicalNode,
} from "@payloadcms/richtext-lexical/lexical";

type RichTextData = SerializedEditorState | null | undefined;

const converters: JSXConvertersFunction<DefaultNodeTypes> = ({ defaultConverters }) => ({
    ...defaultConverters,
    link: ({ node, nodesToJSX }) => {
        const fields = node.fields;
        const href = fields?.url ?? "#";
        const children = nodesToJSX({ nodes: node.children });
        if (fields?.newTab) {
            return (
                <a href={href} target="_blank" rel="noopener noreferrer" className="text-accent hoverUnderline">
                    {children}
                </a>
            );
        }
        return (
            <Link href={href} className="text-accent hoverUnderline">
                {children}
            </Link>
        );
    },
});

export function RichText({ data, className }: { data?: RichTextData; className?: string }) {
    if (!data) return null;
    return <LexicalRichText data={data} converters={converters} className={className} />;
}

/** Extrait le texte brut d'un contenu riche (données structurées Google, meta descriptions). */
export function richTextToPlainText(data?: RichTextData): string {
    if (!data?.root) return "";

    type NoeudTexte = SerializedLexicalNode & { text?: string; children?: NoeudTexte[] };

    function walk(node: NoeudTexte): string {
        if (typeof node.text === "string") return node.text;
        if (Array.isArray(node.children)) {
            const inner = node.children.map((child) => walk(child)).join("");
            return node.type === "paragraph" ? `${inner} ` : inner;
        }
        return "";
    }

    return walk(data.root as NoeudTexte)
        .replace(/\s+/g, " ")
        .trim();
}
