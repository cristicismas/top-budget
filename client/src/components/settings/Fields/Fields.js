import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { Route } from 'react-router-dom';
import './Fields.css';

import { addCategory, editCategory } from '../../../store/actions/categories';
import { addLocation, editLocation } from '../../../store/actions/locations';
import { addSource, editSource } from '../../../store/actions/sources';

import Toggle from './Toggle';
import FieldsRemoveGroup from './FieldsRemoveGroup';
import Overlay from '../../general/Overlay';
import FieldForm from '../../general/FieldForm';
import ConfirmDeleteModal from './ConfirmDeleteModal';

export class Fields extends Component {
  constructor(props) {
    super(props);

    this.state = {
      categories: [],
      locations: [],
      sources: [],
      fieldToAdd: null,
      fieldToEdit: null
    };
  }

  handleFieldClick = (type, object) => {
    const fields = document.getElementById(`${type}-${object.id}`);

    if (fields.classList.contains('selected')) {
      const currentStateArray = [...this.state[type]];
      const indexToRemove = currentStateArray.indexOf(object.id);

      currentStateArray.splice(indexToRemove, 1);

      this.setState({ [type]: currentStateArray });
    } else {
      this.setState({ [type]: [...this.state[type], object.id] });
    }

    fields.classList.toggle('selected');
  };

  handleEditFieldButton = (type, object) => {
    const { history } = this.props;

    this.setState(
      {
        fieldToEdit: {
          type,
          object
        }
      },
      () => {
        history.push('/settings/edit-field');
      }
    );
  };

  handleEditField = field => {
    switch (field.type) {
      case 'categories':
        this.props.editCategory(field);
        break;
      case 'locations':
        this.props.editLocation(field);
        break;
      case 'sources':
        this.props.editSource(field);
        break;
      default:
        break;
    }
  };

  handleAddFieldButton = fieldToAdd => {
    const { history } = this.props;

    this.setState(
      {
        fieldToAdd
      },
      () => {
        history.push('/settings/add-field');
      }
    );
  };

  handleAddField = field => {
    switch (field.type) {
      case 'category':
        this.props.addCategory(field);
        break;
      case 'location':
        this.props.addLocation(field);
        break;
      case 'source':
        this.props.addSource(field);
        break;
      default:
        break;
    }
  };

  handleDelete = () => {
    const { categories, locations, sources } = this.state;
    const { history } = this.props;

    categories.forEach(id => this.props.deleteCategory(id));
    locations.forEach(id => this.props.deleteLocation(id));
    sources.forEach(id => this.props.deleteSource(id));

    this.setState(
      {
        categories: [],
        locations: [],
        sources: []
      },
      () => {
        history.goBack();
      }
    );
  };

  render() {
    const { fieldToAdd, fieldToEdit } = this.state;
    const { history, categories, locations, sources, showCategories, showLocations, showSources } = this.props;

    const buttonEnabled = this.state.categories.length || this.state.locations.length || this.state.sources.length;

    return (
      <section id="fields">
        <h2 className="sub-title">Fields</h2>

        <div className={`field-header ${showCategories ? '' : 'disabled'}`}>
          <button type="button" className="add-field-button" onClick={() => this.handleAddFieldButton('category')}>
            +
          </button>
          <h2 className="field-title">Categories</h2>
          <Toggle handleChange={() => this.props.toggleField('showCategories')} toggled={showCategories} />
        </div>

        {categories.length > 0 && (
          <FieldsRemoveGroup
            objects={categories}
            type="categories"
            dim={!showCategories}
            handleFieldClick={this.handleFieldClick}
            handleEditFieldButton={this.handleEditFieldButton}
          />
        )}

        <div className={`field-header ${showLocations ? '' : 'disabled'}`}>
          <button type="button" className="add-field-button" onClick={() => this.handleAddFieldButton('location')}>
            +
          </button>
          <h2 className="field-title">Locations</h2>
          <Toggle handleChange={() => this.props.toggleField('showLocations')} toggled={showLocations} />
        </div>

        {locations.length > 0 && (
          <FieldsRemoveGroup
            objects={locations}
            type="locations"
            dim={!showLocations}
            handleFieldClick={this.handleFieldClick}
            handleEditFieldButton={this.handleEditFieldButton}
          />
        )}

        <div className={`field-header ${showSources ? '' : 'disabled'}`}>
          <button type="button" className="add-field-button" onClick={() => this.handleAddFieldButton('source')}>
            +
          </button>
          <h2 className="field-title">Sources</h2>
          <Toggle handleChange={() => this.props.toggleField('showSources')} toggled={showSources} />
        </div>

        {sources.length > 0 && (
          <FieldsRemoveGroup
            objects={sources}
            type="sources"
            dim={!showSources}
            handleFieldClick={this.handleFieldClick}
            handleEditFieldButton={this.handleEditFieldButton}
          />
        )}

        <button
          onClick={() => history.push('/settings/confirm-delete')}
          id="delete-fields-btn"
          className={buttonEnabled ? '' : 'disabled'}>
          Delete Selected
        </button>

        <Route path="/settings/confirm-delete">
          <Overlay closeOverlay={history.goBack}>
            <ConfirmDeleteModal closeOverlay={history.goBack} handleDelete={() => this.handleDelete()} />
          </Overlay>
        </Route>

        <Route path="/settings/add-field">
          <Overlay closeOverlay={history.goBack}>
            <FieldForm type={fieldToAdd} handleSubmit={this.handleAddField} closeOverlay={history.goBack} />
          </Overlay>
        </Route>

        <Route path="/settings/edit-field">
          <Overlay closeOverlay={history.goBack}>
            <FieldForm
              type={fieldToEdit ? fieldToEdit.type : null}
              field={fieldToEdit ? fieldToEdit.object : null}
              handleSubmit={this.handleEditField}
              closeOverlay={history.goBack}
            />
          </Overlay>
        </Route>
      </section>
    );
  }
}

export default connect(
  null,
  {
    addCategory,
    addLocation,
    addSource,
    editCategory,
    editLocation,
    editSource
  }
)(withRouter(Fields));
