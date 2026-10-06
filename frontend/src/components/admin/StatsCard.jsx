const StatsCard = ({
  label,
  value,
  description,
  icon,
}) => {
  return (
    <article className="stats-card">
      <div className="stats-card-header">
        <span className="stats-card-label">{label}</span>

        {icon && (
          <span className="stats-card-icon">
            {icon}
          </span>
        )}
      </div>

      <div className="stats-card-value">{value}</div>

      {description && (
        <p className="stats-card-description">
          {description}
        </p>
      )}
    </article>
  );
};

export default StatsCard;