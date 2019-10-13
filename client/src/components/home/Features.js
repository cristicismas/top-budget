import React from 'react';
import { Link } from 'react-router-dom';
import './Features.css';

import wallet from '../../images/wallet.svg';
import graph from '../../images/graph.svg';
import plan from '../../images/plan.svg';

const Features = () => {
  return (
    <section id="features">
      <section className="feature">
        <img data-aos="fade-right" src={wallet} alt="Wallet Illustration" className="illustration" />

        <div data-aos="fade-left" className="text">
          <h3 className="title">Never lose track of your expenses again.</h3>
          <p className="description">
            With TopBudget, you can easily track every penny you spend and avoid unpleasent surprises.
          </p>
        </div>
      </section>

      <section className="feature">
        <div data-aos="fade-right" className="text">
          <h3 className="title">Easily visualize your budget and spendings.</h3>

          <p className="description">
            If you choose us, you get access to essential graphs that can help you understand exactly how you spend your
            money.
          </p>
        </div>

        <img data-aos="fade-left" src={graph} alt="Wallet Illustration" className="illustration" />
      </section>

      <section className="feature">
        <img data-aos="fade-right" src={plan} alt="Wallet Illustration" className="illustration" />

        <div data-aos="fade-left" className="text">
          <h3 className="title">Save money.</h3>

          <p className="description">
            Our service is completely <span className="bold">free</span>. You can get started right now. Just make an
            account and you're good to go!
          </p>

          <Link to="signup" id="get-started-btn">
            Get Started
          </Link>
        </div>
      </section>
    </section>
  );
};

export default Features;
