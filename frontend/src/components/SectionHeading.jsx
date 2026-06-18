const SectionHeading = ({ eyebrow, title, description, align = 'start' }) => {
  return (
    <div className={`section-heading text-${align}`}>
      {eyebrow && <span className="section-eyebrow">{eyebrow}</span>}
      <h2>{title}</h2>
      {description && <p>{description}</p>}
    </div>
  );
};

export default SectionHeading;
