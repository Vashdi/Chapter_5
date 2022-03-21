const FirstWarning = () => {
  const warningColor = { color: "red" };
  const linkColor = { color: "blue" };

  return (
    <p className="firstWarning">
      make sure it's{" "}
      <span style={warningColor}>
        at least 25 characters OR at least 5 characters including a number and a
        lowercase letter.
      </span>{" "}
      <a style={linkColor} href="/#">
        Learn more.
      </a>
    </p>
  );
};

export default FirstWarning;
