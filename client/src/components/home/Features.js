import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import './Features.css';

import wallet from '../../images/wallet.svg';
import graph from '../../images/graph.svg';
import plan from '../../images/plan.svg';

const Features = () => {
  const user = useSelector(state => state.user);
  const { isAuthenticated } = user;

  return (
    <section id="features">
      <section className="feature">
        <img data-aos="fade-right" src={wallet} alt="Wallet Illustration" className="illustration" />

        <div data-aos="fade-left" className="text">
          <h3 className="title">Never lose track of your expenses again.</h3>
          <p className="description">
            With TopBudget, you can easily track every penny you spend and avoid unexpected surprises.
          </p>
        </div>
      </section>

      <section className="feature">
        <div data-aos="fade-right" className="text">
          <h3 className="title">Easily visualize your budget and spendings.</h3>

          <p className="description">
            If you choose us, you get access to essential tools that can help you understand exactly how you spend your
            money.
          </p>
        </div>

        <img data-aos="fade-left" src={graph} alt="Graph Illustration" className="illustration" />
      </section>

      <section className="feature">
        <img data-aos="fade-right" src={plan} alt="Plan Illustration" className="illustration" />

        <div data-aos="fade-left" className="text">
          <h3 className="title">Save money.</h3>

          <p className="description">
            Our service is completely <span className="bold">free</span>. You can get started right now. Just make an
            account and you're good to go!
          </p>

          {isAuthenticated ? (
            <Link to="dashboard" id="features-cta">
              Dashboard
            </Link>
          ) : (
            <Link to="signup" id="features-cta">
              Get Started
            </Link>
          )}
        </div>
      </section>
    </section>
  );
};

export default Features;
