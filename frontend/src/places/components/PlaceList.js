import React from 'react';

import Card from '../../shared/components/UIElements/Card';
import PlaceItem from './PlaceItem';
import Button from '../../shared/components/FormElements/Button';
import './PlaceList.css';

const PlaceList = props => {
  if (props.items.length === 0) {
    return (
      <div className="place-list center">
        <Card>
          <h2>No events found. Maybe create one?</h2>
          <Button to="/places/new">Create Event</Button>
        </Card>
      </div>
    );
  }

  return (
    <div className="timeline">
      {props.items.reverse().map(place => (
        <PlaceItem
          key={place.id}
          id={place.id}
          title={place.title}
          date={place.date}
          description={place.description}
          people={place.people}
          location={place.location}
          creatorId={place.creator}
          onDelete={props.onDeletePlace}
        />
      ))}
    </div>
  );
};

export default PlaceList;
