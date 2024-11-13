import jwt from 'jsonwebtoken';
const { verify } = jwt;

export const ensureAuthenticated = (access) => {
  return async (req, res, next) => {
    const { authorization } = req.headers;

    if (!authorization) {
      return res.status(401).send({ message: "Token não autorizado" });
    }

    const token = authorization.replace("Bearer", "").trim();

    try {
      const decoded = verify(token, '8d59240f-7a89-4817-bfb0-2d0d5e717ed3');

      // Verificação de tipo de usuário
      console.log(access);
      console.log(decoded.type);
      
      if (access === "organizador" && decoded.type !== 'organizador' || decoded.type !== 'admin') {
        return res.status(401).send({ message: "Acesso não autorizado" });
      }

      return next();
    } catch (error) {
      return res.status(401).send({ message: "Token inválido" });
    }
  }
}


