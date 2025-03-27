const doc_img = "https://www.mohit-jain.com/static-icons/Personal_Icon_Expanded_Transparent.png";
const og_img = "https://www.mohit-jain.com/static-icons/Personal_Icon_Expanded.png";

const WEBSITE_LINK = "https://community.mohit-jain.com";
const WEBSITE_TITLE = "Assurant Community Platform";
const WEBSITE_DESC = "This is for the 2025 KSU Hackathon Project.";

/**
 * This function returns the meta tags for the website for Search Engine Optimization.
 * @param {String} pageTitle The document page title.
 * @param {String} pageRoute The link to the route.
 * @param {String} pageDesc The document meta description.
 */
export function getMeta(pageTitle = WEBSITE_TITLE, pageRoute = "/", pageDesc = WEBSITE_DESC) {
    const WEBSITE_PATH = (WEBSITE_LINK + pageRoute);
    
    return {
        title: pageTitle,
        link: [
            { rel: 'icon', href: doc_img },
            { rel: 'preconnect', href: "https://fonts.googleapis.com" },
            { rel: 'preconnect', href: "https://fonts.gstatic.com", crossorigin: "anonymous" },

            { rel: 'stylesheet', href: "https://fonts.googleapis.com/css2?family=Lexend:wght@100..900&display=swap" },
            { rel: 'stylesheet', href: "https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,100..900;1,100..900&display=swap" },
            { rel: 'stylesheet', href: "https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,100..900;1,100..900&display=swap" },
        ],

        meta: [
            { name: 'description', content: pageDesc },
            { name: 'author', content: "Mohit Jain" },

            { property: 'og:site:name', content: "Mohit Jain" },
            { property: 'og:type', content: 'website' },
            { property: 'og:url', content: WEBSITE_PATH },
            { property: 'og:title', content: pageTitle },
            { property: 'og:description', content: pageDesc },
            { property: 'og:image', content: og_img },

            { property: 'twitter:card', content: "summary" },
            { property: 'twitter:url', content: WEBSITE_PATH },
            { property: 'twitter:title', content: pageTitle },
            { property: 'twitter:description', content: pageDesc },
            { property: 'twitter:image', content: og_img },
        ],
    };
}

/**
 * This function returns the meta tags for the website for Search Engine Optimization.
 * This function is diferrent as the link is not predefined.
 * @param {String} pageTitle The document page title.
 * @param {String} pageLink The link to the website page.
 * @param {String} pageDesc The document meta description.
 */
export function getMetaWithLink(pageTitle = WEBSITE_TITLE, pageLink = WEBSITE_LINK, pageDesc = WEBSITE_DESC) {
    return {
        title: pageTitle,
        link: [{ rel: 'icon', href: doc_img }],

        meta: [
            { name: 'description', content: pageDesc },
            { name: 'author', content: "Mohit Jain" },

            { property: 'og:site:name', content: "Mohit Jain" },
            { property: 'og:type', content: 'website' },
            { property: 'og:url', content: pageLink },
            { property: 'og:title', content: pageTitle },
            { property: 'og:description', content: pageDesc },
            { property: 'og:image', content: og_img },

            { property: 'twitter:card', content: "summary" },
            { property: 'twitter:url', content: pageLink },
            { property: 'twitter:title', content: pageTitle },
            { property: 'twitter:description', content: pageDesc },
            { property: 'twitter:image', content: og_img },
        ],
    };
}