import { ReactNode } from "react";

type Props = {
  title: string;
  children: ReactNode;
};

export default function SectionCard({
  title,
  children,
}: Props) {
  return (
    <div className="section-card">
      <div className="section-header">
        <h3>{title}</h3>
      </div>

      {children}
    </div>
  );
}