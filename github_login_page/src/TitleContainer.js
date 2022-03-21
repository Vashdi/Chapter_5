const TitleContainer = () => {
  const color = { color: "white" };
  return (
    <div className="firstBox">
      <p className="homeTitle">Welcome home</p>
      <p className="homeText">
        Collaborative with over 40 million developers across 195 countries to
        create the future,together. Work with the most innovative teams and
        tools-from <strong style={color}>code review</strong> to{" "}
        <strong style={color}>CYCD</strong> to{" "}
        <strong style={color}>automated security scanning</strong>-all from the
        comfort of your favorite workflow.
      </p>
    </div>
  );
};

export default TitleContainer;
