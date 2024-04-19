import jwt from 'jsonwebtoken'

const secret = process.env.JWT_SECRET || 'chave-padrão-secreta'

export const jwtService = {
    signToken: (payload: string | object | Buffer, expiration: string) => {
        return jwt.sign(payload, secret, {
            expiresIn: expiration
        })
    },

    verifyToken: (token:string, callbackfn: jwt.VerifyCallback) => {
        jwt.verify(token, secret, callbackfn)
    }
}