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

const getCategoryValues = (category, expenses) => {
  let values = [];
  const days = getLastSevenDays();

  if (category) {
    expenses.forEach(expense => {
      days.forEach((day, index) => {
        if (isNaN(values[index])) {
          values[index] = 0;
        }

        if (expense.category === category.id && belongsToDate(expense, day)) {
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

        if (!expense.category && belongsToDate(expense, day)) {
          values[index] += expense.value;
        }
      });
    });
  }

  return values;
};

export const getDatasets = (categories, expenses) => {
  let datasets = [];
  const data = {};

  categories.forEach(category => {
    const categoryValues = getCategoryValues(category, expenses);
    data[category.name] = categoryValues;
  });

  categories.forEach(category => {
    const rgb = convertHexToRgb(category.color);

    const categoryColor = `rgba(${rgb}, .5)`;
    const hoverCategoryColor = `rgba(${rgb}, .7)`;

    datasets.push({
      label: category.name,
      backgroundColor: categoryColor,
      borderColor: categoryColor,
      borderWidth: 3,
      hoverBackgroundColor: hoverCategoryColor,
      hoverBorderColor: hoverCategoryColor,
      data: data[category.name]
    });
  });

  // Push 'not defined' category.
  const noCategoryDefinedValues = getCategoryValues(null, expenses);

  const categoryColor = 'rgba(136, 136, 136, .5)';
  const hoverCategoryColor = 'rgba(136, 136, 136, .7)';

  datasets.push({
    label: 'Not specified',
    backgroundColor: categoryColor,
    borderColor: categoryColor,
    borderWidth: 3,
    hoverBackgroundColor: hoverCategoryColor,
    hoverBorderColor: hoverCategoryColor,
    data: noCategoryDefinedValues
  });

  return datasets;
};

export const getChartOptions = () => {
  return {
    maintainAspectRatio: false,
    scales: {
      xAxes: [
        {
          stacked: true,
          barPercentage: 0.8,
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
};

export const getLastSevenDays = () => {
  const days = [];

  for (let i = 0; i < 7; i++) {
    const newDate = moment().subtract(i, 'days');
    days.push(newDate);
  }
  return days;
};
