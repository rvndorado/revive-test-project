import Joi from "joi";

export const validateNewUser = (
  email: string,
  first_name: string,
  last_name: string,
  avatar: string
) => {
  const schema = Joi.object({
    email: Joi.string()
      .email({ minDomainSegments: 2, tlds: { allow: ["com", "net", "in"] } })
      .required(),
    first_name: Joi.string().required(),
    last_name: Joi.string().required(),
    avatar: Joi.string().uri().required(),
  });

  return schema.validate(
    { email, first_name, last_name, avatar },
    { abortEarly: false }
  );
};

export const validateExistingUser = (
  id: string,
  email: string,
  first_name: string,
  last_name: string,
  avatar: string
) => {
  const schema = Joi.object({
    id: Joi.string().required(),
    email: Joi.string()
      .email({ minDomainSegments: 2, tlds: { allow: ["com", "net", "in"] } })
      .required(),
    first_name: Joi.string().required(),
    last_name: Joi.string().required(),
    avatar: Joi.string().uri().required(),
  });

  return schema.validate(
    { id, email, first_name, last_name, avatar },
    { abortEarly: false }
  );
};

export const validateDeleteUser = (id: string) => {
  const schema = Joi.object({
    id: Joi.string().required(),
  });

  return schema.validate({ id });
};

export const validateRegistration = (
  email: string,
  password: string,
  confirmPassword: string
) => {
  const schema = Joi.object({
    email: Joi.string()
      .email({ minDomainSegments: 2, tlds: { allow: ["com", "net", "in"] } })
      .required(),
    password: Joi.string()
      .min(6)
      .max(255)
      .required(),
    confirmPassword: Joi.any().equal(Joi.ref("password")).required(),
  });
  return schema.validate(
    { email, password, confirmPassword },
    { abortEarly: false }
  );
};
