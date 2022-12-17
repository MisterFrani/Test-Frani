import React, { useEffect, useState } from 'react';
import { Alert, Form, Col, Row, Container } from '@themesberg/react-bootstrap';
import { getAvailable } from './../../data/resource';
import logo from './../../assets/img/logo.png';

export default () => {
  const [date, setDate] = useState(null);
  const [time, setTime] = useState(null);
  const [result, setResult] = useState(null);
  const [timesOption, setTimesOption] = useState([]);

  useEffect(() => {
    getTimes();
  }, []);

  const getTimes = () => {
    const times = [];
    for (let i = 0; i <= 23; i++) {
      let hours = (i < 10 ? '0' + i : i).toString();
      times.push(`${hours}:00`);
      times.push(`${hours}:30`);
    }
    setTimesOption(times);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!date || !time) {
      setResult({
        isError: true,
        message: 'Please fill all fields',
      });
      return;
    }

    const datetime = date + ' ' + time;
    const id = 1337;
    const check = await getAvailable(id, datetime);

    if ('error' in check) {
      setResult({
        isError: true,
        message: check.error,
      });
    } else {
      setResult({
        isError: !check.available,
        message: check.available
          ? 'The ressource is available on ' + datetime
          : 'The ressource is not available on ' + datetime,
      });
    }
  };

  return (
    <Container>
      <div className="">
        <img width="250px" src={logo} />
      </div>
      <div className="mt-5 col-md-6 col-12 m-auto">
        <h3 className="text-center">Check if the ressource is available</h3>
        <Form onSubmit={handleSubmit} className="w-100 mt-5">
          <Row className="mb-3">
            <Col md="6 mb-2">
              <Form.Group>
                <Form.Control
                  type="date"
                  name="date"
                  onChange={(e) => setDate(e.target.value)}
                />
              </Form.Group>
            </Col>
            <Col md="6 mb-2">
              <Form.Group>
                <Form.Select
                  name="time"
                  onChange={(e) => setTime(e.target.value)}
                >
                  <option>--:--</option>
                  {timesOption.map((item) => (
                    <option value={item}>{item}</option>
                  ))}
                </Form.Select>
              </Form.Group>
            </Col>
          </Row>
          <div className="text-center mt-5">
            <button className="col-4" type="submit">
              Check availability
            </button>
          </div>

          {result !== null && (
            <Alert
              className="text-center mt-4"
              variant={!result.isError ? 'primary' : 'danger'}
            >
              <>{result.message}</>
            </Alert>
          )}
        </Form>
      </div>
    </Container>
  );
};
