import React from 'react';
import { Bar } from 'react-chartjs-2';
import '../../../css/Chart.css';

import { getDatasets, getChartOptions, getLastSevenDays } from '../../../utils/chart';

const chartOptions = getChartOptions();

const Chart = props => {
  const { userdata } = props;
  const { categories, locations, sources, expenses } = props.expenses;

  let fields, fieldType;
  
  if (userdata.showCategories) {
    fields = categories;
    fieldType = 'category';
  } else if (userdata.showLocations) {
    fields = locations;
    fieldType = 'location';
  } else {
    fields = sources;
    fieldType = 'source';
  }

  const datasets = getDatasets(fields, fieldType, expenses);
  const labels = getLastSevenDays().map(day => day.format('dddd'));

  let chartData = {
    datasets,
    labels: labels
  };

  return (
    <section id="expense-chart">
      <Bar data={chartData} options={chartOptions} height={450} />
    </section>
  );
};

export default Chart;
