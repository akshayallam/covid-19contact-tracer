import React, { useState, useContext } from 'react';
import Button from '../../shared/components/FormElements/Button';
import Modal from '../../shared/components/UIElements/Modal';
import ErrorModal from '../../shared/components/UIElements/ErrorModal';
import LoadingSpinner from '../../shared/components/UIElements/LoadingSpinner';
import { AuthContext } from '../../shared/context/auth-context';
import {useHttpClient} from '../../shared/hooks/http-hook';
import './PlaceItem.css';

const PlaceItem = props => {
  const auth = useContext(AuthContext);
  const { isLoading, error, sendRequest, clearError } = useHttpClient();
  const [showConfirmModal, setShowConfirmModal] = useState(false);

  const showDeleteWarningHandler = () => {
    setShowConfirmModal(true);
  }

  const cancelDeleteHandler = () => {
    setShowConfirmModal(false);
  }

  const confirmDeleteHandler = async () => {
    setShowConfirmModal(false);
    try {
      await sendRequest(`${process.env.REACT_APP_BACKEND_URL}/places/${props.id}`,
      'DELETE', null, { Authorization: 'Bearer ' + auth.token}
      );
      props.onDelete(props.id);
    } catch (err) {
    }
  }

  return (
    <React.Fragment>
      <ErrorModal error={error} onClear={clearError}></ErrorModal>
      <Modal 
      show={showConfirmModal}
      onCancel={cancelDeleteHandler}
      header="Are you sure?" 
      footerClass="place-item__modal-actions"
      footer={
        <React.Fragment>
          <Button inverse onClick={cancelDeleteHandler}>CANCEL</Button>
          <Button danger onClick={confirmDeleteHandler}>DELETE</Button>
        </React.Fragment>
      }
      >
        <p>Do you want to proceed and delete this place? Please note that it cannot be undone after.</p>
      </Modal>
      <div className="timeline-item">
        {isLoading && <LoadingSpinner asOverlay></LoadingSpinner>}
        <div className="timeline-date">
          <img src={require('../../images/mask.png')} alt=""/>
          <div>{props.date}</div>
        </div>
        <div className="timeline-content">
          <h2>{props.title} <span>({props.location})</span></h2>
          <p>People: <br></br>{props.people}</p>
          <p>Description: <br></br>{props.description}</p>
          {auth.userId === props.creatorId && <Button to={`/places/${props.id}`}>EDIT</Button> }
          {auth.userId === props.creatorId && <Button danger onClick={showDeleteWarningHandler}>DELETE</Button> }
        </div>
      </div>
    </React.Fragment>
  );
};

export default PlaceItem;
