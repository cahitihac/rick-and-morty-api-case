import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams, useHistory } from 'react-router-dom';
import { Row, Col, Image, Descriptions, List } from 'antd';

import { fetchCharacter, clearSelectedCharacter } from '../store/character';
import { fetchEpisodes, clearEpisodes } from '../store/episode';

const styles = {
  goBackLink: {
    fontSize: 20,
    marginLeft: 10
  },
  avatarRow: {
    width: 'auto',
    height: 300,
    display: 'flex',
    justifyContent: 'center',
    marginTop: 100,
    marginBottom: 10
  },
  avatar: {
    borderRadius: '50%',
    cursor: 'zoom-in'
  },
  characterInfoContainer: {
    padding: 15,
    display: 'flex',
    justifyContent: 'center'
  },
  fontWeightBold: {
    fontWeight: 'bold'
  },
  characterInfo: {
    width: 750
  }
};

function Character() {
  const { id } = useParams();
  const browserHistory = useHistory();
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
      <Link to='#' onClick={ () => browserHistory.goBack() } style={ styles.goBackLink }>
        { "< Go Back" }
      </Link>
      <Row style={ styles.avatarRow }>
        <Col>
          <Image
            style={ styles.avatar }
            src={ selectedCharacter.image }
          />
        </Col>
      </Row>
      <Row style={ styles.characterInfoContainer }>
        <Col style={ styles.characterInfo }>
            <Descriptions layout='vertical'>
              <Descriptions.Item label="Name" labelStyle={ styles.fontWeightBold }>
                { selectedCharacter.name }
              </Descriptions.Item>
              <Descriptions.Item label="From" labelStyle={ styles.fontWeightBold }>
                { (selectedCharacter.origin && selectedCharacter.origin.name) || "" }
              </Descriptions.Item>
              <Descriptions.Item label="Episodes" labelStyle={ styles.fontWeightBold }>
                {
                  episodes.length > 0 && (<List
                    size="small"
                    dataSource={ episodes.slice(-5) }
                    renderItem={ episode => <List.Item>{ `${episode.id}. ${episode.name}` }</List.Item>}
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
