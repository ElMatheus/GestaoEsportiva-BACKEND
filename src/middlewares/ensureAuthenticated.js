import jwt from 'jsonwebtoken';
const { verify } = jwt;

export const ensureAuthenticated = async (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization) {
    return res.status(401).send({ message: "Token não autorizado" });
  }

  const token = authorization.replace("Bearer", "").trim();

  try {
    const decoded = verify(token, '8d59240f-7a89-4817-bfb0-2d0d5e717ed3');
    
    // Verificação de tipo de usuário
    if (decoded.type !== 'admin') {
      return res.status(403).send({ message: "Tipo de usuário não autorizado" });
    }

    return next();
  } catch (error) {
    return res.status(401).send({ message: "Token inválido" });
  }
}