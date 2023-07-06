import "./App.css";
import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

const tweetsApiData = "http://www.mocky.io/v2/5d1ef97d310000552febe99d";

function App() {
  const [tweetData, setTweetData] = useState([]);

  // fetching data from the url above
  const getTweetsDataWithFetch = async () => {
    const response = await fetch(tweetsApiData);
    const jsonData = await response.json();
    setTweetData(jsonData);
    console.log(jsonData);
  };

  useEffect(() => {
    getTweetsDataWithFetch();
  }, []);

  return (
    <div className="App">
      <h1>LabelBlind Tweets Assignment</h1>
      <Container>
        <Row lg={3}>
          {tweetData.map((tweet) => {
            return (
              <Col className="d-flex">
                <div className="Card">
                  <Card style={{ width: "18rem" }}>
                    <Card.Img
                      variant="top"
                      src={
                        tweet.imageUrl
                          ? tweet.imageUrl
                          : "https://upload.wikimedia.org/wikipedia/commons/thumb/6/65/No-Image-Placeholder.svg/1200px-No-Image-Placeholder.svg.png"
                      }
                    />
                    <Card.Body>
                      <Card.Title>
                        <span className="text_fields"> Author: </span>{" "}
                        {tweet.author}
                      </Card.Title>
                      <Card.Text>
                        {" "}
                        <span className="text_fields">Tweet Text:</span>{" "}
                        {tweet.text}
                      </Card.Text>
                      <Card.Text>
                        {" "}
                        <span className="text_fields">Likes: </span>{" "}
                        {tweet.likes}
                      </Card.Text>
                      <Card.Text>
                        <span className="text_fields">Hashtags:</span>{" "}
                        {tweet.hashtags}
                      </Card.Text>
                      <Card.Text>
                        {" "}
                        <span className="text_fields">Replies:</span>{" "}
                        {tweet.replies}
                      </Card.Text>
                      <Button
                        variant="primary"
                        target="_blank"
                        href={tweet.url}
                      >
                        Go to Tweet
                      </Button>
                    </Card.Body>
                  </Card>
                </div>
              </Col>
            );
          })}
        </Row>
      </Container>
    </div>
  );
}

export default App;
