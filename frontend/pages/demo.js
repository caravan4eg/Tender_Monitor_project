import { useEffect, useState } from 'react'
import styled from 'styled-components'
import { Search } from 'react-feather'

import { searchByWord } from '../src/services/api'
import { Layout } from '../src/components/Layout'
import { Container } from '../src/components/Container'

export const DemoPage = () => {
  const [searchQuery, setSearchQuery] = useState('')
  const [searchResults, setSearchResults] = useState([])

  const handleSearchInputChange = (e) => {
    setSearchQuery(e.currentTarget.value)
  }

  const handleSearch = async (e) => {
    e.preventDefault()
    const results = await searchByWord(searchQuery)
    setSearchResults(results.results)
    console.log(results.results)
  }

  return (
    <Layout>
      <Container>
        <Form onSubmit={handleSearch}>
          <SearchInput type="search" value={searchQuery} onChange={handleSearchInputChange} placeholder="Поиск..." />
          <SearchButton>
            <Search color={'#fff'} />
          </SearchButton>
        </Form>

        <h1>Результаты:</h1>

        <Table>
          <thead>
            <tr>
              <th>Заказчик</th>
              <th>Описание</th>
              <th>Ссылка на тендер</th>
            </tr>
          </thead>
          <tbody>
            {searchResults.map(({ id, customer, description, url_addr }) => (
              <tr key={id}>
                <td>{customer}</td>
                <td>{description}</td>
                <td>
                  <a href={url_addr} target="_blank">
                    Ссылка на тендер
                  </a>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Container>
    </Layout>
  )
}

export default DemoPage

// DemoPage.getInitialProps = async () => {
//   const res = await ky(getData('categories'))
//   const data = await res.json()
//   return { data }
// }

const SearchInput = styled.input`
  width: 100%;
  padding: 16px;
  border-radius: 4px 0 0 4px;
  border: 1px solid #eee;
`

const SearchButton = styled.button`
  background-color: ${({ theme }) => theme.colors.red};
  padding-left: 24px;
  padding-right: 24px;
  border: 0;
  border-radius: 0 4px 4px 0;
`

const Form = styled.form`
  display: flex;
  margin-top: 24px;
  margin-bottom: 24px;

  max-width: 720px;
  margin-left: auto;
  margin-right: auto;
`

const Table = styled.table`
  width: 100%;
  border: 1px solid #eee;
  border-collapse: collapse;

  thead {
    th {
      background-color: #fff;
      position: sticky;
      top: 0;
    }
  }

  td,
  th {
    padding: 16px;
    border: 1px solid #eee;
  }

  th {
    text-align: left;
  }

  td {
    min-width: 240px;
  }
`
