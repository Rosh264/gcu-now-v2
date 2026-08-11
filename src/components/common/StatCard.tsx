type Props = {
  title: string;
  value: number;
  badge?: string;
};

export default function StatCard({
  title,
  value,
  badge,
}: Props) {
  return (
    <div className="stat-card">
      <div className="stat-title">
        {title}
      </div>

      <div className="stat-bottom">
        <h2>{value}</h2>

        {badge && (
          <span className="badge">
            {badge}
          </span>
        )}
      </div>
    </div>
  );
}