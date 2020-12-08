import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { Row, Col, Card } from 'antd';

const { Meta } = Card;

const styles = {
  characterCard: {
    width: 'auto',
    display: 'flex',
    justifyContent: 'center',
    marginBottom: 10
  },
  link: {
    width: 300
  }
};

function Home() {
  const { characters } = useSelector(state => state.character);

  return (
    <Row>
      {
        characters.map(character => {
          return(
            <Col xs={ 24 } md={ 12 } lg={ 8 } xxl={ 6 }
              style={ styles.characterCard }
              key={ character.id }
            >
              <Link to={ `/character/${character.id}` } style={ styles.link }>
                <Card
                  hoverable
                  cover={ <img alt="example" src={ character.image } /> }
                >
                  <Meta title={ character.name } />
                </Card>
              </Link>
            </Col>
          );
        })
      }
    </Row>
  );
}

export default Home;
