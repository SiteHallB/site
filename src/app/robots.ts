import type { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
    return {
        rules: [
            {
                userAgent: '*',
                allow: '/',
                disallow: [
                    '/api/',
                    '/merci',
                ],
            },
        ],
        sitemap: 'https://www.hallb.fr/sitemap.xml',
        host: 'https://www.hallb.fr',
    }
}
