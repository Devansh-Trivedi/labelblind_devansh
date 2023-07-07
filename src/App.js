import "./App.css";
import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import LikeButton from "./LikeButton";
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

  const dateChange = async (value, dateString) => {
    let start_date = dateString[0];
    let end_date = dateString[1];

    const response = await fetch(tweetsApiData);
    const entireTweetData = await response.json();

    // start_date = moment().format(start_date, "YYYY-MM-DD");
    // end_date = moment().format(end_date, "YYYY-MM-DD");

    console.log("start_date: " + start_date);
    console.log("end_date: " + end_date);
    // console.log(moment('2019-06-15').isBetween(start_date, end_date));

    let filterArray = [];
    for (let i = 0; i < entireTweetData.length; i++) {
      let curr_date = moment(entireTweetData[i].publishedDate).format(
        "YYYY-MM-DD"
      );
      if (moment(curr_date).isBetween(start_date, end_date)) {
        console.log(curr_date);
        filterArray.push(entireTweetData[i]);
      }
    }
    console.log(filterArray);
    setTweetData(filterArray);
  };

  return (
    <div className="App">
      <h1>LabelBlind Tweets Assignment</h1>
      <Space direction="vertical" size={12}>
        <RangePicker
          defaultValue={[
            moment("2010-01-01", "YYYY-MM-DD"),
            moment("2019-12-31", "YYYY-MM-DD"),
          ]}
          format={"YYYY-MM-DD"}
          onChange={dateChange}
        />
      </Space>
      <Container>
        
        <Row lg={3}>
          
          {tweetData.map((tweet) => {
            return (
              
              <Col className="d-flex" key={tweet._id}>
                
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
                        {tweet.text
                          ? tweet.text.substring(0, 80) + " ..."
                          : "--"}
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
                        <span className="text_fields">
                          Date Published:
                        </span>{" "}
                        {tweet.publishedDate
                          ? moment(tweet.publishedDate).format("YYYY-MM-DD")
                          : "--"}
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
