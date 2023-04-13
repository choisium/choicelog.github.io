import { graphql, useStaticQuery } from 'gatsby'

type ReturnValue = {
  site: {
    siteMetadata: {
      title: string
      description: string
      author: string
      siteUrl: string
    }
  }
  file: {
    publicURL: string
  }
}

export const useSiteMetadata = () => {
  const data = useStaticQuery<ReturnValue>(graphql`
    query {
      site {
        siteMetadata {
          title
          description
          author
          siteUrl
        }
      }
      file(name: { eq: "profile-image" }) {
        childImageSharp {
          gatsbyImageData(width: 120, height: 120)
        }
        publicURL
      }
    }
  `)

  return {
    ...data.site.siteMetadata,
    image: data.file.publicURL,
  }
}
