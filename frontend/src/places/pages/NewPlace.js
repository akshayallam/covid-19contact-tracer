import React, { useContext } from 'react';
import { useHistory } from 'react-router-dom';

import Input from '../../shared/components/FormElements/Input';
import Button from '../../shared/components/FormElements/Button';
import ErrorModal from '../../shared/components/UIElements/ErrorModal';
import LoadingSpinner from '../../shared/components/UIElements/LoadingSpinner';
import {
  VALIDATOR_REQUIRE,
  VALIDATOR_MINLENGTH
} from '../../shared/util/validators';
import { useForm } from '../../shared/hooks/form-hook';
import {useHttpClient} from '../../shared/hooks/http-hook';
import { AuthContext } from '../../shared/context/auth-context';
import './PlaceForm.css';

const NewPlace = () => {
  const auth = useContext(AuthContext);
  const { isLoading, error, sendRequest, clearError } = useHttpClient();

  const [formState, inputHandler] = useForm({
      title: {
        value: '',
        isValid: false
      },
      date: {
        value: '',
        isValid: false
      },
      description: {
        value: '',
        isValid: false
      },
      people: {
        value: '',
        isValid: false
      },
      location: {
        value: '',
        isValid: false
      }
    }, false
  );

  const history = useHistory();

  const placeSubmitHandler = async event => {
    event.preventDefault();
    try {
      const formData = new FormData();
      formData.append('title', formState.inputs.title.value);
      formData.append('description', formState.inputs.description.value);
      formData.append('date', formState.inputs.date.value);
      formData.append('people', formState.inputs.people.value);
      formData.append('location', formState.inputs.people.value)
      await sendRequest(process.env.REACT_APP_BACKEND_URL + '/places', 
        'POST',
        JSON.stringify({
          title: formState.inputs.title.value,
          description: formState.inputs.description.value,
          date: formState.inputs.date.value,
          people: formState.inputs.people.value,
          location: formState.inputs.location.value,
        }), 
        { 'Content-Type': 'application/json', Authorization: 'Bearer ' + auth.token}
      );
      history.push('/' + auth.userId + '/places');
    } catch (err) {
    }
  };

  return (
    <React.Fragment>
      <ErrorModal error={error} onClear={clearError}></ErrorModal>
      <form className="place-form" onSubmit={placeSubmitHandler}>
        {isLoading && <LoadingSpinner asOverlay />}
        <Input
          id="title"
          element="input"
          type="text"
          label="Title"
          validators={[VALIDATOR_REQUIRE()]}
          errorText="Please enter a valid title."
          onInput={inputHandler}
        />
        <Input
          id="description"
          element="textarea"
          label="Description"
          validators={[VALIDATOR_MINLENGTH(5)]}
          errorText="Please enter a valid description (at least 5 characters)."
          onInput={inputHandler}
        />
        <Input
          id="date"
          element="input"
          type="text"
          label="Date"
          validators={[VALIDATOR_REQUIRE()]}
          errorText="Please enter a valid date."
          onInput={inputHandler}
        />
        <Input
          id="people"
          element="input"
          type="text"
          label="People"
          validators={[VALIDATOR_REQUIRE()]}
          errorText="Please enter the people's names, or None."
          onInput={inputHandler}
        />
        <Input
          id="location"
          element="input"
          type="text"
          label="Location"
          validators={[VALIDATOR_REQUIRE()]}
          errorText="Please enter a valid location."
          onInput={inputHandler}
        />
        <Button type="submit" disabled={!formState.isValid}>
          ADD EVENT
        </Button>
      </form>
    </React.Fragment>
  );
};

export default NewPlace;