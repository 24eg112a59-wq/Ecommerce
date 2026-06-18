const StatCard = ({ label, value, caption }) => {
  return (
    <div className="card border-0 shadow-sm h-100">
      <div className="card-body">
        <div className="text-secondary text-uppercase small fw-semibold mb-2">{label}</div>
        <div className="display-6 fw-bold mb-2">{value}</div>
        {caption ? <div className="text-secondary small">{caption}</div> : null}
      </div>
    </div>
  );
};

export default StatCard;
