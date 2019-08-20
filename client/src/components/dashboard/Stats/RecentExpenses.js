import React from 'react';

const RecentExpenses = () => {
  return (
    <section id="recent-expenses">
      <div className="expense-day">
        <div className="day-info flex-group">
          <h3 className="expense-day">Today</h3>
          <h4 className="day-price">$56</h4>
        </div>

        <div className="expense-info flex-group">
          <div className="expense-date">12:54 am</div>

          <div className="expense-category flex-group">
            <div className="expense-color" />
            Groceries
          </div>
        </div>

        <div className="expense-details flex-group">
          <div className="details-left flex-group">
            <div className="expense-location flex-group">
              <div className="expense-color" />
              Target
            </div>
            /
            <div className="expense-source flex-group">
              <div className="expense-color" />
              Work Card
            </div>
          </div>

          <div className="details-right flex-group">
            <div className="expense-ammount">$23</div>
            <div className="expense-delete">✕</div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default RecentExpenses;
