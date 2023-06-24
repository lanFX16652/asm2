import jwt from "jsonwebtoken";

export const authMiddleware = (req, res, next) => {
    // lay token ra tu header 
    const authorizationHeader = req.headers['authorization'];
    const token = authorizationHeader?.split(' ')[1];
    // kiem tra co token khong ?
    if (!token) {
        // khong token
        // status 401 la khong co quyen truy cap
        res.sendStatus(401);
    }
    // co token
    // verify token bang jwt de lay thong tin da lam o buoc login jwt.sign
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, data) => {
        if (err) res.sendStatus(500);
        if (data.isAdmin) {
            // them property moi vao object req la data cua user lay tu jwt 
            req.user = data
            // goi next de di den handler tiep theo 
            return next();
        }
        res.status(401).json({ message: 'Ban khong phai la admin ' })
    })
}
