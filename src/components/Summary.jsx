import CountUp from "react-countup";
function Summary({ balance, totalIncome, totalExpense }) {
  return (
    <div className="summary">
      <div className="card balance">
        <h3>Balance</h3>
        <p className="text-2xl font-semibold">
          ₹ <CountUp end={balance} duration={1} separator="," />
        </p>
      </div>

      <div className="card income">
        <h3>Income</h3>
        <p className="text-2xl font-semibold">
          ₹ <CountUp end={totalIncome} duration={1} separator="," />
        </p>
      </div>

      <div className="card expense">
        <h3>Expense</h3>
        <p className="text-2xl font-semibold">
          ₹ <CountUp end={totalExpense} duration={1} separator="," />
        </p>
      </div>
    </div>
  );
}

export default Summary;