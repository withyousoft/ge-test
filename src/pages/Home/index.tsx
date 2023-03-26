/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react'
import { Pagination, Space, Table } from 'antd'
import type { ColumnsType } from 'antd/es/table'
import { gql, useQuery } from '@apollo/client'
import type { PaginationProps } from 'antd';

interface DataType {
  nativeTitle: string
  siteUrl: string
}

const columns: ColumnsType<DataType> = [
  { title: 'Title', dataIndex: 'nativeTitle', key: 'nativeTitle' },
  { title: 'Link', dataIndex: 'siteUrl', key: 'siteUrl', render(value, record) {
    return <a href={value}>{value}</a>
  } },
]

const pageSize = 20;

const GET_ANIME_QUERY = gql(/* GraphQL */ `
query GetAnime($page: Int, $perPage: Int) {
  Page(page: $page, perPage: $perPage) {
    pageInfo {
      total
      currentPage
      lastPage
      hasNextPage
      perPage
    }
    media(sort: START_DATE, startDate_greater: 2020, genre: "Action") {
      id
      siteUrl
      title {
        native
      }
    }
  }
}
`)


const itemRender: PaginationProps['itemRender'] = (_, type, originalElement) => {
  if (type === 'prev') {
    return <a href={'#'}>Previous</a>;
  }
  if (type === 'next') {
    return <a href={'#'}>Next</a>;
  }
  return originalElement;
};

const Home: React.FC = () => {
  const [currentPage, setCurrentPage] = React.useState(1);
  const { loading, data } = useQuery(
    GET_ANIME_QUERY,
    { variables: { page: currentPage, perPage: pageSize } }
  )
  const [tableData, setTableData] = React.useState<DataType[]>([]);
  const [total, setTotal] = React.useState(0);

  React.useEffect(() => {
    if (!loading && data) {
      setTableData(data.Page.media.map((m:any) => ({
        nativeTitle: m.title.native,
        siteUrl: m.siteUrl,
      })))
      setTotal(data.Page.pageInfo.total);
    }
  }, [data, loading]);

  const onChangeHandler = React.useCallback((page:number) => {
    setCurrentPage(page);
  }, []);

  return (
    <div>
      <h2>Home</h2>
      <Space direction="vertical" size="middle" style={{ display: 'flex' }}>
        <Table 
          columns={columns} 
          dataSource={tableData} 
          pagination={false} 
          loading={loading} 
        />
        <Pagination 
          style={{display: 'flex', justifyContent:'center'}} 
          total={total} 
          itemRender={itemRender} 
          current={currentPage} 
          pageSize={pageSize} 
          onChange={onChangeHandler} showSizeChanger={false} 
        />
      </Space>
    </div>
  )
}

export default Home
