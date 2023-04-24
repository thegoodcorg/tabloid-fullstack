import React from "react";
import { Card, CardBody } from "reactstrap";


const Tag = ({ tag}) => {
  return (
    <Card >
      <CardBody>
          <p key={tag.id}>
            <strong>{tag.name}</strong>
          </p>
      </CardBody>
    </Card>
  );
};

export default Tag;