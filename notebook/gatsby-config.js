/**
 * Configure your Gatsby site with this file.
 *
 * See: https://www.gatsbyjs.com/docs/reference/config-files/gatsby-config/
 */

/**
 * @type {import('gatsby').GatsbyConfig}
 */
module.exports = {
  siteMetadata: {
    title: `Pomelette Nest`,
    description: `ゲームの処理ロジック・データ定義の解明に専念するための調査小屋`,
    author: `Pseudomelette`,
    siteUrl: `https://pseudomelette.github.io/`,
  },
  plugins: [
    {
      resolve: `gatsby-plugin-anchor-links`,
      options: {
        offset: -64,
        duration: 750,
      }
    },
    {
      resolve: `gatsby-plugin-google-gtag`,
      options: {
        trackingIds: [
          'G-JN2ME9PFG4',
        ],
        gtagConfig: {
          optimize_id: "OPT_CONTAINER_ID",
          anonymize_ip: true,
          cookie_expires: 0,
        },
        pluginConfig: {
          head: true,
          respectDNT: true,
        },
      },
    },
    `gatsby-plugin-image`,
    `gatsby-plugin-layout`,
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `Pomelette Nest`,
        short_name: `Pom Nest`,
        start_url: `/`,
        background_color: `#2d2127`,
        theme_color: `#2d2127`,
        display: `minimal-ui`,
        icon: `src/images/pomelette-icon.svg`,
      },
    },
    `gatsby-plugin-material-ui`,
    `gatsby-plugin-mdx`,
    `gatsby-plugin-offline`,
    `gatsby-plugin-robots-txt`,
    `gatsby-plugin-sharp`,
    {
      resolve: `gatsby-plugin-sitemap`,
      options: {
        output: `/`,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `docs`,
        path: `${__dirname}/src/docs`,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/images`,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `data`,
        path: `${__dirname}/src/data`,
      },
    },
    `gatsby-transformer-csv`,
    `gatsby-transformer-sharp`,
  ],
}
