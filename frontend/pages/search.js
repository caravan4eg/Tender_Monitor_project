import { useState, useEffect } from 'react'
import styled from 'styled-components'
import { Search } from 'react-feather'

import { searchByWord, getAllCategories } from 'services/api'
import { Layout } from 'components/Layout'
import { Container } from 'components/Container'
import { Loading } from 'components/Loading'

export const SearchPage = () => {
  const [searchQuery, setSearchQuery] = useState('')
  const [searchResults, setSearchResults] = useState()
  const [allCategories, setAllCategories] = useState([])
  const [loading, setLoading] = useState(false)

  const handleSearchInputChange = (e) => {
    setSearchQuery(e.currentTarget.value)
  }

  const handleSearch = async (e) => {
    e.preventDefault()
    setLoading(true)
    const results = await searchByWord(searchQuery)
    setSearchResults(results.results)
    setLoading(false)
    console.log(results.results)
  }

  useEffect(() => {
    const fetchData = async () => {
      const categories = await getAllCategories()
      setAllCategories(categories.results)
    }

    fetchData()
  }, [])

  console.log(allCategories)
  return (
    <Layout>
      <Container>
        <Form onSubmit={handleSearch}>
          <SearchInput
            type="search"
            value={searchQuery}
            onChange={handleSearchInputChange}
            placeholder="Поиск по ключевому слову..."
          />
          <SearchButton>
            <Search color={'#fff'} />
          </SearchButton>
        </Form>
        {loading && <Loading width={'92px'} height={'92px'} />}

        {searchResults && (
          <>
            <h1>Результаты:</h1>

            <Table>
              <thead>
                <tr>
                  <th>Заказчик</th>
                  <th>Описание</th>
                  <th>Дата завершения</th>
                  <th>Ссылка на тендер</th>
                </tr>
              </thead>
              <tbody>
                {searchResults.map(({ id, customer, description, url_addr, deadline }) => (
                  <tr key={id}>
                    <td>{customer}</td>
                    <td>{description}</td>
                    <td>{deadline}</td>
                    <td>
                      <a href={url_addr} target="_blank">
                        Ссылка на тендер
                      </a>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </>
        )}

        <div>
          {allCategories.map(({ category_name }) => (
            <label>
              <input type="radio"></input>
              <h1>{category_name}</h1>
            </label>
          ))}
        </div>
      </Container>
    </Layout>
  )
}

export default SearchPage

const SearchInput = styled.input`
  width: 100%;
  padding: 16px;
  border-radius: 4px 0 0 4px;
  border: 1px solid #eee;

  &:focus,
  &:active {
    outline: none;
  }
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
  margin-bottom: 32px;

  thead {
    th {
      background-color: #f9fafb;
      position: sticky;
      z-index: 20;
      top: -1px;
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
    font-size: 14px;
    line-height: 140%;
  }
`
