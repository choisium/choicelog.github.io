import Template from 'components/Common/Template'
import { PostPageItemType } from 'types/PostItem.types'
import { HeadFC, graphql } from 'gatsby'
import React, { FunctionComponent } from 'react'
import PostHead from 'components/Post/PostHead'
import PostContent from 'components/Post/PostContent'
import CommentWidget from 'components/Post/CommentWidget'
import { SEO } from 'components/Common/SEO'

type PostTemplateDataType = {
  allMarkdownRemark: {
    edges: PostPageItemType[]
  }
}

type PostTemplateProps = {
  data: {
    allMarkdownRemark: {
      edges: PostPageItemType[]
    }
  }
  location: {
    href: string
  }
}

const PostTemplate: FunctionComponent<PostTemplateProps> = function ({
  data: {
    allMarkdownRemark: { edges },
  },
}) {
  const {
    node: {
      html,
      frontmatter: {
        title,
        date,
        categories,
        thumbnail: {
          childImageSharp: { gatsbyImageData },
        },
      },
    },
  } = edges[0]

  return (
    <Template>
      <PostHead
        title={title}
        date={date}
        categories={categories}
        thumbnail={gatsbyImageData}
      />
      <PostContent html={html} />
      <CommentWidget />
    </Template>
  )
}

export default PostTemplate

export const Head: HeadFC<PostTemplateDataType> = ({
  data: {
    allMarkdownRemark: { edges },
  },
  location: { pathname },
}) => {
  const {
    node: {
      frontmatter: {
        title,
        summary,
        thumbnail: { publicURL },
      },
    },
  } = edges[0]

  return (
    <SEO
      title={title}
      description={summary}
      pathname={pathname}
      image={publicURL}
    />
  )
}

export const queryMarkdownDataBySlug = graphql`
  query queryMarkdownDataBySlug($slug: String) {
    allMarkdownRemark(filter: { fields: { slug: { eq: $slug } } }) {
      edges {
        node {
          html
          frontmatter {
            title
            summary
            date(formatString: "YYYY.MM.DD.")
            categories
            thumbnail {
              childImageSharp {
                gatsbyImageData
              }
              publicURL
            }
          }
        }
      }
    }
  }
`
