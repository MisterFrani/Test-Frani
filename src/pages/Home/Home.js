import React, { useState } from 'react';
import { Alert, Form, Col, Row } from '@themesberg/react-bootstrap';
import { getAvailable } from './../../data/resource';

export default () => {
  const [date, setDate] = useState(null);
  const [time, setTime] = useState(null);
  const [datetime, setDatetime] = useState(null);
  const [available, setAvailable] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const datetime = date + ' ' + time;
    setDatetime(datetime);
    const check = await getAvailable(datetime);
    setAvailable(check.available);
  };

  return (
    <>
      <div className="container m-auto col-8 mt-5">
        <h1 className="text-center">Check if the ressource is available</h1>
        <Form onSubmit={handleSubmit}>
          <Row className="mb-3">
            <Col md="6">
              <Form.Group>
                <Form.Control
                  type="date"
                  name="date"
                  onChange={(e) => setDate(e.target.value)}
                />
              </Form.Group>
            </Col>
            <Col md="6">
              <Form.Group>
                <Form.Control
                  type="time"
                  name="time"
                  onChange={(e) => setTime(e.target.value)}
                />
              </Form.Group>
            </Col>
          </Row>
          <button type="submit">Check availability</button>
          {available !== null && (
            <Alert variant={available ? 'primary' : 'danger'}>
              <>
                {available
                  ? 'The ressource is available on '
                  : 'The ressource is not available on'}{' '}
                {datetime}
              </>
            </Alert>
          )}
        </Form>
      </div>
    </>
  );
};
