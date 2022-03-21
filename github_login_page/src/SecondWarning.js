const SecondWarning = () => {
  const linkColor = { color: "blue" };
  return (
    <p className="secondWarning">
      By clicking "Sign up for GitHub", you agree to our{" "}
      <a style={linkColor} href="/#">
        Terms of Service
      </a>{" "}
      and{" "}
      <a style={linkColor} href="/#">
        Privacy Statement
      </a>
      . We'll occasionally send you account related emails.
    </p>
  );
};

export default SecondWarning;
