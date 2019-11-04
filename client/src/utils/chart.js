import moment from 'moment';

const convertHexToRgb = hex => {
  let result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);

  const r = parseInt(result[1], 16);
  const g = parseInt(result[2], 16);
  const b = parseInt(result[3], 16);

  return `${r}, ${g}, ${b}`;
};

const belongsToDate = (expense, date) => {
  const expenseDate = moment(expense.date);

  if (moment(date).isSame(expenseDate, 'day')) {
    return true;
  }
};

const getFieldValues = (field, fieldType, expenses) => {
  let values = [];
  const days = getLastSevenDays();

  if (field) {
    expenses.forEach(expense => {
      days.forEach((day, index) => {
        if (isNaN(values[index])) {
          values[index] = 0;
        }

        if (expense[fieldType] === field.id && belongsToDate(expense, day)) {
          values[index] += expense.value;
        }
      });
    });
  } else {
    expenses.forEach(expense => {
      days.forEach((day, index) => {
        if (isNaN(values[index])) {
          values[index] = 0;
        }

        if (!expense[fieldType] && belongsToDate(expense, day)) {
          values[index] += expense.value;
        }
      });
    });
  }

  return values;
};

export const getDatasets = (fields, fieldType, expenses) => {
  let datasets = [];
  const data = {};

  fields.forEach(field => {
    const fieldValues = getFieldValues(field, fieldType, expenses);
    data[field.name] = fieldValues;
  });

  fields.forEach(field => {
    const rgb = convertHexToRgb(field.color);

    const fieldColor = `rgba(${rgb}, .5)`;
    const hoverFieldColor = `rgba(${rgb}, .7)`;

    datasets.push({
      label: field.name,
      backgroundColor: fieldColor,
      borderColor: fieldColor,
      borderWidth: 3,
      hoverBackgroundColor: hoverFieldColor,
      hoverBorderColor: hoverFieldColor,
      data: data[field.name]
    });
  });

  // Push 'not defined' field.
  const noFieldDefinedValues = getFieldValues(null, fieldType, expenses);

  const fieldColor = 'rgba(136, 136, 136, .5)';
  const hoverFieldColor = 'rgba(136, 136, 136, .7)';

  datasets.push({
    label: 'Not specified',
    backgroundColor: fieldColor,
    borderColor: fieldColor,
    borderWidth: 3,
    hoverBackgroundColor: hoverFieldColor,
    hoverBorderColor: hoverFieldColor,
    data: noFieldDefinedValues
  });

  return datasets;
};

export const getChartOptions = disableAnimations => {
  const defaultChartOptions = {
    maintainAspectRatio: false,
    legend: {
      labels: {
        filter: (currentLabel, chartData) => {
          const { datasets } = chartData;
          const { datasetIndex } = currentLabel;

          let shouldDisplayLabel = false;

          for (let value of datasets[datasetIndex].data) {
            if (value > 0) {
              shouldDisplayLabel = true;
              break;
            }
          }

          return shouldDisplayLabel;
        }
      }
    },
    scales: {
      xAxes: [
        {
          stacked: true,
          gridLines: {
            color: 'rgba(100, 100, 100, .2)'
          }
        }
      ],
      yAxes: [
        {
          stacked: true,
          gridLines: {
            color: 'rgba(100, 100, 100, .2)'
          }
        }
      ]
    }
  };

  if (disableAnimations) {
    return {
      ...defaultChartOptions,
      animation: {
        duration: 0
      },
      hover: {
        animationDuration: 0
      },
      responsiveAnimationDuration: 0
    };
  } else return defaultChartOptions;
};

export const getLastSevenDays = () => {
  const days = [];

  for (let i = 0; i < 7; i++) {
    const newDate = moment().subtract(i, 'days');
    days.push(newDate);
  }

  return days;
};
