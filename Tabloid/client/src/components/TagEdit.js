import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Button, Form, FormGroup, Label, Input, FormText } from 'reactstrap';
import { updateTag } from '../modules/tagManager';


const TagEdit = ({ getTags }) => {
  const tagToEdit = {
    name: '',
  };

  const [tag, setTag] = useState(tagToEdit);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    getTag(id).then(setTag);
  }, []);

  if (!tag) {
    return null;
  }

  const handleInputChange = (evt) => {
    const value = evt.target.value;
    const key = evt.target.id;

    const tagCopy = { ...tag };

    tagCopy[key] = value;
    setTag(tagCopy);
  };

  const handleSave = (evt) => {
    evt.preventDefault();

    updateTag(tag).then((p) => {
        // Navigate the user back to the home route
        navigate("/tag");
    });
  };

  return (
    <Form>
      <FormGroup>
        <Label for="name">Name</Label>
        <textarea type="text" name="name" id="name" placeholder="Tag Name"
          value={tag.name}
          onChange={handleInputChange} />
      </FormGroup>
      <Button className="btn btn-primary" onClick={handleSave}>Save</Button>
    </Form>
  );
};

export default TagEdit;
