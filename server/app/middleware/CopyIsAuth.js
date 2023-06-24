import jwt from "jsonwebtoken";

export const authMiddleware = (req, res, next) => {
    // lấy token ra từ header
    const authorizationHeader = req.headers['authorization'];
    const token = authorizationHeader?.split('')[1];
    // kiểm tra có token không
    if (!token) {
        //không token
        //status 401 là không có quyền truy cập
        res.sendStatus(401);
        //có token
        //verify token bằng jwt để lấy thông tin đã làm ở bước login jwt.sign
        jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, data) => {
            if (err) res.sendStatus(500);
            if (data.isAdmin) {
                //thêm property mới vào object req là data của user lấy từ jwt
                req.user = data;
                //gọi next để đi đến handler tiếp theo
                return next();
            }
            res.status(401).json({message: "Bạn không phải là admin"})
        })
    }
}