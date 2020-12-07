import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import { Row, Col, Image, Descriptions, List } from 'antd';

import { fetchCharacter, clearSelectedCharacter } from '../store/character';
import { fetchEpisodes, clearEpisodes } from '../store/episode';

function Character() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { selectedCharacter } = useSelector(state => state.character);
  const { episodes } = useSelector(state => state.episode);

  useEffect(() => {
    dispatch(fetchCharacter(id));

    return () => {
      dispatch(clearSelectedCharacter());
      dispatch(clearEpisodes());
    }
  }, []);

  useEffect(() => {
    if (selectedCharacter.episode) {
      const lastFiveEpisodes = selectedCharacter.episode.slice(-5);
      const episodeList = lastFiveEpisodes.map(episode => episode.split('/').pop());

      dispatch(fetchEpisodes(episodeList.join(',')));
    }
  }, [selectedCharacter]);

  return (
    <>
      <Link to='/' style={{ fontSize: 20, marginLeft: 10 }}>
        { "< Go Back" }
      </Link>
      <Row style={{ width: 'auto', height: 300, display: 'flex', justifyContent: 'center', marginTop: 100, marginBottom: 10 }}>
        <Col style={{ alignItems: 'center' }}>
          <Image
            style={{ borderRadius: '50%' }}
            src={ selectedCharacter.image }
          />
        </Col>
      </Row>
      <Row style={{ padding: 15, display: 'flex', justifyContent: 'center' }}>
        <Col style={{width: 800}}>
            <Descriptions layout='vertical'>
              <Descriptions.Item label="Name" labelStyle={{ fontWeight: 'bold' }}>
                { selectedCharacter.name }
              </Descriptions.Item>
              <Descriptions.Item label="From" labelStyle={{ fontWeight: 'bold' }}>
                { (selectedCharacter.origin && selectedCharacter.origin.name) || "" }
              </Descriptions.Item>
              <Descriptions.Item label="Episodes" labelStyle={{ fontWeight: 'bold' }}>
                {
                  (episodes.length > 0 && <List
                    size="small"
                    dataSource={ episodes.slice(-5) }
                    renderItem={item => <List.Item>{ `${item.id}. ${item.name}` }</List.Item>}
                  />)
                }
              </Descriptions.Item>
            </Descriptions>
          </Col>
        </Row>
    </>
  );
}

export default Character;
