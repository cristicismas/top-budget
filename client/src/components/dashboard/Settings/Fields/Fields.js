import React, { Component } from 'react';
import './Fields.css';

import Toggle from './Toggle';
import OptionsRemoveGroup from './OptionsRemoveGroup';
import Overlay from '../../../general/Overlay';
import ConfirmDeleteModal from './ConfirmDeleteModal';

export class Fields extends Component {
  constructor(props) {
    super(props);

    this.state = {
      categories: [],
      locations: [],
      sources: [],
      showConfirmDeleteOverlay: false
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
    const { showConfirmDeleteOverlay } = this.state;
    const { categories, locations, sources, showCategories, showLocations, showSources } = this.props;

    const buttonEnabled = this.state.categories.length || this.state.locations.length || this.state.sources.length;

    return (
      <div id="fields" className="settings-group">
        <h2 className="sub-title">Remove or Disable Fields</h2>

        <div className="field-header">
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
      </div>
    );
  }
}

export default Fields;
