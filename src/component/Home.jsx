import React, { useState } from "react";

const Home = ({ storeData, token }) => {
  const [user, setUser] = useState({
    age: "",
    height: "",
    income: "",
  });

  const { age, height, income } = user;
  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };
  console.log(token);
  return (
    <main id="home">
      <div className="medium-container">
        <form onSubmit={(e) => storeData(e, user)}>
          <h2>Set your Data</h2>
          <div className="form-group">
            <label htmlFor="age">Age</label>
            <input type="number" id="age" onChange={handleChange} value={age} name="age" />
          </div>
          <div className="form-group">
            <label htmlFor="height">Height(inch)</label>
            <input type="number" id="height" onChange={handleChange} value={height} name="height" />
          </div>
          <div className="form-group">
            <label htmlFor="income">Monthly Income(GBP)</label>
            <input type="number" id="income" onChange={handleChange} value={income} name="income" />
          </div>
          <button className="btn btn-primary" type="submit">
            Submit
          </button>
        </form>
        <hr />
        <button className="btn btn-primary">I already stored my data on the server!</button>
      </div>
    </main>
  );
};

export default Home;
