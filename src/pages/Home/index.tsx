import {
  ConfigProvider, Input, List, Pagination,
} from 'antd';
import { debounce, delay } from 'lodash';
import React, {
  useCallback, useEffect, useRef, useState,
} from 'react';
import { useSearchParams } from 'react-router-dom';
import { Card } from '../../components/CharacterCard';

import { Character } from '../../types/Character.type';
import { getUrlId } from '../../utils/getUrlId';
import { Container, LoaderWrapper, NoDataContainer } from './styles';
import { ReactComponent as NoData } from '../../images/no_data.svg';
import { ReactComponent as LoadingIcon } from '../../images/loading.svg';
import type { CompleteDataTypes } from '../../types/CompleteData.types';

export default function Home() {
  const controller = useRef<AbortController | null>(null);
  const [characters, setCharacters] = useState<Character[]>([]);
  const [inputSearch, setInputSearch] = useState<string>('');
  const [pageCount, setPageCount] = useState<number>(0);
  const [page, setPage] = useState<number>(1);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    searchParams.set('page', String(page));
    searchParams.set('search', inputSearch);
    if (page === 1) {
      searchParams.delete('page');
    }
    if (inputSearch === '') {
      searchParams.delete('search');
    }
    setSearchParams(searchParams);
  }, [page, inputSearch, searchParams, setSearchParams]);

  const getFilteredData = useCallback(async () => {
    // stop previous requests
    let returnedData: CompleteDataTypes | null = null;
    if (controller.current) {
      controller.current.abort();
    }
    controller.current = new AbortController();
    try {
      const response = await fetch(
        `https://swapi.dev/api/people/?${searchParams.toString()}`,
        {
          signal: controller.current.signal,
        },
      );
      controller.current = null;
      returnedData = await response.json();
      if (returnedData) {
        setCharacters(returnedData.results);
      }
    } catch (e) {
      console.error(e);
    } finally {
      delay(() => {
        setIsLoading(false);
        if (returnedData) {
          setPageCount(returnedData.count);
        }
      }, 800);
    }
  }, [searchParams]);

  function handleInputChange(event: React.ChangeEvent<HTMLInputElement>) {
    setPage(1);
    setPageCount(0);
    setInputSearch(event.target.value);
  }
  const debouncedOnChange = useCallback(debounce(handleInputChange, 300), [
    handleInputChange,
  ]);

  useEffect(() => {
    setIsLoading(true);
    getFilteredData();
  }, [getFilteredData]);

  return (
    <Container>
      <div className="header">
        <Input
          placeholder="Search Star Wars characters"
          size="large"
          onChange={debouncedOnChange}
          style={{ width: '300px' }}
        />
        {pageCount > 0 && (
          <div className="pagination">
            <Pagination
              defaultPageSize={10}
              current={page}
              onChange={setPage}
              total={pageCount}
              showTitle={false}
              showSizeChanger={false}
            />
          </div>
        )}
      </div>
      <ConfigProvider
        renderEmpty={() => (
          <NoDataContainer>
            <NoData color="white" />
            <p>Data Not Found</p>
          </NoDataContainer>
        )}
      >
        {isLoading ? <LoaderWrapper><LoadingIcon height="150px" width="150px" /></LoaderWrapper> : (
          <List
            rootClassName="card-list"
            grid={{
              gutter: 16,
              xs: 1,
              sm: 2,
              md: 4,
              lg: 4,
              xl: 6,
            }}
            dataSource={isLoading ? new Array(1).fill({}) : characters}
            renderItem={(character) => (
              <List.Item>
                {!isLoading ? (
                  <Card
                    imageUrl={`https://starwars-visualguide.com/assets/img/characters/${getUrlId(
                      character.url,
                    )}.jpg`}
                    loading={isLoading}
                    name={character.name}
                    key={character.name}
                    id={getUrlId(character.url)}
                  />
                ) : (
                  <Card loading={isLoading} />
                )}
              </List.Item>
            )}
          />
        )}
      </ConfigProvider>
    </Container>
  );
}
