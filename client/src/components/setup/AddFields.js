import React from 'react';
import { connect } from 'react-redux';
import { Redirect, useParams } from 'react-router-dom';
import TITLES from '../../constants/addFieldsTitles';
import EXAMPLES from '../../constants/fieldExamples';
import './AddFields.css';

import FieldForm from '../general/FieldForm';
import Field from '../general/Field';

import { addCategory } from '../../store/actions/categories';
import { addLocation } from '../../store/actions/locations';
import { addSource } from '../../store/actions/sources';

const AddFields = props => {
  const { fieldType } = useParams();
  const pathMatchesFields = fieldType === 'categories' || fieldType === 'locations' || fieldType === 'sources';

  const handleAddField = field => {
    switch (fieldType) {
      case 'categories':
        props.addCategory(field);
        break;
      case 'locations':
        props.addCategory(field);
        break;
      case 'sources':
        props.addCategory(field);
        break;
      default:
        break;
    }
  };

  const fieldsList = props[fieldType]
    ? props[fieldType].map(object => (
        <Field type={object.name} object={object} handleFieldClick={() => {}} key={`${object.name}-${object.id}`} />
      ))
    : null;

  if (!pathMatchesFields) return <Redirect to="/setup" />;
  return (
    <section id="add-fields">
      <h2 className="sub-title">{TITLES[fieldType.toUpperCase()]}</h2>
      <p className="field-examples">Examples: {EXAMPLES[fieldType.toUpperCase()]}, etc.</p>

      <FieldForm type={fieldType} handleSubmit={newField => handleAddField(newField)} closeOverlay={() => {}} />

      <ul id="fields-list">{fieldsList}</ul>
    </section>
  );
};

const mapStateToProps = state => ({
  categories: state.categories,
  locations: state.locations,
  sources: state.sources
});

const mapDispatchToProps = {
  addCategory,
  addLocation,
  addSource
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AddFields);
