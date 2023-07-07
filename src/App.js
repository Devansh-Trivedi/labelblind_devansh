import "./App.css";
import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import DateFilter from "./DateFilter";
import { DatePicker, Space } from "antd";
import moment from "moment";

const tweetsApiData = "http://www.mocky.io/v2/5d1ef97d310000552febe99d";
const { RangePicker } = DatePicker;

function App() {
  const [tweetData, setTweetData] = useState([]);

  // fetching data from the url above
  const getTweetsDataWithFetch = async () => {
    const response = await fetch(tweetsApiData);
    const jsonData = await response.json();
    setTweetData(jsonData);
  };

  useEffect(() => {
    getTweetsDataWithFetch();
  }, []);

  const dateChange = (value) => {

    let start_date = moment(value[0].$d).format("DD/MM/YYYY");
    let end_date = moment(value[1].$d).format("DD/MM/YYYY")

    let filterArray = [];

    for (let i = 0; i < tweetData.length; i++) {
      console.log(tweetData[i]);
    }
  };

  return (
    <div className="App">
      <h1>LabelBlind Tweets Assignment</h1>
      <Space direction="vertical" size={12}>
        <RangePicker onChange={dateChange} />
      </Space>
      <Container>
        <Row lg={3}>
          {tweetData.map((tweet) => {
            return (
              <Col className="d-flex">
                <div className="CardDiv">
                  <Card style={{ width: "18rem" }}>
                    <Card.Img
                      className="CardImg"
                      variant="top"
                      src={
                        tweet.imageUrl
                          ? tweet.imageUrl
                          : "https://upload.wikimedia.org/wikipedia/commons/thumb/6/65/No-Image-Placeholder.svg/1200px-No-Image-Placeholder.svg.png"
                      }
                    />
                    <Card.Body className="CardBody">
                      <Card.Title>
                        <span className="text_fields"> Author: </span>{" "}
                        {tweet.author ? tweet.author : "--"}
                      </Card.Title>
                      <Card.Text>
                        {" "}
                        <span className="text_fields">Tweet Text:</span>{" "}
                        {tweet.text ? tweet.text : "--"}
                      </Card.Text>
                      <Card.Text>
                        {" "}
                        <span className="text_fields">Likes: </span>{" "}
                        {tweet.likes ? tweet.likes : "--"}
                      </Card.Text>
                      <Card.Text>
                        <span className="text_fields">Hashtags:</span>{" "}
                        {tweet.hashtags ? tweet.hashtags : "--"}
                      </Card.Text>
                      <Card.Text>
                        {" "}
                        <span className="text_fields">Replies:</span>{" "}
                        {tweet.replies ? tweet.replies : "--"}
                      </Card.Text>
                      <Card.Text>
                        {" "}
                        <span className="text_fields">Date Published:</span>{" "}
                        {tweet.publishedDate ? moment(tweet.publishedDate).format('DD/MM/YYYY') : "--"}
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
