/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.com/docs/reference/config-files/gatsby-node/
 */

/**
 * @type {import('gatsby').GatsbyNode['createPages']}
 */
exports.createPages = async ({ graphql, actions, reporter }) => {
  const { createPage, createRedirect } = actions

  const result = await graphql(`
    {
      allMdx {
        nodes {
          frontmatter {
            title
            slug
            oldSlugs
            status
          }
          internal {
            contentFilePath
          }
        }
      }
    }
  `)

  if (result.errors) {
    reporter.panicOnBuild(`Error while running GraphQL query.`)
    return
  }

  const path = require('path')
  const template = path.resolve(`src/templates/docs.js`)

  result.data.allMdx.nodes.forEach(node => {
    const slug = node.frontmatter.slug
    const oldSlugs = Array.isArray(node.frontmatter.oldSlugs) ? node.frontmatter.oldSlugs : []

    if (node.frontmatter.status === 'rejected') {
      return
    }

    createPage({
      path: slug,
      component: `${template}?__contentFilePath=${node.internal.contentFilePath}`,
      context: {
        layout: slug.split('/')[1],
        slug,
      }
    })

    oldSlugs.forEach(oldSlug => {
      createRedirect({
        fromPath: oldSlug,
        toPath: slug,
        isPermanent: true,
        redirectInBrowser: true,
      })
    })
  })
}
