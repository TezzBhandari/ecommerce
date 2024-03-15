import jwt from "jsonwebtoken";

const issueJWT = ({
  user,
  options,
}: {
  user: {
    id: string;
    email: string;
    fullname: string;
    isEmailVerified: boolean;
  };

  options: { expiresIn: string | number };
}) => {
  const jwtSecret = process.env.JWT_SECRET as string;
  const payload = {
    sub: user.id,
    // exp: Date.now() + 15 * 60 * 1000,
    iat: Date.now(),
    iss: "ecommerce",
    MetaData: {
      userId: user.id,
      email: user.email,
      fullname: user.fullname,
      isEmailVerified: user.isEmailVerified,
    },
  };
  const token = jwt.sign(payload, jwtSecret, {
    algorithm: "HS256",
    // allowInsecureKeySizes: true,
    expiresIn: options.expiresIn,
  });
  return token;
};

export { issueJWT };
