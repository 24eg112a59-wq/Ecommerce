const PageTitle = ({ eyebrow, title, description, align = 'start' }) => {
  return (
    <div className={`mb-4 text-${align}`}>
      {eyebrow ? <div className="text-uppercase fw-semibold text-warning small mb-2">{eyebrow}</div> : null}
      <h1 className="display-6 fw-bold mb-2">{title}</h1>
      {description ? <p className="text-secondary mb-0">{description}</p> : null}
    </div>
  );
};

export default PageTitle;
