import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { Row, Col, Card } from 'antd';

const { Meta } = Card;

function Home() {
  const { characters } = useSelector(state => state.character);

  return (
    <Row>
      {
        characters.map(character => {
          return(
            <Col xs={24} sm={16} md={12} lg={8} xl={6} style={{ width: 'auto', display: 'flex', justifyContent: 'center', marginBottom: 10 }} key={ character.id }>
              <Link to={`/character/${character.id}`}>
                <Card
                  hoverable
                  style={{ width: 250 }}
                  cover={<img alt="example" src={ character.image } />}
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
