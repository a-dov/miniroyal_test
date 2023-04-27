import { Button, Form, Input } from 'antd';
import React, { useCallback, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { Character } from '../../types/Character.type';
import { fields } from './fields';
import { CharacterContainer, Container, StyledForm } from './styles';
import { saveCharacter } from '../../store/slices/Character.slice';
import { useAppSelector } from '../../store';

export default function CharacterPage() {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isEdit, setEdit] = useState<boolean>(false);
  const { id } = useParams();
  const dispatch = useDispatch();
  const [form] = Form.useForm<Character>();

  const data = useAppSelector((state) => state.character.character);

  const onSubmit = (submitData: any) => {
    setEdit((value) => !value);
    dispatch(saveCharacter({ ...submitData }));
  };

  useEffect(() => {
    if (isEdit) {
      form.setFieldsValue({
        ...data,
      });
    }
  }, [isEdit, data, form]);

  const getCharacterData = useCallback(async () => {
    try {
      const response = await fetch(`https://swapi.dev/api/people/${id}`);
      const responseData = await response.json();
      dispatch(saveCharacter(responseData));
    } catch (e) {
      console.error(e);
    } finally {
      setIsLoading(false);
    }
  }, [id, dispatch]);

  useEffect(() => {
    getCharacterData();
  }, [getCharacterData]);

  return (
    <Container>
      {!isLoading && (
        <CharacterContainer>
          <div className="character-data">
            <div className="character-data-details">
              <StyledForm
                form={form}
                layout="horizontal"
                labelCol={{ span: 6, sm: 9, md: 6 }}
                labelAlign="left"
                wrapperCol={{ span: 16 }}
                style={{ maxWidth: 600 }}
                onFinish={onSubmit}
                autoComplete="off"
              >
                <div className="character-header">
                  {isEdit ? (
                    <Form.Item noStyle name="name">
                      <Input size="large" />
                    </Form.Item>
                  ) : (
                    <h1>{data?.name}</h1>
                  )}
                  <div className="btn-wrapper">
                    {!isEdit ? (
                      <Button
                        htmlType="button"
                        onClick={() => setEdit((value) => !value)}
                      >
                        Edit
                      </Button>
                    ) : (
                      <>
                        <input hidden type="submit" />
                        <Button type="primary" htmlType="submit">
                          Save
                        </Button>
                        <Button
                          htmlType="button"
                          onClick={() => setEdit((value) => !value)}
                        >
                          Cancel
                        </Button>
                      </>
                    )}
                  </div>
                </div>
                <div className="character-data-info">
                  {Object.entries(fields).map(([key, value]) => (
                    <Form.Item label={value} name={key} key={key}>
                      {isEdit ? (
                        <Input size="middle" />
                      ) : (
                        data && <span>{data[key as keyof Character] as string}</span>
                      )}
                    </Form.Item>
                  ))}
                </div>
              </StyledForm>
            </div>
          </div>

          <div className="character-image">
            <img
              style={{ borderRadius: '0.5em' }}
              src={`https://starwars-visualguide.com/assets/img/characters/${id}.jpg`}
              alt={`Imagem de ${data?.name}`}
            />
          </div>
        </CharacterContainer>
      )}
    </Container>
  );
}
