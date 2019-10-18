import React, { Component } from 'react';
import { connect } from 'react-redux';
import './Fields.css';

import { addCategory } from '../../../store/actions/categories';
import { addLocation } from '../../../store/actions/locations';
import { addSource } from '../../../store/actions/sources';

import Toggle from './Toggle';
import OptionsRemoveGroup from './OptionsRemoveGroup';
import Overlay from '../../general/Overlay';
import AddFieldModal from './AddFieldModal';
import ConfirmDeleteModal from './ConfirmDeleteModal';

export class Fields extends Component {
  constructor(props) {
    super(props);

    this.state = {
      categories: [],
      locations: [],
      sources: [],
      fieldToAdd: {
        type: '',
        label: ''
      },
      showConfirmDeleteOverlay: false,
      showAddFieldOverlay: false
    };
  }

  handleOptionClick = (type, object) => {
    const options = document.getElementById(`${type}-${object.id}`);

    if (options.classList.contains('selected')) {
      const currentStateArray = [...this.state[type]];
      const indexToRemove = currentStateArray.indexOf(object.id);

      currentStateArray.splice(indexToRemove, 1);

      this.setState({ [type]: currentStateArray });
    } else {
      this.setState({ [type]: [...this.state[type], object.id] });
    }

    options.classList.toggle('selected');
  };

  handleAddFieldButton = (type, label) => {
    this.setState({
      fieldToAdd: { type, label },
      showAddFieldOverlay: true
    });
  };

  handleAddField = (type, name, color) => {
    switch (type) {
      case 'category':
        this.props.addCategory({ name, color });
        break;
      case 'location':
        this.props.addLocation({ name, color });
        break;
      case 'source':
        this.props.addSource({ name, color });
        break;
      default:
        break;
    }
  };

  handleDelete = () => {
    const { categories, locations, sources } = this.state;

    categories.forEach(id => this.props.deleteCategory(id));
    locations.forEach(id => this.props.deleteLocation(id));
    sources.forEach(id => this.props.deleteSource(id));

    this.setState({
      categories: [],
      locations: [],
      sources: [],
      showConfirmDeleteOverlay: false
    });
  };

  render() {
    const { showConfirmDeleteOverlay, showAddFieldOverlay, fieldToAdd } = this.state;
    const { categories, locations, sources, showCategories, showLocations, showSources } = this.props;

    const buttonEnabled = this.state.categories.length || this.state.locations.length || this.state.sources.length;

    return (
      <div id="fields" className="settings-group">
        <h2 className="sub-title">Remove or Disable Fields</h2>

        <div className="field-header">
          <button
            type="button"
            className="add-option-button"
            onClick={() => this.handleAddFieldButton('category', 'Category')}>
            +
          </button>
          <h2 className="field-title">Categories</h2>
          <Toggle handleChange={() => this.props.toggleField('showCategories')} toggled={showCategories} />
        </div>

        <OptionsRemoveGroup
          objects={categories}
          type="categories"
          dim={!showCategories}
          handleOptionClick={(type, object) => this.handleOptionClick(type, object)}
        />

        <div className="field-header">
          <button
            type="button"
            className="add-option-button"
            onClick={() => this.handleAddFieldButton('location', 'Location')}>
            +
          </button>
          <h2 className="field-title">Locations</h2>
          <Toggle handleChange={() => this.props.toggleField('showLocations')} toggled={showLocations} />
        </div>

        <OptionsRemoveGroup
          objects={locations}
          type="locations"
          dim={!showLocations}
          handleOptionClick={(type, object) => this.handleOptionClick(type, object)}
        />

        <div className="field-header">
          <button
            type="button"
            className="add-option-button"
            onClick={() => this.handleAddFieldButton('source', 'Source')}>
            +
          </button>
          <h2 className="field-title">Sources</h2>
          <Toggle handleChange={() => this.props.toggleField('showSources')} toggled={showSources} />
        </div>

        <OptionsRemoveGroup
          objects={sources}
          type="sources"
          dim={!showSources}
          handleOptionClick={(type, object) => this.handleOptionClick(type, object)}
        />

        <button
          onClick={() => this.setState({ showConfirmDeleteOverlay: true })}
          id="delete-options-btn"
          className={buttonEnabled ? '' : 'disabled'}>
          Delete Selected
        </button>

        {showConfirmDeleteOverlay && (
          <Overlay closeOverlay={() => this.setState({ showConfirmDeleteOverlay: false })}>
            <ConfirmDeleteModal handleDelete={() => this.handleDelete()} />
          </Overlay>
        )}

        {showAddFieldOverlay ? (
          <Overlay closeOverlay={() => this.setState({ showAddFieldOverlay: false })}>
            <AddFieldModal
              type={fieldToAdd.type}
              label={fieldToAdd.label}
              handleAddField={(type, name, color) => this.handleAddField(type, name, color)}
              closeOverlay={() => this.setState({ showAddFieldOverlay: false })}
            />
          </Overlay>
        ) : null}
      </div>
    );
  }
}

export default connect(
  null,
  {
    addCategory,
    addLocation,
    addSource
  }
)(Fields);
