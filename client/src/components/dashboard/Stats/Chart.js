import React from 'react';
import { Bar } from 'react-chartjs-2';
import '../../../css/Chart.css';

import { getDatasets, getChartOptions, getLastSevenDays } from '../../../utils/chart';

const chartOptions = getChartOptions();

const Chart = props => {
  const { categories, expenses } = props.expenses;
  const datasets = getDatasets(categories, expenses);
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
