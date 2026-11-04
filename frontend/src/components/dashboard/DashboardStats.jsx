// Render reusable metric cards for administrator statistics.
function DashboardStats({ statistics }) {
  return (
    <div className="dashboard-stats">
      {statistics.map((statistic) => (
        <article className="dashboard-stat" key={statistic.label}>
          <span>{statistic.label}</span>
          <strong>{statistic.value}</strong>
        </article>
      ))}
    </div>
  );
}

export default DashboardStats;
