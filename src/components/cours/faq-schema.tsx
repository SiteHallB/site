import Script from "next/script";

/**
 * Composant Server-Side qui rend un schema JSON-LD FAQPage.
 * À utiliser dans chaque page cours pour les rich snippets Google.
 */
export type FAQItem = { question: string; answer: string };

export default function FAQSchema({
    id,
    items,
}: {
    id: string;
    items: FAQItem[];
}) {
    return (
        <Script
            id={id}
            type="application/ld+json"
            strategy="afterInteractive"
            dangerouslySetInnerHTML={{
                __html: JSON.stringify({
                    "@context": "https://schema.org",
                    "@type": "FAQPage",
                    "mainEntity": items.map((it) => ({
                        "@type": "Question",
                        "name": it.question,
                        "acceptedAnswer": {
                            "@type": "Answer",
                            "text": it.answer,
                        },
                    })),
                }),
            }}
        />
    );
}
