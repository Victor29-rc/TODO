const Card = ({ children, styles }) => {
  let card_styles = {
    padding: '30px',
    margin: '40px auto',
    maxWidth: '80%',
    ...styles,
  };

  return <div style={card_styles}>{children}</div>;
};

export default Card;
