import { gql } from '@apollo/client';

export const GET_ANIME = gql`
query GetANIME($page: Int, $perPage: Int) {
    Page(page: $page, perPage: $perPage) {
      pageInfo {
        total
        currentPage
        lastPage
        hasNextPage
        perPage
      }
      media(type: ANIME, sort: START_DATE, startDate_greater: 2020, genre: "Action") {
        id
        siteUrl
        title {
          native
        }
      }
    }
  }  
`;