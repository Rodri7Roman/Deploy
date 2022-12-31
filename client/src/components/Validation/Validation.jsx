const Validation = (props) => {
  const min_h = parseInt(props.min_height);
  const max_h = parseInt(props.max_height);
  const min_w = parseInt(props.min_weight);
  const max_w = parseInt(props.max_weight);
  let errors = {};

  if (props.name.length === 0) errors.name = "Enter a name";
  if (min_h < 1 || min_h > 100) errors.min_height = "1 cm - 100 cm";
  if (!min_h) errors.min_height = "enter a number";
  if (max_h < 1 || max_h > 100) errors.max_height = "1 cm - 100 cm";
  if (!max_h) errors.max_height = "enter a number";
  else if (min_h > max_h) errors.max_height = "min greater than max.";

  if (!min_w) errors.min_weight = "enter a number";
  if (min_w < 1 || min_w > 100) errors.min_weight = "1 kg - 100 kg";
  if (max_w < 1 || max_w > 100) errors.max_weight = "1 kg - 100 kg";
  if (!max_w) errors.max_weight = "enter a number";
  else if (min_w > max_w) errors.max_weight = "min greater than max.";

  if (props.life_span.length === 0) errors.life_span = "Enter a life span";
  else if (parseInt(props.life_span) > 20) errors.life_span = "Max 20 years";

  if (!/.*(png|jpg|jpeg|gif)$/.test(props.image))
    errors.image = "Enter a URL image .png, .jpg, .jpeg, .gif";
  return errors;
};

export default Validation;
